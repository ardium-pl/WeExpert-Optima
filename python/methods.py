from pywinauto import WindowSpecification

class Machine:
    @staticmethod
    def find_buttons(window: str):
        """Wyszukuje i wypisuje wszystkie przyciski w podanym oknie aplikacji."""
        buttons = window.descendants(control_type="Button")

        print("\n📋 Znalezione przyciski:")
        for btn in buttons:
            print(f"- {btn.window_text()}")

        return buttons 

    @staticmethod
    def click_button(window: str, button_name: str):
        """Szuka i klika przycisk na podstawie jego nazwy."""
        buttons = window.descendants(control_type="Button")

        for btn in buttons:
            if button_name in btn.window_text():
                btn.click()
                print(f"✅ Kliknięto przycisk '{button_name}'!")
                return True  
        
        print(f"❌ Nie znaleziono przycisku '{button_name}'.")
        return False  
    
    @staticmethod
    def click_and_input_button(window: str, button_name: str):
        """Szuka i klika przycisk na podstawie jego nazwy."""
        buttons = window.descendants(control_type="Button")

        for btn in buttons:
            if button_name in btn.window_text():
                btn.click_input()
                print(f"✅ Kliknięto przycisk '{button_name}'!")
                return True  
        
        print(f"❌ Nie znaleziono przycisku '{button_name}'.")
        return False  
    
    @staticmethod
    def find_tabs(window: str):
        """Wyszukuje i wypisuje wszystkie dostępne zakładki w podanym oknie."""
        tab_items = window.descendants(control_type="TabItem")  

        if tab_items:
            print("\n📂 Znalezione zakładki:")
            for tab in tab_items:
                print(f"- {tab.window_text()}")
        else:
            print("❌ Nie znaleziono żadnych zakładek w aplikacji.")
    
    @staticmethod
    def click_tab(window: str, tab_name: str):
        """Wyszukuje i klika w zakładkę o podanej nazwie."""
        tab_items = window.descendants(control_type="TabItem")  

        for tab in tab_items:
            if tab_name in tab.window_text():
                print(f"🖱 Klikam w zakładkę: {tab.window_text()}")
                tab.select()
                return True  

        print(f"❌ Nie znaleziono zakładki: {tab_name}")
        return False 

    @staticmethod
    def buttons(window: str):
        """Przeszukuje po wszystkich przyciskach i zwraca ich właściwości"""
        buttons = window.descendants(control_type="Button")

        for button in buttons:
            try:
                # Sprawdzenie dostępnych metod i poprawne ich użycie
                text = button.window_text()
                automation_id = button.automation_id() if hasattr(button, 'automation_id') else "Brak ID"
                control_type = button.get_properties().get("control_type", "Brak control_type")

                print(f"Przycisk: {text}, ID: {automation_id}, Control Type: {control_type}")

            except Exception as e:
                print(f"Błąd podczas odczytu przycisku: {e}")

    @staticmethod
    def on_click(x, y, button, pressed):
        """Funkcja wywoływana po kliknięciu myszy"""
        if pressed:  # Wykonaj tylko przy pierwszym naciśnięciu (nie przy puszczeniu)
            print(f"\n>>> Kliknięto w: {button} ({x}, {y})")
                
            # Pobranie elementu w danej pozycji
            try:
                from pywinauto import Desktop  # Musisz mieć zainstalowane pywinauto
                element = Desktop(backend="uia").from_point(x, y)
                if element:
                    print("🎯 Znaleziono element!")
                    print("🔹 Text:", element.window_text())
                    print("🔹 Automation ID:", getattr(element, "automation_id", "Brak ID"))
                    print("🔹 Control Type:", element.get_properties().get("control_type", "Nieznany"))
                    print("🔹 Bounding Rectangle:", element.rectangle())
                else:
                    print("❌ Brak elementu w tym miejscu.")
            except Exception as e:
                print("⚠️ Błąd przy wykrywaniu elementu:", e)

