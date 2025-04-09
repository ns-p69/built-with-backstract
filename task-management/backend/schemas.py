from pydantic import BaseModel

import datetime

import uuid

from typing import Any, Dict, List, Tuple

class TaskComments(BaseModel):
    id: int
    task_id: int
    comment: str
    comment_by: uuid.UUID
    created_at: datetime.time


class ReadTaskComments(BaseModel):
    id: int
    task_id: int
    comment: str
    comment_by: uuid.UUID
    created_at: datetime.time
    class Config:
        from_attributes = True


class Users(BaseModel):
    id: int
    user_id: uuid.UUID
    name: str
    email: str
    phone: str
    password_hash: str
    status: bool
    role: str
    team_id: int
    created_at: datetime.time


class ReadUsers(BaseModel):
    id: int
    user_id: uuid.UUID
    name: str
    email: str
    phone: str
    password_hash: str
    status: bool
    role: str
    team_id: int
    created_at: datetime.time
    class Config:
        from_attributes = True


class Teams(BaseModel):
    id: int
    name: str
    title: str
    description: str
    status: bool
    created_at: datetime.time


class ReadTeams(BaseModel):
    id: int
    name: str
    title: str
    description: str
    status: bool
    created_at: datetime.time
    class Config:
        from_attributes = True


class Tasks(BaseModel):
    id: int
    title: str
    description: str
    assigned_by: uuid.UUID
    assigned_to: uuid.UUID
    priority: str
    status: bool
    start_date: datetime.date
    due_date: datetime.date
    team_id: int
    parent_id: int
    time_estimation: int
    created_at: datetime.time
    list_status: str


class ReadTasks(BaseModel):
    id: int
    title: str
    description: str
    assigned_by: uuid.UUID
    assigned_to: uuid.UUID
    priority: str
    status: bool
    start_date: datetime.date
    due_date: datetime.date
    team_id: int
    parent_id: int
    time_estimation: int
    created_at: datetime.time
    list_status: str
    class Config:
        from_attributes = True


class Tags(BaseModel):
    id: int
    title: str
    description: str
    status: str
    created_at: datetime.time


class ReadTags(BaseModel):
    id: int
    title: str
    description: str
    status: str
    created_at: datetime.time
    class Config:
        from_attributes = True


class TaskTags(BaseModel):
    task_id: int
    tag_id: int


class ReadTaskTags(BaseModel):
    task_id: int
    tag_id: int
    class Config:
        from_attributes = True


class ListStatus(BaseModel):
    id: int
    title: str
    sort_order: int
    created_at: datetime.time


class ReadListStatus(BaseModel):
    id: int
    title: str
    sort_order: int
    created_at: datetime.time
    class Config:
        from_attributes = True


class TaskAttachments(BaseModel):
    id: int
    task_id: int
    url: str
    created_by: uuid.UUID
    created_at: datetime.time


class ReadTaskAttachments(BaseModel):
    id: int
    task_id: int
    url: str
    created_by: uuid.UUID
    created_at: datetime.time
    class Config:
        from_attributes = True




class PostListStatus(BaseModel):
    id: str
    title: str
    sort_order: str
    created_at: str

    class Config:
        from_attributes = True



class PutListStatusId(BaseModel):
    id: str
    title: str
    sort_order: str
    created_at: str

    class Config:
        from_attributes = True



class PostTeams(BaseModel):
    id: str
    name: str
    title: str
    description: str
    status: str
    created_at: str

    class Config:
        from_attributes = True



class PutTeamsId(BaseModel):
    id: str
    name: str
    title: str
    description: str
    status: str
    created_at: str

    class Config:
        from_attributes = True



class PostUsers(BaseModel):
    id: str
    user_id: str
    name: str
    email: str
    phone: str
    password_hash: str
    status: str
    role: str
    team_id: str
    created_at: str

    class Config:
        from_attributes = True



class PutUsersId(BaseModel):
    id: str
    user_id: str
    name: str
    email: str
    phone: str
    password_hash: str
    status: str
    role: str
    team_id: str
    created_at: str

    class Config:
        from_attributes = True



class PostTasks(BaseModel):
    id: str
    title: str
    description: str
    assigned_by: str
    assigned_to: str
    priority: str
    status: str
    start_date: str
    due_date: str
    team_id: str
    parent_id: str
    time_estimation: str
    created_at: str

    class Config:
        from_attributes = True



class PutTasksId(BaseModel):
    id: int
    title: str
    description: str
    assigned_by: str
    assigned_to: str
    priority: str
    status: str
    start_date: str
    due_date: str
    team_id: str
    parent_id: str
    time_estimation: str
    created_at: str

    class Config:
        from_attributes = True



class PostTaskAttachments(BaseModel):
    id: str
    task_id: str
    url: str
    created_by: str
    created_at: str

    class Config:
        from_attributes = True



class PutTaskAttachmentsId(BaseModel):
    id: str
    task_id: str
    url: str
    created_by: str
    created_at: str

    class Config:
        from_attributes = True



class PostTaskComments(BaseModel):
    id: str
    task_id: str
    comment: str
    comment_by: str
    created_at: str

    class Config:
        from_attributes = True



class PutTaskCommentsId(BaseModel):
    id: str
    task_id: str
    comment: str
    comment_by: str
    created_at: str

    class Config:
        from_attributes = True



class PostTaskTags(BaseModel):
    task_id: str
    tag_id: str

    class Config:
        from_attributes = True



class PutTaskTagsTaskId(BaseModel):
    task_id: str
    tag_id: str

    class Config:
        from_attributes = True



class PostTags(BaseModel):
    id: str
    title: str
    description: str
    status: str
    created_at: str

    class Config:
        from_attributes = True



class PutTagsId(BaseModel):
    id: str
    title: str
    description: str
    status: str
    created_at: str

    class Config:
        from_attributes = True



class PostLogin(BaseModel):
    email: str
    password: str

    class Config:
        from_attributes = True

