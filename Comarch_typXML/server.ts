import express, { Request, Response } from 'express';
import 'dotenv/config';
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import { RequestDataService } from './new_xmlGenerator';
import * as fs from 'fs';
import * as path from 'path';
import { CDATA } from './typescript_type';

type SuccessFlaskResponse = {
  status: 'success'
  message: string;
  filePath: string
}

type ErrorCode = 
  | 'XML_ERR'

type ErrorFlaskResponse = {
  status: 'error'
  error: string;
  errorCode: ErrorCode
}

type FlaskResponse = SuccessFlaskResponse | ErrorFlaskResponse


const app = express();
app.use(express.json());
const PORT = process.env.PORT ?? 8080;

app.use(cors());
app.use(bodyParser.json());
export interface RequestData {
        surname: string; // Pole z PracownikExtEtat
        name: string; // Pole z PracownikExtEtat
        pesel?: string; // Pole z PracownikExtEtat
        salary: string; // Pole z Umowa
        title: string; // Pole z Umowa
        hourlyRate?: number; // Dodatkowe własne pole
        date: Date; // Dodatkowe własne pole
        dateOfSign: Date;
        beginningOfContract: Date;
        endOfContract: Date;
        typeOfContract: string;

}; // nie wiem czy to jest w dobrym miejscu                    

app.post('/api/generate', async (req: Request<{}, {}, RequestData[]>, res: Response) => {
    try {
      // Sprawdzanie, czy dane zostały przesłane jako tablica
      if (!Array.isArray(req.body) || req.body.length === 0) {
        return res.status(400).json({ error: 'Request body must be a non-empty array' });
      }
  
      // Przetwarzanie danych
      const processedXmlData = new RequestDataService().processRequestData(req.body);
      const xmlString = new RequestDataService().convertDataToXml(processedXmlData[0]); // Zakładam, że chcesz przetworzyć pierwszy element
      
      const response = await axios.post<FlaskResponse>(`http://localhost:5000/upload-xml`, {
        xmlString
      });

      const flaskResponse: FlaskResponse = response.data;

      if(flaskResponse.status === 'error'){
        return res.status(501).json({ error: flaskResponse.error, errorCode: flaskResponse.errorCode });
      }
      
      // Generowanie nazwy pliku
      // const fileName = `generatedData_${Date.now()}.xml`;
      // const xmlFilesFolder = path.join(__dirname, '..', 'WEEXPERT-OPTIMA', 'generatedXML');
      
      // // Tworzenie folderu, jeśli nie istnieje
      // if (!fs.existsSync(xmlFilesFolder)) {
      //   fs.mkdirSync(xmlFilesFolder, { recursive: true });
      // }
  
      // // Pełna ścieżka do pliku
      // const filePath = path.join(xmlFilesFolder, fileName);
  
      // // Zapis danych XML do pliku
      // fs.writeFileSync(filePath, xmlString, 'utf8');
  
      // Zwracanie odpowiedzi z potwierdzeniem
      return res.status(200).json({
        message: 'XML generated and saved successfully!',
        flaskResponse:  flaskResponse.message
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
