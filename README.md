# XML Processing API Documentation

This API endpoint processes provided data by converting it into an XML format and then sending the resulting XML to a Flask service. It uses schema validation with Zod to ensure that the incoming request meets the required structure.

---

## Base URL

The production endpoint for processing XML is:  
`https://weexpert-optima-production.up.railway.app/api/process-xml`

In development or local environments, the base URL might differ.

---

## Endpoint Overview

**Endpoint:** `/api/process-xml`  
**HTTP Method:** `POST`

**Description:**  
This endpoint accepts JSON data, validates it against a defined schema, converts it into an XML object/string using the `XmlService`, and forwards the XML data to a Flask service.

The router sends the XML data via a POST request to the Flask endpoint at:  
`{flaskUrl}/upload-xml`

---

## Request

### Headers

- `Content-Type: application/json`

### Request Body Schema

The request body must be a JSON object containing two main sections: `personalData` and `contractData`.

#### JSON Structure

```json
{
  "personalData": {
    "lastName": "string",
    "name": "string",
    "pesel": "string",
  },
  "contractData": {
    "title": "string",
    "hourlyRate": "number",
    "salary": "number",
    "fullTimeEquivalent": "number",
    "date": "YYYY-MM-DD",
    "dateOfSign": "YYYY-MM-DD",
    "beginningOfContract": "YYYY-MM-DD",
    "endOfContract": "YYYY-MM-DD",
    "typeOfContract": "string"
  }
}
```

**Field Details:**

### personalData
- **lastName**: A required string.
- **name**: A required string.
- **pesel**: An optional string.

### contractData
- **title**: A required string.
- **hourlyRate**: An optional number.
- **salary**: An optional number.
- **fullTimeEquivalent**: A required number.
- **date**: A required string in the format `YYYY-MM-DD`.
- **dateOfSign**: A required string in the format `YYYY-MM-DD`.
- **beginningOfContract**: A required string in the format `YYYY-MM-DD`.
- **endOfContract**: A required string in the format `YYYY-MM-DD`.
- **typeOfContract**: A required string.

---

## Processing Workflow

### Validation
- The incoming request data is validated using the `RequestExpressDataSchema` from Zod.
- If validation fails, the API returns a **400 Bad Request** response with details on the validation issues.
- **Note:** All date fields must adhere to the `YYYY-MM-DD` format.

### XML Conversion
- If validation succeeds, the data is processed as follows:
  - An XML object is created using `XmlService().processDataToXmlObject()`.
  - The XML object is converted to an XML string using `XmlService().convertDataToXmlString()`.

### Forwarding XML Data
- The resulting XML string is sent in a POST request to the Flask service endpoint at:
  - `${flaskUrl}/upload-xml`

### Handling Flask Response
- **Success:** If the Flask service returns a success response, the API responds with a **200 OK** status and a success message.
- **Error:**  
  - If the Flask service returns an error response, the API forwards this error with a **501 Not Implemented** status.
  - If a connection error occurs with the Flask service, the API responds with a **500 Internal Server Error** indicating a Flask connection issue.
  - Any unexpected errors in processing result in a **500 Internal Server Error** with an error code `"EXPRESS_ERR"`.

---

## Responses

### Success Response

**HTTP Status:** 200 OK

**Response Body:**

```json
{
  "status": "success",
  "message": "The message returned by the Flask service",
  "downloadLink": "Link to eventually download the file."
}
```

- **status**: Always `"success"`.
- **message**: A success message as provided by the Flask service.
- **downloadLink**: Link to eventually download the file.


### Error Responses

#### 1. Validation Error

**HTTP Status:** 400 Bad Request

**Response Body:**

```json
{
  "status": "error",
  "error": "Invalid request data. Please check the request body and try again.",
  "errorCode": "VALIDATION_ERR",
  "details": [ /* Array of validation issues from Zod */ ]
}
```

- **error**: Describes that the request data is invalid.
- **errorCode**: `"VALIDATION_ERR"`.
- **details**: An array containing details of each validation issue.

**Example of incorrect salary type**
```json
{
    "status": "error",
    "error": "Invalid request data. Please check the request body and try again.",
    "errorCode": "VALIDATION_ERR",
    "details": [
        {
            "code": "invalid_type",
            "expected": "number",
            "received": "string",
            "path": [
                "contractData",
                "salary"
            ],
            "message": "Expected number, received string"
        }
    ]
}
```

#### 2. Flask Service Error

If the call to the Flask service fails and returns an error response:

**HTTP Status:** 501 Not Implemented

**Response Body:**

```json
{
  "status": "error",
  "error": "Error message from the Flask service",
  "errorCode": "FLASK_ERR",
  "downloadLink": "Optional link provided by Flask in error case",
  "details": "Additional error details if available"
}
```

- **error**: Error message as returned by the Flask service.
- **errorCode**: `"FLASK_ERR"`.
- **downloadLink**: Optional; provided if there is a link to download further details.
- **details**: Additional error details (could be a string).

#### 3. Internal Server Error

For unexpected errors during processing:

**HTTP Status:** 500 Internal Server Error

**Response Body:**

```json
{
  "status": "error",
  "error": "Internal server error",
  "errorCode": "FLASK_ERR" // or "EXPRESS_ERR" depending on the context
}
```

- **error**: General error message.
- **errorCode**: Could be `"FLASK_ERR"` or `"EXPRESS_ERR"` depending on where the error occurred.

---

## Example cURL Request

```bash
curl -X POST https://weexpert-optima-production.up.railway.app/api/process-xml \
  -H "Content-Type: application/json" \
  -d '{
    "personalData": {
      "lastName": "Doe",
      "name": "John",
      "pesel": "12345678901",
    },
    "contractData": {
      "title": "PIT-8A Inne należności",
      "salary": 5000,
      "fullTimeEquivalent": 0.5
      "date": "2025-01-01",
      "dateOfSign": "2025-01-05",
      "beginningOfContract": "2025-02-01",
      "endOfContract": "2025-12-31",
      "typeOfContract": "Umowa"
    }
  }'
```

---

## Additional Notes

- **Error Handling:**  
  The API distinguishes between validation errors (HTTP 400), errors returned by the Flask service (HTTP 501), and general internal errors (HTTP 500).
```
