# GrooveGather

## Description

GrooveGather is a web application designed to enhance your party experience by allowing users to add music to a shared database. This communal playlist then serves as the soundtrack for your gathering, ensuring everyone gets to hear their favorite tunes. Built with a React frontend, NestJS backend, and a MySQL database, GrooveGather is easy to set up and use, making it the perfect addition to any party.

## Features

- Add your favorite music to a shared playlist
- Seamless music playback at your party
- Easy-to-use interface for all ages

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MySQL server running locally or accessible remotely

## Setup

To get GrooveGather up and running, follow these steps:

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd path/to/backend
   
1. Install the necessary dependencies:
npm install

2. Create a `.env` file in the root of the backend directory with the following variables to configure your MySQL connection:
   ```plaintext
   DB_PASSWORD=<your_mysql_password>
   DB_USERNAME=<your_mysql_username>
   DB_NAME=songs_list
   DB_PORT=<your_mysql_port>
   DB_HOST=<your_mysql_host>

### Frontend Setup

1. Navigate to the frontend directory:
cd path/to/frontend

2. Install the necessary dependencies:
npm install

3. Start the development server:
npm start
The React app should now be running on http://localhost:3000.


