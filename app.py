from flask import Flask, render_template

app = Flask(__name__)  # create instance of class Flask

# root function for index.html
@app.route("/<college>", methods=['GET','POST'])
def root(college):
    return render_template("home.html")
# run app
if __name__ == "__main__":
    app.debug = True
    app.run()
