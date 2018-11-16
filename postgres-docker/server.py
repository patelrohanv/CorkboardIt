from flask import Flask, request, jsonify, redirect, g
import json
from flasgger import Swagger
import psycopg2
from psycopg2 import sql
from flask_cors import CORS

app = Flask(__name__)                  #  Create a Flask WSGI application
Swagger(app)
CORS(app)

connection = "host='postgresdb' dbname='postgres' user='postgres' password='secret'"
conn = psycopg2.connect(connection)
cur = conn.cursor()

"""

LOGIN

"""
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
        content = request.get_json()
        print('CONTENT:', content, file=sys.stderr)
        user_id = content['user_id']
        password = content['pin']
        print(user_id, file=sys.stderr)
        print(password, file=sys.stderr)
        cur.execute("""SELECT first_name, last_name, email, pin
        FROM CorkBoardItUser
        WHERE CorkBoardItUser.user_id=%(lname)s""", {"lname": user_id})
        rows = cur.fetchall()
        print(rows, file=sys.stderr)

        password = Decimal(password)
        if len(rows) == 0 or password != rows[0][3]:
            return jsonify(user = None), 404
        else:
            user_dict = {
                'first_name': rows[0][0],
                'last_name': rows[0][1],
                'email': rows[0][2]
            }

            return jsonify(user_dict)

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
    user_email = request.args.get('email')
    user_id = request.args.get('id')

    if user_email is not None:
        cur.execute("""SELECT first_name, last_name, user_id, email
        FROM CorkBoardItUser
        WHERE CorkBoardItUser.email=%(lname)s;""", {"lname": user_email})
    else:
        cur.execute("""SELECT first_name, last_name, user_id, email
        FROM CorkBoardItUser
        WHERE CorkBoardItUser.user_id=%(lname)s;""", {"lname": user_id})
    rows = cur.fetchall()

    if len(rows) == 0:
        return jsonify(user = None), 404
    else:
        user_dict = {
            'id': rows[0][2],
            'first_name': rows[0][0],
            'last_name': rows[0][1],
            'email': rows[0][3]
        }

        return jsonify(user_dict)

#########################################################################################################
#########################################################################################################
#########################################################################################################
"""

HOME SCREEN

"""
"""
OWNED CORKBOARD(S)
"""
@app.route('/homescreen_owned/<user_id>')
def owned_corkboards(user_id):
    """
    ---
    tags:
      - Homescreen
    parameters:
      - name: user_id
        in: path
    """
    user_id = user_id

    cur.execute("""SELECT board.corkboard_id, board.title, board.visibility, pins_count.pins_count
    FROM (SELECT owned_corkboard.corkboard_id, COUNT(pin.fk_corkboard_id) as pins_count
    FROM (SELECT board.title, board.visibility, board.corkboard_id
    FROM CorkBoard board
    WHERE board.fk_user_id= %(user)s) owned_corkboard
    LEFT OUTER JOIN PushPin pin
    ON pin.fk_corkboard_id = owned_corkboard.corkboard_id
    GROUP BY owned_corkboard.corkboard_id) pins_count
    INNER JOIN CorkBoard board
    ON board.corkboard_id=pins_count.corkboard_id
    ORDER BY board.title ASC;""", {"user": user_id})

    headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    data = []
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    if len(rows) == 0:
        return jsonify(data = None), 404
    else:
        return jsonify(data)
