import fs from 'fs';
import path from 'path';
import xmlbuilder from 'xmlbuilder';
import { v4 as uuidv4 } from 'uuid'; // Importowanie generatora UUID
import { RequestData } from './server';
import { Builder } from "xml2js";


y
/**
 * Funkcja generująca unikalny identyfikator UUID (wersja uppercase)
 * @returns Unikalny kod w formacie UUID
 */
function generateIRID(): string {
    return uuidv4().toUpperCase();
}

/**
 * Funkcja generująca plik XML na podstawie danych pracownika
 * @returns Ścieżka do zapisanego pliku XML
 */
export function generateXML(
data: RequestData[]
// zmienić na angielskie i camelcase
): string {
    // Generowanie unikalnych identyfikatorów (bez zapisu do pliku)
    const praIrid = generateIRID();
    const preIrid = generateIRID();

    // Tworzenie XML
    const xmlData = xmlbuilder.create('PRACOWNICY_EXT') //w buildera wrzucić obiekt 
        .ele('WERSJA', "2025.01").up()
        .ele('BAZA_ZRD_ID', "WYMIANA_DANYCH").up()
        .ele('BAZA_DOC_ID', "WYMIANA_DANYCH").up()
        .ele('PRACOWNIK')
            .ele('PRA_IRID', praIrid).up()
            .ele('PRE_IRID', preIrid).up()
            .ele('PRE_NAZWISKO', PRE_NAZWISKO).up()
            .ele('PRE_IMIE_1', PRE_IMIE_1).up()
            .ele('PRE_STAWKA_ZASZEREGOWANIA', PRE_STAWKA_ZASZEREGOWANIA).up()
            .ele('PRE_ETAT_DATA_ZAWARCIA_UMOWY', PRE_ETAT_DATA_ZAWARCIA_UMOWY).up()
        .end({ pretty: true });

    // Tworzenie katalogu "C:/COMARCH/data"
    const directoryPath = path.join('C:/COMARCH/data');
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Zapisywanie pliku XML
    const fileName = `employee_${PRE_NAZWISKO}_${Date.now()}.xml`;
    const filePath = path.join(directoryPath, fileName);
    fs.writeFileSync(filePath, xmlData);

    console.log(`✅ XML file created: ${filePath}`);
    return filePath;
}
