from fastapi import APIRouter, Request, Depends, HTTPException, UploadFile, Form
from sqlalchemy.orm import Session
from typing import List
import service, models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get('/bs_form_submission/')
async def get_bs_form_submission(headers: Request, db: Session = Depends(get_db)):
    try:
        return await service.get_bs_form_submission(db, headers)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/bs_form_submission/')
async def post_bs_form_submission(raw_data: schemas.PostBsFormSubmission, db: Session = Depends(get_db)):
    try:
        return await service.post_bs_form_submission(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.put('/bs_form_submission/id/')
async def put_bs_form_submission_id(raw_data: schemas.PutBsFormSubmissionId, db: Session = Depends(get_db)):
    try:
        return await service.put_bs_form_submission_id(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.delete('/bs_form_submission/id')
async def delete_bs_form_submission_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.delete_bs_form_submission_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/login')
async def post_login(raw_data: schemas.PostLogin, db: Session = Depends(get_db)):
    try:
        return await service.post_login(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/sign-up')
async def post_sign_up(raw_data: schemas.PostSignUp, db: Session = Depends(get_db)):
    try:
        return await service.post_sign_up(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/upload-attachment')
async def post_upload_attachment(attachment: UploadFile, api_secret_key: str, db: Session = Depends(get_db)):
    try:
        return await service.post_upload_attachment(db, attachment, api_secret_key)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/bs_form_submission/api-secret-key')
async def post_bs_form_submission_api_secret_key(headers: Request, db: Session = Depends(get_db)):
    try:
        return await service.post_bs_form_submission_api_secret_key(db, headers)
    except Exception as e:
        raise HTTPException(500, str(e))

