from .base import *
load_dotenv(BASE_DIR / ".env.development")


SECRET_KEY = os.environ.get('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(os.environ.get("DEBUG", "TRUE"))
ALLOWED_HOSTS = os.environ.get(
    "ALLOWED_HOSTS",
    "127.0.0.1,localhost"
).split(",")


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

CSRF_TRUSTED_ORIGINS=os.environ.get("CSRF_TRUSTED_ORIGINS", "http://localhost:8000,http://localhost:3000,http://127.0.0.1,https://localhost").split(',')

CORS_ALLOWED_ORIGINS = [ 
    "https://bookreservations.netlify.app",
    "http://localhost:3000"
    ]
# Local media for development
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'