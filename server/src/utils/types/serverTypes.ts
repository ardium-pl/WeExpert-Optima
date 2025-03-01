// FLASK RESPONSE TYPES
type SuccessFlaskResponse = {
  status: 'success';
  message: string;
  filePath: string;
};

type FlaskErrorCodes = 'XML_ERR';

type ErrorFlaskResponse = {
  status: 'error';
  error: string;
  details: string;
  downloadLink: string;
  errorCode: FlaskErrorCodes;
};
export type FlaskResponse = SuccessFlaskResponse | ErrorFlaskResponse;

// REQUEST EXPRESS DATA TYPES
type PersonalData = {
  lastName: string;
  name: string;
  pesel?: string;
  salary: string;
};

type ContractData = {
  title: string;
  hourlyRate?: number;
  date: string;
  dateOfSign: string;
  beginningOfContract: string;
  endOfContract: string;
  typeOfContract: string;
};

export type RequestExpressData = {
  personalData: PersonalData;
  contractData: ContractData;
};

// RESPONSE EXPRESS DATA TYPES
type SuccessExpressResponse = {
  status: 'success';
  message: string;
};

type ExpressErrorCodes = 'XML_ERR' | 'OPTIMA_ERR';

type ErrorExpressResponse = {
  status: 'error';
  error: string;
  errorCode: ExpressErrorCodes;
  downloadLink?: string;
  details?: string;
};

export type ExpressResponse = SuccessExpressResponse | ErrorExpressResponse;
