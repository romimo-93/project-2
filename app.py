# Dependencies
from flask import Flask, render_template
import os

# App Config
app = Flask(__name__)

#################################################
# Database Setup
#################################################
# from flask_sqlalchemy import SQLAlchemy
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')

# # Remove tracking modifications
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
# data = db.session.query().all()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/calendar")
def calendar():
    return render_template("calendar.html")


@app.route("/world_tour")
def world_tour():

    return render_template("world_tour.html")

@app.route("/table")
def table():

    return render_template("table.html")


@app.route("/data_comparisons")
def data_comparisons():
    
    return ""


@app.route("/data")
def data():

    return ""

if __name__ == "__main__":
    app.run(debug=True)
