from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import *
from fastapi import Request, UploadFile, HTTPException
import models, schemas
import boto3

import jwt

import datetime

from pathlib import Path

async def get_list_status(db: Session):

    list_status_all = db.query(models.ListStatus).all()
    list_status_all = [new_data.to_dict() for new_data in list_status_all] if list_status_all else list_status_all

    res = {
        'list_status_all': list_status_all,
    }
    return res

async def get_list_status_id(db: Session, id: int):

    list_status_one = db.query(models.ListStatus).filter(models.ListStatus.id == id).first() 
    list_status_one = list_status_one.to_dict() if list_status_one else list_status_one

    res = {
        'list_status_one': list_status_one,
    }
    return res

async def post_list_status(db: Session, raw_data: schemas.PostListStatus):
    id:str = raw_data.id
    title:str = raw_data.title
    sort_order:str = raw_data.sort_order
    created_at:str = raw_data.created_at


    record_to_be_added = {'id': id, 'title': title, 'sort_order': sort_order, 'created_at': created_at}
    new_list_status = models.ListStatus(**record_to_be_added)
    db.add(new_list_status)
    db.commit()
    db.refresh(new_list_status)
    list_status_inserted_record = new_list_status.to_dict()

    res = {
        'list_status_inserted_record': list_status_inserted_record,
    }
    return res

async def put_list_status_id(db: Session, raw_data: schemas.PutListStatusId):
    id:str = raw_data.id
    title:str = raw_data.title
    sort_order:str = raw_data.sort_order
    created_at:str = raw_data.created_at


    list_status_edited_record = db.query(models.ListStatus).filter(models.ListStatus.id == id).first()
    for key, value in {'id': id, 'title': title, 'sort_order': sort_order, 'created_at': created_at}.items():
          setattr(list_status_edited_record, key, value)
    db.commit()
    db.refresh(list_status_edited_record)
    list_status_edited_record = list_status_edited_record.to_dict() 

    res = {
        'list_status_edited_record': list_status_edited_record,
    }
    return res

async def delete_list_status_id(db: Session, id: int):

    list_status_deleted = None
    record_to_delete = db.query(models.ListStatus).filter(models.ListStatus.id == id).first()

    if record_to_delete:
        db.delete(record_to_delete)
        db.commit()
        list_status_deleted = record_to_delete.to_dict() 

    res = {
        'list_status_deleted': list_status_deleted,
    }
    return res

async def get_teams(db: Session):

    teams_all = db.query(models.Teams).all()
    teams_all = [new_data.to_dict() for new_data in teams_all] if teams_all else teams_all

    res = {
        'teams_all': teams_all,
    }
    return res

async def get_teams_id(db: Session, id: int):

    teams_one = db.query(models.Teams).filter(models.Teams.id == id).first() 
    teams_one = teams_one.to_dict() if teams_one else teams_one

    res = {
        'teams_one': teams_one,
    }
    return res

async def post_teams(db: Session, raw_data: schemas.PostTeams):
    id:str = raw_data.id
    name:str = raw_data.name
    title:str = raw_data.title
    description:str = raw_data.description
    status:str = raw_data.status
    created_at:str = raw_data.created_at


    record_to_be_added = {'id': id, 'name': name, 'title': title, 'description': description, 'status': status, 'created_at': created_at}
    new_teams = models.Teams(**record_to_be_added)
    db.add(new_teams)
    db.commit()
    db.refresh(new_teams)
    teams_inserted_record = new_teams.to_dict()

    res = {
        'teams_inserted_record': teams_inserted_record,
    }
    return res

async def put_teams_id(db: Session, raw_data: schemas.PutTeamsId):
    id:str = raw_data.id
    name:str = raw_data.name
    title:str = raw_data.title
    description:str = raw_data.description
    status:str = raw_data.status
    created_at:str = raw_data.created_at


    teams_edited_record = db.query(models.Teams).filter(models.Teams.id == id).first()
    for key, value in {'id': id, 'name': name, 'title': title, 'description': description, 'status': status, 'created_at': created_at}.items():
          setattr(teams_edited_record, key, value)
    db.commit()
    db.refresh(teams_edited_record)
    teams_edited_record = teams_edited_record.to_dict() 

    res = {
        'teams_edited_record': teams_edited_record,
    }
    return res

