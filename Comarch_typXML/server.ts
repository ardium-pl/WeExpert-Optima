import express, { Request, Response } from 'express';
import 'dotenv/config';
import bodyParser from "body-parser";
import cors from "cors";
import { RequestDataService } from './new_xmlGenerator';
import * as fs from 'fs';
import * as path from 'path';
import { CDATA } from './typescript_type';



const app = express();
app.use(express.json());
const PORT = process.env.PORT ?? 8080;

app.use(cors());
app.use(bodyParser.json());
export interface RequestData {
        surname: string; // Pole z PracownikExtEtat
        name: string; // Pole z PracownikExtEtat
        pesel?: string; // Pole z PracownikExtEtat
        salary?: number; // Pole z Umowa
        title?: string; // Pole z Umowa
        hourlyRate?: number; // Dodatkowe własne pole
        date: Date; // Dodatkowe własne pole
}; // nie wiem czy to jest w dobrym miejscu                    

app.post('/api/generate', (req: Request<{}, {}, RequestData[]>, res: Response) => {
    try {
      // Sprawdzanie, czy dane zostały przesłane jako tablica
      if (!Array.isArray(req.body) || req.body.length === 0) {
        return res.status(400).json({ error: 'Request body must be a non-empty array' });
      }
  
      // Przetwarzanie danych
      const processedXmlData = new RequestDataService().processRequestData(req.body);
      const xmlString = new RequestDataService().convertDataToXml(processedXmlData[0]); // Zakładam, że chcesz przetworzyć pierwszy element
  
      // Generowanie nazwy pliku
      const fileName = `generatedData_${Date.now()}.xml`;
      const xmlFilesFolder = path.join(__dirname, '..', 'WEEXPERT-OPTIMA', 'generatedXML');
      
      // Tworzenie folderu, jeśli nie istnieje
      if (!fs.existsSync(xmlFilesFolder)) {
        fs.mkdirSync(xmlFilesFolder, { recursive: true });
      }
  
      // Pełna ścieżka do pliku
      const filePath = path.join(xmlFilesFolder, fileName);
  
      // Zapis danych XML do pliku
      fs.writeFileSync(filePath, xmlString, 'utf8');
  
      // Zwracanie odpowiedzi z potwierdzeniem
      return res.status(200).json({
        message: 'XML generated and saved successfully!',
        filePath: filePath
      });
  
    } catch (error) {
      console.error('Error generating XML:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });


// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
