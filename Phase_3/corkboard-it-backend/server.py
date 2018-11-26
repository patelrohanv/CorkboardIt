from flask import Flask, request, jsonify, redirect, g
import json
from flasgger import Swagger
import psycopg2
from psycopg2 import sql
from flask_cors import CORS
import sys
from decimal import *

app = Flask(__name__)                  #  Create a Flask WSGI application
CORS(app)

connection = "host='postgresdb' dbname='postgres' user='postgres' password='secret'"
conn = psycopg2.connect(connection)



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
    cur = conn.cursor()

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
    cur = conn.cursor()

    if user_email is not None:
        cur.execute("""SELECT first_name, last_name, user_id, email
        FROM CorkBoardItUser
        WHERE CorkBoardItUser.email=%(lname)s;""", {"lname": user_email})
    else:
       for x in range(1,6):
           print("Inside by ID, We're on time %d" % (x), file=sys.stderr)

           cur.execute("""SELECT first_name, last_name, user_id, email
           FROM CorkBoardItUser
           WHERE CorkBoardItUser.user_id=%s""", (user_id, ))
           if cur.description is not None:
               break

    rows = cur.fetchall()

    if len(rows) == 0:
        return jsonify(user = None), 404
    else:
        user_dict = {
            'user_id': rows[0][2],
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
    data = []
    cur = conn.cursor()

    for x in range(1, 6):
        print("Inside Owned Corkboards, We're on time %d" % (x), file=sys.stderr)

        try:
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

            rows = cur.fetchall()

            if len(rows) == 0:
                return jsonify(data), 201
            else:
                break

            # if cur.description is not None:
            #     break
        except:
            if x == 5:
                print("X = 5, Errors, User Id: ", user_id, file=sys.stderr)
                return jsonify(data), 201


    headers = [x[0] for x in cur.description]

    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

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
    data = []
    cur = conn.cursor()

    try:
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
        ON CorkBoardItUser.user_id = ckbd.fk_user_id""", {"user": user_id})

        #conn.commit()

        headers = [x[0] for x in cur.description]
        rows = cur.fetchall()
        for stuff in rows:
            data.append(dict(zip(headers, stuff)))

        if len(rows) == 0:
            return jsonify(data = None), 201
        else:
            return jsonify(data)
    except:
        return jsonify(data), 201

#########################################################################################################
#########################################################################################################
#########################################################################################################
"""
VIEW CORKBOARD
"""
@app.route('/viewcorkboard/<corkboard_id>')
def view_corkboard(corkboard_id):
    cur = conn.cursor()

    try:

        data = {}

        cur.execute("""SELECT u.first_name, u.last_name, u.user_id, u.email
        FROM CorkBoard AS cb
        INNER JOIN CorkBoardItUser AS u
        ON u.user_id = cb.fk_user_id
        WHERE cb.corkboard_id = %(corkboard_id)s""", {'corkboard_id':corkboard_id})

        headers = [x[0] for x in cur.description]
        rows = cur.fetchall()
        for stuff in rows:
            data['owner'] = (dict(zip(headers, stuff)))

        cur.execute("""SELECT title, category, date_time, cb.email, COUNT(w.fk_user_id), cb.visibility
        FROM CorkBoard AS cb
        LEFT OUTER JOIN PublicCorkBoard AS public
        ON cb.corkboard_id = public.fk_corkboard_id
        LEFT OUTER  JOIN Watch AS w
        ON public.public_corkboard_id = w.fk_public_corkboard_id
        WHERE cb.corkboard_id = %(corkboard_id)s
        GROUP BY title, cb.category,  cb.date_time, cb.email, cb.visibility
        """, {'corkboard_id':corkboard_id})

        headers = [x[0] for x in cur.description]
        rows = cur.fetchall()
        for stuff in rows:
            data['stat'] = (dict(zip(headers, stuff)))

        cur.execute("""SELECT url, pushpin_id
        FROM Pushpin AS p
        INNER JOIN CorkBoard AS cb
        ON p.fk_corkboard_id = cb.corkboard_id
        WHERE p.fk_corkboard_id = %(corkboard_id)s
        """, {'corkboard_id':corkboard_id})

        headers = [x[0] for x in cur.description]
        rows = cur.fetchall()
        data['images'] = []
        for stuff in rows:
            data['images'].append((dict(zip(headers, stuff))))

        # cur.execute("""SELECT u.user_id
        # FROM CorkBoardItUser AS u
        # INNER JOIN Corkboard AS cb
        # ON u.user_id = cb.fk_user_id
        # INNER JOIN PublicCorkBoard AS public
        # ON cb.corkboard_id = public.fk_corkboard_id
        # WHERE cb.corkboard_id = %(corkboard_id)s
        # """, {'corkboard_id':corkboard_id})

        # headers = [x[0] for x in cur.description]
        # rows = cur.fetchall()
        # for stuff in rows:
        #     data.append(dict(zip(headers, stuff)))

        return jsonify(data)
    except:
        return jsonify(data)

"""
PRIVATE CORKBOARD - LOGIN
"""
@app.route('/private_login/<corkboard_id>', methods=['POST'])
def validate_private_corkboard_login(corkboard_id):
    cur = conn.cursor()

    if request.method == 'POST':
    # print(corkboard_id, file=sys.stderr)
        content = request.get_json()
        password = content['password']

        cur.execute("""SELECT password
        FROM PrivateCorkBoard
        WHERE PrivateCorkBoard.fk_corkboard_id=%(lname)s""", {"lname": corkboard_id})
        rows = cur.fetchall()
        print(rows, file=sys.stderr)

        if len(rows) == 0 or password != rows[0][0]:
            return jsonify(isValid = False)
        else:
            return jsonify(isValid = True)

# """
# FOLLOW CORKBOARD
# """
# @app.route('/followcorkboard/<corkboard_id>', methods=['POST'])
# def follow_corkboard(corkboard_id):
#     cur.execute("""INSERT INTO Follow (fk_user_follower_id, fk_user_followee_id)
#     VALUES ( $UserID,
#     ( SELECT user_id
#     FROM CorkBoardItUser AS u
#     INNER JOIN CorkBoard AS cb
#     ON u.user_id = cb.fk_user_id
#     WHERE cb.corkboard_id = %(corkboard_id)s ))
#     """, {'corkboard_id':corkboard_id})

#     return 'being built rn'

"""
GET WATCH CORKBOARD
"""
@app.route('/corkboardwatchers/<corkboard_id>')
def get_watchers(corkboard_id):
    corkboard_watchers = []
    cur = conn.cursor()

    try:
        cur.execute("""SELECT *
        FROM Watch
        WHERE fk_public_corkboard_id = %(corkboard_id)s
        """, {'corkboard_id': corkboard_id})

        headers = [x[0] for x in cur.description]
        rows = cur.fetchall()

        for stuff in rows:
            corkboard_watchers.append((dict(zip(headers, stuff))))

        return jsonify(corkboard_watchers)
    except:
        return jsonify(corkboard_watchers)




"""
WATCH CORKBOARD
"""
@app.route('/watchcorkboard', methods=['POST'])
def watch_corkboard():
    """
    ---
    tags:
        - watch corkboard
    parameters:
        - name: user_id
          in: body
        - name: corkboard_id
          in: body
    """
    cur = conn.cursor()

    if request.method == 'POST':
        content = request.get_json()
        user_id = content['user_id']
        corkboard_id = content['corkboard_id']
        cur.execute("""INSERT INTO Watch(fk_user_id, fk_public_corkboard_id)
        VALUES (%(user_id)s,
        ( SELECT public_corkboard_id
        FROM PublicCorkBoard AS public
        WHERE public.fk_corkboard_id = %(corkboard_id)s )) ON CONFLICT (fk_user_id, fk_public_corkboard_id) DO NOTHING
        """, {'user_id':user_id, 'corkboard_id':corkboard_id})

        return jsonify(status_code=201)
#########################################################################################################
#########################################################################################################
#########################################################################################################
"""
ADD CORKBOARD
"""
@app.route('/addcorkboard', methods=['POST'])
def add_corkboard():
    cur = conn.cursor()

    if request.method == 'POST':
        content = request.get_json()
        print(content, file=sys.stderr)
        user_id = content['fk_user_id']
        email = content['email']
        date_time = content['date_time']
        title = content['title']
        category = content['category']
        visibility = content['visibility']

        password = ''

        if visibility == False:
            password = content['password']

    cur.execute("""INSERT INTO CorkBoard (corkboard_id, fk_user_id, email, date_time, title, category, visibility)
    VALUES (DEFAULT,%(user_id)s,%(email)s, %(date_time)s, %(title)s, %(category)s, %(visibility)s)
    RETURNING corkboard_id""",
    {"user_id": user_id, "email": email, "date_time": date_time, "title": title, "category": category, "visibility": visibility})

    rows = cur.fetchall()
    corkboard_id = rows[0][0]

    print(visibility, file=sys.stderr)
    conn.commit()
    if visibility is True:
        print('inserting into public', file=sys.stderr)
        cur.execute("""INSERT INTO PublicCorkBoard (fk_corkboard_id)
        VALUES(%(corkboard_id)s)""", {"corkboard_id": corkboard_id})
    else:
        print('inserting into private', file=sys.stderr)
        cur.execute("""INSERT INTO PrivateCorkBoard  (fk_corkboard_id, password)
        VALUES (%(corkboard_id)s, %(password)s)""", {"corkboard_id": corkboard_id, "password": password})

    conn.commit()
    #return corkboard_id
    return jsonify(corkboard_id)

"""
CATEGORY
"""
@app.route('/category')
def cateogry():
    cur.execute("""SELECT category FROM Category ORDER BY category DESC""")
    headers = [x[0] for x in cur.description]
    data = []
    rows = cur.fetchall()
    for stuff in rows:
        data.append(dict(zip(headers, stuff)))

    return jsonify(data)

#########################################################################################################
#########################################################################################################
#########################################################################################################

"""
ADD PUSHPIN
"""
@app.route('/corkboardtitle/<corkboard_id>')
def corkboard_title(corkboard_id):
    cur = conn.cursor()

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
    cur = conn.cursor()

    if request.method == 'POST':
        content = request.get_json()
        user_id = content['user_id']
        corkboard_id = content['corkboard_id']
        date_time = content['date_time']
        url = content['url']
        description = content['description']

        data = []

        cur.execute("""INSERT INTO PushPin (pushpin_id, fk_user_id, fk_corkboard_id, date_time, url, description)
        VALUES (DEFAULT, %(user_id)s, %(corkboard_id)s, %(date_time)s, %(url)s, %(description)s) RETURNING pushpin_id;
        """, {"user_id": user_id, "corkboard_id": corkboard_id, "date_time": date_time, "url": url, "description": description})

        id_of_new_row = cur.fetchone()[0]

        conn.commit()

        # update corkboard time
        cur.execute("""UPDATE corkboard SET date_time = %(date_time)s WHERE corkboard_id = %(corkboard_id)s""",
        {"date_time": date_time, "corkboard_id":corkboard_id})

        conn.commit()

        #return corkboard_id
        return jsonify(id_of_new_row)



@app.route('/addtags', methods=['POST'])
def add_tags():
    """
    ---
    tags:
        - add tags
    parameters:
        - name: pushpin_id
          in: body
        - name: tag
          in: body
    """
    cur = conn.cursor()

    if request.method == 'POST':
        content = request.get_json()
        print('CONTENT:', content, file=sys.stderr)
        pushpin_id = content['pushpin_id']
        tag = content['tag'].split(',')

        for item in tag:
            cur.execute("""INSERT INTO Tag (fk_pushpin_id, tag)
            VALUES (%(pushpin_id)s, %(tag)s)
            """, {'pushpin_id': pushpin_id, 'tag': item})

            conn.commit()
        return jsonify(status_code=201)

#########################################################################################################
#########################################################################################################
#########################################################################################################
"""
VIEW PUSHPIN
"""
@app.route('/viewpushpin/<pushpin_id>')
def view_pushpin(pushpin_id):
    data = []
    cur = conn.cursor()

    try:
        cur.execute("""SELECT first_name, last_name
        FROM PushPin AS pp
        INNER JOIN CorkBoardItUser AS u
        ON u.user_id = pp.fk_user_id
        WHERE pp.pushpin_id = %(pushpin_id)s
        """, {"pushpin_id": pushpin_id})

        headers = [x[0] for x in cur.description]
        rows = cur.fetchall()
        for stuff in rows:
            data.append(dict(zip(headers, stuff)))

        cur.execute("""SELECT pp.date_time
        FROM PushPin AS pp
        WHERE pp.pushpin_id = %(pushpin_id)s
        """, {"pushpin_id": pushpin_id})

        headers = [x[0] for x in cur.description]
        rows = cur.fetchall()
        data.append({headers[0]:rows[0][0]})

        cur.execute("""SELECT title, corkboard_id, pp.fk_user_id
        FROM PushPin AS pp
        INNER JOIN CorkBoard as cb
        ON cb.corkboard_id = pp.fk_corkboard_id
        WHERE pp.pushpin_id = %(pushpin_id)s
        """, {"pushpin_id": pushpin_id})

        headers = [x[0] for x in cur.description]
        rows = cur.fetchall()

        #data.append({headers[0]:rows[0][0]})
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

        cur.execute("""SELECT first_name, last_name, user_id
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

        cur.execute("""SELECT u.first_name, u.last_name, c.text, c.date_time
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
    except:
        return jsonify(data), 201

# """
# FOLLOW FOR PUSHPIN
# """
# @app.route('/followpushpin', methods = ['POST'])
# def follow_pushpin():
#     """
#     ---
#     tags:
#         - Comments on pushpins
#     parameters:
#         - name: pushpin_id
#           in: body
#         - name: text
#     """
#     if request.method == 'POST':
#         content = request.get_json()
#         user_id = content['user_id']
#         cur.execute("""INSERT INTO Follow (fk_user_follower_id, fk_user_followee_id)
#         VALUES ((SELECT user_id FROM CorkBoardItUser AS u
#         WHERE u.user_id = $UserID), (SELECT fk_user_id
#         FROM CorkBoard WHERE corkboard.corkboard_id = $CorkBoardID
#         AND corkboard.fk_user_id != %(user_id)s))
#         """, {"user_id": user_id})
#         conn.commit()
#         return 'being built rn'

"""
LIKE FOR PUSHPIN
"""
@app.route('/likepushpin', methods = ['POST'])
def like_pushpin():
    """
    ---
    tags:
        - like on pushpins
    parameters:
        - name: user_id
          in: body
        - name: pushpin_id
          in: body
    """
    cur = conn.cursor()

    if request.method == 'POST':
        content = request.get_json()
        print('CONTENT:', content, file=sys.stderr)
        user_id = content['user_id']
        pushpin_id = content['pushpin_id']

        cur.execute("""INSERT INTO Liked (fk_user_id, fk_pushpin_id)
        VALUES (%(user_id)s, %(pushpin_id)s) ON CONFLICT (fk_user_id,fk_pushpin_id) DO NOTHING
        """, {"user_id": user_id, "pushpin_id": pushpin_id})

        conn.commit()

        cur.execute("""SELECT first_name, last_name, user_id
        FROM CorkBoardItUser
        WHERE CorkBoardItUser.user_id=%(user_id)s;""", {"user_id": user_id})

        headers = [x[0] for x in cur.description]
        data = []
        rows = cur.fetchall()
        for stuff in rows:
            data.append(dict(zip(headers, stuff)))

        return jsonify(data)

"""
UNLIKE FOR PUSHPIN
"""
@app.route('/unlikepushpin', methods = ['POST'])
def unlike_pushpin():
    """
    ---
    tags:
        - unlike on pushpins
    parameters:
        - name: user_id
          in: body
        - name: pushpin_id
           in: body
    """
    cur = conn.cursor()

    if request.method == 'POST':
        content = request.get_json()
        print('CONTENT:', content, file=sys.stderr)
        user_id = content['user_id']
        pushpin_id = content['pushpin_id']

        cur.execute("""DELETE FROM Liked
        WHERE Liked.fk_user_id = %(user_id)s
        AND Liked.fk_pushpin_id = %(pushpin_id)s
        """, {"user_id": user_id, "pushpin_id": pushpin_id})

        conn.commit()
        return jsonify(status_code=201)
"""
POST COMMENT FOR PUSHPIN
"""
@app.route('/postcomment', methods = ['POST'])
def post_comment():
    """
    ---
    tags:
        - Comments on pushpins
    parameters:
        - name: pushpin_id
          in: body
        - name: text
          in: body
        - name: user_id
          in: body
        - name: date_time
          in: body
    """
    cur = conn.cursor()

    if request.method == 'POST':
        content = request.get_json()
        print('CONTENT:', content, file=sys.stderr)
        date_time = content['date_time']
        text = content['text']
        user_id = content['user_id']
        pushpin_id = content['pushpin_id']

        cur.execute("""INSERT INTO comment (date_time, text, fk_user_id, fk_pushpin_id)
        VALUES (%(date_time)s, %(text)s, %(user_id)s, %(pushpin_id)s)
        """, {"date_time": date_time, "text": text, "user_id": user_id, "pushpin_id": pushpin_id})

        conn.commit()

        return jsonify(status_code=201)

#########################################################################################################
#########################################################################################################
#########################################################################################################
"""
FOLLOW USER
"""
@app.route('/followuser', methods = ['POST'])
def follow_user():
    """
    ---
    tags:
        - Follow User
    parameters:
        - name: follower_id
          in: body
        - name: followee_id
          in: body
    """
    cur = conn.cursor()

    if request.method == 'POST':
        content = request.get_json()
        follower_id = content['follower_id']
        followee_id = content['followee_id']
        cur.execute("""INSERT INTO Follow (fk_user_follower_id, fk_user_followee_id)
        VALUES (%(follower_id)s, %(followee_id)s) ON CONFLICT (fk_user_follower_id,fk_user_followee_id) DO NOTHING
        """, {"follower_id":follower_id, "followee_id": followee_id})
        conn.commit()
        return jsonify(status_code=201)

#########################################################################################################
#########################################################################################################
#########################################################################################################


"""
Get FOLLOWING
"""
@app.route('/getfollowers/<user_id>', methods=['GET'])
def get_followers(user_id):

    data = []
    cur = conn.cursor()

    try:

        if request.method == 'GET':
            cur.execute(""" SELECT fk_user_followee_id FROM follow WHERE fk_user_follower_id = %(user_id)s""",
            {'user_id':user_id})

            headers = [x[0] for x in cur.description]
            rows = cur.fetchall()
            for stuff in rows:
                data.append(dict(zip(headers, stuff)))

            return jsonify(data)
    except:
        return jsonify(data)




#########################################################################################################
#########################################################################################################
#########################################################################################################



"""
SEARCH PUSHPIN
"""
@app.route('/searchpushpin/<search_text>')
def search_pushpin(search_text):
    data = []
    cur = conn.cursor()

    try:
        cur.execute("""SELECT DISTINCT ON (search.description) search.description,  search.pushpin_id,
        search.title, search.first_name, search.last_name
        FROM(SELECT PushPin.description,  PushPin.pushpin_id, CorkBoard.title, CorkBoard.category,
        CorkBoardItUser.first_name, CorkBoardItUser.last_name, Tag.tag
        FROM CorkBoard INNER JOIN CorkBoardItUser ON CorkBoard.fk_user_id = CorkBoardItUser.user_id
        INNER JOIN PushPin ON CorkBoard.corkboard_id = PushPin.fk_corkboard_id
        FULL OUTER JOIN Tag ON Tag.fk_pushpin_id = PushPin.pushpin_id NATURAL JOIN PublicCorkBoard
        WHERE description LIKE %(search)s OR category
        LIKE %(search)s OR tag LIKE %(search)s)search
        ORDER BY description ASC""", {'search': '%'+search_text+'%'})

        headers = [x[0] for x in cur.description]
        rows = cur.fetchall()

        for stuff in rows:
            data.append(dict(zip(headers, stuff)))

        if len(rows) == 0:
            return jsonify(data = None), 201
        else:
            return jsonify(data)
    except:
        return jsonify(data)


#########################################################################################################
#########################################################################################################
#########################################################################################################
"""
POPULAR TAGS
"""
@app.route('/populartags')
def popular_tags():
    data = []
    cur = conn.cursor()

    try:

        cur.execute("""SELECT Tag.tag, COUNT(Tag.Tag) AS pushpins, COUNT(DISTINCT Corkboard.corkboard_id) as unique_cb
        FROM Tag INNER JOIN PushPin ON Tag.fk_pushpin_id = PushPin.pushpin_id
        INNER JOIN CorkBoard ON CorkBoard.corkboard_id = PushPin.fk_corkboard_id
        GROUP BY tag
        ORDER BY pushpins DESC
        LIMIT 5""")

        headers = [x[0] for x in cur.description]
        rows = cur.fetchall()

        for stuff in rows:
            data.append(dict(zip(headers, stuff)))

        if len(rows) == 0:
            return jsonify(data = None), 404
        else:
            return jsonify(data)
    except:
        return jsonify(data)

#########################################################################################################
#########################################################################################################
#########################################################################################################
"""
POPULAR TAGS
"""
@app.route('/popularsites')
def get_popular_sites():
    data = []
    cur = conn.cursor()

    try:
        cur.execute("""SELECT PushPin.url as site, COUNT(PushPin.url) as pushpins
        FROM PushPin
        GROUP BY site
        ORDER BY pushpins DESC
        LIMIT 4""")

        headers = [x[0] for x in cur.description]
        rows = cur.fetchall()

        for stuff in rows:
            data.append(dict(zip(headers, stuff)))

        if len(rows) == 0:
            return jsonify(data = None), 404
        else:
            return jsonify(data)
    except:
        return jsonify(data)

#########################################################################################################
#########################################################################################################
#########################################################################################################
"""
CORKBOARD STATISTICS
"""
@app.route('/corkboardstats')
def corkboard_stats():
    data = []
    cur = conn.cursor()

    try:
        cur.execute("""SELECT CorkBoardItUser.user_id, CorkBoardItUser.first_name, CorkBoardItUser.last_name, COUNT(DISTINCT
        PublicCorkBoard.fk_corkboard_id) AS public_cb, COUNT(DISTINCT pub_pin.pushpin_id) AS
        pub_pushpins, COUNT(DISTINCT PrivateCorkBoard.fk_corkboard_id) AS private_cb,
        COUNT(DISTINCT pr_pin.pushpin_id) AS private_pushpins
        FROM CorkBoardItUser FULL OUTER JOIN CorkBoard ON CorkBoardItUser.user_id = CorkBoard.fk_user_id
        FULL OUTER JOIN PublicCorkBoard ON CorkBoard.corkboard_id = PublicCorkBoard.fk_corkboard_id
        LEFT OUTER JOIN Pushpin pub_pin ON PublicCorkBoard.fk_corkboard_id = pub_pin.fk_corkboard_id
        FULL OUTER JOIN PrivateCorkBoard ON CorkBoard.corkboard_id = PrivateCorkBoard.fk_corkboard_id
        LEFT OUTER JOIN Pushpin pr_pin ON PrivateCorkBoard.fk_corkboard_id = pr_pin.fk_corkboard_id
        GROUP BY user_id, first_name, last_name""")

        headers = [x[0] for x in cur.description]
        rows = cur.fetchall()

        for stuff in rows:
            data.append(dict(zip(headers, stuff)))

        if len(rows) == 0:
            return jsonify(data = None), 404
        else:
            return jsonify(data)
    except:
        return jsonify(data)

@app.route('/')
def get_home():
    return 'welcome to the api'

if __name__ == '__main__':
    app.run(port=5001, threaded=True, host=('0.0.0.0'))              #  Start a development server
