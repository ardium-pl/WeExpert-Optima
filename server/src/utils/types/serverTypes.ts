import { z, ZodIssue } from 'zod';

const PersonalDataSchema = z.object({
  lastName: z.string(),
  name: z.string(),
  pesel: z.string().optional(),
  salary: z.string(),
});

const ContractDataSchema = z.object({
  title: z.string(),
  hourlyRate: z.number().optional(),
  date: z.string(),
  dateOfSign: z.string(),
  beginningOfContract: z.string(),
  endOfContract: z.string(),
  typeOfContract: z.string(),
});

export const RequestExpressDataSchema = z.object({
  personalData: PersonalDataSchema,
  contractData: ContractDataSchema,
});

// FLASK RESPONSE TYPES
type SuccessFlaskResponse = {
  status: 'success';
  message: string;
  filePath: string;
};

type ErrorCodes = 'OPTIMA_ERR' | 'FLASK_ERR' | 'EXPRESS_ERR' | 'VALIDATION_ERR';

type ErrorFlaskResponse = {
  status: 'error';
  error: string;
  details: string;
  downloadLink: string;
  errorCode: ErrorCodes;
};
export type FlaskResponse = SuccessFlaskResponse | ErrorFlaskResponse;

export type RequestExpressData = z.infer<typeof RequestExpressDataSchema>;

// RESPONSE EXPRESS DATA TYPES
type SuccessExpressResponse = {
  status: 'success';
  message: string;
};

type ErrorExpressResponse = {
  status: 'error';
  error: string;
  errorCode: ErrorCodes;
  downloadLink?: string;
  details?: string | ZodIssue[];
};

export type ExpressResponse = SuccessExpressResponse | ErrorExpressResponse;
