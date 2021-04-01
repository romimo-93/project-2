import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

import os
import sys

print(os.path.dirname(__file__))

project_path = os.path.join(os.path.dirname(__file__))
sys.path.insert(0, project_path)

## chinese part is what the sqlite file name we have from sql
project2_path = os.path.join(project_path, "sqlite文件名稱")


#################################################
# Database Setup
################################################# 
# chinese part is what the sqlite file name we have from sql
engine = create_engine("sqlite:///" + sqlite文件名稱)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

print(Base.classes.keys())

# Save reference to the table  chinese part is what the table name we have from sql
table名稱 = Base.classes.table名稱

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    
    return ("homw page")


@app.route("/calendar")
def calendar():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    #code we want

    session.close()

    return 


@app.route("/worsd_tour")
def worsd_tour():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    #code we want

    session.close()

    return 


@app.route("/data_comparisons")
def data_comparisons():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    #code we want

    session.close()

    return 


if __name__ == '__main__':
    app.run(debug=False)
