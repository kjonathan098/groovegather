
# GrooveGather: Backend & Frontend

Welcome to the GroovePlaylist repository! This project is divided into two main parts: the backend, built with NestJS and MySQL, and the frontend. We've also included Docker support to make setting up the environment easier.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Docker and Docker Compose
- Node.js (for the frontend setup)

## Setting Up the Backend

The backend relies on a MySQL database and is containerized using Docker for ease of setup and deployment. Follow these steps to get it up and running:

### 1. Create `mysql.env` File

In the root of the `backend` directory, create a file named `mysql.env`. This file should contain your MySQL root password and the name of the database you wish to create:

```env
MYSQL_ROOT_PASSWORD=<create_sql_password>
MYSQL_DATABASE=songs_list
```

### 2. Create `.env` File for Backend Configuration

Still in the `backend` directory, create a `.env` file with the following configuration. Make sure the `DB_PASSWORD` matches the `MYSQL_ROOT_PASSWORD` you set in `mysql.env`:

```env
DB_PASSWORD=<your_sql_password>
DB_USERNAME=root
DB_NAME=songs_list
DB_PORT=3306
DB_HOST=mysql_db
```

### 3. Run Docker Compose

Ensure Docker is running on your system. Open a command line interface (CLI), navigate to the `backend` directory, and execute the following command to start your Docker container:

```bash
cd backend
docker-compose up --build
```

You should see a Docker container starting up, indicating that the backend is now running.

## Setting Up the Frontend

After setting up the backend, you can proceed to configure the frontend.

### 1. Install Dependencies

Navigate to the `frontend` directory and install the necessary dependencies:

```bash
cd frontend
npm install
```

### 2. Start the Frontend Application

With the dependencies installed, you can now start the frontend application:

```bash
npm start
```

This command will launch the frontend application, which should now be communicating with your backend service.

---

Congratulations! You've successfully set up the GroovePlaylist backend and frontend on your local machine. For further assistance or to report issues, please open an issue in this repository.