"""
RECENT CORKBOARD UPDATES
"""
@app.route('/homescreen_recent/<user_id>')
def recent_updates(user_id):
    """
    ---
    tags:
      - Homescreen
    parameters:
      - name: user_id
        in: path
    """
    user_id = user_id

    cur.execute("""
    SELECT ckbd.corkboard_id, ckbd.title, ckbd.date_time, ckbd.visibility, CorkBoardItUser.first_name, CorkBoardItUser.last_name
    FROM (
    SELECT fcorkboard.corkboard_id, fcorkboard.title, fcorkboard.date_time, fcorkboard.visibility, fcorkboard.fk_user_id
    FROM (SELECT Follow.fk_user_follower_id
    FROM Follow
    WHERE Follow.fk_user_followee_id = %(user)s) fid
    INNER JOIN CorkBoard fcorkboard
    ON fcorkboard.fk_user_id = fid.fk_user_follower_id
    UNION
    SELECT wcorkboard.corkboard_id, wcorkboard.title, wcorkboard.date_time, wcorkboard.visibility, wcorkboard.fk_user_id
    FROM (SELECT w.fk_public_corkboard_id
    FROM Watch w
    WHERE w.fk_user_id = %(user)s) wid
    INNER JOIN CorkBoard wcorkboard
    ON wcorkboard.corkboard_id = wid.fk_public_corkboard_id
    UNION
    SELECT CorkBoard.corkboard_id, CorkBoard.title, CorkBoard.date_time, CorkBoard.visibility, CorkBoard.fk_user_id
    FROM CorkBoard
    WHERE CorkBoard.fk_user_id = %(user)s
    ORDER BY date_time DESC
    LIMIT 4) ckbd
    INNER JOIN CorkBoardItUser
    ON CorkBoardItUser.user_id = ckbd.fk_user_id;""", {"user": user_id})

    headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    data = []
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    if len(rows) == 0:
        return jsonify(data = None), 404
    else:
        return jsonify(data)

#########################################################################################################
#########################################################################################################
#########################################################################################################
"""
VIEW CORKBOARD
"""
@app.route('/viewcorkboard/<corkboard_id>')
def view_corkboard(corkboard_id):
    data = []

    cur.execute("""SELECT first_name, last_name
    FROM CorkBoard AS cb
    INNER JOIN CorkBoardItUser AS u
    ON u.user_id = cb.fk_user_id
    WHERE cb.corkboard_id = %(corkboard_id)s""", {'corkboard_id':corkboard_id})

    headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    cur.execute("""SELECT title, category, date_time, cb.email, COUNT(w.fk_user_id)
    FROM CorkBoard AS cb
    LEFT OUTER JOIN PublicCorkBoard AS public
    ON cb.corkboard_id = public.fk_corkboard_id
    LEFT OUTER  JOIN Watch AS w
    ON public.public_corkboard_id = w.fk_public_corkboard_id
    WHERE cb.corkboard_id = %(corkboard_id)s
    GROUP BY title, cb.category,  cb.date_time, cb.email
    """, {'corkboard_id':corkboard_id})

    headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    cur.execute("""SELECT url
    FROM Pushpin AS p
    INNER JOIN CorkBoard AS cb
    ON p.fk_corkboard_id = cb.corkboard_id
    WHERE p.fk_corkboard_id = %(corkboard_id)s
    """, {'corkboard_id':corkboard_id})

    headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    cur.execute("""SELECT u.user_id
    FROM CorkBoardItUser AS u
    INNER JOIN Corkboard AS cb
    ON u.user_id = cb.fk_user_id
    INNER JOIN PublicCorkBoard AS public
    ON cb.corkboard_id = public.fk_corkboard_id
    WHERE cb.corkboard_id = %(corkboard_id)s
    """, {'corkboard_id':corkboard_id})

    headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    return jsonify(data)

"""
FOLLOW CORKBOARD
"""
@app.route('/followcorkboard/<corkboard_id>', methods=['POST'])
def follow_corkboard(corkboard_id):
    cur.execute("""INSERT INTO Follow (fk_user_follower_id, fk_user_followee_id)
    VALUES ( $UserID,
    ( SELECT user_id
    FROM CorkBoardItUser AS u
    INNER JOIN CorkBoard AS cb
    ON u.user_id = cb.fk_user_id
    WHERE cb.corkboard_id = %(corkboard_id)s ))
    """, {'corkboard_id':corkboard_id})

    return 'being built rn'

"""
WATCH CORKBOARD
"""
@app.route('/watchcorkboard/<corkboard_id>', methods=['POST'])
def watch_corkboard(corkboard_id):
    cur.execute("""INSERT INTO Watch(fk_user_id, fk_public_corkboard_id)
    VALUES ($UserID,
    ( SELECT public_corkboard_id
    FROM PublicCorkBoard AS  public
    WHERE public.fk_corkboard_id = %(corkboard_id)s ))
    """, {'corkboard_id':corkboard_id})

    return 'being built rn'
