from flask import Flask, render_template

app = Flask(__name__)  # create instance of class Flask

# root function for index.html
@app.route("/", methods=['GET','POST'])
def root():
    return render_template("home.html")
# run app
if __name__ == "__main__":
    app.debug = True
    app.run()
