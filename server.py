from flask import Flask, render_template, jsonify, request, flash, session;
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
        # print("NEW USER!")
        user = User.create_user(username)

    active_user_id = user.user_id
    session["user_id"] = active_user_id
    # print(session["user_id"], "*"*20)

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

    final_appt_list = all_appts.sort(key=lambda x: x["appt_time"], reverse=True)

    return jsonify({"appts": all_appts})



@app.route("/api/schedule-search", methods=["POST"])
def search_for_appt():
    """Save user's scheduled appt to the db."""
    all_appt_times = ["12:00 AM", "12:30 AM","1:00 AM","1:30 AM","2:00 AM","2:30 AM","3:00 AM","3:30 AM","4:00 AM","4:30 AM","5:00 AM","5:30 AM","6:00 AM","6:30 AM","7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM","10:00 PM","10:30 PM","11:00 PM","11:30 PM"]

    desired_appt_date = request.json.get("appt_date")
    desired_start_time = request.json.get("appt_start_time")
    desired_end_time = request.json.get("appt_end_time")
    index_start_time = all_appt_times.index(desired_start_time)
    index_end_time = all_appt_times.index(desired_end_time)
    # print("DESIRED APPT: ", desired_appt_date, desired_start_time, desired_end_time, index_start_time, index_end_time)

    existing_appts = Appointment.query.filter(Appointment.user_id == session["user_id"]).all()
    existing_appt_dates = []

    for appt in existing_appts:
        appt_time_to_add = appt.appt_time.strftime("%Y-%m-%d")
        # print("APPT DATES!:", "*"*20, appt.appt_time.strftime("%Y-%m-%d"))
        existing_appt_dates.append(appt_time_to_add)

    if desired_appt_date in existing_appt_dates:
        error = "Oops! Looks like you already have an appointment scheduled on this day. Please try another date."
        success= False
        return jsonify({"success": success, "error": error})

    if not desired_appt_date or not desired_start_time or not desired_end_time:
        error = "Please enter both a date and a time"
        success = False
        return jsonify({"success": success, "error": error})

    else:
        success = True
        error = None
        appt_options = all_appt_times[index_start_time:(index_end_time+1)]
        # print("APPT OPTIONS!!!", appt_options)

        return jsonify({"success": success, "error": error, "appt_options": appt_options})



@app.route("/api/schedule", methods=["POST"])
def schedule_selected_appt():
    """Save user's scheduled appt to the db."""
    desired_appt_date = request.json.get("appt_date")
    desired_appt_time = request.json.get("appt_time")
    print("DESIRED APPT: ", desired_appt_date, desired_appt_time)

    new_appt_string = (desired_appt_date + " " + desired_appt_time)[:-3]
    converted_appt_datetime = datetime.datetime.strptime(new_appt_string, "%Y-%m-%d %H:%M")
    print ("NEW APPT TIME TO ADD: ", converted_appt_datetime)
    new_appt = Appointment.create_appt(session["user_id"], converted_appt_datetime)
    new_appt_date = new_appt.appt_time.strftime("%b %d, %Y at %I:%M %p")
    print("*****BOOKED APPT: ", new_appt_date)

    return jsonify({"new_appt": new_appt_date})


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", port="5001")