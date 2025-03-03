from flask import Flask, request, jsonify, Response
import os
import time
import asyncio
from methods_endpoint import robotLaunch  # Importujemy asynchroniczną funkcję

app = Flask(__name__)
SAVE_DIR = r"C:\praca_Ardium\WeExpert-Optima\WEEXPERT-OPTIMA\_dir"
os.makedirs(SAVE_DIR, exist_ok=True)

@app.route('/upload-xml', methods=['POST'])
async def upload_xml():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Brak danych wejściowych"}), 400

        file_id = f"xml_{int(time.time())}.xml"
        file_path = os.path.join(SAVE_DIR, file_id)

        # Zapisujemy XML do pliku
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(data["xmlString"])
            f.flush()
            os.fsync(f.fileno())

        try:
            result = await robotLaunch(file_path)
        except Exception as e:
            error_link = f"{request.host_url}download-xml/{file_id}"
            return jsonify({
                "status": "error",
                "errorCode": "OPTIMA_ERR",
                "details": str(e),
                "downloadLink": error_link
            }), 500

        return jsonify({
            "status": "success",
            "message": "Plik XML zapisany poprawnie",
            "robotOutput": "result"
        }), 201

    except Exception as e:
        return jsonify({"error": "Wystąpił nieoczekiwany błąd.", "details": str(e)}), 500

@app.route('/download-xml/<filename>', methods=['GET'])
def download_xml(filename):
    try:
        file_path = os.path.join(SAVE_DIR, filename)
        if not os.path.isfile(file_path):
            return jsonify({"error": "Plik nie istnieje"}), 404

        return Response(open(file_path, "r", encoding="utf-8").read(), mimetype="application/xml")

    except Exception as e:
        return jsonify({"error": "Błąd pobierania pliku", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
