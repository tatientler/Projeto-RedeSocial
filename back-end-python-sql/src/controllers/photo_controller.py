''' Controller para o módulo de fotos '''
from flask import request, jsonify
from app_module import create_app, db
from models.photo_db import Photo, Photo_Schema
from datetime import datetime
from flask_expects_json import expects_json
import os
from dotenv import load_dotenv

import cloudinary
import cloudinary.uploader
import cloudinary.api

load_dotenv()

config = cloudinary.config (
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET"),
    secure = "true"
)

app = create_app()
#app.app_context().push()

photo_schema = Photo_Schema(many = False)
photos_schema = Photo_Schema(many = True)

def index():
    ''' Lista fotos '''
    photos = Photo.query.order_by(Photo.created_date).all()
    return jsonify(photos_schema.dump(photos)), 200

def add():
    ''' Adiciona foto '''
    if request.files:
        print(request.files)
        file = request.files['uploadedFile']
        photo_cloudinary = cloudinary.uploader.upload(file, unique_filename = False, overwrite=True)
        print(photo_cloudinary['public_id']) # id
        print(photo_cloudinary['url']) # url

        photo = Photo(photo_url = photo_cloudinary['url'], photo_id = photo_cloudinary['public_id']  , created_date = datetime.now())
        db.session.add(photo)
        db.session.commit()

    return jsonify(photo_cloudinary['url']), 201

def read(id):
    ''' Abre uma foto '''
    photo = Photo.query.filter_by(id = id).first()
    return photo_schema.jsonify(photo), 200

def update(id):
    if request.files:
        photo = Photo.query.filter_by(id = id).first()
        photo_id = photo.photo_id
        cloudinary.uploader.destroy(photo_id)

        file = request.files['uploadedFile']

        photo_cloudinary = cloudinary.uploader.upload(file, unique_filename = False, overwrite=True)
        photo.photo_url = photo_cloudinary['url']
        photo.photo_id = photo_cloudinary['public_id']
        
        db.session.commit()

        return jsonify({}), 200

def delete(id):
    ''' Deleta uma foto '''
    photo = Photo.query.filter_by(id = id).first()
    photo_id = photo.photo_id
    cloudinary.uploader.destroy(photo_id)

    db.session.delete(photo)
    db.session.commit()

    return jsonify({'mensagem': 'Deletado com sucesso!'}), 204
