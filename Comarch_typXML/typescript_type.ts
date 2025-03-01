export type CDATA<T> = {
    [x: string]: any;
    _cdata: T;
  };
  
  export function createCDATA<T>(value: T): CDATA<T> {
    return {
      _cdata: value,
    };
  }
  
  

// Główna struktura: PracownicyExt
export type PRACOWNICY_EXT = {
    ROOT:{
        _attributes:{
            xmlns: string
        };
        PRACOWNICY_EXT: {
            WERSJA: string;
            BAZA_ZRD_ID: string;
            BAZA_DOC_ID: string;
            PRACOWNIK: PRACOWNIK[]; // Tablica obiektów typu Pracownik
        }
    };

};

// Struktura dla PRACOWNIK
export type PRACOWNIK = {
    PRA_IRID: CDATA<string>;
    PRA_KOD: CDATA<string>;
    PRA_ARCHIWALNY: "Tak" | "Nie";
    PRA_NADRZEDNY: "Tak" | "Nie";
    PRACOWNIK_EXT_ETATY: PracownikExtEtaty;
    UMOWY: Partial<Umowy>;
    PRACOWNIK_EXT_IDX_GROUP: PracownikExtIdxGroup;
};

export type PracownikExtEtaty = {
    PRACOWNIK_EXT_ETAT: PracownikExtEtat[]; // Tablica elementów PRACOWNIK_EXT_ETAT
};

