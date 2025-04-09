from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from prometheus_client import Counter, Histogram, Gauge, make_asgi_app
import models
import uvicorn
from routes import router
import time
import logging_loki
from multiprocessing import Queue
from loguru import logger

# Database setup
models.Base.metadata.create_all(bind=engine)

# Prometheus core metrics
REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP requests', ['method', 'endpoint', 'http_status'])
REQUEST_LATENCY = Histogram('http_request_duration_seconds', 'HTTP request latency',
                            ['method', 'endpoint', 'http_status'])
IN_PROGRESS = Gauge('http_requests_in_progress', 'HTTP requests in progress')

app = FastAPI(title='Backstract Generated APIs - coll-c84f7baf24c64be8add668ef9c4ceb6a', debug=False,
              docs_url='/affectionate-keller-d1d63ba4eaaa11efab560242ac12000527/docs',
              openapi_url='/affectionate-keller-d1d63ba4eaaa11efab560242ac12000527/openapi.json')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    router,
    prefix='/affectionate-keller-d1d63ba4eaaa11efab560242ac12000527/api',
    tags=['APIs v1']
)


# Middleware for Prometheus metrics
@app.middleware('http')
async def prometheus_middleware(request: Request, call_next):
    method = request.method
    path = request.url.path
    start_time = time.time()

    IN_PROGRESS.inc()  # Increment in-progress requests

    try:
        response = await call_next(request)
        status_code = response.status_code
    except Exception as e:
        status_code = 500  # Internal server error
        raise e
    finally:
        duration = time.time() - start_time
        REQUEST_COUNT.labels(method=method, endpoint=path, http_status=status_code).inc()
        REQUEST_LATENCY.labels(method=method, endpoint=path, http_status=status_code).observe(duration)
        IN_PROGRESS.dec()  # Decrement in-progress requests

    return response


# Prometheus' metrics endpoint
prometheus_app = make_asgi_app()
app.mount('/metrics', prometheus_app)

# Loki settings
LOKI_URL = "http://loki.monitoring.svc.cluster.local:3100/loki/api/v1/push"  # Update if needed
LOKI_LABELS = {"app": "fastapi-app"}  # Optional labels

# Configure Loguru to send logs to Loki
loki_handler = logging_loki.LokiQueueHandler(
    Queue(-1),
    url=LOKI_URL,
    tags=LOKI_LABELS,
    # auth=("username", "password"),
    version="1"
)

logger.add(loki_handler, level="INFO")  # Adjust log level as needed

def main():
    uvicorn.run('main:app', host='127.0.0.1', port=7070, reload=True)


if __name__ == '__main__':
    main()