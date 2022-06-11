from flask import Flask
from flask_cors import CORS, cross_origin

# Create the application instance
app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/api/hello")
@cross_origin()
def home():
    return "Hello World!"


if __name__ == "__main__":
    app.run(debug=True, port=8080)
