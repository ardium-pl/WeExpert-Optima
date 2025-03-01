type SuccessFlaskResponse = {
  status: 'success';
  message: string;
  filePath: string;
};

type ErrorCode = 'XML_ERR';

type ErrorFlaskResponse = {
  status: 'error';
  error: string;
  errorCode: ErrorCode;
};

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

export type FlaskResponse = SuccessFlaskResponse | ErrorFlaskResponse;
