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

@router.get('/participants/')
async def get_participants(db: Session = Depends(get_db)):
    try:
        return await service.get_participants(db)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/participants/id')
async def get_participants_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.get_participants_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/participants/')
async def post_participants(raw_data: schemas.PostParticipants, db: Session = Depends(get_db)):
    try:
        return await service.post_participants(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.put('/participants/id/')
async def put_participants_id(raw_data: schemas.PutParticipantsId, db: Session = Depends(get_db)):
    try:
        return await service.put_participants_id(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.delete('/participants/id')
async def delete_participants_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.delete_participants_id(db, id)
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

@router.get('/challenges/')
async def get_challenges(db: Session = Depends(get_db)):
    try:
        return await service.get_challenges(db)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/challenges/id')
async def get_challenges_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.get_challenges_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/challenges/')
async def post_challenges(raw_data: schemas.PostChallenges, db: Session = Depends(get_db)):
    try:
        return await service.post_challenges(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.put('/challenges/id/')
async def put_challenges_id(raw_data: schemas.PutChallengesId, db: Session = Depends(get_db)):
    try:
        return await service.put_challenges_id(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.delete('/challenges/id')
async def delete_challenges_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.delete_challenges_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/submissions/')
async def get_submissions(db: Session = Depends(get_db)):
    try:
        return await service.get_submissions(db)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/submissions/id')
async def get_submissions_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.get_submissions_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/submissions/')
async def post_submissions(raw_data: schemas.PostSubmissions, db: Session = Depends(get_db)):
    try:
        return await service.post_submissions(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.put('/submissions/id/')
async def put_submissions_id(raw_data: schemas.PutSubmissionsId, db: Session = Depends(get_db)):
    try:
        return await service.put_submissions_id(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.delete('/submissions/id')
async def delete_submissions_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.delete_submissions_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/get/teams/email')
async def get_get_teams_email(email: str, db: Session = Depends(get_db)):
    try:
        return await service.get_get_teams_email(db, email)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/participants/team_id')
async def post_participants_team_id(raw_data: schemas.PostParticipantsTeamId, db: Session = Depends(get_db)):
    try:
        return await service.post_participants_team_id(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/feedbacks')
async def post_feedbacks(raw_data: schemas.PostFeedbacks, db: Session = Depends(get_db)):
    try:
        return await service.post_feedbacks(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/participants/assign/team_id')
async def post_participants_assign_team_id(raw_data: schemas.PostParticipantsAssignTeamId, db: Session = Depends(get_db)):
    try:
        return await service.post_participants_assign_team_id(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/record-timer')
async def post_record_timer(raw_data: schemas.PostRecordTimer, db: Session = Depends(get_db)):
    try:
        return await service.post_record_timer(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.patch('/leaderboard/update_team')
async def patch_leaderboard_update_team(raw_data: schemas.PatchLeaderboardUpdateTeam, db: Session = Depends(get_db)):
    try:
        return await service.patch_leaderboard_update_team(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.put('/update-submission')
async def put_update_submission(raw_data: schemas.PutUpdateSubmission, db: Session = Depends(get_db)):
    try:
        return await service.put_update_submission(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/leaderboard')
async def get_leaderboard(db: Session = Depends(get_db)):
    try:
        return await service.get_leaderboard(db)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/timer/team_id')
async def get_timer_team_id(team_id: int, db: Session = Depends(get_db)):
    try:
        return await service.get_timer_team_id(db, team_id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/leaderboard/team_id')
async def get_leaderboard_team_id(team_id: int, db: Session = Depends(get_db)):
    try:
        return await service.get_leaderboard_team_id(db, team_id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/participant/email')
async def get_participant_email(email: str, db: Session = Depends(get_db)):
    try:
        return await service.get_participant_email(db, email)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.put('/leaderboard/submission')
async def put_leaderboard_submission(raw_data: schemas.PutLeaderboardSubmission, db: Session = Depends(get_db)):
    try:
        return await service.put_leaderboard_submission(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/submission/team_id')
async def get_submission_team_id(team_id: int, db: Session = Depends(get_db)):
    try:
        return await service.get_submission_team_id(db, team_id)
    except Exception as e:
        raise HTTPException(500, str(e))

