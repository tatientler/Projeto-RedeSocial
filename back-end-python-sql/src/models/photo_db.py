''' Modelo que representa a tabela tbl_photo '''

from app_module import db, ma

class Photo(db.Model):
    __tablename__ = 'tbl_cloudinary'
    id = db.Column(db.Integer, primary_key = True, unique = True)
    photo_url = db.Column(db.String(255), nullable = False, unique = False)
    photo_id = db.Column(db.String(255), nullable = False, unique = False)
    created_date = db.Column(db.DateTime, nullable = True)
    

class Photo_Schema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Photo

'''
CREATE TABLE tbl_cloudinary (
    id SERIAL NOT NULL,
    photo_url VARCHAR(255) UNIQUE NOT NULL,
  	photo_id VARCHAR(255) UNIQUE NOT NULL,
  	created_date TIMESTAMP DEFAULT now() NOT null
);
'''
