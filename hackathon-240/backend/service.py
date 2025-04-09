from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import *
from fastapi import Request, UploadFile, HTTPException
import models, schemas
import boto3

import jwt

import datetime

from pathlib import Path

async def get_participants(db: Session):

    participants_all = db.query(models.Participants).all()
    participants_all = [new_data.to_dict() for new_data in participants_all] if participants_all else participants_all

    res = {
        'participants_all': participants_all,
    }
    return res

async def get_participants_id(db: Session, id: int):

    participants_one = db.query(models.Participants).filter(models.Participants.id == id).first() 
    participants_one = participants_one.to_dict() if participants_one else participants_one

    res = {
        'participants_one': participants_one,
    }
    return res

async def post_participants(db: Session, raw_data: schemas.PostParticipants):
    id:str = raw_data.id
    name:str = raw_data.name
    email:str = raw_data.email
    specifications:str = raw_data.specifications
    team_id:str = raw_data.team_id


    record_to_be_added = {'id': id, 'name': name, 'email': email, 'specifications': specifications, 'team_id': team_id}
    new_participants = models.Participants(**record_to_be_added)
    db.add(new_participants)
    db.commit()
    db.refresh(new_participants)
    participants_inserted_record = new_participants.to_dict()

    res = {
        'participants_inserted_record': participants_inserted_record,
    }
    return res

async def put_participants_id(db: Session, raw_data: schemas.PutParticipantsId):
    id:str = raw_data.id
    name:str = raw_data.name
    email:str = raw_data.email
    specifications:str = raw_data.specifications
    team_id:str = raw_data.team_id


    participants_edited_record = db.query(models.Participants).filter(models.Participants.id == id).first()
    for key, value in {'id': id, 'name': name, 'email': email, 'specifications': specifications, 'team_id': team_id}.items():
          setattr(participants_edited_record, key, value)
    db.commit()
    db.refresh(participants_edited_record)
    participants_edited_record = participants_edited_record.to_dict() 

    res = {
        'participants_edited_record': participants_edited_record,
    }
    return res

