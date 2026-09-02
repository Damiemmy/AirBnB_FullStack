FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

COPY ./requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 8000

CMD ["gunicorn", "Airbnb.wsgi:application", "--bind", "0.0.0.0:8000"]