''' Controller para o módulo de fotos '''
from flask import request, jsonify
from app_module import create_app, db
from models.photo_db import Photo, Photo_Schema
from datetime import datetime
from flask_expects_json import expects_json

app = create_app()
#app.app_context().push()


photo_schema = Photo_Schema(many = False)
photos_schema = Photo_Schema(many = True)

schema_default = {
    'photo': {'type': 'string'}
}

def index():
    ''' Lista fotos '''
    photos = Photo.query.order_by(Photo.created_date).all()
    return jsonify(photos_schema.dump(photos)), 200

schema_create = {
    'type': 'object',
    'properties': schema_default
}

@expects_json(schema_create)
def add():
    ''' Adiciona foto '''
    if request.is_json:
        req = request.get_json()

        photo = Photo(photo = req['photo'], created_date = datetime.now())
        db.session.add(photo)
        db.session.commit()

    return jsonify({}), 201

def read(id):
    ''' Abre uma foto '''
    photo = Photo.query.filter_by(id = id).first()
    return photo_schema.jsonify(photo), 200

def delete(id):
    ''' Deleta uma foto '''
    photo = Photo.query.filter_by(id = id).first()

    db.session.delete(photo)
    db.session.commit()

    return jsonify({'mensagem': 'Deletado com sucesso!'}), 204
