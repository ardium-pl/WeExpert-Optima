import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // Importowanie generatora UUID
import { RequestData } from './server';
import { Builder } from "xml2js";
import * as xmljs from "xml-js";
import { xmlFilesFolder } from './constants';
import { CDATA, PRACOWNICY_EXT } from './typescript_type';
import { createCDATA } from './typescript_type';

export class RequestDataService {
    
    // Generowanie unikalnego identyfikatora w formacie wielkich liter
    public generateIRID(): string {
      return uuidv4().toUpperCase();
    }
  
    // Przetwarzanie danych 
    public processRequestData(data: RequestData[]): RequestData[] {
        const processedData: RequestData[] = data.map((item) => {
      
          // Tworzymy obiekt zgodny z nową strukturą danych
          const requestDataObject: RequestData = {
    
              // Dane osobowe pracownika
              surname: item.surname,
              name: item.name,
              pesel: '12345678901',
              // Dane dotyczące umowy
              salary: item.salary,
              title: 'Umowa o pracę', // Domyślna wartość tytułu umowy
      
              // Dane dotyczące daty
              date: item.date ? new Date(item.date) : new Date(), // Konwersja na obiekt Date
          };
      
          return requestDataObject;
        });
      
        return processedData;
      }    
      

      public convertDataToXml(processedXmlData: RequestData): string {
        const builder = new Builder({
          xmldec: { version: '1.0', encoding: 'UTF-8' },
          rootName: 'ROOT', // Główna nazwa elementu XML
          renderOpts: { pretty: false },
        });
      
        // Funkcja do bezpiecznego odczytu danych z CDATA
        const getCDataValue = (data: CDATA<string> | undefined, defaultValue = 'Unknown') =>
          data ? data.toXML() : `<![CDATA[${defaultValue}]]>`;
      
        // Tworzenie danych w formacie zgodnym z XML
        const xmlReadyData: PRACOWNICY_EXT = {
            ROOT:{
                _attributes:{
                    xmlns: "http://www.comarch.pl/cdn/optima/offline"
                },
                PRACOWNICY_EXT:{
                    WERSJA: '2025.01',
                    BAZA_ZRD_ID: 'WYMIANA_DANYCH',
                    BAZA_DOC_ID: 'WYMIANA_DANYCH',
                    PRACOWNIK: [
                      {
                        PRA_IRID: createCDATA(this.generateIRID()), // Generowanie IRID dla pracownika
                        PRA_KOD: createCDATA('IMP10'),
                        PRA_ARCHIWALNY: 'Nie',
                        PRA_NADRZEDNY: 'Nie',
                        PRACOWNIK_EXT_ETATY: {
                          PRACOWNIK_EXT_ETAT: [
                            {
                                PRE_IRID: createCDATA(this.generateIRID()), // IRID dla etatu
                                PRE_DATA_OD: createCDATA('1900-01-01'),
                                PRE_DATA_DO: createCDATA('2999-12-31'),
                                PRE_KAL_IRID: createCDATA("B88A311C-E650-413E-BFF9-5A40C54E21D1"),
                                PRE_AKRONIM: createCDATA('IMP10'),
                                PRE_NAZWISKO: createCDATA(processedXmlData.surname),
                                PRE_IMIE_1: createCDATA(processedXmlData.name),
                                PRE_IMIE_2: createCDATA(' '),
                                PRE_PESEL: createCDATA(' '),
                                PRE_NIP_KRAJ: createCDATA(' '),
                                PRE_NIP: createCDATA(' '),
                                PRE_MIEJSCE_URODZENIA: createCDATA(' '),
                                PRE_IMIE_OJCA: createCDATA(' '),
                                PRE_IMIE_MATKI: createCDATA(' '),
                                PRE_NAZWISKO_RODOWE: createCDATA(' '),
                                PRE_NAZWISKO_RODOWE_MATKI: createCDATA(' '),
                                PRE_MLD_KRAJ: createCDATA('Polska'),
                                PRE_MLD_KOD_KRAJU: createCDATA('PL'),
                                PRE_MLD_WOJEWODZTWO: createCDATA(' '),
                                PRE_MLD_POWIAT: createCDATA(' '),
                                PRE_MLD_GMINA: createCDATA(' '),
                                PRE_MLD_KOD_GMINY: 0,
                                PRE_MLD_MIASTO: createCDATA(' '),
                                PRE_MLD_ULICA: createCDATA(' '),
                                PRE_MLD_NR_DOMU: createCDATA(' '),
                                PRE_MLD_NR_LOKALU: createCDATA(' '),
                                PRE_MLD_KOD_POCZTOWY: createCDATA(' '),
                                PRE_MLD_POCZTA: createCDATA(' '),
                                PRE_ZAM_KRAJ: createCDATA('Polska'),
                                PRE_ZAM_KOD_KRAJU: createCDATA('PL'),
                                PRE_ZAM_WOJEWODZTWO: createCDATA(' '),
                                PRE_ZAM_POWIAT: createCDATA(' '),
                                PRE_ZAM_GMINA: createCDATA(' '),
                                PRE_ZAM_MIASTO: createCDATA(' '),
                                PRE_ZAM_ULICA: createCDATA(' '),
                                PRE_ZAM_NA_DOMU: createCDATA(' '),
                                PRE_ZAM_NR_LOKALU: createCDATA(' '),
                                PRE_ZAM_KOD_POCZTOWY: createCDATA(' '),
                                PRE_ZAM_POCZTA: createCDATA(' '),
                                PRE_KOR_KRAJ: createCDATA('Polska'),
                                PRE_KOR_KOD_KRAJU: createCDATA('PL'),
                                PRE_KOR_WOJEWODZTWO: createCDATA(' '),
                                PRE_KOR_POWIAT: createCDATA(' '),
                                PRE_KOR_GMINA: createCDATA(' '),
                                PRE_KOR_MIASTO: createCDATA(' '),
                                PRE_KOR_ULICA: createCDATA(' '),
                                PRE_KOR_NR_DOMU: createCDATA(' '),
                                PRE_KOR_NR_LOKALU: createCDATA(' '),
                                PRE_KOR_KOD_POCZTOWY: createCDATA(' '),
                                PRE_KOR_POCZTA: createCDATA(' '),
                                PRE_TELEFON1: createCDATA(' '),
                                PRE_TELEFON_SMS: createCDATA(' '),
                                PRE_E_MAIL: createCDATA(' '),
                                PRE_TELEFON2: createCDATA(' '),
                                PRE_FAX: createCDATA(' '),
                                PRE_TELEKS: createCDATA(' '),
                                PRE_SKRYTKA_POCZT: createCDATA(' '),
                                PRE_STRONA_WWW: createCDATA(' '),
                                PRE_ICE_OSOBA_KONTAKTOWA: createCDATA(' '),
                                PRE_ICE_TELEFON: createCDATA(' '),
                                PRE_ICE_ADRES: createCDATA(' '),
                                PRE_WOJSKO_STOSUNEK_DO_SLUZBY: createCDATA(' '),
                                PRE_WOJSKO_STOPIEN: createCDATA(' '),
                                PRE_WOJSKO_SPECJALNOSC: createCDATA(' '),
                                PRE_WOJSKO_WKU: createCDATA(' '),
                                PRE_WOJSKO_NR_KSIAZECZKI: createCDATA(' '),
                                PRE_WOJSKO_PRZYDZ: createCDATA(' '),
                                PRE_DOWOD_OS_NR: createCDATA(' '),
                                PRE_DOWOD_OS_MIEJSCE_WYDANIA: createCDATA(' '),
                                PRE_DOWOD_OS_WYDANY_PRZEZ: createCDATA(' '),
                                PRE_PASZPORT_NR: createCDATA(' '),
                                PRE_OBYWATELSTWO: createCDATA('POLSKIE'),
                                PRE_OBYWATELSTWO_KOD_KRAJU: createCDATA('PL'),
                                PRE_PLEC: createCDATA('M'),
                                PRE_STAN_CYWILNY: createCDATA(' '),
                                PRE_NR_W_AKTACH: createCDATA(' '),
                                PRE_KARTA_POBYTU_CUDZOZ: createCDATA(' '),
                                PRE_KOSZTY_MNOZNIK: 1, // Ensures that the required field is not NULL
                                PRE_DATA_ZATRUDNIENIA: createCDATA('2025-01-02'),
                                PRE_DATA_ZWOLNIENIA: createCDATA('2999-12-31'),
                                PRE_ETAT_STOSUNEK_PRACY: 0,
                                PRE_ETAT_DATA_ZAWARCIA_UMOWY: createCDATA('2025-01-02'),
                                PRE_ETAT_DATA_ROZPOCZECIA_PRACY: createCDATA('2025-01-02'),
                                PRE_ETAT_RODZAJ_UMOWY: createCDATA('na czas nieokreślony'),
                                PRE_ETAT_RODZAJ_ZATRUDNIENIA: 0,
                                PRE_PRACOWNIK_TYMCZASOWY: 'Nie',
                                PRE_ROZLICZENIE_CZASU_PRACY: 0,
                                PRE_INDYWIDUALNY_LIMIT_NADGODZIN: 'Nie',
                                PRE_WYMIAR_ETATL: 1,
                                PRE_WYMIAR_ETATM: 1,
                                PRE_STAWKA_ZASZEREGOWANIA: 38,
                                PRE_STAWKA_ZASZEREGOWANIA_WYMIAR: 2,
                                PRE_STAWKA_ZASZEREGOWANIA_MINIMALNA: 'Nie',
                                PRE_LIMIT_URLOPU_PIERWSZA_PRACA: 'Nie',
                                PRE_GWARANTOWANY_PROC_MINIMALNEJ: 100,
                                PRE_NORMA_DOBOWA_DO_URLOPU: createCDATA('08:00'),
                                PRE_LICZBA_DNI_DODATK_LIMITU_URL: 0,
                                PRE_ODDELEGOWANY_ZA_GRANICE: 'Nie',
                                PRE_ODDELEGOWANY_ZUS_W_POLSCE: 'Tak',
                                PRE_ODDELEGOWANY_PIT_W_POLSCE: 'Tak',
                                PRE_ODDELEGOWANY_PROPORC_ODLICZ: 'Nie',
                                PRE_ODDELEGOWANY_KRAJ: createCDATA(' '),
                                PRE_ODDELEGOWANY_WALUTA_ROZL: createCDATA(' '),
                                PRE_ODDELEGOWANY_WALUTA_DIETY: createCDATA(' '),
                                PRE_ODDELEGOWANY_WARTOSC_DIETA: 0,
                                PRE_KOD_TYT_UBEZPIECZENIA: 99999,
                                PRE_KOD_PRAWO_DO_RENTY_EMERYT: 0,
                                PRE_KOD_STOPNIA_NIEPELNSPR: 0,
                                PRE_OBOWIAZKOWE_UBEZP_EMERYT: 'Nie',
                                PRE_OBOWIAZKOWE_UBEZP_RENTOW: 'Nie',
                                PRE_OBOWIAZKOWE_UBEZP_CHOROB: 'Nie',
                                PRE_OBOWIAZKOWE_UBEZP_WYPADK: 'Nie',
                                PRE_DOBROWOLNE_UBEZP_EMERYT: 'Nie',
                                PRE_DOBROWOLNE_UBEZP_RENTOW: 'Nie',
                                PRE_DOBROWOLNE_UBEZP_CHOROB: 'Nie',
                                PRE_DOBROWOLNE_UBEZP_ZDROWOT: 'Nie',
                                PRE_DOBROWOLNE_ZDROWOT_SKLADKA: 0,
                                PRE_SKLADKA_ZDROWOT_OGRAN_DO_PIT: 'Nie',
                                PRE_ROZWIAZANIE_KOD_TRYBU: createCDATA(' '),
                                PRE_ROZWIAZANIE_KOD_PODST_PRAWNEJ: createCDATA(' '),
                                PRE_ROZWIAZANIE_PODST_PRAWNA_KOD550: createCDATA(' '),
                                PRE_ROZWIAZANIE_STRONA_INICJUJACA: 0,
                                PRE_KOD_NIEZDOLNOSCI: 1,
                                PRE_KOD_PRACY_GORNICZEJ: 0,
                                PRE_KOD_WARUNKI_SZCZEG: createCDATA(' '),
                                PRE_KOD_FEP: 0,
                                PRE_KOD_NFZ: createCDATA(' '),
                                PRE_KOD_POKREWIENSTWA: 0,
                                PRE_WSPOL_GOSP: 'Nie',
                                PRE_KOD_WYKSZTALCENIA: 0,
                                PRE_NAUCZYCIEL: 'Nie',
                                PRE_ZUS_WYCHOWAWCZY_SREDNIA_PODST: 0,
                                PRE_NIE_GENERUJ_PODWYZ_MACIERZYN: 'Nie',
                                PRE_PFRON_KOD_WYKSZTALCENIA: 0,
                                PRE_PFRON_PELNE_DANE_ADRESOWE: 'Nie',
                                PRE_PFRON_WZROST_ZATRUD_NETTO: 'Nie',
                                PRE_PFRON_DOFINANS_POMOC_PUBL: 'Tak',
                                PRE_PFRON_ZATRUD_ART26B: 'Nie',
                                PRE_GUS_GLOWNE_MIEJSCE_PRACY: 'Tak',
                                PRE_GUS_PIERWSZA_PRACA: 'Nie',
                                PRE_GUS_PORA_NOCNA: 'Nie',
                                PRE_GUS_SEZONOWA_DORYWCZA: 'Nie',
                                PRE_GUS_SYMBOL_WYKSZTALCENIA: 0,
                                PRE_GUS_SYMBOL_SYSTEMU_CZASU_PRACY: 10,
                                PRE_FP_NIE_NALICZAC_PONIZEJ_MINIMALN: 'Nie',
                                PRE_FP_NIE_NALICZAC: 'Nie',
                                PRE_FGSP_NIE_NALICZAC: 'Nie',
                                PRE_IND_PODSTAWA_URLOP: 'Nie',
                                PRE_IND_PODSTAWA_URLOP_ILOSC_MC: 0,
                                PRE_IND_PODSTAWA_CHOROB: 'Nie',
                                PRE_IND_PODSTAWA_CHOROB_ILOSC_MC: 0,
                                PRE_IND_PROC_WYNAGR_CHOROB: 'Nie',
                                PRE_IND_PROC_WYNAGR_CHOROB_PROC: 0,
                                PRE_CHOROB_FINANSOW_PRACOD: 'Nie',
                                PRE_CHOROB_FINANSOW_PRACOD_DNI: 0,
                                PRE_BO_ZUS_DNI_W_POPRZ_FIRMIE: 0,
                                PRE_BO_ZUS_90DNI_CIAGLOSCI: 0,
                                PRE_BO_ZUS_PRAWO_DO_ZASILKU_DATAOD: createCDATA('2025-02-01'),
                                PRE_BO_ZUS_OPIEKA_DZIECKO_DO_60DNI: 0,
                                PRE_BO_ZUS_OPIEKA_NIEPELNSPR_DO_30DNI: 0,
                                PRE_BO_ZUS_OPIEKA_RODZINA_DO_14DNI: 0,
                                PRE_PPK_OBNIZENIE_SKLADKI_PODST: 'Nie',
                                PRE_PPK_OBNIZENIE_SKLADKI_PODST_PROC: 0,
                                PRE_PPK_SKLADKA_DODATK: 0,
                                PRE_PPK_INDYW_SKLADKA_DODATK_PRACODAWCY: 'Nie',
                                PRE_PPK_INDYW_SKLADKA_DODATK_PRACODAWCY_PROC: 0,
                                PRE_PPK_DANE_KONTAKT_DO_IF: 'Nie',
                                PRE_UWAGI: createCDATA(' '),
                                PRE_OPIS: createCDATA(' '),
                                PRE_PRAWO_JAZDY: 'Nie',
                                PRE_PRAWO_JAZDY_KATEGORIA: createCDATA(' '),
                                PRE_NIE_ROZLICZAC: 'Nie',
                                PRE_RODZICIELSKI_CZESC_ETATU: 'Nie',
                                PRE_RODZICIELSKI_STAWKA: 0,
                                PRE_RODZICIELSKI_RODZAJ_STAWKI: 0,
                                PRE_RODZICIELSKI_MINIMALNA: 'Nie',
                                PRE_RODZICIELSKI_WYMIAR_ETATUL: 0,
                                PRE_RODZICIELSKI_WYMIAR_ETATUM: 0,
                                PRE_TYP_PODMIOTU: 3,
                                PRE_RODZ_DOKUMENTU: 'Nie',
                                PRE_ZWOL_PIT: 0,
                                PRE_NIE_POBIER_ZAL_FIS: 'Nie',
                                PRE_ZWOL_PIT_ROK: 0,
                                PRE_NIE_POMN_DOCH_ULGA: 'Nie',
                                PRE_NIE_STOS_PRZEDL_ZAL_FIS: 'Nie',
                                PRE_ULGA_MNOZNIK_L: 1,
                                PRE_ULGA_MNOZNIK_M: 12,
                                PRE_PROGI_PODATKOWE: 0,
                                PRE_ULGA_DODATKOWA: 0,
                                PRE_KARTA_NAUCZYCIELA: 'Nie',
                                PRE_PRM_ODDELEGOWANY_WALUTA: createCDATA(' ')
                            },
                          ],
                        },
                        UMOWY: {
                          UMOWA: [
                            {
                                UMW_IRID: createCDATA(this.generateIRID()),
                                UMW_DDF_IRID: createCDATA("C4C04EB0-08D9-4BA1-A851-4C3177D6F88C"),
                                UMW_DDF_IRID2: createCDATA("88C77785-2899-406B-A3CC-E096C6317C8C"),
                                UMW_DDF_SYMBOL: createCDATA('UMW'),
                                UMW_DDF_NUMERACJA: createCDATA('@brak/@symbol/@rok_kal/@numerS/@brak'),
                                UMW_TWP_IRID: createCDATA("49CC4337-27B9-4618-83EF-4679F26D6DF6"),
                                UMW_TWP_IRID2: createCDATA("95C5217A-DFF4-461F-9255-649A17D2CD0C"),
                                UMW_TWP_NAZWA: createCDATA('PIT-8B 6.Umowa o dzieło 20%'),
                                UMW_TYU_ID: 99999,
                                UMW_NUMER_STRING: createCDATA('UMW/2025/@numerS'),
                                UMW_NUMER_NR: 1,
                                UMW_DATA_DOK: createCDATA('2025-01-18'),
                                UMW_DATA_OD: createCDATA('2025-01-18'),
                                UMW_DATA_DO: createCDATA('2999-12-31'),
                                UMW_DATA_ZAWARCIA: createCDATA('2025-01-18'),
                                UMW_TYTUL: createCDATA(' '),
                                UMW_WARTOSC: createCDATA('0'),
                                UMW_RODZAJ: createCDATA(' '),
                                UMW_SPLACONO: 0,
                                UMW_WALUTA: createCDATA('PLN'),
                                UMW_WG_BRUTTO: 'Nie',
                                UMW_JEST_ZUS: 'Nie',
                                UMW_BRUTTO: 0,
                                UMW_FIS: 0,
                                UMW_ZUS: 0,
                                UMW_POMN_ZUS: 'Nie',
                                UMW_STAWKA_PODATKU: 12,
                                UMW_KOSZTY_KWOTA: 0,
                                UMW_KOSZTY_PROC: 20,
                                UMW_JEST_EMERYTAL: 'Nie',
                                UMW_JEST_RENTOWE: 'Nie',
                                UMW_JEST_CHOROBOWE: 'Nie',
                                UMW_JEST_WYPAD: 'Nie',
                                UMW_EMER_KOD: 0,
                                UMW_RENT_KOD: 0,
                                UMW_CHOR_KOD: 0,
                                UMW_WYPAD_KOD: 0,
                                UMW_ZDROW_KWOTA_PIERW_SKL: 0,
                                UMW_ZDROW_KOD: 0,
                                UMW_TYT_KONT_ZUS: 0,
                                UMW_JEST_DOBR_EMERYTAL: 'Nie',
                                UMW_JEST_DOBR_RENTOWE: 'Nie',
                                UMW_JEST_DOBR_CHOROBOWE: 'Nie',
                                UMW_JEST_DOBR_ZDROW: 'Nie',
                                UMW_OGRANICZ_SKL_ZDROW: 'Nie',
                                UMW_SPLACONA: 2,
                                UMW_SYMBOL: createCDATA(' '),
                                UMW_OPIS: createCDATA(' '),
                                UMW_NALICZAJ_FUNDUSZE: 'Nie',
                                UMW_WLICZ_CHOR_ZAKONCZONA: 'Nie',
                                UMW_UWZGL_MIN: 'Nie',
                                UMW_CZAS_PRACY: 'Nie',
                                UMW_STAWKA_GODZ: 0,
                                UMW_ULGA_MNOZNIK_L: 0,
                                UMW_ULGA_MNOZNIK_M: 12,
                                UMW_NIE_POBIERAJ_ZALICZKI_PODATKU: 0,
                                UMW_ODDELEGOWANY: 0,
                                UMW_ODDELEGOWANY_DIETA: 0,
                                UMW_ODDELEGOWANY_WAULTA: createCDATA('PLN'),
                                UMW_ODDELEGOWANY_FIS: 1,
                                UMW_ODDELEGOWANY_KRAJ: createCDATA(' '),
                                UMW_ODDELEGOWANY_WALUTA_DIETA: createCDATA(' '),
                                UMW_ODDELEGOWANY_PROP_ODL: 0,
                                UMOWA_ZESTAWIENIA_CZASU: createCDATA(' ')
                            },
                          ],
                        },
                        PRACOWNIK_EXT_IDX_GROUP: {
                          PRACOWNIK_EXT_IDX: [
                            {
                              PRI_IRID: createCDATA(this.generateIRID()), // IRID dla indeksu
                              PRI_RODZAJ: 1,
                              PRI_AKRONIM: createCDATA(' IMP 7 '),
                              PRI_IMIE_1:  createCDATA(processedXmlData.name),
                              PRI_NAZWISKO: createCDATA(processedXmlData.surname),
                              PRI_PESEL: processedXmlData.pesel ? createCDATA(processedXmlData.pesel) : createCDATA(' '),
                              PRI_DATA_OD: createCDATA(processedXmlData.date.toISOString().split('T')[0]),
                              PRI_DATA_DO: createCDATA('2025-12-31'),
                              PRI_OPIS: createCDATA('Indeks pracownika'),
                              PRI_ARCHIWALNY: 'Nie',
                              PRI_NADRZEDNY: 'Nie',
                            },
                          ],
                        },
                      },
                    ],
                }
            }
        };
      
        // Generowanie XML
        
        let xmlVar = xmljs.js2xml(xmlReadyData, {compact: true, spaces: 2})
        xmlVar = xmlVar.replace(/<_cdata>(.*?)<\/_cdata>/g, '<![CDATA[$1]]>');

        return xmlVar;
      }
    public saveXmlToFile (xml: string, fileName: string): string {
        const ext = path.extname(fileName);
        const baseName = path.basename(fileName, ext)

        const fInalFileName = `${baseName}.xml`
        const filePath = path.join(xmlFilesFolder)

        if (!fs.existsSync(xmlFilesFolder)) {
            fs.mkdirSync(xmlFilesFolder, { recursive: true });
          }
      
          fs.writeFileSync(filePath, xml, "utf8");
      
          return filePath;
    }

  }
function wrapInCDATA(value: string): CDATA<string> {
    throw new Error('Function not implemented.');
}

