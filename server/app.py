from flask import Flask, make_response
from flask_cors import CORS, cross_origin

# Create the application instance
app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Cross-Origin"


@app.route("/api/hello")
@cross_origin()
def home():
    return {"hello": "world"}


if __name__ == "__main__":
    app.run(debug=True, port=8080)