// Struktura dla PRACOWNIK_EXT_ETAT
export type PracownikExtEtat = {
    PRE_IRID?: CDATA<string>;
    PRE_DATA_OD?: CDATA<string>;
    PRE_DATA_DO?: CDATA<string>;
    PRE_KAL_IRID?: CDATA<string>;
    PRE_AKRONIM?: CDATA<string>;
    PRE_NAZWISKO?: CDATA<string>;
    PRE_IMIE_1?: CDATA<string>;
    PRE_IMIE_2?: CDATA<string>;
    PRE_PESEL?: CDATA<string>;
    PRE_NIP_KRAJ?: CDATA<string>;
    PRE_NIP?: CDATA<string>;
    PRE_MIEJSCE_URODZENIA?: CDATA<string>;
    PRE_IMIE_OJCA?: CDATA<string>;
    PRE_IMIE_MATKI?: CDATA<string>;
    PRE_NAZWISKO_RODOWE?: CDATA<string>;
    PRE_NAZWISKO_RODOWE_MATKI?: CDATA<string>;
    PRE_MLD_KRAJ?: CDATA<string>;
    PRE_MLD_KOD_KRAJU?: CDATA<string>;
    PRE_MLD_WOJEWODZTWO?: CDATA<string>;
    PRE_MLD_POWIAT?: CDATA<string>;
    PRE_MLD_GMINA?: CDATA<string>;
    PRE_MLD_KOD_GMINY?: number;
    PRE_MLD_MIASTO?: CDATA<string>;
    PRE_MLD_ULICA?: CDATA<string>;
    PRE_MLD_NR_DOMU?: CDATA<string>;
    PRE_MLD_NR_LOKALU?: CDATA<string>;
    PRE_MLD_KOD_POCZTOWY?: CDATA<string>;
    PRE_MLD_POCZTA?: CDATA<string>;
    PRE_ZAM_KRAJ?: CDATA<string>;
    PRE_ZAM_KOD_KRAJU?: CDATA<string>;
    PRE_ZAM_WOJEWODZTWO?: CDATA<string>;
    PRE_ZAM_POWIAT?: CDATA<string>;
    PRE_ZAM_GMINA?: CDATA<string>;
    PRE_ZAM_MIASTO?: CDATA<string>;
    PRE_ZAM_ULICA?: CDATA<string>;
    PRE_ZAM_NA_DOMU?: CDATA<string>;
    PRE_ZAM_NR_LOKALU?: CDATA<string>;
    PRE_ZAM_KOD_POCZTOWY?: CDATA<string>;
    PRE_ZAM_POCZTA?: CDATA<string>;
    PRE_KOR_KRAJ?: CDATA<string>;
    PRE_KOR_KOD_KRAJU?: CDATA<string>;
    PRE_KOR_WOJEWODZTWO?: CDATA<string>;
    PRE_KOR_POWIAT?: CDATA<string>;
    PRE_KOR_GMINA?: CDATA<string>;
    PRE_KOR_MIASTO?: CDATA<string>;
    PRE_KOR_ULICA?: CDATA<string>;
    PRE_KOR_NR_DOMU?: CDATA<string>;
    PRE_KOR_NR_LOKALU?: CDATA<string>;
    PRE_KOR_KOD_POCZTOWY?: CDATA<string>;
    PRE_KOR_POCZTA?: CDATA<string>;
    PRE_TELEFON1?: CDATA<string>;
    PRE_TELEFON_SMS?: CDATA<string>;
    PRE_E_MAIL?: CDATA<string>;
    PRE_TELEFON2?: CDATA<string>;
    PRE_FAX?: CDATA<string>;
    PRE_TELEKS?: CDATA<string>;
    PRE_SKRYTKA_POCZT?: CDATA<string>;
    PRE_STRONA_WWW?: CDATA<string>;
    PRE_ICE_OSOBA_KONTAKTOWA?: CDATA<string>;
    PRE_ICE_TELEFON?: CDATA<string>;
    PRE_ICE_ADRES?: CDATA<string>;
    PRE_WOJSKO_STOSUNEK_DO_SLUZBY?: CDATA<string>;
    PRE_WOJSKO_STOPIEN?: CDATA<string>;
    PRE_WOJSKO_SPECJALNOSC?: CDATA<string>;
    PRE_WOJSKO_WKU?: CDATA<string>;
    PRE_WOJSKO_NR_KSIAZECZKI?: CDATA<string>;
    PRE_WOJSKO_PRZYDZ?: CDATA<string>;
    PRE_DOWOD_OS_NR?: CDATA<string>;
    PRE_DOWOD_OS_MIEJSCE_WYDANIA?: CDATA<string>;
    PRE_DOWOD_OS_WYDANY_PRZEZ?: CDATA<string>;
    PRE_PASZPORT_NR?: CDATA<string>;
    PRE_OBYWATELSTWO?: CDATA<string>;
    PRE_OBYWATELSTWO_KOD_KRAJU?: CDATA<string>;
    PRE_PLEC?: CDATA<"M" | "K">;
    PRE_STAN_CYWILNY?: CDATA<string>;
    PRE_NR_W_AKTACH?: CDATA<string>;
    PRE_KARTA_POBYTU_CUDZOZ?: CDATA<string>;
    PROGI?: CDATA<string>; // Puste w XML
    PRE_KOSZTY_MNOZNIK?: number;
    PRE_KOSZTY_TYTUL?: number;
    PRE_ULGA_MNOZNIK?: number;
    PRE_PROC_WYNAGR_Z50PROC_KOSZT?: number;
    PRE_NIE_ODLICZAC_50PROC_KOSZT?: "Tak" | "Nie";
    PRE_POD_ZWOL_PIT26?: number;
    PRE_ADRES_NA_PIT?: "Tak" | "Nie";
    PRE_OGRANICZONY_PIT_NIEREZYDENT?: "Tak" | "Nie";
    PRE_RODZAJ_NR_IDENTYF?: number;
    PRE_ZAGRANICZNY_NR_IDENTYF_PIT?: CDATA<string>;
    PRE_DATA_ZATRUDNIENIA?: CDATA<string>;
    PRE_DATA_ZWOLNIENIA?: CDATA<string>;
    PRE_ETAT_STOSUNEK_PRACY?: number;
    PRE_ETAT_DATA_ZAWARCIA_UMOWY?: CDATA<string>;
    PRE_ETAT_DATA_ROZPOCZECIA_PRACY?: CDATA<string>;
    PRE_ETAT_RODZAJ_UMOWY?: CDATA<string>;
    PRE_ETAT_RODZAJ_ZATRUDNIENIA?: number;
    PRE_PRACOWNIK_TYMCZASOWY?: "Tak" | "Nie";
    PRE_ROZLICZENIE_CZASU_PRACY?: number;
    PRE_INDYWIDUALNY_LIMIT_NADGODZIN?: "Tak" | "Nie";
    PRE_WYMIAR_ETATL?: number;
    PRE_WYMIAR_ETATM?: number;
    PRE_STAWKA_ZASZEREGOWANIA?: number;
    PRE_STAWKA_ZASZEREGOWANIA_WYMIAR?: number;
    PRE_STAWKA_ZASZEREGOWANIA_MINIMALNA?: "Tak" | "Nie";
    PRE_LIMIT_URLOPU_PIERWSZA_PRACA?: "Tak" | "Nie";
    PRE_GWARANTOWANY_PROC_MINIMALNEJ?: number;
    PRE_NORMA_DOBOWA_DO_URLOPU?: CDATA<string>;
    PRE_LICZBA_DNI_DODATK_LIMITU_URL?: number;
    PRE_ODDELEGOWANY_ZA_GRANICE?: "Tak" | "Nie";
    PRE_ODDELEGOWANY_ZUS_W_POLSCE?: "Tak" | "Nie";
    PRE_ODDELEGOWANY_PIT_W_POLSCE?: "Tak" | "Nie";
    PRE_ODDELEGOWANY_PROPORC_ODLICZ?: "Tak" | "Nie";
    PRE_ODDELEGOWANY_KRAJ?: CDATA<string>;
    PRE_ODDELEGOWANY_WALUTA_ROZL?: CDATA<string>;
    PRE_ODDELEGOWANY_WALUTA_DIETY?: CDATA<string>;
    PRE_ODDELEGOWANY_WARTOSC_DIETA?: number;
    PRE_KOD_TYT_UBEZPIECZENIA?: number;
    PRE_KOD_PRAWO_DO_RENTY_EMERYT?: number;
    PRE_KOD_STOPNIA_NIEPELNSPR?: number;
    PRE_OBOWIAZKOWE_UBEZP_EMERYT?: "Tak" | "Nie";
    PRE_OBOWIAZKOWE_UBEZP_RENTOW?: "Tak" | "Nie";
    PRE_OBOWIAZKOWE_UBEZP_CHOROB?: "Tak" | "Nie";
    PRE_OBOWIAZKOWE_UBEZP_WYPADK?: "Tak" | "Nie";
    PRE_DOBROWOLNE_UBEZP_EMERYT?: "Tak" | "Nie";
    PRE_DOBROWOLNE_UBEZP_RENTOW?: "Tak" | "Nie";
    PRE_DOBROWOLNE_UBEZP_CHOROB?: "Tak" | "Nie";
    PRE_DOBROWOLNE_UBEZP_ZDROWOT?: "Tak" | "Nie";
    PRE_DOBROWOLNE_ZDROWOT_SKLADKA?: number;
    PRE_SKLADKA_ZDROWOT_OGRAN_DO_PIT?: "Tak" | "Nie";
    PRE_ROZWIAZANIE_KOD_TRYBU?: CDATA<string>;
    PRE_ROZWIAZANIE_KOD_PODST_PRAWNEJ?: CDATA<string>;
    PRE_ROZWIAZANIE_PODST_PRAWNA_KOD550?: CDATA<string>;
    PRE_ROZWIAZANIE_STRONA_INICJUJACA?: number;
    PRE_KOD_NIEZDOLNOSCI?: number;
    PRE_KOD_PRACY_GORNICZEJ?: number;
    PRE_KOD_WARUNKI_SZCZEG?: CDATA<string>;
    PRE_KOD_FEP?: number;
    PRE_KOD_NFZ?: CDATA<string>;
    PRE_KOD_POKREWIENSTWA?: number;
    PRE_WSPOL_GOSP?: "Tak" | "Nie";
    PRE_KOD_WYKSZTALCENIA?: number;
    PRE_NAUCZYCIEL?: "Tak" | "Nie";
    PRE_ZUS_WYCHOWAWCZY_SREDNIA_PODST?: number;
    PRE_NIE_GENERUJ_PODWYZ_MACIERZYN?: "Tak" | "Nie";
    PRE_PFRON_KOD_WYKSZTALCENIA?: number;
    PRE_PFRON_PELNE_DANE_ADRESOWE?: "Tak" | "Nie";
    PRE_PFRON_WZROST_ZATRUD_NETTO?: "Tak" | "Nie";
    PRE_PFRON_DOFINANS_POMOC_PUBL?: "Tak" | "Nie";
    PRE_PFRON_ZATRUD_ART26B?: "Tak" | "Nie";
    PRE_GUS_GLOWNE_MIEJSCE_PRACY?: "Tak" | "Nie";
    PRE_GUS_PIERWSZA_PRACA?: "Tak" | "Nie";
    PRE_GUS_PORA_NOCNA?: "Tak" | "Nie";
    PRE_GUS_SEZONOWA_DORYWCZA?: "Tak" | "Nie";
    PRE_GUS_SYMBOL_WYKSZTALCENIA?: number;
    PRE_GUS_SYMBOL_SYSTEMU_CZASU_PRACY?: number;
    PRE_FP_NIE_NALICZAC_PONIZEJ_MINIMALN?: "Tak" | "Nie";
    PRE_FP_NIE_NALICZAC?: "Tak" | "Nie";
    PRE_FGSP_NIE_NALICZAC?: "Tak" | "Nie";
    PRE_IND_PODSTAWA_URLOP?: "Tak" | "Nie";
    PRE_IND_PODSTAWA_URLOP_ILOSC_MC?: number;
    PRE_IND_PODSTAWA_CHOROB?: "Tak" | "Nie";
    PRE_IND_PODSTAWA_CHOROB_ILOSC_MC?: number;
    PRE_IND_PROC_WYNAGR_CHOROB?: "Tak" | "Nie";
    PRE_IND_PROC_WYNAGR_CHOROB_PROC?: number;
    PRE_CHOROB_FINANSOW_PRACOD?: "Tak" | "Nie";
    PRE_CHOROB_FINANSOW_PRACOD_DNI?: number;
    PRE_BO_ZUS_DNI_W_POPRZ_FIRMIE?: number;
    PRE_BO_ZUS_90DNI_CIAGLOSCI?: number;
    PRE_BO_ZUS_PRAWO_DO_ZASILKU_DATAOD?: CDATA<string>;
    PRE_BO_ZUS_OPIEKA_DZIECKO_DO_60DNI?: number;
    PRE_BO_ZUS_OPIEKA_NIEPELNSPR_DO_30DNI?: number;
    PRE_BO_ZUS_OPIEKA_RODZINA_DO_14DNI?: number;
    PRE_PPK_OBNIZENIE_SKLADKI_PODST?: "Tak" | "Nie";
    PRE_PPK_OBNIZENIE_SKLADKI_PODST_PROC?: number;
    PRE_PPK_SKLADKA_DODATK?: number;
    PRE_PPK_INDYW_SKLADKA_DODATK_PRACODAWCY?: "Tak" | "Nie";
    PRE_PPK_INDYW_SKLADKA_DODATK_PRACODAWCY_PROC?: number;
    PRE_PPK_DANE_KONTAKT_DO_IF?: "Tak" | "Nie";
    PRE_UWAGI?: CDATA<string>;
    PRE_OPIS?: CDATA<string>;
    PRE_PRAWO_JAZDY?: "Tak" | "Nie";
    PRE_PRAWO_JAZDY_KATEGORIA?: CDATA<string>;
    PRE_NIE_ROZLICZAC?: "Tak" | "Nie";
    PRE_RODZICIELSKI_CZESC_ETATU?: "Tak" | "Nie";
    PRE_RODZICIELSKI_STAWKA?: number;
    PRE_RODZICIELSKI_RODZAJ_STAWKI?: number;
    PRE_RODZICIELSKI_MINIMALNA?: "Tak" | "Nie";
    PRE_RODZICIELSKI_WYMIAR_ETATUL?: number;
    PRE_RODZICIELSKI_WYMIAR_ETATUM?: number;
    PRE_TYP_PODMIOTU?: number;
    PRE_RODZ_DOKUMENTU?: "Tak" | "Nie";
    PRE_ZWOL_PIT?: number;
    PRE_NIE_POBIER_ZAL_FIS?: "Tak" | "Nie";
    PRE_ZWOL_PIT_ROK?: number;
    PRE_NIE_POMN_DOCH_ULGA?: "Tak" | "Nie";
    PRE_NIE_STOS_PRZEDL_ZAL_FIS?: "Tak" | "Nie";
    PRE_ULGA_MNOZNIK_L?: number;
    PRE_ULGA_MNOZNIK_M?: number;
    PRE_PROGI_PODATKOWE?: number;
    PRE_ULGA_DODATKOWA?: number;
    PRE_KARTA_NAUCZYCIELA?: "Tak" | "Nie";
    PRE_PRM_ODDELEGOWANY_WALUTA?: CDATA<string>;
};

