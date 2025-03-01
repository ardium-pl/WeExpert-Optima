import * as fs from 'fs';
import * as path from 'path';

class XmlFileManager {
  private xmlFilesFolder: string;

  constructor(folderPath: string) {
    this.xmlFilesFolder = folderPath;

    // Tworzenie folderu, jeśli nie istnieje
    if (!fs.existsSync(this.xmlFilesFolder)) {
      fs.mkdirSync(this.xmlFilesFolder, { recursive: true });
    }
  }

  public saveXmlToFile(xml: string, fileName: string): string {
    const ext = path.extname(fileName);
    const baseName = path.basename(fileName, ext);

    // Pobranie wszystkich istniejących plików XML w folderze
    const files = fs.readdirSync(this.xmlFilesFolder).filter(file => file.endsWith('.xml'));

    let filePath: string;

    if (files.length > 0) {
      // Znalezienie najnowszego pliku na podstawie daty modyfikacji
      const latestFile = files
        .map(file => ({
          file,
          mtime: fs.statSync(path.join(this.xmlFilesFolder, file)).mtime
        }))
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())[0].file;

      // Ścieżka do najnowszego pliku
      filePath = path.join(this.xmlFilesFolder, latestFile);
      console.log(`🔄 Nadpisuję istniejący plik: ${latestFile}`);
    } else {
      // Jeśli brak plików, utwórz nowy
      filePath = path.join(this.xmlFilesFolder, `${baseName}.xml`);
      console.log(`🆕 Tworzę nowy plik: ${filePath}`);
    }

    // Nadpisanie pliku XML
    fs.writeFileSync(filePath, xml, "utf8");

    return filePath;
  }
}
