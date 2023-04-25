const BookingModel = require("../Model/booking.model");
const FlightModel = require("../Model/flight.model");

exports.bookFlight = async (req, res) => {
    try {
        let id = req.body.flightId
        let flight = await FlightModel.findById(id)
        if (flight) {
            let booking = new BookingModel({
                user: req.body.userId,
                flight: flight.id
            })
            await booking.save();
            res.status(201).json({ msg: 'Flight Booked Successfully🎉', flightDetails: flight });
        } else {
            res.status(404).json({ message: `Invalid flight ${id}` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong while booking fligt!' });
        console.log(error)
    }
}

exports.getAllBooking = async (req, res) => {
    try {
        let bookings = await BookingModel.find();
        if (bookings)
            return res.status(200).json({ bookings })

        return res.status(200).json({ msg: 'No booking data available' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong while getting booking.' });
        console.log(error)
    }
}