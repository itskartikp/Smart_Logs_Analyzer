
# FRONTEND


This is the frontend part of our project. Follow the steps below to set up and run the React application.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/): Make sure to install a version that includes npm (Node Package Manager).

## Getting Started

Clone the repository to your local machine:


Navigate to the project directory:


Install project dependencies using npm:

```
npm install
```


Install axios and react-dropzone:

```
npm install axios react-dropzone
```

This will install the necessary packages for making HTTP requests (axios) and handling file uploads (react-dropzone).


Start the React development server:

```
npm start
```
This will launch the application and open it in your default web browser. By default, it will be available at http://localhost:3000.



# BACKEND

Create and Activate Virtual Environment:

```
virtualenv newenv
source newenv/bin/activate
```

Install Django:
```
pip install django
```

Install Required Packages:
```
pip install djangorestframework
pip install django-cors-headers
pip install django-storages
pip install pandas
```

Run Migrations:
```
python manage.py migrate
```

Start Django Development Server:
```
python manage.py runserver
```

The server is running at http://127.0.0.1:8000/ by default.
