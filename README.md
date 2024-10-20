# CRM Project REST

This project was created around October 2023 as part of a learning exercise. The main focus of the project is to practice working with **REST APIs** and **CRUD** operations using **Express.js** but without a traditional database. Instead, data is stored in JSON format for simplicity. The goal was to explore how to handle different HTTP methods and URL parameters in a RESTful API using **HTML forms**.

**Note**: This version is currently designed only for **desktop screens** and hasn't been optimized for mobile or responsive design.


## Project Overview

The primary aim of the project was:
- **Learning REST API** design and CRUD operations (Create, Read, Update, Delete).
- **Understanding Express.js** for building server-side applications, especially how to pass parameters via URLs.
- **Focusing on HTML forms**: Since forms traditionally support only GET and POST requests, I used the `method-override` library to simulate PUT and DELETE methods, allowing the full CRUD functionality from the frontend.
  
## Features
- **CRUD Operations**: Users can create, update, read, and delete client information.
- **Data Storage**: Client data is stored in `client.json` without using a full-fledged database.
- **HTML Forms**: All the interactions, such as adding, editing, and deleting users, are performed through HTML forms. The form methods are extended to allow PUT and DELETE using `method-override`.
- **SCSS Practice**: Even though SCSS wasn't necessary for this project, I used it to practice working with stylesheets and modular CSS.
  
## Technologies Used
- **Node.js**: Runtime environment for running the server.
- **Express.js**: Framework used to build the RESTful API.
- **Handlebars (HBS)**: Template engine used to render HTML views.
- **SCSS**: Used for styling the frontend. Although minimal, it allowed me to practice CSS preprocessing techniques.
- **method-override**: Library that allows overriding the HTTP method in forms, enabling the use of PUT and DELETE requests.
- **UUID**: Used for generating unique IDs for clients in the JSON data storage.