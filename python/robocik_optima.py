from pywinauto import Application, Desktop
import time
from methods import Machine
from pynput import mouse

optima_path = r"C:\Program Files (x86)\Comarch ERP Optima\Comarch OPT!MA.exe"

print(" Uruchamiam aplikację Comarch ERP Optima...")

# Uruchomienie aplikacji
try:
    app = Application(backend="uia").start(cmd_line=optima_path)
    print(" Aplikacja została uruchomiona pomyślnie!")
except Exception as e:
    print(f" Nie udało się uruchomić aplikacji: {e}")

# Czekanie na pojawienie się okna głównego
time.sleep(20) 

print(" Próbuję połączyć się z oknem Comarch ERP Optima...")

# Połączenie z aplikacją
app = Application(backend="uia").connect(title_re=".*Comarch ERP Optima.*", timeout=10)
main_window = app.window(title_re=".*Comarch ERP Optima.*")

try:
    zatwierdz_button = main_window.child_window(title="uxAcceptButton", control_type="Button")
    zatwierdz_button.click()
    print(" Kliknięto przycisk 'uxAcceptButton'!")
except Exception:
    print(" Nie znaleziono przycisku 'uxAcceptButton' po tytule. Szukam inaczej...")

#Machine.find_buttons(window=main_window)
Machine.click_button(window=main_window, button_name='uxButton1')
time.sleep(15)
#Machine.find_tabs(window=main_window)
Machine.click_tab(window=main_window, tab_name='Płace i Kadry')
Machine.click_button(window=main_window, button_name='Kadry')
time.sleep(5)
#Machine.find_buttons(window=main_window)
menu = main_window.child_window(title="Przenoszenie danych", control_type="MenuItem")
# Kliknięcie menu
menu.click_input()
#Machine.find_buttons(window=main_window)

time.sleep(1)

# Znalezienie przycisku "Import"
import_button = main_window.child_window(title="Import", control_type="Button")

# Kliknięcie przycisku
if import_button.exists(timeout=3):
    import_button.click_input()
else:
    print("Przycisk 'Import' nie został znaleziony!")

for w in main_window.children():
    print(f"Okno: {w.window_text()}")  # Sprawdź, czy "Przenoszenie danych" jest podoknem

Machine.click_and_input_button(window=main_window, button_name='uxStart')
Machine.click_button(window=main_window, button_name='Zamknij')
