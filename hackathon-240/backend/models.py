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




class Challenges(Base):
    __tablename__ = 'challenges'
    id = Column(Integer, primary_key=True)
    problem = Column(String, primary_key=False)
    description = Column(String, primary_key=False)
    instructions = Column(String, primary_key=False)
    time_limit = Column(Integer, primary_key=False)
    constraints = Column(String, primary_key=False)


class Feedbacks(Base):
    __tablename__ = 'feedbacks'
    id = Column(Integer, primary_key=True)
    team_id = Column(Integer, primary_key=False)
    feedback = Column(String, primary_key=False)
    rating = Column(Integer, primary_key=False)


class Participants(Base):
    __tablename__ = 'participants'
    id = Column(Integer, primary_key=True)
    name = Column(String, primary_key=False)
    email = Column(String, primary_key=False)
    specifications = Column(String, primary_key=False)
    team_id = Column(Integer, primary_key=False)


class Leaderboard(Base):
    __tablename__ = 'leaderboard'
    id = Column(Integer, primary_key=True)
    created_at = Column(Time, primary_key=False)
    team_id = Column(Integer, primary_key=False)
    team_name = Column(String, primary_key=False)
    challenge_id = Column(Integer, primary_key=False)
    challenge_name = Column(String, primary_key=False)
    submission_id = Column(Integer, primary_key=False)
    start_time = Column(String, primary_key=False)
    end_time = Column(String, primary_key=False)
    rank = Column(Integer, primary_key=False)
    status = Column(String, primary_key=False)
    penalty = Column(Integer, primary_key=False)
    judge_score = Column(Integer, primary_key=False)


class Submissions(Base):
    __tablename__ = 'submissions'
    id = Column(Integer, primary_key=True)
    team_id = Column(Integer, primary_key=False)
    challenge_id = Column(Integer, primary_key=False)
    time_taken = Column(String, primary_key=False)
    collection_url = Column(String, primary_key=False)
    deployed_code = Column(String, primary_key=False)
    project_code = Column(String, primary_key=False)


class Teams(Base):
    __tablename__ = 'teams'
    id = Column(Integer, primary_key=True)
    name = Column(String, primary_key=False)
    challenge_id = Column(Integer, primary_key=False)
    submission_id = Column(Integer, primary_key=False)
    size = Column(Integer, primary_key=False)


class Timer(Base):
    __tablename__ = 'timer'
    id = Column(Integer, primary_key=True)
    created_at = Column(Time, primary_key=False)
    user_id = Column(Integer, primary_key=False)
    team_id = Column(Integer, primary_key=False)
    challenge_id = Column(Integer, primary_key=False)
    start_time = Column(String, primary_key=False)
    end_time = Column(String, primary_key=False)


