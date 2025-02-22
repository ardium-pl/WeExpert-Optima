import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // Importowanie generatora UUID
import { RequestData } from './server';
import { Builder } from "xml2js";
import { xmlFilesFolder } from './constants';
import { CDATA } from './typescript_type';
import { createCDATA } from './typescript_type';

export class RequestDataService {
    
    // Generowanie unikalnego identyfikatora w formacie wielkich liter
    public generateIRID(): string {
      return uuidv4().toUpperCase();
    }
    
  
    // Przetwarzanie danych 
    public processRequestData(data: RequestData[]): RequestData[] {
        const processedData: RequestData[] = data.map((item) => {
          const wrapInCDATA = (value: string | undefined): CDATA<string> => {
            return createCDATA(value || 'Unknown');
          };
      
          const requestDataObject: RequestData = {
            $: {
              lastName: wrapInCDATA(
                typeof item.$?.lastName === 'object' ? (item.$?.lastName as CDATA<string>).value : item.$?.lastName
              ),
              name: wrapInCDATA(
                typeof item.$?.name === 'object' ? (item.$?.name as CDATA<string>).value : item.$?.name
              ),
              hourlyRate: item.$?.hourlyRate ? parseFloat(item.$.hourlyRate.toFixed(2)) : 0,
              date: item.$?.date ? new Date(item.$.date) : new Date(), // Konwersja na obiekt Date
            },
            irid: this.generateIRID(),
          };
      
          return requestDataObject;
        });
      
        return processedData;
      }      
      

      public convertDataToXml(processedXmlData: RequestData): string {
        const builder = new Builder({
          xmldec: { version: '1.0', encoding: 'UTF-8' },
          rootName: 'PRACOWNICY_EXT', // Główna nazwa elementu XML
          renderOpts: { pretty: true },
        });
      
        // Przekształcanie danych do formatu elementów XML
        const xmlReadyData = JSON.parse(
          JSON.stringify(processedXmlData, (key, value) => {
            return value && typeof value === 'object' && 'toXML' in value ? value.toXML() : value;
          })
        );
      
        // Generowanie XML
        let xml = builder.buildObject({
          PRACOWNIK: {
            lastName: processedXmlData.$?.lastName?.toXML() || 'Unknown',
            name: processedXmlData.$?.name?.toXML() || 'Unknown',
            hourlyRate: processedXmlData.$?.hourlyRate?.toString() || '0',
            date: processedXmlData.$?.date?.toISOString() || new Date().toISOString(),
            irid: processedXmlData.irid || 'Unknown',
          },
        });
      
        // Naprawianie CDATA z błędnych znaków
        xml = xml.replace(/"&lt;!\[CDATA\[(.*?)\]\]&gt;"/g, '<![CDATA[$1]]>');
      
        return xml;
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
