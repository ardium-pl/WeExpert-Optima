import { ExpressResponse, FlaskResponse, RequestExpressData } from '../utils/types/serverTypes';
import axios from 'axios';
import { XmlService } from '@server/services/xml/xmlService';
import express, { Request, Response, Router } from 'express';
import { logger } from '@server/utils/logger';

const xmlRouter: Router = express.Router();

xmlRouter.post('/api/process-xml', async (req: Request<{}, {}, RequestExpressData>, res: Response<ExpressResponse>) => {
  try {
    // Przetwarzanie danych
    const processedXmlData = new XmlService().processDataToXmlObject(req.body);
    const xmlString = new XmlService().convertDataToXmlString(processedXmlData);
    logger.info('XmlString ', xmlString);

    const response = await axios.post<FlaskResponse>(`http://localhost:5000/upload-xml`, {
      xmlString,
    });

    const flaskResponse = response.data;
    if(flaskResponse.status === 'success')
    return res.status(200).json({
      status: 'success',
      message: flaskResponse.message
    });
  } catch (error: any) {
    const errorResponse: FlaskResponse = error.response?.data;
    if (errorResponse.status === 'error') {
      return res
        .status(501)
        .json({
          status: 'error',
          error: errorResponse.error,
          downloadLink: errorResponse.downloadLink,
          details: errorResponse.details,
          errorCode: errorResponse.errorCode,
        });
    }
    console.error('Error generating XML:', error);
    return res.status(500).json({ status: 'error', error: 'Internal server error', errorCode: 'FLASK_ERR' });
  }
});

export default xmlRouter;
