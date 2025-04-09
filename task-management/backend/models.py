from sqlalchemy.ext.declarative import as_declarative, declared_attr
from sqlalchemy.orm import class_mapper
import uuid
from datetime import datetime
from decimal import Decimal

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Time, Float, Text, ForeignKey, JSON, Numeric, Date, \
    TIMESTAMP, UUID
from sqlalchemy.ext.declarative import declarative_base


@as_declarative()
class Base:
    id: int
    __name__: str

    # Auto-generate table name if not provided
    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

    # Generic to_dict() method
    def to_dict(self):
        """
        Converts the SQLAlchemy model instance to a dictionary, ensuring UUID fields are converted to strings.
        """
        result = {}
        for column in class_mapper(self.__class__).columns:
            value = getattr(self, column.key)
                # Handle UUID fields
            if isinstance(value, uuid.UUID):
                value = str(value)
            # Handle datetime fields
            elif isinstance(value, datetime):
                value = value.isoformat()  # Convert to ISO 8601 string
            # Handle Decimal fields
            elif isinstance(value, Decimal):
                value = float(value)

            result[column.key] = value
        return result




class TaskComments(Base):
    __tablename__ = 'task_comments'
    id = Column(Integer, primary_key=True)
    task_id = Column(Integer, primary_key=False)
    comment = Column(String, primary_key=False)
    comment_by = Column(UUID, primary_key=False)
    created_at = Column(Time, primary_key=False)


class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    user_id = Column(UUID, primary_key=False)
    name = Column(String, primary_key=False)
    email = Column(String, primary_key=False)
    phone = Column(String, primary_key=False)
    password_hash = Column(String, primary_key=False)
    status = Column(Boolean, primary_key=False)
    role = Column(String, primary_key=False)
    team_id = Column(Integer, primary_key=False)
    created_at = Column(Time, primary_key=False)


class Teams(Base):
    __tablename__ = 'teams'
    id = Column(Integer, primary_key=True)
    name = Column(String, primary_key=False)
    title = Column(String, primary_key=False)
    description = Column(String, primary_key=False)
    status = Column(Boolean, primary_key=False)
    created_at = Column(Time, primary_key=False)


class Tasks(Base):
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True)
    title = Column(String, primary_key=False)
    description = Column(String, primary_key=False)
    assigned_by = Column(UUID, primary_key=False)
    assigned_to = Column(UUID, primary_key=False)
    priority = Column(String, primary_key=False)
    status = Column(Boolean, primary_key=False)
    start_date = Column(Date, primary_key=False)
    due_date = Column(Date, primary_key=False)
    team_id = Column(Integer, primary_key=False)
    parent_id = Column(Integer, primary_key=False)
    time_estimation = Column(Integer, primary_key=False)
    created_at = Column(Time, primary_key=False)
    list_status = Column(String, primary_key=False)


class Tags(Base):
    __tablename__ = 'tags'
    id = Column(Integer, primary_key=True)
    title = Column(String, primary_key=False)
    description = Column(String, primary_key=False)
    status = Column(String, primary_key=False)
    created_at = Column(Time, primary_key=False)


class TaskTags(Base):
    __tablename__ = 'task_tags'
    task_id = Column(Integer, primary_key=True)
    tag_id = Column(Integer, primary_key=True)


class ListStatus(Base):
    __tablename__ = 'list_status'
    id = Column(Integer, primary_key=True)
    title = Column(String, primary_key=False)
    sort_order = Column(Integer, primary_key=False)
    created_at = Column(Time, primary_key=False)


class TaskAttachments(Base):
    __tablename__ = 'task_attachments'
    id = Column(Integer, primary_key=True)
    task_id = Column(Integer, primary_key=False)
    url = Column(String, primary_key=False)
    created_by = Column(UUID, primary_key=False)
    created_at = Column(Time, primary_key=False)


