# XML Processing API Documentation

This API endpoint processes provided data by converting it into an XML format and then sending the resulting XML to a Flask service. It uses schema validation with Zod to ensure that the incoming request meets the required structure.

---

## Base URL

The server is expected to run on a configurable port (default: `8080`).  
Example: `http://localhost:8080`

---

## Endpoint Overview

**Endpoint:** `/api/process-xml`  
**HTTP Method:** `POST`

**Description:**  
This endpoint accepts JSON data, validates it against a defined schema, converts it into an XML object/string using the `XmlService`, and forwards the XML data to a Flask service running on `http://localhost:5000/upload-xml`.

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
    "salary": "string"            
  },
  "contractData": {
    "title": "string",            
    "hourlyRate": 0,              
    "date": "string",             
    "dateOfSign": "string",       
    "beginningOfContract": "string", 
    "endOfContract": "string",    
    "typeOfContract": "string"    
  }
}
```

**Field Details:**

- **personalData**
  - **lastName**: A required string.
  - **name**: A required string.
  - **pesel**: An optional string.
  - **salary**: A required string.

- **contractData**
  - **title**: A required string.
  - **hourlyRate**: An optional number.
  - **date**: A required string (format is not explicitly enforced, so use a standard date format if needed).
  - **dateOfSign**: A required string.
  - **beginningOfContract**: A required string.
  - **endOfContract**: A required string.
  - **typeOfContract**: A required string.

---

## Processing Workflow

1. **Validation:**  
   The incoming request data is validated using the `RequestExpressDataSchema` from Zod.  
   - If validation fails, the API returns a **400 Bad Request** response with details on the validation issues.

2. **XML Conversion:**  
   If the validation succeeds, the data is processed:
   - An XML object is created using `XmlService().processDataToXmlObject()`.
   - The XML object is converted to an XML string using `XmlService().convertDataToXmlString()`.

3. **Forwarding XML Data:**  
   The resulting XML string is sent in a POST request to the Flask service endpoint at `http://localhost:5000/upload-xml`.

4. **Handling Flask Response:**  
   - If the Flask service returns a success response, the API responds with a **200 OK** status and a success message.
   - If the Flask service returns an error or if an exception occurs during the process, appropriate error responses are returned.

---

## Responses

### Success Response

**HTTP Status:** 200 OK

**Response Body:**

```json
{
  "status": "success",
  "message": "The message returned by the Flask service"
}
```

- **status**: Always `"success"`.
- **message**: A success message as provided by the Flask service.

---

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

For unexpected errors that occur during processing:

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
curl -X POST http://localhost:8080/api/process-xml \
  -H "Content-Type: application/json" \
  -d '{
    "personalData": {
      "lastName": "Doe",
      "name": "John",
      "pesel": "12345678901",
      "salary": "5000"
    },
    "contractData": {
      "title": "Employment Contract",
      "hourlyRate": 50,
      "date": "2025-01-01",
      "dateOfSign": "2025-01-05",
      "beginningOfContract": "2025-02-01",
      "endOfContract": "2025-12-31",
      "typeOfContract": "Full-Time"
    }
  }'
```

---

## Additional Notes

- **XML Service Integration:**  
  The API uses an internal `XmlService` to process and convert data to XML format before sending it to the Flask service.

- **Flask Service Endpoint:**  
  Ensure that the Flask service is running on `http://localhost:5000/upload-xml` to successfully complete the XML upload process.

- **Error Handling:**  
  The API distinguishes between validation errors (HTTP 400), errors returned by the Flask service (HTTP 501), and general internal errors (HTTP 500).
```
