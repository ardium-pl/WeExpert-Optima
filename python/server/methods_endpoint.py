import os
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time

class XMLFileHandler(FileSystemEventHandler):
    """
    Klasa nasłuchująca na zmiany w folderze i obsługująca pliki XML.
    """
    def on_created(self, event):
        if event.is_directory:
            return
        if event.src_path.endswith('.xml'):
            print(f" Nowy plik XML wykryty: {event.src_path}")
            process_xml_file(event.src_path)


def process_xml_file(file_path):
    """
    Funkcja do przetwarzania pliku XML i uruchomienia skryptu Optima z innego folderu.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            data = file.read()
        print(f" Przetwarzanie pliku XML: {file_path}")

        # Ścieżka do folderu robocika
        robocik_path = r"C:\praca_Ardium\WeExpert-Optima\python\robocik_optima.py"  # Zmień na właściwą ścieżkę

        # Sprawdzenie, czy ścieżka jest poprawna
        if not os.path.exists(robocik_path):
            raise FileNotFoundError(f" Plik {robocik_path} nie istnieje!")

        # Uruchomienie skryptu robota Optima
        print("🤖 Uruchamiam skrypt robocik_optima.py")
        result = subprocess.run(["python", robocik_path], capture_output=True, text=True)

        # Wyświetlenie wyniku działania skryptu
        if result.returncode == 0:
            print(f" Skrypt zakończył się sukcesem:\n{result.stdout}")
        else:
            print(f" Błąd podczas działania skryptu:\n{result.stderr}")

    except Exception as e:
        print(f" Błąd podczas przetwarzania pliku: {e}")

def start_watching(folder_path):
    """
    Funkcja uruchamiająca monitorowanie folderu.
    """
    event_handler = XMLFileHandler()
    observer = Observer()
    observer.schedule(event_handler, path=folder_path, recursive=False)
    observer.start()
    print(f" Monitoring folderu '{folder_path}' rozpoczęty...")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
