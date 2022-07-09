''' Restful api com flask '''

from app_module import create_app
from routes.photo_bp import photo_bp

app = create_app()

app.register_blueprint(photo_bp, url_prefix = '/photos')


if __name__ == '__main__':
    app.debug = True
    app.run()
