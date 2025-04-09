from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import *
from fastapi import Request, UploadFile, HTTPException
import models, schemas
import boto3

import jwt

import datetime

from pathlib import Path

async def get_bs_form_submission(db: Session, request: Request):
    header_authorization:str = request.headers.get('header-authorization')



    try:
        decoded_token_info = jwt.decode(
            header_authorization,
            'd9aMjogO9QXKXgne585Fjyq5laOiQJm3',
            algorithms=['HS256']
        )
    except jwt.ExpiredSignatureError:
        decoded_token_info = 'Token has expired.'
    except jwt.InvalidTokenError:
        decoded_token_info = 'Invalid token.'


    

    try:
        auth_id = decoded_token_info["data"]["id"]
    except Exception as e:
        raise HTTPException(500, str(e))




    query = db.query(models.BsFormSubmission)
    query = query.filter(
        
        and_(
            models.BsFormSubmission.contact_to == auth_id
        )
    )


    records = query.all()
    records = [new_data.to_dict for new_data in records] if records else records

    res = {
        'records': records,
    }
    return res

async def post_bs_form_submission(db: Session, raw_data: schemas.PostBsFormSubmission):
    full_name:str = raw_data.full_name
    email:str = raw_data.email
    title:str = raw_data.title
    message:str = raw_data.message
    mobile_number:str = raw_data.mobile_number
    additional_info:str = raw_data.additional_info
    api_secret_key:str = raw_data.api_secret_key
    uploaded_attachment_url:str = raw_data.uploaded_attachment_url


    user_info = db.query(models.BsUser).filter(models.BsUser.secret_key == api_secret_key).first() 
    user_info = user_info.to_dict() if user_info else user_info


    import time
    import random
    from datetime import datetime
    from fastapi import HTTPException

    try:
        timestamp = int(time.time() * 1000)  # Get current timestamp in milliseconds
        random_number = random.randint(1, 1000)  # Generate a 4-digit random number
        unique_digit = f"{timestamp}{random_number}"  # Concatenate both
        unique_id =  int(unique_digit)
        
        current_timestamp:datetime = datetime.now()
        
        
        
        if not user_info:
            raise HTTPException(status_code=400, detail="You entered invalid credentials.")  # Raises HTTP 400 Bad Request
    except Exception as e:
        raise HTTPException(500, str(e))



    import time
    import random

    try:
        source_type = "web_lead"
        
        
        timestamp = int(time.time() * 1000)  # Get current timestamp in milliseconds
        random_number = random.randint(1, 6000)  # Generate a 4-digit random number
        unique_digit = f"{timestamp}{random_number}"  # Concatenate both
        form_id =  int(unique_digit)
        
        def string_to_int(s: str) -> int:
            # Handle empty string case
            if not s:
                return 0
        
            is_negative = False
            result = 0
            start_index = 0
        
            # Check for negative sign
            if s[0] == '-':
                is_negative = True
                start_index = 1  # Skip the minus sign
        
            for i in range(start_index, len(s)):
                char = s[i]
        
                # Ensure the character is a digit
                if '0' <= char <= '9':
                    digit = ord(char) - ord('0')  # Convert character to integer
                    result = result * 10 + digit  # Shift left and add new digit
                else:
                    raise ValueError(f"Invalid character '{char}' in input string")
        
            # Apply the negative sign if needed
            return -result if is_negative else result
        
        mobile_number_int = int(string_to_int(mobile_number))
        default_status = "pending"
    except Exception as e:
        raise HTTPException(500, str(e))



    record_to_be_added = {'id': form_id, 'title': title, 'message': message, 'email': email, 'mobile_number': mobile_number_int, 'additional_info': additional_info, 'created_at': current_timestamp, 'attachment_url': uploaded_attachment_url, 'contact_to': user_info['id'], 'source_type': source_type, 'full_name': full_name, 'updated_at': current_timestamp, 'status': default_status}
    new_bs_form_submission = models.BsFormSubmission(**record_to_be_added)
    db.add(new_bs_form_submission)
    db.commit()
    db.refresh(new_bs_form_submission)
    bs_form_submission_inserted_record = new_bs_form_submission.to_dict()

    res = {
        'bs_form_submission_inserted_record': bs_form_submission_inserted_record,
    }
    return res

