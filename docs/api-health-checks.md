# API Health Check Endpoints

## Overview

The API provides two health check endpoints to monitor the status of the service and its dependencies.

## Endpoints

### Shallow Health Check

**Endpoint:** `GET /api/health`

**Description:** Performs a basic health check with minimal dependencies. Returns a 200 status code if the service is running.

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2025-09-16T23:31:44.356Z",
  "info": "Shallow health check passed"
}
```

### Detailed Health Check

**Endpoint:** `GET /api/health/detailed`

**Description:** Performs a comprehensive health check including database and Redis connectivity.

**Response (Success):**

```json
{
  "status": "ok",
  "checks": {
    "database": true,
    "redis": true,
    "timestamp": "2025-09-16T23:31:44.356Z"
  }
}
```

**Response (Failure):**

```json
{
  "status": "error",
  "checks": {
    "database": false,
    "redis": false,
    "timestamp": "2025-09-16T23:31:44.356Z"
  }
}
```

## Usage

To check the health of the API service, make HTTP GET requests to the endpoints:

```bash
# Shallow health check
curl http://localhost:3000/api/health

# Detailed health check
curl http://localhost:3000/api/health/detailed
```
