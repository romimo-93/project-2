from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():

    tabledata = "..."
    return render_template("index.html", tabledata=tabledata)


@app.route("/calendar")
def calendar():
    
    return render_template("calendar.html")


@app.route("/world_tour")
def world_tour():
    
    return render_template("world_tour.html")


@app.route("/data_comparisons")
def data_comparisons():
    
    return ""

if __name__ == "__main__":
    app.run()