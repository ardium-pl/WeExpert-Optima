from pywinauto import Application, Desktop
import os
import time
from methods import Machine
from pynput import mouse

# Statyczna ścieżka do Comarch ERP Optima
OPTIMA_EXE = r"C:\Program Files (x86)\Comarch ERP Optima\Comarch OPT!MA.exe"

print("Sprawdzam ścieżkę do aplikacji Comarch ERP Optima...")

if not os.path.exists(OPTIMA_EXE):
    print(f"Błąd: Nie znaleziono pliku {OPTIMA_EXE}. Sprawdź, czy ścieżka jest poprawna!")
    exit(1)

print("Uruchamiam aplikację Comarch ERP Optima...")

# Uruchomienie aplikacji
try:
    app = Application(backend="uia").start(cmd_line=OPTIMA_EXE)
    print("Aplikacja została uruchomiona pomyślnie!")
except Exception as e:
    print(f"Nie udało się uruchomić aplikacji: {e}")
    exit(1)

# Czekanie na pojawienie się okna głównego
time.sleep(20)

print("Próbuję połączyć się z oknem Comarch ERP Optima...")

# Połączenie z aplikacją
try:
    app = Application(backend="uia").connect(title_re=".*Comarch ERP Optima.*", timeout=10)
    main_window = app.window(title_re=".*Comarch ERP Optima.*")
    print("Połączono z głównym oknem!")
except Exception as e:
    print(f"Nie udało się połączyć z oknem aplikacji: {e}")
    exit(1)

# Obsługa przycisku zatwierdzania
try:
    zatwierdz_button = main_window.child_window(title="uxAcceptButton", control_type="Button")
    if zatwierdz_button.exists(timeout=3):
        zatwierdz_button.click()
        print("Kliknięto przycisk 'uxAcceptButton'!")
    else:
        print("Przycisk 'uxAcceptButton' nie został znaleziony, kontynuuję...")
except Exception:
    print("Błąd podczas klikania 'uxAcceptButton'. Kontynuuję...")

# Przejście do sekcji Płace i Kadry
Machine.click_button(window=main_window, button_name='uxButton1')
time.sleep(15)
Machine.click_tab(window=main_window, tab_name='Płace i Kadry')
Machine.click_button(window=main_window, button_name='Kadry')
time.sleep(5)

# Znalezienie menu "Przenoszenie danych"
try:
    menu = main_window.child_window(title="Przenoszenie danych", control_type="MenuItem")
    menu.click_input()
    print("Otworzono menu 'Przenoszenie danych'!")
except Exception:
    print("Nie znaleziono menu 'Przenoszenie danych'!")

time.sleep(1)

# Znalezienie i kliknięcie przycisku "Import"
try:
    import_button = main_window.child_window(title="Import", control_type="Button")
    if import_button.exists(timeout=3):
        import_button.click_input()
        print("Kliknięto przycisk 'Import'!")
    else:
        print("Przycisk 'Import' nie został znaleziony!")
except Exception:
    print("Błąd podczas klikania przycisku 'Import'!")

# Wypisanie wszystkich okien aplikacji dla diagnostyki
for w in main_window.children():
    print(f"Okno: {w.window_text()}")

# Uruchomienie importu i zamknięcie okna
Machine.click_and_input_button(window=main_window, button_name='uxStart')
Machine.click_button(window=main_window, button_name='Zamknij')

print("Skrypt zakończył działanie.")