export type Umowy = {
    UMOWA: Partial<Umowa>[]; // Tablica elementów UMOWA
};


// main.ts xmlprecessor te pliki mnie interesuję
// Struktura dla UMOWA
export type Umowa = {
    UMW_IRID: CDATA<string>;
    UMW_DDF_IRID: CDATA<string>;
    UMW_DDF_IRID2: CDATA<string>;
    UMW_DDF_SYMBOL: CDATA<string>;
    UMW_DDF_NUMERACJA: CDATA<string>;
    UMW_TWP_IRID: CDATA<string>;
    UMW_TWP_IRID2: CDATA<string>;
    UMW_TWP_NAZWA: CDATA<string>;
    UMW_TYU_ID: number;
    UMW_NUMER_STRING: CDATA<string>;
    UMW_NUMER_NR: number;
    UMW_DATA_DOK: CDATA<string>;
    UMW_DATA_OD: CDATA<Date>;
    UMW_DATA_DO: CDATA<Date>;
    UMW_DATA_ZAWARCIA: CDATA<Date>;
    UMW_TYTUL: CDATA<string>;
    UMW_WARTOSC: CDATA<string>;
    UMW_RODZAJ: CDATA<string>;
    UMW_SPLACONO: number;
    UMW_WALUTA: CDATA<string>;
    UMW_WG_BRUTTO: "Tak" | "Nie";
    UMW_JEST_ZUS: "Tak" | "Nie";
    UMW_BRUTTO: number;
    UMW_FIS: number;
    UMW_ZUS: number;
    UMW_POMN_ZUS: "Tak" | "Nie";
    UMW_STAWKA_PODATKU: number;
    UMW_KOSZTY_KWOTA: number;
    UMW_KOSZTY_PROC: number;
    UMW_JEST_EMERYTAL: "Tak" | "Nie";
    UMW_JEST_RENTOWE: "Tak" | "Nie";
    UMW_JEST_CHOROBOWE: "Tak" | "Nie";
    UMW_JEST_WYPAD: "Tak" | "Nie";
    UMW_EMER_KOD: number;
    UMW_RENT_KOD: number;
    UMW_CHOR_KOD: number;
    UMW_WYPAD_KOD: number;
    UMW_ZDROW_KWOTA_PIERW_SKL: number;
    UMW_ZDROW_KOD: number;
    UMW_TYT_KONT_ZUS: number;
    UMW_JEST_DOBR_EMERYTAL: "Tak" | "Nie";
    UMW_JEST_DOBR_RENTOWE: "Tak" | "Nie";
    UMW_JEST_DOBR_CHOROBOWE: "Tak" | "Nie";
    UMW_JEST_DOBR_ZDROW: "Tak" | "Nie";
    UMW_OGRANICZ_SKL_ZDROW: "Tak" | "Nie";
    UMW_SPLACONA: number;
    UMW_SYMBOL: CDATA<string>;
    UMW_OPIS: CDATA<string>;
    UMW_NALICZAJ_FUNDUSZE: "Tak" | "Nie";
    UMW_WLICZ_CHOR_ZAKONCZONA: "Tak" | "Nie";
    UMW_UWZGL_MIN: "Tak" | "Nie";
    UMW_CZAS_PRACY: "Tak" | "Nie";
    UMW_STAWKA_GODZ: number;
    UMW_ULGA_MNOZNIK_L: number;
    UMW_ULGA_MNOZNIK_M: number;
    UMW_NIE_POBIERAJ_ZALICZKI_PODATKU: number;
    UMW_ODDELEGOWANY: number;
    UMW_ODDELEGOWANY_DIETA: number;    
    UMW_ODDELEGOWANY_WAULTA: CDATA<string>;
    UMW_ODDELEGOWANY_FIS: number;
    UMW_ODDELEGOWANY_KRAJ: CDATA<string>;
    UMW_ODDELEGOWANY_WALUTA_DIETA: CDATA<string>;
    UMW_ODDELEGOWANY_PROP_ODL: number;
    UMOWA_ZESTAWIENIA_CZASU: CDATA<string>; // Puste pole w XML
};

export type PracownikExtIdxGroup = {
    PRACOWNIK_EXT_IDX: PracownikExtIdx[]; // Tablica elementów PRACOWNIK_EXT_IDX
};

// Struktura dla PRACOWNIK_EXT_IDX
export type PracownikExtIdx = {
    PRI_IRID: CDATA<string>;
    PRI_RODZAJ: number;
    PRI_AKRONIM: CDATA<string>;
    PRI_IMIE_1: CDATA<string>;
    PRI_NAZWISKO: CDATA<string>;
    PRI_PESEL: CDATA<string>;
    PRI_DATA_OD: CDATA<string>;
    PRI_DATA_DO: CDATA<string>;
    PRI_OPIS: CDATA<string>;
    PRI_ARCHIWALNY: "Tak" | "Nie";
    PRI_NADRZEDNY: "Tak" | "Nie";
};