#########################################################################################################
#########################################################################################################
#########################################################################################################
"""
ADD CORKBOARD
"""
@app.route('/addcorkboard', methods=['POST'])
def add_corkboard():
    if request.method == 'POST':
        user_id = request.args.get('user_id')
        email = request.args.get('email')
        date_time = request.args.get('date_time')
        title = request.args.get('title')
        category = request.args.get('category')
        visibility = request.args.get('visibility')
        if visibility == False:
            password = request.args.get('password')

    cur.execute("""INSERT INTO CorkBoard (fk_user_id, email, date_time, title, category, visibility)
    VALUES (%(user_id)s,%(email)s, %(date_time)s, %(title)s, %(category)s, %(visibility)s)
    RETURNING corkboard_id""",
    {"user_id": user_id, "email": email, "date_time": date_time, "title": title, "category": category, "visibility": visibility})

    rows = cur.fetchall()
    corkboard_id = rows[0][0]

    if visibility == True:
        cur.excute("""INSERT INTO PublicCorkBoard (fk_corkboard_id)
        VALUES(%(corkboard_id)s)""", {"corkboard_id": corkboard_id})
    else:
        cur.execute("""INSERT INTO PrivateCorkBoard  (fk_corkboard_id, password)
        VALUES (%(corkboard_id)s, %(password)s)""", {"corkboard_id": corkboard_id, "password": password})

    #return corkboard_id
    return jsonify(corkboard_id)

#########################################################################################################
#########################################################################################################
#########################################################################################################
"""
ADD PUSHPIN
"""
@app.route('/corkboardtitle/<corkboard_id>')
def corkboard_title(corkboard_id):
    cur.execute("""SELECT title
    FROM CorkBoard AS cb
    WHERE cb.corkboard_id = %(corkboard_id)s""", {"corkboard_id": corkboard_id})

    headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    data = []
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    if len(rows) == 0:
        return jsonify(data = None), 404
    else:
        return jsonify(data)

@app.route('/addpushpin', methods=['POST'])
def add_pushpin():
    user_id = request.args.get('user_id')
    corkboard_id = request.args.get('corkboard_id')
    date_time = request.args.get('date_time')
    url = request.args.get('url')
    description = request.args.get('description')

    cur.execute("""INSERT INTO PushPin (fk_user_id, fk_corkboard_id, date_time, url, description)
    VALUES (%(user_id)s, %(corkboard_id)s, %(date_time)s, %(url)s, %(description)s)
    """, {"user_id": user_id, "corkboard_id": corkboard_id, "date_time": date_time, "url": url, "description": description})

    #return corkboard_id
    return jsonify(corkboard_id)

