from flask import Flask, request, jsonify
import os
import threading
from methods_endpoint import start_watching  # Import monitoring function

# Initialize Flask app
app = Flask(__name__)

# Directory for saving XML files
SAVE_DIR = r"C:\praca_Ardium\WeExpert-Optima\WEEXPERT-OPTIMA\_dir"
os.makedirs(SAVE_DIR, exist_ok=True)  # Ensure directory exists

# Monitor folder path
WATCH_FOLDER = r"C:\praca_Ardium\WeExpert-Optima\WEEXPERT-OPTIMA\generatedXML"

# Utility function to save XML string to a file
def save_xml(xml_string):
    file_path = os.path.join(SAVE_DIR, "received.xml")  # Modify filename logic if needed
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(xml_string)
    return file_path

# Endpoint to receive XML data
@app.route('/upload-xml', methods=['POST'])
def upload_xml():
    try:
        data = request.get_json()
        if not data or "xmlString" not in data:
            return jsonify({"error": "Invalid request. Missing 'xmlString' field."}), 400 #dorzucić odsyłanie wygenerowanego pliku xml
        
        xml_string = data["xmlString"]
        file_path = save_xml(xml_string)

        return jsonify({"message": "XML file saved successfully", "filePath": file_path}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint to check server status
@app.route('/status', methods=['GET'])
def status():
    return jsonify({"monitoring": "active", "folder": WATCH_FOLDER}), 200

# Run file watcher in a separate thread
def run_watcher():
    start_watching(WATCH_FOLDER)

# Start the server and monitoring
if __name__ == '__main__':
    watcher_thread = threading.Thread(target=run_watcher, daemon=True)
    watcher_thread.start()
    app.run(host='0.0.0.0', port=5000)