async def put_bs_form_submission_id(db: Session, raw_data: schemas.PutBsFormSubmissionId):
    id:str = raw_data.id
    title:str = raw_data.title
    message:str = raw_data.message
    email:str = raw_data.email
    mobile_number:str = raw_data.mobile_number
    additional_info:str = raw_data.additional_info
    created_at:str = raw_data.created_at
    attachment_url:str = raw_data.attachment_url
    contact_to:str = raw_data.contact_to


    bs_form_submission_edited_record = db.query(models.BsFormSubmission).filter(models.BsFormSubmission.id == id).first()
    for key, value in {'id': id, 'title': title, 'message': message, 'email': email, 'mobile_number': mobile_number, 'additional_info': additional_info, 'created_at': created_at, 'attachment_url': attachment_url, 'contact_to': contact_to}.items():
          setattr(bs_form_submission_edited_record, key, value)
    db.commit()
    db.refresh(bs_form_submission_edited_record)
    bs_form_submission_edited_record = bs_form_submission_edited_record.to_dict() 

    res = {
        'bs_form_submission_edited_record': bs_form_submission_edited_record,
    }
    return res

async def delete_bs_form_submission_id(db: Session, id: int):

    bs_form_submission_deleted = None
    record_to_delete = db.query(models.BsFormSubmission).filter(models.BsFormSubmission.id == id).first()

    if record_to_delete:
        db.delete(record_to_delete)
        db.commit()
        bs_form_submission_deleted = record_to_delete.to_dict() 

    res = {
        'bs_form_submission_deleted': bs_form_submission_deleted,
    }
    return res

async def post_login(db: Session, raw_data: schemas.PostLogin):
    email:str = raw_data.email
    password:str = raw_data.password


    

    try:
        def custom_hash(text:str):
            hash_value = 0
            prime_number = 31  # A small prime number for better distribution
        
            for char in text:
                hash_value = (hash_value * prime_number + ord(char)) % (2**32)  # Keep it within a 32-bit range
        
            return hex(hash_value)  # Convert to hexadecimal for better readability
        
        hashed_password = str(custom_hash(password + email));
    except Exception as e:
        raise HTTPException(500, str(e))



    user_info = db.query(models.BsUser).filter(models.BsUser.password == hashed_password).first() 
    user_info = user_info.to_dict() if user_info else user_info


    
    from fastapi import HTTPException

    try:
        if not user_info:
            raise HTTPException(status_code=400, detail="You entered invalid credentials.")  # Raises HTTP 400 Bad Request
    except Exception as e:
        raise HTTPException(500, str(e))




    bs_jwt_payload = {
        'exp': int((datetime.datetime.utcnow() + datetime.timedelta(seconds=6400000)).timestamp()),
        'data': user_info
    }

    decoded_token_info = jwt.encode(bs_jwt_payload, 'd9aMjogO9QXKXgne585Fjyq5laOiQJm3', algorithm='HS256')

    res = {
        'login_token': decoded_token_info,
    }
    return res

async def post_sign_up(db: Session, raw_data: schemas.PostSignUp):
    email:str = raw_data.email
    password:str = raw_data.password
    full_name:str = raw_data.full_name


    import time
    import random

    try:
        def custom_hash(text:str):
            hash_value = 0
            prime_number = 31  # A small prime number for better distribution
        
            for char in text:
                hash_value = (hash_value * prime_number + ord(char)) % (2**32)  # Keep it within a 32-bit range
        
            return hex(hash_value)  # Convert to hexadecimal for better readability
        
        hashed_password:str = custom_hash(password + email);
        
        
        timestamp = int(time.time() * 1000)  # Get current timestamp in milliseconds
        random_number = random.randint(1, 6000)  # Generate a 4-digit random number
        unique_digit = f"{timestamp}{random_number}"  # Concatenate both
        user_id =  int(unique_digit)
    except Exception as e:
        raise HTTPException(500, str(e))



    record_to_be_added = {'full_name': full_name, 'email': email, 'password': hashed_password, 'id': user_id}
    new_bs_user = models.BsUser(**record_to_be_added)
    db.add(new_bs_user)
    db.commit()
    db.refresh(new_bs_user)
    user_info = new_bs_user.to_dict()

    res = {
        'user_info': user_info,
    }
    return res

