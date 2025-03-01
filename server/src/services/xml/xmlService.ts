import { RequestExpressData } from '@server/utils/types/serverTypes';
import { v4 as uuidv4 } from 'uuid';
import * as xmljs from "xml-js";
import { PRACOWNICY_EXT, createCDATA } from '../../utils/types/optimaTypes';

export class XmlService {

  private _generateIRID(): string {
    return uuidv4().toUpperCase();
  }

  public convertDataToXmlString(xmlData: PRACOWNICY_EXT): string{
    let xmlString = xmljs.js2xml(xmlData, { compact: true, spaces: 2 });
    xmlString = xmlString.replace(/<_cdata>(.*?)<\/_cdata>/g, '<![CDATA[$1]]>');

    return xmlString;
  }

  public processDataToXmlObject(processedXmlData: RequestExpressData): PRACOWNICY_EXT {

    const { personalData, contractData } = processedXmlData;

    const xmlReadyData: PRACOWNICY_EXT = {
      ROOT: {
        _attributes: {
          xmlns: "http://www.comarch.pl/cdn/optima/offline"
        },
        PRACOWNICY_EXT: {
          WERSJA: '2025.01',
          BAZA_ZRD_ID: 'WYMIANA_DANYCH',
          BAZA_DOC_ID: 'WYMIANA_DANYCH',
          PRACOWNIK: [
            {
              PRA_IRID: createCDATA(this._generateIRID()), // Generowanie IRID dla pracownika
              PRA_KOD: createCDATA('IMP10'),
              PRA_ARCHIWALNY: 'Nie',
              PRA_NADRZEDNY: 'Nie',
              PRACOWNIK_EXT_ETATY: {
                PRACOWNIK_EXT_ETAT: [
                  {
                    PRE_IRID: createCDATA(this._generateIRID()), // IRID dla etatu
                    PRE_DATA_OD: createCDATA('1900-01-01'),
                    PRE_DATA_DO: createCDATA('2999-12-31'),
                    PRE_KAL_IRID: createCDATA("B88A311C-E650-413E-BFF9-5A40C54E21D1"),
                    PRE_AKRONIM: createCDATA('IMP10'),
                    PRE_NAZWISKO: createCDATA(personalData.lastName),
                    PRE_IMIE_1: createCDATA(personalData.name),
                    PRE_KOSZTY_MNOZNIK: 1, // Ensures that the required field is not NULL
                    PRE_DATA_ZATRUDNIENIA: createCDATA('2025-01-02'),
                    PRE_DATA_ZWOLNIENIA: createCDATA('2999-12-31'),
                    PRE_ETAT_DATA_ZAWARCIA_UMOWY: createCDATA('2025-01-02'),
                    PRE_ETAT_DATA_ROZPOCZECIA_PRACY: createCDATA('2025-01-02'),
                    PRE_ETAT_RODZAJ_UMOWY: createCDATA('na czas nieokreślony'),
                    PRE_KOD_TYT_UBEZPIECZENIA: 99999, // musi zostać
                    PRE_PRM_ODDELEGOWANY_WALUTA: createCDATA(' '), // musi zostać
                  },
                ],
              },
              UMOWY: {
                UMOWA: [
                  {
                    UMW_IRID: createCDATA(this._generateIRID()),
                    UMW_DDF_IRID: createCDATA("C4C04EB0-08D9-4BA1-A851-4C3177D6F88C"),
                    UMW_DDF_IRID2: createCDATA("88C77785-2899-406B-A3CC-E096C6317C8C"),
                    UMW_DDF_SYMBOL: createCDATA('UMW'),
                    UMW_TWP_IRID: createCDATA("49CC4337-27B9-4618-83EF-4679F26D6DF6"),
                    UMW_TWP_IRID2: createCDATA("95C5217A-DFF4-461F-9255-649A17D2CD0C"),
                    UMW_TWP_NAZWA: createCDATA('PIT-8B 6.Umowa o dzieło 20%'),
                    UMW_TYU_ID: 99999,
                    UMW_DATA_DOK: createCDATA('2025-01-18'),
                    UMW_DATA_OD: createCDATA(contractData.beginningOfContract),
                    UMW_DATA_DO: createCDATA(contractData.endOfContract),
                    UMW_DATA_ZAWARCIA: createCDATA(contractData.dateOfSign),
                    UMW_TYTUL: createCDATA(contractData.title),
                    UMW_WARTOSC: createCDATA(' '),
                    UMW_RODZAJ: createCDATA(' '),
                    UMW_SPLACONO: 0,
                    UMW_BRUTTO: 0,
                  },
                ],
              },
              PRACOWNIK_EXT_IDX_GROUP: {
                PRACOWNIK_EXT_IDX: [
                  {
                    PRI_IRID: createCDATA(this._generateIRID()),
                    PRI_RODZAJ: 1,
                    PRI_AKRONIM: createCDATA(' IMP 7 '),
                    PRI_IMIE_1: createCDATA(personalData.name),
                    PRI_NAZWISKO: createCDATA(personalData.lastName),
                    PRI_PESEL: personalData.pesel
                      ? createCDATA(personalData.pesel)
                      : createCDATA(' '),
                    PRI_DATA_OD: createCDATA(contractData.date),
                    PRI_DATA_DO: createCDATA('2025-12-31'),
                    PRI_OPIS: createCDATA('Indeks pracownika'),
                    PRI_ARCHIWALNY: 'Nie',
                    PRI_NADRZEDNY: 'Nie',
                  },
                ],
              },
            },
          ],
        },
      },
    };
    return xmlReadyData
  }
}
