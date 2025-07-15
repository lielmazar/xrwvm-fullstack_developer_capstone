#!/bin/sh
set -e

# Make migrations and migrate the database.
echo "Making migrations and migrating the database. "
python manage.py makemigrations djangoapp --verbosity 2 --noinput
python manage.py migrate --noinput
python manage.py collectstatic --noinput
exec "$@"