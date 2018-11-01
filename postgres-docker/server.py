from flask import Flask, request, jsonify, redirect, g
import json
from flasgger import Swagger
import psycopg2
from psycopg2 import sql

app = Flask(__name__)                  #  Create a Flask WSGI application                     
Swagger(app)

connection = "host='postgresdb' dbname='postgres' user='postgres' password='secret'"
conn = psycopg2.connect(connection)
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
    user_email = request.args.get('name')
    
    cur.execute("SELECT user_id FROM CorkBoardItUser WHERE CorkBoardItUser.email=%(lname)s", {"lname": user_email})

    rows = cur.fetchall()

    if len(rows) == 0:
        return jsonify(user_id = None), 404
    else:
        return jsonify(user_id = rows[0][0])

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
    return 'being built rn'


@app.route('/viewcorkboard/<corkboard_id>')
def view_corkboard(corkboard_id):
    return 'being built rn'

@app.route('/addpushpin/<corkboard_id>', methods =['POST'])
def add_pushpin(corkboard_id):
    return 'being built rn'

@app.route('/viewpushpin/<pushpin_id>')
def view_pushpin(pushpin_id):
    return 'being built rn'

@app.route('/searchpushpin/<pushpin_id>')
def search_pushpin(pushpin_id):
    return 'being built rn'

@app.route('/populartags')
def popular_tags():
    data = {
        'pop_tags': [
            {
                'tag': 'face',
                'pushpin': 55,
                'unique_cb': 22
            },
            {
                'tag': 'atlanta',
                'pushpin': 42,
                'unique_cb': 24
            },
            {
                'tag': 'beach',
                'pushpin': 20,
                'unique_cb': 18
            },
            {
                'tag': 'art',
                'pushpin': 14,
                'unique_cb': 2
            }
        ]
    }
    return json.dumps(data)

@app.route('/popularsites')
def get_popular_sites():
        data = {
            'pop_sites': [
                {
                    'site': 'www.gatech.edu',
                    'pushpin': 12
                },
                {
                    'site': 'www.facebook.com',
                    'pushpin': 9
                },
                {
                    'site': 'poolswimmings.com',
                    'pushpin': 3
                },
                {
                    'site': 'www.amazon.com',
                    'pushpin': 2
                }
            ]
        }
        return json.dumps(data)

@app.route('/corkboardstats')
def corkboard_stats():
    data = {
        'cb_stats': [
            {
                'first_name': 'Bing',
                'last_name': 'Lin',
                'public_cb': 9,
                'pub_pushpins': 8,
                'private_cb': 7,
                'private_pushpins': 6
            },
            {
                'first_name': 'David',
                'last_name': 'Tsui',
                'public_cb': 8,
                'pub_pushpins': 7,
                'private_cb': 6,
                'private_pushpins': 5
            },
            {
                'first_name': 'Julie',
                'last_name': 'Machamer',
                'public_cb': 7,
                'pub_pushpins': 6,
                'private_cb': 5,
                'private_pushpins': 4
            },
            {
                'first_name': 'Rohan',
                'last_name': 'Patel',
                'public_cb': 6,
                'pub_pushpins': 5,
                'private_cb': 4,
                'private_pushpins': 3
            }
        ]
    }
    return json.dumps(data)


@app.route('/')
def get_home():
    return redirect('/apidocs')

if __name__ == '__main__':
    app.run(port=5001, threaded=True, host=('0.0.0.0'))              #  Start a development server