import asyncio
import os

async def robotLaunch(file_path):
    """
    Asynchroniczna funkcja do przetwarzania pliku XML i uruchomienia skryptu Optima.
    """
    try:
        # 📌 Sprawdzenie, czy plik XML istnieje
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"❌ Plik XML nie istnieje: {file_path}")

        # 📌 Sprawdzenie, czy plik XML nie jest pusty
        if os.path.getsize(file_path) == 0:
            raise ValueError(f"❌ Plik XML jest pusty: {file_path}")

        print(f"🔍 Przetwarzanie pliku XML: {file_path}")

        # 📌 Pobiera katalog, w którym znajduje się ten skrypt
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        ROBOT_SCRIPT = os.path.join(BASE_DIR, "robocik_optima.py")

        # 📌 Normalizujemy ścieżkę
        ROBOT_SCRIPT = os.path.abspath(ROBOT_SCRIPT)

        if not os.path.exists(ROBOT_SCRIPT):
            raise FileNotFoundError(f"❌ Skrypt robota nie istnieje: {ROBOT_SCRIPT}")

        print(f"✅ Skrypt robota znaleziony: {ROBOT_SCRIPT}")

        # 📌 Uruchamiamy skrypt robota jako proces asynchroniczny
        process = await asyncio.create_subprocess_exec(
            "python", ROBOT_SCRIPT, file_path,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            shell=False  # 🔹 Windows wymaga `shell=True` dla poprawnego działania subprocess
        )

        # 📌 Czekamy na zakończenie procesu i zbieramy wynik
        stdout, stderr = await process.communicate()

        # 🔹 Dekodowanie wyjścia procesu
        encoding = "utf-8"
        output = stdout.decode(encoding, errors="replace").strip()
        error_output = stderr.decode(encoding, errors="replace").strip()

        # 📌 Jeśli brak danych w `stdout` i `stderr`, dodajemy komunikat diagnostyczny
        if not output:
            output = "⚠️ Brak danych w stdout. Sprawdź logi robocika."
        if not error_output:
            error_output = "⚠️ Brak danych w stderr. Sprawdź logi robocika."

        print(f"📜 STDOUT: {output}")
        print(f"📜 STDERR: {error_output}")

        # 📌 Obsługa wyników procesu
        if process.returncode == 0:
            print(f"✅ Skrypt zakończył się sukcesem.")
            return {"status": "success", "stdout": output, "stderr": ""}
        else:
            print(f"❌ Błąd podczas działania skryptu (Kod błędu: {process.returncode})")
            raise RuntimeError(f"❌ Błąd wykonania robocika: {error_output}")

    except Exception as e:
        print(f"❌ Błąd w robotLaunch: {e}")
        return {"status": "error", "details": str(e)}
