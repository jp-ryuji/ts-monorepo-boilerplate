# API Documentation

## Overview

This document provides information about the available API endpoints and their usage.

## Health Check Endpoints

The API includes two health check endpoints to monitor the status of the service and its dependencies.

[Learn more about health check endpoints](./api-health-checks.md)

## OpenAPI Documentation

When running in development mode, OpenAPI (Swagger) documentation is available at `/api-docs`.

To access the OpenAPI documentation:

1. Start the API in development mode:

   ```bash
   NODE_ENV=development pnpm run start:dev
   ```

2. Navigate to `http://localhost:3000/api-docs` in your browser

## Base URL

All API endpoints are prefixed with `/api`. For example, the health check endpoint is accessible at `/api/health`.

## Authentication

Currently, the API does not require authentication for health check endpoints.

## Error Responses

The API uses standard HTTP status codes to indicate the success or failure of requests:

- `200 OK`: The request was successful
- `404 Not Found`: The requested resource was not found
- `500 Internal Server Error`: An error occurred on the server

## Support

For support, please contact the development team.