async def delete_teams_id(db: Session, id: int):

    teams_deleted = None
    record_to_delete = db.query(models.Teams).filter(models.Teams.id == id).first()

    if record_to_delete:
        db.delete(record_to_delete)
        db.commit()
        teams_deleted = record_to_delete.to_dict() 

    res = {
        'teams_deleted': teams_deleted,
    }
    return res

async def get_users(db: Session):

    users_all = db.query(models.Users).all()
    users_all = [new_data.to_dict() for new_data in users_all] if users_all else users_all

    res = {
        'users_all': users_all,
    }
    return res

async def get_users_id(db: Session, id: int):

    users_one = db.query(models.Users).filter(models.Users.id == id).first() 
    users_one = users_one.to_dict() if users_one else users_one

    res = {
        'users_one': users_one,
    }
    return res

async def post_users(db: Session, raw_data: schemas.PostUsers):
    id:str = raw_data.id
    user_id:str = raw_data.user_id
    name:str = raw_data.name
    email:str = raw_data.email
    phone:str = raw_data.phone
    password_hash:str = raw_data.password_hash
    status:str = raw_data.status
    role:str = raw_data.role
    team_id:str = raw_data.team_id
    created_at:str = raw_data.created_at


    record_to_be_added = {'id': id, 'user_id': user_id, 'name': name, 'email': email, 'phone': phone, 'password_hash': password_hash, 'status': status, 'role': role, 'team_id': team_id, 'created_at': created_at}
    new_users = models.Users(**record_to_be_added)
    db.add(new_users)
    db.commit()
    db.refresh(new_users)
    users_inserted_record = new_users.to_dict()

    res = {
        'users_inserted_record': users_inserted_record,
    }
    return res

async def put_users_id(db: Session, raw_data: schemas.PutUsersId):
    id:str = raw_data.id
    user_id:str = raw_data.user_id
    name:str = raw_data.name
    email:str = raw_data.email
    phone:str = raw_data.phone
    password_hash:str = raw_data.password_hash
    status:str = raw_data.status
    role:str = raw_data.role
    team_id:str = raw_data.team_id
    created_at:str = raw_data.created_at


    users_edited_record = db.query(models.Users).filter(models.Users.id == id).first()
    for key, value in {'id': id, 'user_id': user_id, 'name': name, 'email': email, 'phone': phone, 'password_hash': password_hash, 'status': status, 'role': role, 'team_id': team_id, 'created_at': created_at}.items():
          setattr(users_edited_record, key, value)
    db.commit()
    db.refresh(users_edited_record)
    users_edited_record = users_edited_record.to_dict() 

    res = {
        'users_edited_record': users_edited_record,
    }
    return res

async def delete_users_id(db: Session, id: int):

    users_deleted = None
    record_to_delete = db.query(models.Users).filter(models.Users.id == id).first()

    if record_to_delete:
        db.delete(record_to_delete)
        db.commit()
        users_deleted = record_to_delete.to_dict() 

    res = {
        'users_deleted': users_deleted,
    }
    return res

async def get_tasks(db: Session):

    tasks_all = db.query(models.Tasks).all()
    tasks_all = [new_data.to_dict() for new_data in tasks_all] if tasks_all else tasks_all

    res = {
        'tasks_all': tasks_all,
    }
    return res

async def get_tasks_id(db: Session, id: int):

    tasks_one = db.query(models.Tasks).filter(models.Tasks.id == id).first() 
    tasks_one = tasks_one.to_dict() if tasks_one else tasks_one

    res = {
        'tasks_one': tasks_one,
    }
    return res

async def post_tasks(db: Session, raw_data: schemas.PostTasks):
    id:str = raw_data.id
    title:str = raw_data.title
    description:str = raw_data.description
    assigned_by:str = raw_data.assigned_by
    assigned_to:str = raw_data.assigned_to
    priority:str = raw_data.priority
    status:str = raw_data.status
    start_date:str = raw_data.start_date
    due_date:str = raw_data.due_date
    team_id:str = raw_data.team_id
    parent_id:str = raw_data.parent_id
    time_estimation:str = raw_data.time_estimation
    created_at:str = raw_data.created_at


    record_to_be_added = {'id': id, 'title': title, 'description': description, 'assigned_by': assigned_by, 'assigned_to': assigned_to, 'priority': priority, 'status': status, 'start_date': start_date, 'due_date': due_date, 'team_id': team_id, 'parent_id': parent_id, 'time_estimation': time_estimation, 'created_at': created_at}
    new_tasks = models.Tasks(**record_to_be_added)
    db.add(new_tasks)
    db.commit()
    db.refresh(new_tasks)
    tasks_inserted_record = new_tasks.to_dict()

    res = {
        'tasks_inserted_record': tasks_inserted_record,
    }
    return res