async def delete_participants_id(db: Session, id: int):

    participants_deleted = None
    record_to_delete = db.query(models.Participants).filter(models.Participants.id == id).first()

    if record_to_delete:
        db.delete(record_to_delete)
        db.commit()
        participants_deleted = record_to_delete.to_dict() 

    res = {
        'participants_deleted': participants_deleted,
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
    id:int = raw_data.id
    name:str = raw_data.name
    challenge_id:int = raw_data.challenge_id
    submission_id:int = raw_data.submission_id
    size:str = raw_data.size


    record_to_be_added = {'id': id, 'name': name, 'challenge_id': challenge_id, 'submission_id': submission_id, 'size': size}
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
    challenge_id:str = raw_data.challenge_id
    submission_id:str = raw_data.submission_id
    size:str = raw_data.size


    teams_edited_record = db.query(models.Teams).filter(models.Teams.id == id).first()
    for key, value in {'id': id, 'name': name, 'challenge_id': challenge_id, 'submission_id': submission_id, 'size': size}.items():
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

async def get_challenges(db: Session):

    challenges_all = db.query(models.Challenges).all()
    challenges_all = [new_data.to_dict() for new_data in challenges_all] if challenges_all else challenges_all

    res = {
        'challenges_all': challenges_all,
    }
    return res

async def get_challenges_id(db: Session, id: int):

    challenges_one = db.query(models.Challenges).filter(models.Challenges.id == id).first() 
    challenges_one = challenges_one.to_dict() if challenges_one else challenges_one

    res = {
        'challenges_one': challenges_one,
    }
    return res

async def post_challenges(db: Session, raw_data: schemas.PostChallenges):
    id:str = raw_data.id
    problem:str = raw_data.problem
    description:str = raw_data.description
    instructions:str = raw_data.instructions
    time_limit:str = raw_data.time_limit
    constraints:str = raw_data.constraints


    record_to_be_added = {'id': id, 'problem': problem, 'description': description, 'instructions': instructions, 'time_limit': time_limit, 'constraints': constraints}
    new_challenges = models.Challenges(**record_to_be_added)
    db.add(new_challenges)
    db.commit()
    db.refresh(new_challenges)
    challenges_inserted_record = new_challenges.to_dict()

    res = {
        'challenges_inserted_record': challenges_inserted_record,
    }
    return res

async def put_challenges_id(db: Session, raw_data: schemas.PutChallengesId):
    id:str = raw_data.id
    problem:str = raw_data.problem
    description:str = raw_data.description
    instructions:str = raw_data.instructions
    time_limit:str = raw_data.time_limit
    constraints:str = raw_data.constraints


    challenges_edited_record = db.query(models.Challenges).filter(models.Challenges.id == id).first()
    for key, value in {'id': id, 'problem': problem, 'description': description, 'instructions': instructions, 'time_limit': time_limit, 'constraints': constraints}.items():
          setattr(challenges_edited_record, key, value)
    db.commit()
    db.refresh(challenges_edited_record)
    challenges_edited_record = challenges_edited_record.to_dict() 

    res = {
        'challenges_edited_record': challenges_edited_record,
    }
    return res

async def delete_challenges_id(db: Session, id: int):

    challenges_deleted = None
    record_to_delete = db.query(models.Challenges).filter(models.Challenges.id == id).first()

    if record_to_delete:
        db.delete(record_to_delete)
        db.commit()
        challenges_deleted = record_to_delete.to_dict() 

    res = {
        'challenges_deleted': challenges_deleted,
    }
    return res

async def get_submissions(db: Session):

    submissions_all = db.query(models.Submissions).all()
    submissions_all = [new_data.to_dict() for new_data in submissions_all] if submissions_all else submissions_all

    res = {
        'submissions_all': submissions_all,
    }
    return res

async def get_submissions_id(db: Session, id: int):

    submissions_one = db.query(models.Submissions).filter(models.Submissions.id == id).first() 
    submissions_one = submissions_one.to_dict() if submissions_one else submissions_one

    res = {
        'submissions_one': submissions_one,
    }
    return res

async def post_submissions(db: Session, raw_data: schemas.PostSubmissions):
    team_id:int = raw_data.team_id
    challenge_id:int = raw_data.challenge_id
    time_taken:str = raw_data.time_taken
    collection_url:str = raw_data.collection_url
    deployed_code:str = raw_data.deployed_code
    project_code:str = raw_data.project_code


    is_submission_exist = db.query(models.Submissions).filter(models.Submissions.team_id == team_id).count() > 0

    import fastapi

    try:
        if is_submission_exist:
            raise fastapi.HTTPException(status_code=409, detail="Your team has already submitted this challenge")
    except Exception as e:
        raise HTTPException(500, str(e))



    record_to_be_added = {'team_id': team_id, 'challenge_id': challenge_id, 'time_taken': time_taken, 'collection_url': collection_url, 'deployed_code': deployed_code, 'project_code': project_code}
    new_submissions = models.Submissions(**record_to_be_added)
    db.add(new_submissions)
    db.commit()
    db.refresh(new_submissions)
    submission = new_submissions.to_dict()

    res = {
        'submission': submission,
    }
    return res

async def put_submissions_id(db: Session, raw_data: schemas.PutSubmissionsId):
    id:str = raw_data.id
    team_id:str = raw_data.team_id
    challenge_id:str = raw_data.challenge_id
    time_taken:str = raw_data.time_taken
    collection_url:str = raw_data.collection_url
    deployed_code:str = raw_data.deployed_code
    project_code:str = raw_data.project_code


    submissions_edited_record = db.query(models.Submissions).filter(models.Submissions.id == id).first()
    for key, value in {'id': id, 'team_id': team_id, 'challenge_id': challenge_id, 'time_taken': time_taken, 'collection_url': collection_url, 'deployed_code': deployed_code, 'project_code': project_code}.items():
          setattr(submissions_edited_record, key, value)
    db.commit()
    db.refresh(submissions_edited_record)
    submissions_edited_record = submissions_edited_record.to_dict() 

    res = {
        'submissions_edited_record': submissions_edited_record,
    }
    return res

async def delete_submissions_id(db: Session, id: int):

    submissions_deleted = None
    record_to_delete = db.query(models.Submissions).filter(models.Submissions.id == id).first()

    if record_to_delete:
        db.delete(record_to_delete)
        db.commit()
        submissions_deleted = record_to_delete.to_dict() 

    res = {
        'submissions_deleted': submissions_deleted,
    }
    return res

async def get_get_teams_email(db: Session, email: str):

    particpant = db.query(models.Participants).filter(models.Participants.email == email).first() 
    particpant = particpant.to_dict() if particpant else particpant


    team_details = db.query(models.Teams).filter(models.Teams.id == particpant['team_id']).first() 
    team_details = team_details.to_dict() if team_details else team_details

    res = {
        'team_details': team_details,
    }
    return res

async def post_participants_team_id(db: Session, raw_data: schemas.PostParticipantsTeamId):
    team_id:int = raw_data.team_id


    team_members = db.query(models.Participants).all()
    team_members = [new_data.to_dict() for new_data in team_members] if team_members else team_members


    # dictionary to assign participants data filtered from the code block
    participants_data = {}  # Creating new dict


    

    try:
        def get_selected_team_members() -> List[Any]:
            selected_team_members: List[Any] = []
            for team_member in team_members:
                if team_member.get("team_id") == team_id:
                    selected_team_members.append(team_member)
            return selected_team_members
        
        
        selected_members: List[Any] = get_selected_team_members()
    except Exception as e:
        raise HTTPException(500, str(e))


    res = {
        'participants': selected_members,
    }
    return res

async def post_feedbacks(db: Session, raw_data: schemas.PostFeedbacks):
    team_id:int = raw_data.team_id
    feedback:str = raw_data.feedback
    rating:int = raw_data.rating


    record_to_be_added = {'team_id': team_id, 'feedback': feedback, 'rating': rating}
    new_feedbacks = models.Feedbacks(**record_to_be_added)
    db.add(new_feedbacks)
    db.commit()
    db.refresh(new_feedbacks)
    feedback_add_records = new_feedbacks.to_dict()

    res = {
        'feedback_add_records': feedback_add_records,
    }
    return res

async def post_participants_assign_team_id(db: Session, raw_data: schemas.PostParticipantsAssignTeamId):
    user_id:int = raw_data.user_id
    team_id:int = raw_data.team_id
    limit:int = raw_data.limit

    res = {
    }
    return res

async def post_record_timer(db: Session, raw_data: schemas.PostRecordTimer):
    user_id:int = raw_data.user_id
    challenge_id:int = raw_data.challenge_id
    team_id:int = raw_data.team_id
    start_time:str = raw_data.start_time
    end_time:str = raw_data.end_time


    is_timer_started = db.query(models.Timer).filter(models.Timer.team_id == team_id).count() > 0

    import fastapi

    try:
        if is_timer_started:
            raise fastapi.HTTPException(status_code=409, detail="Your team has started the challenge!")
    except Exception as e:
        raise HTTPException(500, str(e))



    
    from datetime import datetime

    try:
        current_datetime:datetime = datetime.now()
    except Exception as e:
        raise HTTPException(500, str(e))



    record_to_be_added = {'user_id': user_id, 'team_id': team_id, 'challenge_id': challenge_id, 'start_time': start_time, 'end_time': end_time, 'created_at': current_datetime}
    new_timer = models.Timer(**record_to_be_added)
    db.add(new_timer)
    db.commit()
    db.refresh(new_timer)
    timer_value = new_timer.to_dict()

    res = {
        'data': timer_value,
    }
    return res

async def patch_leaderboard_update_team(db: Session, raw_data: schemas.PatchLeaderboardUpdateTeam):
    team_id:int = raw_data.team_id
    team_name:str = raw_data.team_name
    challenge_id:int = raw_data.challenge_id
    challenge_name:str = raw_data.challenge_name
    start_time:str = raw_data.start_time
    judge_score:int = raw_data.judge_score
    penalty:int = raw_data.penalty


    team_record = db.query(models.Leaderboard).filter(models.Leaderboard.team_id == team_id).count() > 0

    

    try:
        if team_record:
            raise Exception("Team has already started the challenge")
    except Exception as e:
        raise HTTPException(500, str(e))



    
    from datetime import datetime

    try:
        current_datetime:datetime = datetime.now()
    except Exception as e:
        raise HTTPException(500, str(e))



    record_to_be_added = {'team_id': team_id, 'team_name': team_name, 'challenge_id': challenge_id, 'challenge_name': challenge_name, 'start_time': start_time, 'created_at': current_datetime, 'penalty': penalty, 'judge_score': judge_score}
    new_leaderboard = models.Leaderboard(**record_to_be_added)
    db.add(new_leaderboard)
    db.commit()
    db.refresh(new_leaderboard)
    leaderboard_response = new_leaderboard.to_dict()

    res = {
        'data': leaderboard_response,
    }
    return res

async def put_update_submission(db: Session, raw_data: schemas.PutUpdateSubmission):
    team_id:int = raw_data.team_id
    submission_id:int = raw_data.submission_id
    end_time:str = raw_data.end_time
    status:str = raw_data.status



    query = db.query(models.Leaderboard)
    query = query.filter(
        
        and_(
            models.Leaderboard.team_id == team_id
        )
    )


    leaderboard_record = query.all()
    leaderboard_record = [new_data.to_dict for new_data in leaderboard_record] if leaderboard_record else leaderboard_record


    updated_submission_record = db.query(models.Leaderboard).filter(models.Leaderboard.team_id == team_id).first()
    for key, value in {'submission_id': submission_id, 'end_time': end_time, 'status': status}.items():
          setattr(updated_submission_record, key, value)
    db.commit()
    db.refresh(updated_submission_record)
    updated_submission_record = updated_submission_record.to_dict() 

    res = {
        'data': updated_submission_record,
    }
    return res

async def get_leaderboard(db: Session):

    leaderboard_data = db.query(models.Leaderboard).all()
    leaderboard_data = [new_data.to_dict() for new_data in leaderboard_data] if leaderboard_data else leaderboard_data


    

    try:
        for team in leaderboard_data:
            team["final_score"] = team["judge_score"] + team["penalty"]
            
        sorted_data = sorted(leaderboard_data, key=lambda x: -(x["final_score"]))
    except Exception as e:
        raise HTTPException(500, str(e))


    res = {
        'data': sorted_data,
    }
    return res

async def get_timer_team_id(db: Session, team_id: int):

    timer = db.query(models.Timer).filter(models.Timer.team_id == team_id).first() 
    timer = timer.to_dict() if timer else timer

    res = {
        'data': timer,
    }
    return res

async def get_leaderboard_team_id(db: Session, team_id: int):

    team_leaderboard = db.query(models.Leaderboard).filter(models.Leaderboard.team_id == team_id).first() 
    team_leaderboard = team_leaderboard.to_dict() if team_leaderboard else team_leaderboard

    res = {
        'data': team_leaderboard,
    }
    return res

async def get_participant_email(db: Session, email: str):

    participant = db.query(models.Participants).filter(models.Participants.email == email).first() 
    participant = participant.to_dict() if participant else participant

    res = {
        'data': participant,
    }
    return res

async def put_leaderboard_submission(db: Session, raw_data: schemas.PutLeaderboardSubmission):
    team_id:int = raw_data.team_id
    submission_id:int = raw_data.submission_id
    status:str = raw_data.status
    end_time:str = raw_data.end_time


    updated_record = db.query(models.Leaderboard).filter(models.Leaderboard.team_id == team_id).first()
    for key, value in {'submission_id': submission_id, 'end_time': end_time, 'status': status}.items():
          setattr(updated_record, key, value)
    db.commit()
    db.refresh(updated_record)
    updated_record = updated_record.to_dict() 

    res = {
        'data': updated_record,
    }
    return res

async def get_submission_team_id(db: Session, team_id: int):

    submission_info = db.query(models.Submissions).filter(models.Submissions.team_id == team_id).first() 
    submission_info = submission_info.to_dict() if submission_info else submission_info

    res = {
        'data': submission_info,
    }
    return res

