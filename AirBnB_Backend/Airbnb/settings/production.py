from .base import * 
import cloudinary
load_dotenv(BASE_DIR / ".env.production")

SECRET_KEY = os.environ.get('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(os.environ.get("DEBUG", "True"))
ALLOWED_HOSTS = os.environ.get(
    "ALLOWED_HOSTS",
    "127.0.0.1 localhost bookreservations.netlify.app",
).split(",")


CSRF_TRUSTED_ORIGINS=os.environ.get("CSRF_TRUSTED_ORIGINS", "http://localhost:8000,http://localhost:3000,http://127.0.0.1,https://localhost").split(',')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('POSTGRES_DB'),
        'USER': os.getenv('POSTGRES_USER'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
        'HOST': os.getenv('POSTGRES_HOST', 'db'),
        'PORT': os.getenv('POSTGRES_PORT', '5432'),
    }
}

cloudinary.config(
    cloud_name=os.environ.get("CLOUD_NAME"),
    api_key=os.environ.get("API_KEY"),
    api_secret=os.environ.get("API_SECRET"),
)

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': os.environ.get("CLOUD_NAME"),
    'API_KEY': os.environ.get("API_KEY"),
    'API_SECRET': os.environ.get("API_SECRET"),
}

CORS_ALLOWED_ORIGINS = os.environ.get("CORS_ALLOWED_ORIGINS", "http://localhost,127.0.0.1").split(",")

'''
# Cloudinary for media
DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"
# MEDIA_URL = f"https://res.cloudinary.com/{os.environ.get('CLOUD_NAME')}/"
MEDIA_URL = None
'''

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
