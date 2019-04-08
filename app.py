from flask import Flask, render_template

app = Flask(__name__)  # create instance of class Flask

# root function for index.html
@app.route("/")
def root():
    return render_template("home.html")


@app.route("/search")
def search():
    return render_template("bar.html")


@app.route("/majors")
def majors():
    return render_template("majors.html")


# run app
if __name__ == "__main__":
    app.debug = True
    app.run()
