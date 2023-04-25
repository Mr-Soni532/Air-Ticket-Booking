const express = require('express');
const APIRouter = express.Router();
const authController = require('../Controllers/auth.controller.js')
const flightController = require('../Controllers/flight.controller.js')
const bookingController = require('../Controllers/booking.controller.js');
const authentication = require('../Middlewares/authentication.middleware.js');

// ======== Open Routes =========
// ========> User
APIRouter.post('/register', authController.register)
APIRouter.post('/login', authController.login)

// =====> Flight
APIRouter.get('/flights', flightController.getAllFlights)
APIRouter.get('/flight/:id', flightController.getFlightById)

// ======== Protected Routes =========
APIRouter.post('/flights', authentication, flightController.addFlight)
APIRouter.put('/flight/:id', authentication, flightController.editFlight)
APIRouter.delete('/flights/:id', authentication, flightController.deleteFlight)

// ======> Booking
APIRouter.post('/booking', authentication, bookingController.bookFlight)
APIRouter.get('/dashboard', authentication, bookingController.getAllBooking)

module.exports = APIRouter;