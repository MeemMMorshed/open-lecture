# Open Lecture

Open Lecture is a course discovery and authentication web application with a Spring Boot API and a React frontend.

## Project layout

- Backend: Spring Boot 3.5, Java 17, Maven, PostgreSQL driver, Spring Security, JPA
- Frontend: React + Create React App

## Prerequisites

- Java 17+
- Maven 3.9+
- Node.js and npm
- Access to the configured PostgreSQL/Neon database for the backend

## Backend

The backend source lives under the [backend](backend) directory and boots on port 8080.

Run it locally:

```bash
cd backend
mvn spring-boot:run
```

If you are running in a restricted sandbox or temporary-directory environment, use a workspace-local temp folder:

```bash
cd backend
mkdir -p .tmp
mvn -Dspring-boot.run.jvmArguments="-Djava.io.tmpdir=$PWD/.tmp" spring-boot:run
```

The API base URL is configured through the frontend to use `http://localhost:8080`.

## Frontend

The frontend lives under the [frontend](frontend) directory.

Install dependencies:

```bash
cd frontend
npm install
```

Run the React development server:

```bash
cd frontend
npm start
```

If your environment blocks CRA binding to the default host, run with an explicit host and port:

```bash
cd frontend
PORT=3000 HOST=127.0.0.1 npm start
```

## Configuration

The backend database settings are defined in [backend/src/main/resources/application.properties](backend/src/main/resources/application.properties).

The frontend API base URL is defined in [frontend/src/config.js](frontend/src/config.js).

## Current runtime notes

The repository currently expects a PostgreSQL-compatible database reachable from the backend at startup. In this environment, the configured remote database host was unable to resolve during the Spring Boot boot sequence, so the API could not finish starting. The frontend also hit a host binding restriction when launched with the default CRA network setup.
