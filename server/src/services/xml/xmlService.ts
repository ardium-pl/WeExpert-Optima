import { RequestExpressData } from '@server/utils/types/serverTypes';
import { v4 as uuidv4 } from 'uuid';
import * as xmljs from "xml-js";
import { PRACOWNICY_EXT, createCDATA } from '../../utils/types/optimaTypes';
import { ContractSql } from '../db/contractSql';

export class XmlService {
  private contractSql: ContractSql;

  constructor() {
    this.contractSql = new ContractSql()
  }

  private _generateIRID(): string {
    return uuidv4().toUpperCase();
  }

  public convertDataToXmlString(xmlData: PRACOWNICY_EXT): string{
    let xmlString = xmljs.js2xml(xmlData, { compact: true, spaces: 2 });
    xmlString = xmlString.replace(/<_cdata>(.*?)<\/_cdata>/g, '<![CDATA[$1]]>');

    return xmlString;
  }

  public async processDataToXmlObject(processedXmlData: RequestExpressData): Promise<PRACOWNICY_EXT> {

    const { personalData, contractData } = processedXmlData;

    
    const umwIridData = await this.contractSql.extractUmwIrid(contractData.typeOfContract);
    const umwIrid = umwIridData?.importRowId ?? 'DEFAULT_ID'; // 🔹 Ustaw domyślną wartość
    const umwIrid2 = umwIridData?.importRowId2 ?? 'DEFAULT_ID_2'; // 🔹 Ustaw domyślną wartość

    const twpIridData = await this.contractSql.extractUmwTwpIrid(contractData.title)
    const twpIrid = twpIridData?.importRowId ?? 'DEFAULT_ID'
    const twpIrid2 = umwIridData?.importRowId2 ?? 'DEFAULT_ID_2'

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
              PRA_IRID: createCDATA(this._generateIRID()), 
              PRA_KOD: createCDATA('IMP10'),
              PRA_ARCHIWALNY: 'Nie',
              PRA_NADRZEDNY: 'Nie',
              PRACOWNIK_EXT_ETATY: {
                PRACOWNIK_EXT_ETAT: [
                  {
                    PRE_IRID: createCDATA(this._generateIRID()),
                    PRE_DATA_OD: createCDATA(contractData.beginningOfContract),
                    PRE_DATA_DO: createCDATA(contractData.endOfContract),
                    PRE_KAL_IRID: createCDATA("B88A311C-E650-413E-BFF9-5A40C54E21D1"),
                    PRE_AKRONIM: createCDATA('IMP10'),
                    PRE_NAZWISKO: createCDATA(personalData.lastName),
                    PRE_IMIE_1: createCDATA(personalData.name),
                    PRE_KOSZTY_MNOZNIK: 1, // Ensures that the required field is not NULL
                    PRE_DATA_ZATRUDNIENIA: createCDATA('2025-01-02'),
                    PRE_DATA_ZWOLNIENIA: createCDATA('2999-12-31'),
                    PRE_ETAT_DATA_ZAWARCIA_UMOWY: createCDATA(contractData.dateOfSign),
                    PRE_ETAT_DATA_ROZPOCZECIA_PRACY: createCDATA(contractData.beginningOfContract),
                    PRE_ETAT_RODZAJ_UMOWY: createCDATA('dupa'),
                    PRE_KOD_TYT_UBEZPIECZENIA: 99999, // musi zostać
                    PRE_PRM_ODDELEGOWANY_WALUTA: createCDATA(' '), // musi zostać
                  },
                ],
              },
              UMOWY: {
                UMOWA: [
                  {
                    UMW_IRID: createCDATA(this._generateIRID()),
                    UMW_DDF_IRID: createCDATA(umwIrid),
                    UMW_DDF_IRID2: createCDATA(umwIrid2),
                    UMW_DDF_SYMBOL: createCDATA('UMW'),
                    UMW_TWP_IRID: createCDATA(twpIrid),
                    UMW_TWP_IRID2: createCDATA(twpIrid2),
                    UMW_TWP_NAZWA: createCDATA(contractData.title),
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
