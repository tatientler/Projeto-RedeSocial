''' Modelo que representa a tabela tbl_photo '''

from app_module import db, ma

class Photo(db.Model):
    __tablename__ = 'tbl_cloudinary'
    id = db.Column(db.Integer, primary_key = True, unique = True)
    photo_url = db.Column(db.String(256), nullable = False, unique = False)
    photo_id = db.Column(db.String(256), nullable = False, unique = False)
    created_date = db.Column(db.DateTime, nullable = True)
    

class Photo_Schema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Photo

'''
CREATE TABLE tbl_photo (
    id serial PRIMARY KEY UNIQUE,
    photo varchar(256) NOT null,
    created_date timestamp DEFAULT now() NOT null
);
'''
