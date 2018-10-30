from flask import Flask, request, jsonify, redirect
import json
from flasgger import Swagger
#import psycopg2  #(try and pip install psycopg2)

app = Flask(__name__)                  #  Create a Flask WSGI application
Swagger(app)

conn = None
cur = None
def DBConn():
    global conn
    global curs
    conn = psycopg2.connect('dbname=? user= ? password=?')
    cur = conn.cursor()

@app.route('/login', methods=['POST'])
def get_is_valid():
    """
    ---
    tags:
        - Login Validation
    parameters:
        - name: user_id
          in: body
        - name: password
          in: body

    """
    if request.method == 'POST':
        user_id = request.args.get('user_id')
        password = request.args.get('password')

        return jsonify(is_valid = True)

@app.route('/user/')
def get_user_id():
    """
    ---
    tags:
      - Get User ID
    parameters:
      - name: email
        in: query
    """

    email = request.args.get('email')
    id = 1
    return jsonify(user_id = id)

@app.route('/homescreen/<user_id>')
def get_home_screen(user_id):
    """
    ---
    tags:
      - Homescreen
    parameters:
      - name: user_id
        in: path
    """

    sample_data = {
        'owned': [
            {
                'id': 1,
                'title': 'MyCorkBoard',
                'visibility': False,
                'pins_count': 4
            },
            {
                'id': 2,
                'title': 'Wow So cool CorkBoard',
                'visibility': True,
                'pins_count': 4
            }
        ],
        'recent_update': [
            {
                'id': 1,
                'title': 'MyCorkBoard',
                'visibility': False,
                'pins_count': 4
            },
            {
                'id': 3,
                'title': 'Oh No You Didnt',
                'visibility': False,
                'pins_count': 0
            }
        ]
    }
    return json.dumps(sample_data)

@app.route('/addcorkboard/<user_id>', methods =['POST'])
def add_corkboard(user_id):

@app.route('/viewcorkboard/<corkboard_id>')
def view_corkboard(corkboard_id):

@app.route('/addpushpin/<corkboard_id>', methods =['POST'])
def add_pushpin(corkboard_id):

@app.route('/viewpushpin/<pushpin_id>')
def view_pushpin(pushpin_id):

@app.route('/searchpushpin/<pushpin_id>')
def search_pushpin(pushpin_id):

@app.route('/populartags')
def popular_tags():

@app.route('/popularsites')
def get_home_screen():

@app.route('/corkboardstats')
def corkboard_stats():


@app.route('/')
def get_home():
    return redirect('/apidocs')

if __name__ == '__main__':
    app.run(port=5001, threaded=True, host=('0.0.0.0'))              #  Start a development server
