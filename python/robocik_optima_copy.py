from pywinauto import Application, Desktop
import time

# 🔍 1. Połączenie z oknem Comarch ERP Optima
print("\n🔍 Próbuję połączyć się z oknem Comarch ERP Optima...")


# Połączenie z aplikacją
app = Application(backend="uia").connect(title_re=".*Comarch ERP Optima.*")
main_window = app.window(title_re=".*Comarch ERP Optima.*")

buttons = main_window.descendants(control_type="Button")

# Sprawdzenie dostępnych przycisków
print("\n📋 Znalezione przyciski:")
for btn in buttons:
    print(f"- {btn.window_text()}")

# Kliknięcie właściwego przycisku
for btn in buttons:
    if "uxButton1" in btn.window_text():
        btn.click()
        print("✅ Kliknięto przycisk 'uxButton1'!")
        break
else:
    print("❌ Nie znaleziono przycisku 'uxButton1'.")

