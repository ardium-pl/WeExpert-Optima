from pywinauto import Application, Desktop
import time
from methods import Machine
from pynput import mouse

print("\n🔍 Próbuję połączyć się z oknem Comarch ERP Optima...")

# Połączenie z aplikacją
app = Application(backend="uia").connect(title_re=".*Comarch ERP Optima.*", timeout=10)
main_window = app.window(title_re=".*Comarch ERP Optima.*")

try:
    zatwierdz_button = main_window.child_window(title="uxAcceptButton", control_type="Button")
    zatwierdz_button.click()
    print("✅ Kliknięto przycisk 'uxAcceptButton'!")
except Exception:
    print("❌ Nie znaleziono przycisku 'uxAcceptButton' po tytule. Szukam inaczej...")

Machine.find_buttons(window=main_window)
Machine.click_button(window=main_window, button_name='uxButton1')
time.sleep(10)
Machine.find_tabs(window=main_window)
Machine.click_tab(window=main_window, tab_name='Płace i Kadry')
Machine.click_button(window=main_window, button_name='Kadry')
time.sleep(5)
Machine.find_buttons(window=main_window)
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

#ribbon_window = main_window.child_window(title='AutoHideContainer Left')
#Machine.find_buttons(window=ribbon_window)

#dane = Application(backend='uia').connect(title_re=".*Comarch ERP Optima.*", timeout = 5)
#sub_window = dane.window(title='Przenoszenie danych')
#Machine.find_buttons(window=sub_window)




#time.sleep(3)
#menu.child_window(title="Import", control_type="MenuItem").click_input()

#print("🖱 Czekam na kliknięcie w aplikacji Optima...")
#with mouse.Listener(on_click=Machine.on_click) as listener:
#   listener.join()

# stworzyć klasę, a w środku metody, tylko zmieniać nazwy funkcji, spróbować dodać asychnroniczność(czekać aż funkcja coś zwróci albo się skończy)