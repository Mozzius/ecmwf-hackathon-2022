from flask import Flask, make_response, jsonify
from flask_cors import CORS, cross_origin
import csv

# Create the application instance
app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Cross-Origin"


@app.route("/api/data")
@cross_origin()
def home():
    file = "extracted_wind_40.0N40.0E.csv"
    # get CSV data and turn into dictionary
    with open(file) as csvfile:
        reader = csv.DictReader(csvfile)
        data = [row for row in reader]
    # return data as JSON
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True, port=8080)