async def put_tasks_id(db: Session, raw_data: schemas.PutTasksId):
    id:int = raw_data.id
    title:str = raw_data.title
    description:str = raw_data.description
    assigned_by:str = raw_data.assigned_by
    assigned_to:str = raw_data.assigned_to
    priority:str = raw_data.priority
    status:str = raw_data.status
    start_date:str = raw_data.start_date
    due_date:str = raw_data.due_date
    team_id:str = raw_data.team_id
    parent_id:str = raw_data.parent_id
    time_estimation:str = raw_data.time_estimation
    created_at:str = raw_data.created_at


    tasks_edited_record = db.query(models.Tasks).filter(models.Tasks.id == id).first()
    for key, value in {'id': id, 'title': title, 'description': description, 'assigned_by': assigned_by, 'assigned_to': assigned_to, 'priority': priority, 'status': status, 'start_date': start_date, 'due_date': due_date, 'team_id': team_id, 'parent_id': parent_id, 'time_estimation': time_estimation, 'created_at': created_at}.items():
          setattr(tasks_edited_record, key, value)
    db.commit()
    db.refresh(tasks_edited_record)
    tasks_edited_record = tasks_edited_record.to_dict() 

    res = {
        'tasks_edited_record': tasks_edited_record,
    }
    return res

async def delete_tasks_id(db: Session, id: int):

    tasks_deleted = None
    record_to_delete = db.query(models.Tasks).filter(models.Tasks.id == id).first()

    if record_to_delete:
        db.delete(record_to_delete)
        db.commit()
        tasks_deleted = record_to_delete.to_dict() 

    res = {
        'tasks_deleted': tasks_deleted,
    }
    return res

async def get_task_attachments(db: Session):

    task_attachments_all = db.query(models.TaskAttachments).all()
    task_attachments_all = [new_data.to_dict() for new_data in task_attachments_all] if task_attachments_all else task_attachments_all

    res = {
        'task_attachments_all': task_attachments_all,
    }
    return res

async def get_task_attachments_id(db: Session, id: int):

    task_attachments_one = db.query(models.TaskAttachments).filter(models.TaskAttachments.id == id).first() 
    task_attachments_one = task_attachments_one.to_dict() if task_attachments_one else task_attachments_one

    res = {
        'task_attachments_one': task_attachments_one,
    }
    return res

async def post_task_attachments(db: Session, raw_data: schemas.PostTaskAttachments):
    id:str = raw_data.id
    task_id:str = raw_data.task_id
    url:str = raw_data.url
    created_by:str = raw_data.created_by
    created_at:str = raw_data.created_at


    record_to_be_added = {'id': id, 'task_id': task_id, 'url': url, 'created_by': created_by, 'created_at': created_at}
    new_task_attachments = models.TaskAttachments(**record_to_be_added)
    db.add(new_task_attachments)
    db.commit()
    db.refresh(new_task_attachments)
    task_attachments_inserted_record = new_task_attachments.to_dict()

    res = {
        'task_attachments_inserted_record': task_attachments_inserted_record,
    }
    return res

async def put_task_attachments_id(db: Session, raw_data: schemas.PutTaskAttachmentsId):
    id:str = raw_data.id
    task_id:str = raw_data.task_id
    url:str = raw_data.url
    created_by:str = raw_data.created_by
    created_at:str = raw_data.created_at


    task_attachments_edited_record = db.query(models.TaskAttachments).filter(models.TaskAttachments.id == id).first()
    for key, value in {'id': id, 'task_id': task_id, 'url': url, 'created_by': created_by, 'created_at': created_at}.items():
          setattr(task_attachments_edited_record, key, value)
    db.commit()
    db.refresh(task_attachments_edited_record)
    task_attachments_edited_record = task_attachments_edited_record.to_dict() 

    res = {
        'task_attachments_edited_record': task_attachments_edited_record,
    }
    return res

