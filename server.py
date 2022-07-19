import re
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

    if not user:
        print("NEW USER!")
        user = User.create_user(username)

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

    return jsonify({"appts": all_appts})


@app.route("/api/scheduling", methods=["POST"])
def schedule_appt():
    """Save user's scheduled appt to the db."""
    desired_appt_date = request.json.get("appt_date")
    desired_appt_time = request.json.get("appt_time")
    print("DESIRED APPT: ", desired_appt_date, desired_appt_time)

    existing_appts = Appointment.query.filter(Appointment.user_id == session["user_id"]).all()
    existing_appt_dates = []

    for appt in existing_appts:
        appt_time_to_add = appt.appt_time.strftime("%Y-%m-%d")
        # print("APPT DATES!:", "*"*20, appt.appt_time.strftime("%Y-%m-%d"))
        existing_appt_dates.append(appt_time_to_add)

    if desired_appt_date in existing_appt_dates:
        error = "Oops! Looks like you already have an appointment scheduled on this day. Please try another date."
        success= False

    else:
        success = True
        error = None
        new_appt_string = (desired_appt_date + " " + desired_appt_time)[:-2]
        converted_appt_datetime = datetime.datetime.strptime(new_appt_string, "%Y-%m-%d %H:%M")
        print ("NEW APPT TIME TO ADD: ", converted_appt_datetime)
        new_appt = Appointment.create_appt(session["user_id"], converted_appt_datetime)
        new_appt_date = new_appt.appt_time

    return jsonify({"success": success, "error": error, "new_appt": new_appt_date})


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", port="5001", debug=True)