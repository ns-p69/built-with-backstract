from pydantic import BaseModel

import datetime

import uuid

from typing import Any, Dict, List, Tuple

class Challenges(BaseModel):
    id: int
    problem: str
    description: str
    instructions: str
    time_limit: int
    constraints: str


class ReadChallenges(BaseModel):
    id: int
    problem: str
    description: str
    instructions: str
    time_limit: int
    constraints: str
    class Config:
        from_attributes = True


class Feedbacks(BaseModel):
    id: int
    team_id: int
    feedback: str
    rating: int


class ReadFeedbacks(BaseModel):
    id: int
    team_id: int
    feedback: str
    rating: int
    class Config:
        from_attributes = True


class Participants(BaseModel):
    id: int
    name: str
    email: str
    specifications: str
    team_id: int


class ReadParticipants(BaseModel):
    id: int
    name: str
    email: str
    specifications: str
    team_id: int
    class Config:
        from_attributes = True


class Leaderboard(BaseModel):
    id: int
    created_at: datetime.time
    team_id: int
    team_name: str
    challenge_id: int
    challenge_name: str
    submission_id: int
    start_time: str
    end_time: str
    rank: int
    status: str
    penalty: int
    judge_score: int


class ReadLeaderboard(BaseModel):
    id: int
    created_at: datetime.time
    team_id: int
    team_name: str
    challenge_id: int
    challenge_name: str
    submission_id: int
    start_time: str
    end_time: str
    rank: int
    status: str
    penalty: int
    judge_score: int
    class Config:
        from_attributes = True


class Submissions(BaseModel):
    id: int
    team_id: int
    challenge_id: int
    time_taken: str
    collection_url: str
    deployed_code: str
    project_code: str


class ReadSubmissions(BaseModel):
    id: int
    team_id: int
    challenge_id: int
    time_taken: str
    collection_url: str
    deployed_code: str
    project_code: str
    class Config:
        from_attributes = True


class Teams(BaseModel):
    id: int
    name: str
    challenge_id: int
    submission_id: int
    size: int


class ReadTeams(BaseModel):
    id: int
    name: str
    challenge_id: int
    submission_id: int
    size: int
    class Config:
        from_attributes = True


class Timer(BaseModel):
    id: int
    created_at: datetime.time
    user_id: int
    team_id: int
    challenge_id: int
    start_time: str
    end_time: str


class ReadTimer(BaseModel):
    id: int
    created_at: datetime.time
    user_id: int
    team_id: int
    challenge_id: int
    start_time: str
    end_time: str
    class Config:
        from_attributes = True




class PostParticipants(BaseModel):
    id: str
    name: str
    email: str
    specifications: str
    team_id: str

    class Config:
        from_attributes = True



class PutParticipantsId(BaseModel):
    id: str
    name: str
    email: str
    specifications: str
    team_id: str

    class Config:
        from_attributes = True



class PostTeams(BaseModel):
    id: int
    name: str
    challenge_id: int
    submission_id: int
    size: str

    class Config:
        from_attributes = True



class PutTeamsId(BaseModel):
    id: str
    name: str
    challenge_id: str
    submission_id: str
    size: str

    class Config:
        from_attributes = True



class PostChallenges(BaseModel):
    id: str
    problem: str
    description: str
    instructions: str
    time_limit: str
    constraints: str

    class Config:
        from_attributes = True



class PutChallengesId(BaseModel):
    id: str
    problem: str
    description: str
    instructions: str
    time_limit: str
    constraints: str

    class Config:
        from_attributes = True



class PostSubmissions(BaseModel):
    team_id: int
    challenge_id: int
    time_taken: str
    collection_url: str
    deployed_code: str
    project_code: str

    class Config:
        from_attributes = True



class PutSubmissionsId(BaseModel):
    id: str
    team_id: str
    challenge_id: str
    time_taken: str
    collection_url: str
    deployed_code: str
    project_code: str

    class Config:
        from_attributes = True



class PostParticipantsTeamId(BaseModel):
    team_id: int

    class Config:
        from_attributes = True



class PostFeedbacks(BaseModel):
    team_id: int
    feedback: str
    rating: int

    class Config:
        from_attributes = True



class PostParticipantsAssignTeamId(BaseModel):
    user_id: int
    team_id: int
    limit: int

    class Config:
        from_attributes = True



class PostRecordTimer(BaseModel):
    user_id: int
    challenge_id: int
    team_id: int
    start_time: str
    end_time: str

    class Config:
        from_attributes = True



class PatchLeaderboardUpdateTeam(BaseModel):
    team_id: int
    team_name: str
    challenge_id: int
    challenge_name: str
    start_time: str
    judge_score: int
    penalty: int

    class Config:
        from_attributes = True



class PutUpdateSubmission(BaseModel):
    team_id: int
    submission_id: int
    end_time: str
    status: str

    class Config:
        from_attributes = True



class PutLeaderboardSubmission(BaseModel):
    team_id: int
    submission_id: int
    status: str
    end_time: str

    class Config:
        from_attributes = True

