import asyncio
import os
import chardet

async def robotLaunch(file_path, force_encoding=None):
    """
    Asynchroniczna funkcja do przetwarzania pliku XML i uruchomienia skryptu Optima.
    """
    try:
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Plik {file_path} nie istnieje!")

        print(f"Przetwarzanie pliku XML: {file_path}")

        # Ścieżka do skryptu robota Optima
        robocik_path = r"C:\praca_Ardium\WeExpert-Optima\python\robocik_optima.py"

        if not os.path.exists(robocik_path):
            raise FileNotFoundError(f"Skrypt {robocik_path} nie istnieje!")

        print("Uruchamiam asynchronicznie skrypt robocik_optima.py")

        # Uruchamiamy skrypt robota jako proces asynchroniczny
        process = await asyncio.create_subprocess_exec(
            "python", robocik_path, file_path,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )

        # Czekamy na zakończenie procesu i zbieramy wynik
        stdout, stderr = await process.communicate()

        # Wybieramy kodowanie: automatyczne wykrywanie lub ustawione ręcznie
        if force_encoding:
            encoding = force_encoding
        else:
            encoding = chardet.detect(stdout)["encoding"] or "utf-8"

        try:
            output = stdout.decode(encoding, errors="replace").strip()
        except Exception:
            output = "[Błąd dekodowania stdout]"

        if force_encoding:
            encoding_err = force_encoding
        else:
            encoding_err = chardet.detect(stderr)["encoding"] or "utf-8"

        try:
            error_output = stderr.decode(encoding_err, errors="replace").strip()
        except Exception:
            error_output = "[Błąd dekodowania stderr]"

        # Obsługa wyników procesu
        if process.returncode == 0:
            print(f"Skrypt zakończył się sukcesem:\n{output}")
            return {"status": "success", "stdout": output, "stderr": ""}
        else:
            print(f"Błąd podczas działania skryptu:\n{error_output}")
            raise RuntimeError(f"Błąd wykonania robocika: {error_output}")

    except Exception as e:
        print(f"Błąd w robotLaunch: {e}")
        raise
