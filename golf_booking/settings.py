"""
Django settings for django_react project.

Generated by 'django-admin startproject' using Django 2.1.3.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
print('BASE_DIR:', BASE_DIR)


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'jdm5@m&=renq_4m!ag0apvnaj+@xkjk*kcouq93i(pq)p9p8$9'

# SECURITY WARNING: don't run with debug turned on in production!
from socket import gethostname, gethostbyname
try:
    HOSTNAME = gethostname()
    HOSTBYNAME = gethostbyname(HOSTNAME)
except:
    HOSTNAME = HOSTBYNAME = 'localhost'


# SECURITY WARNING: don't run with debug turned on in production!
IS_SERVER = HOSTNAME.startswith('ip-')
# DEBUG = not IS_SERVER
DEBUG = True

ALLOWED_HOSTS = [
    '127.0.0.1', 'localhost', HOSTNAME, HOSTBYNAME,
    '.ad1shot.com', '.amazonaws.com'
]

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'webpack_loader',
    'server'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'golf_booking.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'golf_booking.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'golf',
        'USER': 'ad1shot',
        'PASSWORD': 'jejuc9305',
        'HOST': 'ad1shot.cluster-cwrgcas4fyns.ap-northeast-2.rds.amazonaws.com',
        'PORT': '3306'
    },
    'OPTIONS': {
        'AUTOCOMMIT': True,
        'init_command': 'SET storage_engine=InnoDB',
        'CHARSET': 'utf8',
        'USE_UNICODE': True
    },

    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': os.path.join(BASE_DIR, 'golf.sqlite3'),
    # },
}

# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/
LANGUAGE_CODE = 'ko-kr'
TIME_ZONE = 'Asia/Seoul'

USE_I18N = True
USE_L10N = True
USE_TZ = False  # README: False = set local timezone not UTC



# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/
STATIC_URL = '/assets/'
CLIENT_DIR = os.path.join(BASE_DIR, 'client')
SERVER_DIR = os.path.join(BASE_DIR, 'server')


STATICFILES_DIRS = (
    os.path.join(CLIENT_DIR, 'dist'),
    os.path.join(CLIENT_DIR, 'src/assets'),
)
print('STATICFILES_DIRS:', STATICFILES_DIRS)

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(CLIENT_DIR, 'webpack-stats.json'),
    }
}


# https://docs.djangoproject.com/en/2.1/howto/initial-data/
FIXTURE_DIRS = [
    os.path.join(SERVER_DIR, 'models', 'fixture')
]

# https://www.django-rest-framework.org/#example
# REST_FRAMEWORK = {
#     'DEFAULT_PERMISSION_CLASSES': [
#         'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
#     ]
# }