async def post_upload_attachment(db: Session, attachment: UploadFile, api_secret_key: str):

    user_info = db.query(models.BsUser).filter(models.BsUser.secret_key == api_secret_key).first() 
    user_info = user_info.to_dict() if user_info else user_info


    import time
    import random
    from fastapi import HTTPException
    from datetime import datetime

    try:
        if not user_info:
            raise HTTPException(status_code=400, detail="You entered invalid credentials.")  # Raises HTTP 400 Bad Request
        
        
        
        timestamp = int(time.time() * 1000)  # Get current timestamp in milliseconds
        random_number = random.randint(1, 6000)  # Generate a 4-digit random number
        unique_digit = f"{timestamp}{random_number}"  # Concatenate both
        attachment_id =  int(unique_digit)
        
        
        current_timestamp:datetime = datetime.now()
    except Exception as e:
        raise HTTPException(500, str(e))



    bucket_name = "backstract-testing"
    region_name = "ap-south-1"
    file_path = "resources"

    s3_client = boto3.client(
    #    configure your aws credentials here
    )

    # Read file content
    file_content = await attachment.read()

    name = attachment.filename
    file_path = file_path  + '/' + name

    import mimetypes
    attachment.file.seek(0)
    s3_client.upload_fileobj(
        attachment.file,
        bucket_name,
        name,
        ExtraArgs={"ContentType": mimetypes.guess_type(name)[0]}

    )

    file_type = Path(attachment.filename).suffix
    file_size = 200

    file_url = f"https://{bucket_name}.s3.amazonaws.com/{name}"

    uploaded_attachment_url = file_url

    record_to_be_added = {'id': attachment_id, 'attachment_url': uploaded_attachment_url, 'bs_user_id': user_info['id'], 'created_at': current_timestamp}
    new_uploaded_attachment = models.UploadedAttachment(**record_to_be_added)
    db.add(new_uploaded_attachment)
    db.commit()
    db.refresh(new_uploaded_attachment)
    inserted_attachment_info = new_uploaded_attachment.to_dict()

    res = {
        'attachment_url': uploaded_attachment_url,
    }
    return res

async def post_bs_form_submission_api_secret_key(db: Session, request: Request):
    header_authorization:str = request.headers.get('header-authorization')



    try:
        decoded_token_info = jwt.decode(
            header_authorization,
            'd9aMjogO9QXKXgne585Fjyq5laOiQJm3',
            algorithms=['HS256']
        )
    except jwt.ExpiredSignatureError:
        decoded_token_info = 'Token has expired.'
    except jwt.InvalidTokenError:
        decoded_token_info = 'Invalid token.'


    import time
    import random

    try:
        user_id:int = decoded_token_info["data"]["id"]
        
        def custom_hash(text:str):
            hash_value = 0
            prime_number = 31  # A small prime number for better distribution
        
            for char in text:
                hash_value = (hash_value * prime_number + ord(char)) % (2**32)  # Keep it within a 32-bit range
        
            return hex(hash_value)  # Convert to hexadecimal for better readability
        
        timestamp = int(time.time() * 1000)  # Get current timestamp in milliseconds
        random_number = random.randint(1, 6000)  # Generate a 4-digit random number
        unique_digit = f"{timestamp}{random_number}"  # Concatenate both
        
        secret_key_hash:str = str(unique_digit) + custom_hash(str(user_id));
    except Exception as e:
        raise HTTPException(500, str(e))



    user_info = db.query(models.BsUser).filter(models.BsUser.id == user_id).first()
    for key, value in {'secret_key': secret_key_hash}.items():
          setattr(user_info, key, value)
    db.commit()
    db.refresh(user_info)
    user_info = user_info.to_dict() 

    res = {
        'user_info': user_info,
    }
    return res