#########################################################################################################
#########################################################################################################
#########################################################################################################
"""
VIEW PUSHPIN
"""
@app.route('/viewpushpin/<corkboard_id>/<pushpin_id>')
def view_pushpin(corkboard_id, pushpin_id):
    data = []
    cur.execute("""SELECT first_name, last_name
    FROM CorkBoard AS cb
    INNER JOIN CorkBoardItUser AS u
    ON u.user_id = cb.fk_user_id
    WHERE cb.corkboard_id = %(corkboard_id)s
    """, {"corkboard_id": corkboard_id})

    headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    cur.execute("""SELECT pp. date_time
    FROM PushPin AS pp
    INNER JOIN CorkBoard AS cb
    ON pp.fk_corkboard_id = cb.corkboard_id
    WHERE cb.corkboard_id = %(corkboard_id)s
    """, {"corkboard_id": corkboard_id})

    headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    cur.execute("""SELECT title
    FROM PushPin AS pp
    INNER JOIN CorkBoard AS cb
    ON cb.corkboard_id = pp.fk_corkboard_id
    WHERE cb.corkboard_id = %(corkboard_id)s
    """, {"corkboard_id": corkboard_id})

    headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    cur.execute("""SELECT url, description
    FROM PushPin as pp
    WHERE pp.pushpin_id = %(pushpin_id)s
    """, {"pushpin_id": pushpin_id})

    headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    cur.execute("""SELECT tag
    FROM Tag AS t
    INNER JOIN PushPin AS pp
    ON pp.pushpin_id = t.fk_pushpin_id
    WHERE t.fk_pushpin_id = %(pushpin_id)s
    """, {"pushpin_id": pushpin_id})

    headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    cur.execute("""SELECT first_name, last_name
    FROM CorkBoardItUser AS u
    INNER JOIN Liked AS ld
    ON ld.fk_user_id = u.user_id
    INNER JOIN PushPin as pp
    ON pp.pushpin_id  = ld.fk_pushpin_id
    WHERE  pp.pushpin_id = %(pushpin_id)s
    """, {"pushpin_id": pushpin_id})

    headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    cur.execute("""SELECT c.fk_user_id, c.text, c.date_time
    FROM Comment AS c
    INNER JOIN CorkBoardItUser AS u
    ON u.user_id = c.fk_user_id
    INNER JOIN PushPin as pp
    ON pp.pushpin_id = c.fk_pushpin_id
    WHERE c.fk_pushpin_id = %(pushpin_id)s
    ORDER BY c.date_time DESC
    """, {"pushpin_id": pushpin_id})

    headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    return jsonify(data)

"""
FOLLOW FOR PUSHPIN
"""
@app.route('/followpushpin/<user_id>', methods = ['POST'])
def follow_pushpin(user_id):
    cur.execute("""INSERT INTO Follow (fk_user_follower_id, fk_user_followee_id)
    VALUES ((SELECT user_id FROM CorkBoardItUser AS u
    WHERE u.user_id = $UserID), (SELECT fk_user_id
    FROM CorkBoard WHERE corkboard.corkboard_id = $CorkBoardID
    AND corkboard.fk_user_id != %(user_id)s))
    """, {"user_id": user_id})
    return 'being built rn'

"""
LIKE FOR PUSHPIN
"""
@app.route('/likepushpin/<user_id>/<corkboard_id>', methods = ['POST'])
def like_pushpin(user_id, corkboard_id):
    cur.execute("""INSERT INTO Liked (fk_user_id, fk_pushpin_id)
    VALUES ((SELECT user_id FROM CorkBoardItUser AS u WHERE u.user_id = %(user_id)s),
    (SELECT fk_user_id FROM CorkBoard WHERE corkboard.corkboard_id = %(corkboard_id)s
    AND corkboard.fk_user_id != %(user_id)s))
    """, {"user_id": user_id, "corkboard_id": corkboard_id})
    return 'being built rn'

"""
UNLIKE FOR PUSHPIN
"""
@app.route('/unlikepushpin/<user_id>/<pushpin_id>', methods = ['POST'])
def unlike_pushpin(user_id, pushpin_id):
    cur.execute("""DELETE FROM Liked
    WHERE Liked.fk_user_id = %(user_id)s
    AND Liked.fk_pushpin_id = %(pushpin_id)s
    """, {"user_id": user_id, "pushpin_id": pushpin_id})
    return 'being built rn'
"""
POST COMMENT FOR PUSHPIN
"""
@app.route('/postcomment', methods = ['POST'])
def post_comment():
    date_time = request.args.get('date_time')
    text = request.args.get('text')
    user_id = request.args.get('user_id')
    pushpin_id = request.args.get('pushpin_id')

    cur.execute("""INSERT INTO Comment (comment_id, date_time, text, fk_user_id, fk_pushpin_id)
    VALUES ($comment_id, $date_time, $text,
    (SELECT user_id FROM CorkBoardItUser AS u WHERE u.user_id = %(user_id)s),
    (SELECT fk_user_id FROM PushPin WHERE pushpin.pushpin_id = %(pushpin_id)s))
    """, {"user_id": user_id, "pushpin_id": pushpin_id})
