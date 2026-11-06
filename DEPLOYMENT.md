# Deployment Guide

## Overview

The COVID-19 Early Outbreak Dashboard is deployed on **Render**, using two separate services:

- **Frontend:** React application hosted as a Static Site.
- **Backend:** Node.js and Express REST API hosted as a Web Service.

Both services are connected to the same GitHub repository and deployed from the `main` branch.

## Live Application

**Frontend:**  
https://lungani-ngcosini-covid-dashboard.onrender.com

**Backend API:**  
https://umuzi-covid-api.onrender.com

**GitHub Repository:**  
https://github.com/Lunga-15/umuzi-covid-dashboard-gig

## 1. Backend Deployment

The backend was deployed as a Render Web Service.

### Configuration

| Setting | Value |
|---|---|
| Service Name | `umuzi-covid-api` |
| Service Type | Web Service |
| Runtime | Node.js |
| Region | Frankfurt |
| Branch | `main` |
| Root Directory | `backend` |
| Build Command | `npm ci` |
| Start Command | `npm start` |
| Instance Type | Free |

### Port Configuration

The Express server uses the following configuration:

```javascript
const PORT = process.env.PORT || 5000;
```

This allows Render to provide the server port through an environment variable while retaining port 5000 for local development.

### CORS Configuration

The backend allows requests from the local React development server and the deployed frontend.

```javascript
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins
}));
```

The backend's Render environment variable is:

```env
FRONTEND_URL=https://lungani-ngcosini-covid-dashboard.onrender.com
```

This permits the deployed frontend to access the API.

## 2. Frontend Deployment

The React application was deployed as a Render Static Site.

### Configuration

| Setting | Value |
|---|---|
| Site Name | `lungani-ngcosini-covid-dashboard` |
| Service Type | Static Site |
| Branch | `main` |
| Root Directory | `frontend` |
| Build Command | `npm ci && npm run build` |
| Publish Directory | `dist` |

### API Configuration

The frontend uses an environment variable to determine the backend API URL.

```javascript
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";
```

The frontend's Render environment variable is:

```env
VITE_API_URL=https://umuzi-covid-api.onrender.com
```

Vite includes this value when building the frontend for deployment.

After changing `VITE_API_URL`, the Static Site must be rebuilt and redeployed for the new value to take effect.

## 3. Deployment Verification

### Backend API

The following endpoints can be used to verify that the backend is responding:

| Endpoint | Purpose |
|---|---|
| `/api/health` | Verify server availability |
| `/api/countries` | Retrieve available countries |
| `/api/countries/ZA` | Retrieve South African COVID-19 records |

Example:

https://umuzi-covid-api.onrender.com/api/health

### Frontend Application

Open the live dashboard:

https://lungani-ngcosini-covid-dashboard.onrender.com

Verify that:

- The country dropdown loads all five countries.
- Selecting a country updates the displayed metrics.
- The cumulative line chart displays the selected country's data.
- The bar chart displays confirmed-case increases between reporting dates.
- Date range filtering and Reset Dates work.
- The layout remains responsive on different screen sizes.

## 4. Updating the Deployment

Both services are connected to the GitHub repository.

When changes are pushed to `main`, Render can automatically rebuild and redeploy the affected services if automatic deployment is enabled.

```bash
git add .
git commit -m "describe your changes"
git push origin main
```

Deployment progress and application logs can be viewed from the Render Dashboard.

## 5. Troubleshooting

### Frontend cannot retrieve data

- Verify that the backend API is accessible.
- Confirm that `VITE_API_URL` contains the correct backend HTTPS address.
- Check that `FRONTEND_URL` matches the deployed frontend origin.
- Redeploy the relevant service after updating environment variables.
- Inspect the browser console for network or CORS errors.

### Backend takes time to respond

Render's free Web Services can enter an inactive state after periods without traffic. The first request after inactivity may take longer because the server must restart.

### Frontend build fails

- Check that the root directory is `frontend`.
- Confirm the build command is correct.
- Check the Render deployment logs for dependency or compilation errors.

## Deployment Platform

The project uses Render's free hosting options for demonstration and assessment purposes.

For additional information, visit [Render Documentation](https://render.com/docs).
