from flask import (Flask, render_template, request, flash, session, redirect)
from model import connect_to_db, db, Appointment, User
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
    print(user, active_user_id, "*"*20)

    return active_user_id



# @app.route("/api/appointments")
# def get_all_appts():
#     """Display all user appointments."""
#     username = request.args.get("username")

#     user = User.query.filter(User.username == username).first()
#     user_id = user.user_id
#     appts = Appointment.query.filter(Appointment.user_id)


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", port="5001", debug=True)