from flask import Flask, request, jsonify, Response
import os
import asyncio
from methods_endpoint import robotLaunch  # Importujemy asynchroniczną funkcję

# 📌 Pobiera katalog, w którym znajduje się ten skrypt (odpowiednik __dirname w TypeScript)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SAVE_DIR = os.path.join(BASE_DIR, "_dir")  
os.makedirs(SAVE_DIR, exist_ok=True)  

# 📌 Plik XML zawsze zapisujemy jako "latest.xml"
LATEST_FILE_PATH = os.path.join(SAVE_DIR, "latest.xml")  

app = Flask(__name__)

@app.route('/upload-xml', methods=['POST'])
async def upload_xml():
    print("Próba przesłania pliku XML")
    try:
        data = request.get_json()
        if not data or "xmlString" not in data:
            return jsonify({"error": "Brak danych wejściowych"}), 400

        # 🔹 Nadpisujemy plik latest.xml w katalogu SAVE_DIR
        with open(LATEST_FILE_PATH, "w", encoding="utf-8") as f:
            f.write(data["xmlString"])
            f.flush()
            os.fsync(f.fileno())

        try:
            result = await robotLaunch(LATEST_FILE_PATH)
        except Exception as e:
            error_link = f"{request.host_url}download-xml/latest.xml"
            return jsonify({
                "status": "error",
                "errorCode": "OPTIMA_ERR",
                "details": str(e),
                "message": "Błąd podczas przetwarzania XML. Możesz pobrać plik i sprawdzić zawartość.",
                "downloadLink": error_link
            }), 500

        return jsonify({
            "status": "success",
            "message": "Plik XML zapisany i nadpisany poprawnie",
            "robotOutput": result
        }), 201

    except Exception as e:
        error_link = f"{request.host_url}download-xml/latest.xml"
        return jsonify({
            "error": "Wystąpił nieoczekiwany błąd.",
            "details": str(e),
            "message": "Możesz pobrać plik XML i sprawdzić jego zawartość.",
            "downloadLink": error_link
        }), 500

@app.route('/download-xml/<filename>', methods=['GET'])
def download_xml(filename):

    try:
        if not os.path.isfile(LATEST_FILE_PATH):
            return jsonify({"error": "Plik nie istnieje"}), 404

        with open(LATEST_FILE_PATH, "r", encoding="utf-8") as f:
            xml_content = f.read()

        return Response(xml_content, mimetype="application/xml")

    except Exception as e:
        error_link = f"{request.host_url}download-xml/latest.xml"
        return jsonify({"error": "Błąd pobierania pliku", "details": str(e), "downloadLink": error_link}), 500

if __name__ == '__main__':
    print(f"🔥 Flask server running on http://127.0.0.1:5000")
    app.run(host='127.0.0.1', port=5000)
