''' Bibliotecas para conexão ao banco de dados e conversão de entidade para dict/json '''

from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
ma = Marshmallow()
