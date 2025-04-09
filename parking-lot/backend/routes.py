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

@router.get('/parking_lot/')
async def get_parking_lot(db: Session = Depends(get_db)):
    try:
        return await service.get_parking_lot(db)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/parking_lot/id')
async def get_parking_lot_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.get_parking_lot_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/parking_lot/')
async def post_parking_lot(raw_data: schemas.PostParkingLot, db: Session = Depends(get_db)):
    try:
        return await service.post_parking_lot(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.put('/parking_lot/id/')
async def put_parking_lot_id(raw_data: schemas.PutParkingLotId, db: Session = Depends(get_db)):
    try:
        return await service.put_parking_lot_id(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.delete('/parking_lot/id')
async def delete_parking_lot_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.delete_parking_lot_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/vehicles/')
async def get_vehicles(db: Session = Depends(get_db)):
    try:
        return await service.get_vehicles(db)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/vehicles/id')
async def get_vehicles_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.get_vehicles_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/vehicles/')
async def post_vehicles(raw_data: schemas.PostVehicles, db: Session = Depends(get_db)):
    try:
        return await service.post_vehicles(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.put('/vehicles/id/')
async def put_vehicles_id(raw_data: schemas.PutVehiclesId, db: Session = Depends(get_db)):
    try:
        return await service.put_vehicles_id(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.delete('/vehicles/id')
async def delete_vehicles_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.delete_vehicles_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/parkingslots/')
async def get_parkingslots(db: Session = Depends(get_db)):
    try:
        return await service.get_parkingslots(db)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get('/parkingslots/id')
async def get_parkingslots_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.get_parkingslots_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/parkingslots/')
async def post_parkingslots(raw_data: schemas.PostParkingslots, db: Session = Depends(get_db)):
    try:
        return await service.post_parkingslots(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.put('/parkingslots/id/')
async def put_parkingslots_id(raw_data: schemas.PutParkingslotsId, db: Session = Depends(get_db)):
    try:
        return await service.put_parkingslots_id(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.delete('/parkingslots/id')
async def delete_parkingslots_id(id: int, db: Session = Depends(get_db)):
    try:
        return await service.delete_parkingslots_id(db, id)
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post('/users/signin')
async def post_users_signin(raw_data: schemas.PostUsersSignin, db: Session = Depends(get_db)):
    try:
        return await service.post_users_signin(db, raw_data)
    except Exception as e:
        raise HTTPException(500, str(e))