async def delete_task_attachments_id(db: Session, id: int):

    task_attachments_deleted = None
    record_to_delete = db.query(models.TaskAttachments).filter(models.TaskAttachments.id == id).first()

    if record_to_delete:
        db.delete(record_to_delete)
        db.commit()
        task_attachments_deleted = record_to_delete.to_dict() 

    res = {
        'task_attachments_deleted': task_attachments_deleted,
    }
    return res

async def get_task_comments(db: Session):

    task_comments_all = db.query(models.TaskComments).all()
    task_comments_all = [new_data.to_dict() for new_data in task_comments_all] if task_comments_all else task_comments_all

    res = {
        'task_comments_all': task_comments_all,
    }
    return res

async def get_task_comments_id(db: Session, id: int):

    task_comments_one = db.query(models.TaskComments).filter(models.TaskComments.id == id).first() 
    task_comments_one = task_comments_one.to_dict() if task_comments_one else task_comments_one

    res = {
        'task_comments_one': task_comments_one,
    }
    return res

async def post_task_comments(db: Session, raw_data: schemas.PostTaskComments):
    id:str = raw_data.id
    task_id:str = raw_data.task_id
    comment:str = raw_data.comment
    comment_by:str = raw_data.comment_by
    created_at:str = raw_data.created_at


    record_to_be_added = {'id': id, 'task_id': task_id, 'comment': comment, 'comment_by': comment_by, 'created_at': created_at}
    new_task_comments = models.TaskComments(**record_to_be_added)
    db.add(new_task_comments)
    db.commit()
    db.refresh(new_task_comments)
    task_comments_inserted_record = new_task_comments.to_dict()

    res = {
        'task_comments_inserted_record': task_comments_inserted_record,
    }
    return res

async def put_task_comments_id(db: Session, raw_data: schemas.PutTaskCommentsId):
    id:str = raw_data.id
    task_id:str = raw_data.task_id
    comment:str = raw_data.comment
    comment_by:str = raw_data.comment_by
    created_at:str = raw_data.created_at


    task_comments_edited_record = db.query(models.TaskComments).filter(models.TaskComments.id == id).first()
    for key, value in {'id': id, 'task_id': task_id, 'comment': comment, 'comment_by': comment_by, 'created_at': created_at}.items():
          setattr(task_comments_edited_record, key, value)
    db.commit()
    db.refresh(task_comments_edited_record)
    task_comments_edited_record = task_comments_edited_record.to_dict() 

    res = {
        'task_comments_edited_record': task_comments_edited_record,
    }
    return res

async def delete_task_comments_id(db: Session, id: int):

    task_comments_deleted = None
    record_to_delete = db.query(models.TaskComments).filter(models.TaskComments.id == id).first()

    if record_to_delete:
        db.delete(record_to_delete)
        db.commit()
        task_comments_deleted = record_to_delete.to_dict() 

    res = {
        'task_comments_deleted': task_comments_deleted,
    }
    return res

async def get_task_tags(db: Session):

    task_tags_all = db.query(models.TaskTags).all()
    task_tags_all = [new_data.to_dict() for new_data in task_tags_all] if task_tags_all else task_tags_all

    res = {
        'task_tags_all': task_tags_all,
    }
    return res

async def get_task_tags_task_id(db: Session, task_id: int):

    task_tags_one = db.query(models.TaskTags).filter(models.TaskTags.task_id == task_id).first() 
    task_tags_one = task_tags_one.to_dict() if task_tags_one else task_tags_one

    res = {
        'task_tags_one': task_tags_one,
    }
    return res

async def post_task_tags(db: Session, raw_data: schemas.PostTaskTags):
    task_id:str = raw_data.task_id
    tag_id:str = raw_data.tag_id


    record_to_be_added = {'task_id': task_id, 'tag_id': tag_id}
    new_task_tags = models.TaskTags(**record_to_be_added)
    db.add(new_task_tags)
    db.commit()
    db.refresh(new_task_tags)
    task_tags_inserted_record = new_task_tags.to_dict()

    res = {
        'task_tags_inserted_record': task_tags_inserted_record,
    }
    return res

