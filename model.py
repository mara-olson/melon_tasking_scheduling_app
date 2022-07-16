from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """Individual user."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)

    appt = db.relationship("Appointment", back_populates="user")

    def __repr__(self):
        return f'<User user_id={self.user_id} username={self.username}>'


class Appointment(db.Model):
    """Appointments for melon tasting booked by users."""

    __tablename__ = "appointments"

    appt_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    appt_time = db.Column(db.DateTime)

    user = db.relationship("User", back_populates="appt")

    def __repr__(self):
        return f'<Appointment appt_id={self.appt_id} time={self.appt_time}>'