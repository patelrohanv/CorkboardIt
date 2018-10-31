FROM python

RUN apt-get update 

RUN pip3 install flask && \
    pip3 install flasgger && \
    pip3 install psycopg2

RUN apt-get install postgresql postgresql-client -y && \
    mkdir flask_dev

WORKDIR flask_dev

COPY ./server.py .
COPY ./wait_for.sh .

RUN chmod +x wait_for.sh

EXPOSE 5001




