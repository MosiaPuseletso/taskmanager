# Task Manager

Task Manager is a full-stack web application built with Next.js frontend and NestJS with Fastify backend, using PostgreSQL as the database.

## Prerequisites

Before getting started, ensure you have the following installed:

- Node.js and npm
- PostgreSQL

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/MosiaPuseletso/taskmanager.git
    ```

2. Navigate into the project directory:

    ```bash
    cd taskmanager
    ```

3. Install dependencies for both frontend and backend:

    ```bash
    # Install frontend dependencies
    cd frontend
    npm install
    
    # Install backend dependencies
    cd ../backend
    npm install
    ```

## Database Setup

1. Ensure PostgreSQL is running on your machine.
2. Create a new PostgreSQL database for the project.
3. Configure the database connection settings in the `backend/.env` file:

    ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    DB_DATABASE=task_manager_db
    DATABASE_SSL=0 // 0 when it is local and 1 when deployed on an SSL enabled postgres server
    JWT_SECRET=taskmanager // Choose any secret
    ```

4. Run database migrations to create tables:

    ```bash
    cd backend
    npm run migrate
    ```

## Running the Applications

### Frontend

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Start the Next.js development server:

    ```bash
    npm run dev
    ```

3. The frontend should now be running at `http://localhost:3000`.

### Backend

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Start the NestJS with Fastify server:

    ```bash
    npm run start:dev
    ```

3. The backend should now be running at `http://localhost:5000`.

## Usage

- Open your web browser and visit `http://localhost:3000` to access the Task Manager application.
- Sign up or log in to start managing your tasks.