async def put_task_tags_task_id(db: Session, raw_data: schemas.PutTaskTagsTaskId):
    task_id:str = raw_data.task_id
    tag_id:str = raw_data.tag_id


    task_tags_edited_record = db.query(models.TaskTags).filter(models.TaskTags.task_id == task_id).first()
    for key, value in {'task_id': task_id, 'tag_id': tag_id}.items():
          setattr(task_tags_edited_record, key, value)
    db.commit()
    db.refresh(task_tags_edited_record)
    task_tags_edited_record = task_tags_edited_record.to_dict() 

    res = {
        'task_tags_edited_record': task_tags_edited_record,
    }
    return res

async def delete_task_tags_task_id(db: Session, task_id: int):

    task_tags_deleted = None
    record_to_delete = db.query(models.TaskTags).filter(models.TaskTags.task_id == task_id).first()

    if record_to_delete:
        db.delete(record_to_delete)
        db.commit()
        task_tags_deleted = record_to_delete.to_dict() 

    res = {
        'task_tags_deleted': task_tags_deleted,
    }
    return res

async def get_tags(db: Session):

    tags_all = db.query(models.Tags).all()
    tags_all = [new_data.to_dict() for new_data in tags_all] if tags_all else tags_all

    res = {
        'tags_all': tags_all,
    }
    return res

async def get_tags_id(db: Session, id: int):

    tags_one = db.query(models.Tags).filter(models.Tags.id == id).first() 
    tags_one = tags_one.to_dict() if tags_one else tags_one

    res = {
        'tags_one': tags_one,
    }
    return res

async def post_tags(db: Session, raw_data: schemas.PostTags):
    id:str = raw_data.id
    title:str = raw_data.title
    description:str = raw_data.description
    status:str = raw_data.status
    created_at:str = raw_data.created_at


    record_to_be_added = {'id': id, 'title': title, 'description': description, 'status': status, 'created_at': created_at}
    new_tags = models.Tags(**record_to_be_added)
    db.add(new_tags)
    db.commit()
    db.refresh(new_tags)
    tags_inserted_record = new_tags.to_dict()

    res = {
        'tags_inserted_record': tags_inserted_record,
    }
    return res

async def put_tags_id(db: Session, raw_data: schemas.PutTagsId):
    id:str = raw_data.id
    title:str = raw_data.title
    description:str = raw_data.description
    status:str = raw_data.status
    created_at:str = raw_data.created_at


    tags_edited_record = db.query(models.Tags).filter(models.Tags.id == id).first()
    for key, value in {'id': id, 'title': title, 'description': description, 'status': status, 'created_at': created_at}.items():
          setattr(tags_edited_record, key, value)
    db.commit()
    db.refresh(tags_edited_record)
    tags_edited_record = tags_edited_record.to_dict() 

    res = {
        'tags_edited_record': tags_edited_record,
    }
    return res

async def delete_tags_id(db: Session, id: int):

    tags_deleted = None
    record_to_delete = db.query(models.Tags).filter(models.Tags.id == id).first()

    if record_to_delete:
        db.delete(record_to_delete)
        db.commit()
        tags_deleted = record_to_delete.to_dict() 

    res = {
        'tags_deleted': tags_deleted,
    }
    return res

async def post_login(db: Session, raw_data: schemas.PostLogin):
    email:str = raw_data.email
    password:str = raw_data.password


    user_email = db.query(models.Users).filter(models.Users.email == email).first() 
    user_email = user_email.to_dict() if user_email else user_email


    password_hash = db.query(models.Users).filter(models.Users.password_hash == password).first() 
    password_hash = password_hash.to_dict() if password_hash else password_hash



    query = db.query(models.Users)
    query = query.filter(
        
        and_(
            models.Users.email == email,
            models.Users.password_hash == password
        )
    )


    user = query.all()
    user = [new_data.to_dict() for new_data in user] if user else user


    

    try:
        user_length:int = 0
    except Exception as e:
        raise HTTPException(500, str(e))




    # Get the length of the list 'user'
    user_length = len(user)

    
    from fastapi import HTTPException

    try:
        if  user_length==0:
            raise HTTPException(status_code=400, detail="You entered invalid credentials.")  # Raises HTTP 400 Bad
    except Exception as e:
        raise HTTPException(500, str(e))


    res = {
        'user': user,
    }
    return res

