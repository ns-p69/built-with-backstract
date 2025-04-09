from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import *
from fastapi import Request, UploadFile, HTTPException
import models, schemas
import boto3

import jwt

import datetime

from pathlib import Path

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
    name:str = raw_data.name
    phone_number:str = raw_data.phone_number
    password:str = raw_data.password


    record_to_be_added = {'name': name, 'phone_number': phone_number, 'password': password}
    new_users = models.Users(**record_to_be_added)
    db.add(new_users)
    db.commit()
    db.refresh(new_users)
    user_id = new_users.to_dict()

    res = {
        'user_id': user_id,
    }
    return res

async def put_users_id(db: Session, raw_data: schemas.PutUsersId):
    id:str = raw_data.id
    created_at:str = raw_data.created_at
    name:str = raw_data.name
    phone_number:str = raw_data.phone_number
    password:str = raw_data.password


    users_edited_record = db.query(models.Users).filter(models.Users.id == id).first()
    for key, value in {'id': id, 'created_at': created_at, 'name': name, 'phone_number': phone_number, 'password': password}.items():
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

async def get_parking_lot(db: Session):

    parking_lot_all = db.query(models.ParkingLot).all()
    parking_lot_all = [new_data.to_dict() for new_data in parking_lot_all] if parking_lot_all else parking_lot_all

    res = {
        'parking_lot_all': parking_lot_all,
    }
    return res

async def get_parking_lot_id(db: Session, id: int):

    parking_lot_one = db.query(models.ParkingLot).filter(models.ParkingLot.id == id).first() 
    parking_lot_one = parking_lot_one.to_dict() if parking_lot_one else parking_lot_one

    res = {
        'parking_lot_one': parking_lot_one,
    }
    return res

async def post_parking_lot(db: Session, raw_data: schemas.PostParkingLot):
    id:str = raw_data.id
    created_at:str = raw_data.created_at
    location:str = raw_data.location
    capacity:str = raw_data.capacity
    availableParkingSlots:str = raw_data.availableParkingSlots


    record_to_be_added = {'id': id, 'created_at': created_at, 'location': location, 'capacity': capacity, 'availableParkingSlots': availableParkingSlots}
    new_parking_lot = models.ParkingLot(**record_to_be_added)
    db.add(new_parking_lot)
    db.commit()
    db.refresh(new_parking_lot)
    parking_lot_inserted_record = new_parking_lot.to_dict()

    res = {
        'parking_lot_inserted_record': parking_lot_inserted_record,
    }
    return res

async def put_parking_lot_id(db: Session, raw_data: schemas.PutParkingLotId):
    id:str = raw_data.id
    created_at:str = raw_data.created_at
    location:str = raw_data.location
    capacity:str = raw_data.capacity
    availableParkingSlots:str = raw_data.availableParkingSlots


    parking_lot_edited_record = db.query(models.ParkingLot).filter(models.ParkingLot.id == id).first()
    for key, value in {'id': id, 'created_at': created_at, 'location': location, 'capacity': capacity, 'availableParkingSlots': availableParkingSlots}.items():
          setattr(parking_lot_edited_record, key, value)
    db.commit()
    db.refresh(parking_lot_edited_record)
    parking_lot_edited_record = parking_lot_edited_record.to_dict() 

    res = {
        'parking_lot_edited_record': parking_lot_edited_record,
    }
    return res

async def delete_parking_lot_id(db: Session, id: int):

    parking_lot_deleted = None
    record_to_delete = db.query(models.ParkingLot).filter(models.ParkingLot.id == id).first()

    if record_to_delete:
        db.delete(record_to_delete)
        db.commit()
        parking_lot_deleted = record_to_delete.to_dict() 

    res = {
        'parking_lot_deleted': parking_lot_deleted,
    }
    return res

async def get_vehicles(db: Session):

    vehicles_all = db.query(models.Vehicles).all()
    vehicles_all = [new_data.to_dict() for new_data in vehicles_all] if vehicles_all else vehicles_all

    res = {
        'vehicles_all': vehicles_all,
    }
    return res

async def get_vehicles_id(db: Session, id: int):

    vehicles_one = db.query(models.Vehicles).filter(models.Vehicles.id == id).first() 
    vehicles_one = vehicles_one.to_dict() if vehicles_one else vehicles_one

    res = {
        'vehicles_one': vehicles_one,
    }
    return res

async def post_vehicles(db: Session, raw_data: schemas.PostVehicles):
    registration_id:str = raw_data.registration_id
    model_type:str = raw_data.model_type
    color:str = raw_data.color
    userId:int = raw_data.userId


    record_to_be_added = {'registration_id': registration_id, 'model_type': model_type, 'color': color, 'userId': userId}
    new_vehicles = models.Vehicles(**record_to_be_added)
    db.add(new_vehicles)
    db.commit()
    db.refresh(new_vehicles)
    user_vehicle = new_vehicles.to_dict()

    res = {
        'user_vehicle': user_vehicle,
    }
    return res

