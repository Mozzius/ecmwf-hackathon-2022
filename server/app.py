from flask import Flask, jsonify
import datetime as dt
import csv

# Create the application instance
app = Flask(__name__)


def hoursSinceEPOCHtoUNIX(hours, since=1900):
    tmp = dt.timedelta(0, 0, 0, 0, 0, int(hours))
    return tmp + dt.date(1900, 1, 1)


@app.route("/api/data")
def home():
    file = "extracted_wind_with_spd_dir_monthly_51.4N0.1E.csv"
    # get CSV data and turn into dictionary
    with open(file) as csvfile:
        reader = csv.DictReader(csvfile)
        data = [row for row in reader]
    # return data as JSON
    for row in data:
        row["id"] = int(row["id"])
        dt_obj = hoursSinceEPOCHtoUNIX(row["time"])
        row["time"] = dt_obj.ctime()
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True, port=8080)
