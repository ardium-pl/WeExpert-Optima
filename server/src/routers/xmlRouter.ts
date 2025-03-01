import { FlaskResponse, RequestExpressData } from "../utils/types/serverTypes";
import axios from "axios";
import { XmlService } from "@server/services/xml/xmlService";
import express, {Request, Response, Router} from "express";
import { logger } from "@server/utils/logger";

const xmlRouter: Router = express.Router();

xmlRouter.post('/api/process-xml', async (req: Request<{}, {}, RequestExpressData>, res: Response) => {
    try {

      // Przetwarzanie danych
      const processedXmlData = new XmlService().processDataToXmlObject(req.body);
      const xmlString = new XmlService().convertDataToXmlString(processedXmlData); // IN PRODUCTION CHANGE
      logger.info("XmlString ", xmlString);
      
      try{
          const response = await axios.post<FlaskResponse>(`http://localhost:5000/upload-xml`, {
            xmlString
          });

          const flaskResponse: FlaskResponse = response.data;
    
          if(flaskResponse.status === 'error'){
            return res.status(501).json({ error: flaskResponse.error, errorCode: flaskResponse.errorCode });
          }
          return res.status(200).json({
            message: 'XML generated and saved successfully!',
            flaskResponse:  flaskResponse.message
          });
      }
      catch(error){
        logger.error("There was an error sending message")
      }

  
    } catch (error) {
      console.error('Error generating XML:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

export default xmlRouter;  