#########################################################################################################
#########################################################################################################
#########################################################################################################
"""
SEARCH PUSHPIN
"""
@app.route('/searchpushpin/<search_text>)')
def search_pushpin(search_text):
    cur.execute("""SELECT DISTINCT ON (search.description) search.description,
    search.title, search.first_name, search.last_name
    FROM(SELECT PushPin.description, CorkBoard.title, CorkBoard.category,
    CorkBoardItUser.first_name, CorkBoardItUser.last_name, Tag.tag
    FROM CorkBoard INNER JOIN CorkBoardItUser ON CorkBoard.fk_user_id = CorkBoardItUser.user_id
    INNER JOIN PushPin ON CorkBoard.corkboard_id = PushPin.fk_corkboard_id
    FULL OUTER JOIN Tag ON Tag.fk_pushpin_id = PushPin.pushpin_id NATURAL JOIN PublicCorkBoard
    WHERE description LIKE %(search)s OR category
    LIKE %(search)s OR tag LIKE %(search)s)search
    ORDER BY description ASC""", {'search': '%'+search_text+'%'})

    headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    data = []
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    if len(rows) == 0:
        return jsonify(data = None), 404
    else:
        return jsonify(data)

#########################################################################################################
#########################################################################################################
#########################################################################################################
"""
POPULAR TAGS
"""
@app.route('/populartags')
def popular_tags():
    cur.execute("""SELECT Tag.tag, COUNT(Tag.Tag) AS pushpins, COUNT(DISTINCT Corkboard.corkboard_id) as unique_cb
    FROM Tag INNER JOIN PushPin ON Tag.fk_pushpin_id = PushPin.pushpin_id
    INNER JOIN CorkBoard ON CorkBoard.corkboard_id = PushPin.fk_corkboard_id
    GROUP BY tag
    ORDER BY pushpins DESC
    LIMIT 5""")

    headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    data = []
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    if len(rows) == 0:
        return jsonify(data = None), 404
    else:
        return jsonify(data)

#########################################################################################################
#########################################################################################################
#########################################################################################################
"""
POPULAR TAGS
"""
@app.route('/popularsites')
def get_popular_sites():
    cur.execute("""SELECT PushPin.url as site, COUNT(PushPin.url) as pushpins
    FROM PushPin
    GROUP BY site
    ORDER BY pushpins DESC
    LIMIT 4""")

    headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    data = []
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    if len(rows) == 0:
        return jsonify(data = None), 404
    else:
        return jsonify(data)

#########################################################################################################
#########################################################################################################
#########################################################################################################
"""
CORKBOARD STATISTICS
"""
@app.route('/corkboardstats')
def corkboard_stats():
    cur.execute("""SELECT CorkBoardItUser.first_name, CorkBoardItUser.last_name, COUNT(DISTINCT
    PublicCorkBoard.fk_corkboard_id) AS public_cb, COUNT(DISTINCT pub_pin.pushpin_id) AS
    pub_pushpins, COUNT(DISTINCT PrivateCorkBoard.fk_corkboard_id) AS private_cb,
    COUNT(DISTINCT pr_pin.pushpin_id) AS private_pushpins
    FROM CorkBoardItUser FULL OUTER JOIN CorkBoard ON CorkBoardItUser.user_id = CorkBoard.fk_user_id
    FULL OUTER JOIN PublicCorkBoard ON CorkBoard.corkboard_id = PublicCorkBoard.fk_corkboard_id
    LEFT OUTER JOIN Pushpin pub_pin ON PublicCorkBoard.fk_corkboard_id = pub_pin.fk_corkboard_id
    FULL OUTER JOIN PrivateCorkBoard ON CorkBoard.corkboard_id = PrivateCorkBoard.fk_corkboard_id
    LEFT OUTER JOIN Pushpin pr_pin ON PrivateCorkBoard.fk_corkboard_id = pr_pin.fk_corkboard_id
    GROUP BY first_name, last_name""")

    headers = [x[0] for x in cur.description]
    rows = cur.fetchall()
    data = []
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    if len(rows) == 0:
        return jsonify(data = None), 404
    else:
        return jsonify(data)


@app.route('/')
def get_home():
    return redirect('/apidocs')

if __name__ == '__main__':
    app.run(port=5001, threaded=True, host=('0.0.0.0'))              #  Start a development server
