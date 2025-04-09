from pydantic import BaseModel

import datetime

import uuid

from typing import Any, Dict, List, Tuple

class Users(BaseModel):
    id: int
    name: str
    phone_number: str
    password: str


class ReadUsers(BaseModel):
    id: int
    name: str
    phone_number: str
    password: str
    class Config:
        from_attributes = True


class ParkingLot(BaseModel):
    id: int
    created_at: datetime.time
    location: str
    capacity: int
    availableParkingSlots: int


class ReadParkingLot(BaseModel):
    id: int
    created_at: datetime.time
    location: str
    capacity: int
    availableParkingSlots: int
    class Config:
        from_attributes = True


class Vehicles(BaseModel):
    id: int
    created_at: datetime.time
    registration_id: str
    model_type: str
    color: str
    userId: int


class ReadVehicles(BaseModel):
    id: int
    created_at: datetime.time
    registration_id: str
    model_type: str
    color: str
    userId: int
    class Config:
        from_attributes = True


class Parkingslots(BaseModel):
    id: int
    created_at: datetime.time
    type: str
    clockin_time: datetime.time
    clockout_time: datetime.time
    parkinglot_id: int
    available: bool
    userId: int


class ReadParkingslots(BaseModel):
    id: int
    created_at: datetime.time
    type: str
    clockin_time: datetime.time
    clockout_time: datetime.time
    parkinglot_id: int
    available: bool
    userId: int
    class Config:
        from_attributes = True




class PostUsers(BaseModel):
    name: str
    phone_number: str
    password: str

    class Config:
        from_attributes = True



class PutUsersId(BaseModel):
    id: str
    created_at: str
    name: str
    phone_number: str
    password: str

    class Config:
        from_attributes = True



class PostParkingLot(BaseModel):
    id: str
    created_at: str
    location: str
    capacity: str
    availableParkingSlots: str

    class Config:
        from_attributes = True



class PutParkingLotId(BaseModel):
    id: str
    created_at: str
    location: str
    capacity: str
    availableParkingSlots: str

    class Config:
        from_attributes = True



class PostVehicles(BaseModel):
    registration_id: str
    model_type: str
    color: str
    userId: int

    class Config:
        from_attributes = True



class PutVehiclesId(BaseModel):
    id: str
    created_at: str
    registration_id: str
    model_type: str
    color: str
    userId: str

    class Config:
        from_attributes = True



class PostParkingslots(BaseModel):
    id: str
    created_at: str
    type: str
    clockin_time: str
    clockout_time: str
    parkinglot_id: str
    available: str
    userId: str

    class Config:
        from_attributes = True



class PutParkingslotsId(BaseModel):
    id: str
    created_at: str
    type: str
    clockin_time: str
    clockout_time: str
    parkinglot_id: str
    available: str
    userId: str

    class Config:
        from_attributes = True



class PostUsersSignin(BaseModel):
    phone_number: str
    password: str

    class Config:
        from_attributes = True

