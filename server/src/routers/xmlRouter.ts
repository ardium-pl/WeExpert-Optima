import { XmlService } from '@server/services/xml/xmlService';
import { flaskUrl } from '@server/utils/config';
import axios from 'axios';
import express, { Request, Response, Router } from 'express';
import {
    ExpressResponse,
    FlaskResponse,
    RequestExpressData,
    RequestExpressDataSchema,
} from '../utils/types/serverTypes';
import { logger } from '@server/utils/logger';

const xmlRouter: Router = express.Router();

xmlRouter.post('/api/process-xml', async (req: Request<RequestExpressData>, res: Response<ExpressResponse>) => {
  try {
    const validationResult = RequestExpressDataSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid request data. Please check the request body and try again.',
        errorCode: 'VALIDATION_ERR',
        details: validationResult.error.issues,
      });
    }
    logger.info("reqBody", req.body);
    // Przetwarzanie danych
    const processedXmlData = await new XmlService().processDataToXmlObject(req.body);
    logger.info("processedXmlData", processedXmlData)
    const xmlString = new XmlService().convertDataToXmlString(processedXmlData);

    logger.info("xmlString", xmlString)
    try {
      logger.info("flaskUrl", flaskUrl);
      const response = await axios.post<FlaskResponse>(`${flaskUrl}/upload-xml`, {
        xmlString,
      });
      const flaskResponse = response.data;
      if (flaskResponse.status === 'success')
        return res.status(200).json({
          status: 'success',
          message: flaskResponse.message,
        });
    } catch (error: any) {
        const errorResponse: FlaskResponse = error.response?.data ? error.response.data : null;
        if (errorResponse && errorResponse.status === 'error') {
          return res.status(501).json({
            status: 'error',
            error: errorResponse.error,
            downloadLink: errorResponse.downloadLink,
            details: errorResponse.details,
            errorCode: errorResponse.errorCode,
          });
        }
      return res.status(500).json({
        status: 'error',
        error: 'Flask connection server error',
        errorCode: 'FLASK_ERR',
      });
    }

  } catch (error: any) {
    return res.status(500).json({ status: 'error', error: 'Internal server error', errorCode: 'EXPRESS_ERR' });
  }
});

export default xmlRouter;
