FROM python

RUN pip3 install flask && \
    pip3 install flasgger && \
    mkdir flask_dev

WORKDIR flask_dev

COPY ./server.py .
EXPOSE 5001
CMD [ "python3", "server.py" ]



