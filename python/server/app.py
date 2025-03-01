from flask import Flask, request, jsonify, Response
import os
import time

app = Flask(__name__)

# Folder, w którym zapisujemy pliki XML
SAVE_DIR = r"C:\praca_Ardium\WeExpert-Optima\WEEXPERT-OPTIMA\_dir"
os.makedirs(SAVE_DIR, exist_ok=True)  # Tworzymy katalog, jeśli nie istnieje

@app.route('/upload-xml', methods=['POST'])
def upload_xml():
    try:
        data = request.get_json()
        if not data or "xmlString" not in data:
            return jsonify({"error": "Brak pola 'xmlString'."}), 400

        file_id = f"xml_{int(time.time())}.xml"  # Tworzymy nazwę pliku XML
        file_path = os.path.join(SAVE_DIR, file_id)

        # Zapisujemy XML do pliku
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(data["xmlString"])

        raise ValueError("Symulowany błąd")

        return jsonify({"message": "Plik XML zapisany poprawnie"}), 201

    except Exception as e:
        error_link = f"{request.host_url}download-xml/{file_id}" if 'file_id' in locals() else None
        
        return jsonify({
            "status": "error",
            "error": "Wystąpił nieoczekiwany błąd.",
            "details": str(e),
            "download_link": error_link
        }), 500

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
