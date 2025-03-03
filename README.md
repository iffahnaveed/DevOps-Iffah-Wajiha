Overview

This project consists of multiple microservices designed to work together to handle user authentication, event management, bookings, and notifications. The system is built using Node.js, Express.js, Flask, MongoDB, and RabbitMQ.

Microservices Included:

User Service - Handles user authentication (Login/Signup).

Booking Service - Manages event bookings and reservations.

Event Service - Manages event details and availability.

Notification Service - Sends email/SMS notifications for booking confirmations.

System Architecture

Frontend: React.js

Backend: Node.js, Express.js, Flask

Database: MongoDB

Message Broker: RabbitMQ (for async communication)

Authentication: JWT (JSON Web Token)

Setup Guide

Prerequisites

Ensure you have the following installed:

Node.js & npm

MongoDB

RabbitMQ

Flask (for Notification Service)

Clone the Repository

 git clone https://github.com/iffahnaveed/DevOps-Iffah-Wajiha.git
 cd DevOps-Iffah-Wajiha

Start Individual Microservices

User Service

 cd UserService
 npm install
 npm start

Booking Service

 cd BookingService
 npm install
 npm start

Event Service

 cd EventService
 npm install
 npm start

API Endpoints

User Service

- Register a new user

- Authenticate user

Booking Service

 - Create a new booking

- Retrieve all bookings

Event Service

- Retrieve all events

Notification Service

Listens to RabbitMQ events for sending notifications
