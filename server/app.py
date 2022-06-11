from flask import Flask, jsonify
import csv

# Create the application instance
app = Flask(__name__)


@app.route("/api/data")
def home():
    file = "extracted_wind_40.0N40.0E.csv"
    # get CSV data and turn into dictionary
    with open(file) as csvfile:
        reader = csv.DictReader(csvfile)
        data = [row for row in reader]
    # return data as JSON
    for row in data:
        # row["time"] =
        pass
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True, port=8080)
