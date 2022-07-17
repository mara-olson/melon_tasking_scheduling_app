import os
import json
import random
from random import choice, randint
from datetime import datetime
from model import User, Appointment, db, connect_to_db
import server


os.system('dropdb melontasting')
os.system('createdb melontasting')

connect_to_db(server.app)
db.create_all()
db.session.commit()


############ USERS ##########
def create_user(username):
        user = User(username=username)
        db.session.add(user)
        db.session.commit()
        return user
        
with open('seed_data/user_data.json') as ud:
    user_data = json.loads(ud.read())
    # print(user_data)
users_in_db = []
for user in user_data:
    
    username = (
        user["username"]
    )
    new_user = create_user(username)
    users_in_db.append(new_user)

db.session.add_all(users_in_db)
db.session.commit()


############ APPTS ##########
def create_appt(user_id, appt_time):
        appt = Appointment(user_id=user_id, appt_time=appt_time)
        db.session.add(appt)
        db.session.commit()
        return appt

with open('seed_data/appt_data.json') as ad:
    appt_data = json.loads(ad.read())
    # print(user_data)
appts_in_db = []
for appt in appt_data:
    user_id, appt_time = (
        appt["user_id"],
        datetime.strptime(appt["appt_time"], '%Y-%m-%d %H:%M:%S.%f')
    )
    new_appt = create_appt(user_id, appt_time)
    appts_in_db.append(new_user)

db.session.add_all(appts_in_db)
db.session.commit()



