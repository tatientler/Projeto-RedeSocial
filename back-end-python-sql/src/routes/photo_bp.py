from flask import Blueprint
from controllers.photo_controller import index, add, read, update, delete

photo_bp = Blueprint('photo_bp', __name__)
photo_bp.route('/', methods=['GET'])(index)
photo_bp.route('/', methods=['POST'])(add)
photo_bp.route('/<int:id>', methods=['GET'])(read)
photo_bp.route('/<int:id>', methods=['PUT'])(update)
photo_bp.route('/<int:id>', methods=['DELETE'])(delete)