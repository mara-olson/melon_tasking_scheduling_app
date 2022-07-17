from flask import Flask, render_template, json, jsonify, request, flash, session, redirect;
from model import connect_to_db, db, Appointment, User
import datetime
# import requests
import os
import random, string
from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


@app.route("/")
def homepage():
    """Melon scheduling homepage."""
    return render_template("index.html")

@app.route('/<path>')
def route(path):

    return render_template('index.html')


@app.route('/<path>/<code>')
def nested_route(path, code):

    return render_template('index.html')



@app.route("/api/login", methods=["POST"])
def login():
    """User login with username only."""
    username = request.json.get("username")

    user = User.query.filter(User.username == username).first()
    active_user_id = user.user_id
    session["user_id"] = active_user_id

    print(session["user_id"], "*"*20)

    return jsonify({"user_id": active_user_id})



@app.route("/appointments")
def get_all_appts():
    """Display all user appointments."""
    
    appts = Appointment.query.filter(Appointment.user_id == session["user_id"]).all()

    all_appts = []
    for appt in appts:
        listed_appt = {
            "appt_id": appt.appt_id,
            "user_id": appt.user_id,
            "appt_time": appt.appt_time
        }
        all_appts.append(listed_appt)
        print(listed_appt)

    print ("APPTS!!!!!!!!!!!:", all_appts)


    return jsonify({"appts": all_appts})


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", port="5001", debug=True)