async def put_vehicles_id(db: Session, raw_data: schemas.PutVehiclesId):
    id:str = raw_data.id
    created_at:str = raw_data.created_at
    registration_id:str = raw_data.registration_id
    model_type:str = raw_data.model_type
    color:str = raw_data.color
    userId:str = raw_data.userId


    vehicles_edited_record = db.query(models.Vehicles).filter(models.Vehicles.id == id).first()
    for key, value in {'id': id, 'created_at': created_at, 'registration_id': registration_id, 'model_type': model_type, 'color': color, 'userId': userId}.items():
          setattr(vehicles_edited_record, key, value)
    db.commit()
    db.refresh(vehicles_edited_record)
    vehicles_edited_record = vehicles_edited_record.to_dict() 

    res = {
        'vehicles_edited_record': vehicles_edited_record,
    }
    return res

async def delete_vehicles_id(db: Session, id: int):

    vehicles_deleted = None
    record_to_delete = db.query(models.Vehicles).filter(models.Vehicles.id == id).first()

    if record_to_delete:
        db.delete(record_to_delete)
        db.commit()
        vehicles_deleted = record_to_delete.to_dict() 

    res = {
        'vehicles_deleted': vehicles_deleted,
    }
    return res

async def get_parkingslots(db: Session):

    parkingSlots_all = db.query(models.Parkingslots).all()
    parkingSlots_all = [new_data.to_dict() for new_data in parkingSlots_all] if parkingSlots_all else parkingSlots_all

    res = {
        'parkingSlots_all': parkingSlots_all,
    }
    return res

async def get_parkingslots_id(db: Session, id: int):

    parkingSlots_one = db.query(models.Parkingslots).filter(models.Parkingslots.id == id).first() 
    parkingSlots_one = parkingSlots_one.to_dict() if parkingSlots_one else parkingSlots_one

    res = {
        'parkingSlots_one': parkingSlots_one,
    }
    return res

async def post_parkingslots(db: Session, raw_data: schemas.PostParkingslots):
    id:str = raw_data.id
    created_at:str = raw_data.created_at
    type:str = raw_data.type
    clockin_time:str = raw_data.clockin_time
    clockout_time:str = raw_data.clockout_time
    parkinglot_id:str = raw_data.parkinglot_id
    available:str = raw_data.available
    userId:str = raw_data.userId


    record_to_be_added = {'id': id, 'created_at': created_at, 'type': type, 'clockin_time': clockin_time, 'clockout_time': clockout_time, 'parkinglot_id': parkinglot_id, 'available': available, 'userId': userId}
    new_parkingSlots = models.Parkingslots(**record_to_be_added)
    db.add(new_parkingSlots)
    db.commit()
    db.refresh(new_parkingSlots)
    parkingSlots_inserted_record = new_parkingSlots.to_dict()

    res = {
        'parkingSlots_inserted_record': parkingSlots_inserted_record,
    }
    return res

async def put_parkingslots_id(db: Session, raw_data: schemas.PutParkingslotsId):
    id:str = raw_data.id
    created_at:str = raw_data.created_at
    type:str = raw_data.type
    clockin_time:str = raw_data.clockin_time
    clockout_time:str = raw_data.clockout_time
    parkinglot_id:str = raw_data.parkinglot_id
    available:str = raw_data.available
    userId:str = raw_data.userId


    parkingSlots_edited_record = db.query(models.Parkingslots).filter(models.Parkingslots.id == id).first()
    for key, value in {'id': id, 'created_at': created_at, 'type': type, 'clockin_time': clockin_time, 'clockout_time': clockout_time, 'parkinglot_id': parkinglot_id, 'available': available, 'userId': userId}.items():
          setattr(parkingSlots_edited_record, key, value)
    db.commit()
    db.refresh(parkingSlots_edited_record)
    parkingSlots_edited_record = parkingSlots_edited_record.to_dict() 

    res = {
        'parkingSlots_edited_record': parkingSlots_edited_record,
    }
    return res

async def delete_parkingslots_id(db: Session, id: int):

    parkingSlots_deleted = None
    record_to_delete = db.query(models.Parkingslots).filter(models.Parkingslots.id == id).first()

    if record_to_delete:
        db.delete(record_to_delete)
        db.commit()
        parkingSlots_deleted = record_to_delete.to_dict() 

    res = {
        'parkingSlots_deleted': parkingSlots_deleted,
    }
    return res

async def post_users_signin(db: Session, raw_data: schemas.PostUsersSignin):
    phone_number:str = raw_data.phone_number
    password:str = raw_data.password


    user_record = db.query(models.Users).filter(models.Users.phone_number == phone_number).count() > 0


    user: bool = user_record


    

    try:
        if not user_record:
            raise Exception("user not found")
    except Exception as e:
        raise HTTPException(500, str(e))




    query = db.query(models.Users)
    query = query.filter(
        
        and_(
            models.Users.phone_number == phone_number,
            models.Users.password == password
        )
    )


    user_login_record = query.all()
    user_login_record = [new_data.to_dict() for new_data in user_login_record] if user_login_record else user_login_record

    res = {
        'user_login_record': user_login_record,
    }
    return res

