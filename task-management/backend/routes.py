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

@router.get('/list_status/')
async def get_list_status(db: Session = Depends(get_db)):
    try:
        return await service.get_list_status(db)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/list_status/id')
async def get_list_status_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.get_list_status_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/list_status/')
async def post_list_status(raw_data: schemas.PostListStatus, db: Session = Depends(get_db)):
    try:
        return await service.post_list_status(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.put('/list_status/id/')
async def put_list_status_id(raw_data: schemas.PutListStatusId, db: Session = Depends(get_db)):
    try:
        return await service.put_list_status_id(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.delete('/list_status/id')
async def delete_list_status_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.delete_list_status_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/teams/')
async def get_teams(db: Session = Depends(get_db)):
    try:
        return await service.get_teams(db)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/teams/id')
async def get_teams_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.get_teams_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/teams/')
async def post_teams(raw_data: schemas.PostTeams, db: Session = Depends(get_db)):
    try:
        return await service.post_teams(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.put('/teams/id/')
async def put_teams_id(raw_data: schemas.PutTeamsId, db: Session = Depends(get_db)):
    try:
        return await service.put_teams_id(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.delete('/teams/id')
async def delete_teams_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.delete_teams_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/users/')
async def get_users(db: Session = Depends(get_db)):
    try:
        return await service.get_users(db)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/users/id')
async def get_users_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.get_users_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/users/')
async def post_users(raw_data: schemas.PostUsers, db: Session = Depends(get_db)):
    try:
        return await service.post_users(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.put('/users/id/')
async def put_users_id(raw_data: schemas.PutUsersId, db: Session = Depends(get_db)):
    try:
        return await service.put_users_id(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.delete('/users/id')
async def delete_users_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.delete_users_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/tasks/')
async def get_tasks(db: Session = Depends(get_db)):
    try:
        return await service.get_tasks(db)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/tasks/id')
async def get_tasks_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.get_tasks_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/tasks/')
async def post_tasks(raw_data: schemas.PostTasks, db: Session = Depends(get_db)):
    try:
        return await service.post_tasks(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.put('/tasks/id/')
async def put_tasks_id(raw_data: schemas.PutTasksId, db: Session = Depends(get_db)):
    try:
        return await service.put_tasks_id(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.delete('/tasks/id')
async def delete_tasks_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.delete_tasks_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/task_attachments/')
async def get_task_attachments(db: Session = Depends(get_db)):
    try:
        return await service.get_task_attachments(db)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/task_attachments/id')
async def get_task_attachments_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.get_task_attachments_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/task_attachments/')
async def post_task_attachments(raw_data: schemas.PostTaskAttachments, db: Session = Depends(get_db)):
    try:
        return await service.post_task_attachments(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.put('/task_attachments/id/')
async def put_task_attachments_id(raw_data: schemas.PutTaskAttachmentsId, db: Session = Depends(get_db)):
    try:
        return await service.put_task_attachments_id(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.delete('/task_attachments/id')
async def delete_task_attachments_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.delete_task_attachments_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/task_comments/')
async def get_task_comments(db: Session = Depends(get_db)):
    try:
        return await service.get_task_comments(db)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/task_comments/id')
async def get_task_comments_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.get_task_comments_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/task_comments/')
async def post_task_comments(raw_data: schemas.PostTaskComments, db: Session = Depends(get_db)):
    try:
        return await service.post_task_comments(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.put('/task_comments/id/')
async def put_task_comments_id(raw_data: schemas.PutTaskCommentsId, db: Session = Depends(get_db)):
    try:
        return await service.put_task_comments_id(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.delete('/task_comments/id')
async def delete_task_comments_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.delete_task_comments_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/task_tags/')
async def get_task_tags(db: Session = Depends(get_db)):
    try:
        return await service.get_task_tags(db)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/task_tags/task_id')
async def get_task_tags_task_id(task_id: int, db: Session = Depends(get_db)):
    try:
        return await service.get_task_tags_task_id(db, task_id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/task_tags/')
async def post_task_tags(raw_data: schemas.PostTaskTags, db: Session = Depends(get_db)):
    try:
        return await service.post_task_tags(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.put('/task_tags/task_id/')
async def put_task_tags_task_id(raw_data: schemas.PutTaskTagsTaskId, db: Session = Depends(get_db)):
    try:
        return await service.put_task_tags_task_id(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.delete('/task_tags/task_id')
async def delete_task_tags_task_id(task_id: int, db: Session = Depends(get_db)):
    try:
        return await service.delete_task_tags_task_id(db, task_id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/tags/')
async def get_tags(db: Session = Depends(get_db)):
    try:
        return await service.get_tags(db)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/tags/id')
async def get_tags_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.get_tags_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/tags/')
async def post_tags(raw_data: schemas.PostTags, db: Session = Depends(get_db)):
    try:
        return await service.post_tags(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.put('/tags/id/')
async def put_tags_id(raw_data: schemas.PutTagsId, db: Session = Depends(get_db)):
    try:
        return await service.put_tags_id(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.delete('/tags/id')
async def delete_tags_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.delete_tags_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/login')
async def post_login(raw_data: schemas.PostLogin, db: Session = Depends(get_db)):
    try:
        return await service.post_login(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

