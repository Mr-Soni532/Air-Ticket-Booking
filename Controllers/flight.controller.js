const FlightModel = require("../Model/flight.model");

exports.getAllFlights = async (req, res) => {
    try {
        let flights = await FlightModel.find();
        if (flights)
            return res.status(200).json({ flights })

        return res.status(200).json({ msg: 'No flight data available' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong while getting flights.'});
        console.log(error)
    }
}
exports.getFlightById = async (req, res) => {
    try {
        let id = req.params.id;
        let flights = await FlightModel.findById(id);
        if (flights)
            return res.status(200).json({ flights })

        return res.status(404).json({ msg: 'flight not found!' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong while getting flights.'});
        console.log(error)
    }
}
exports.addFlight = async (req, res) => {
    let { airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price } = req.body
    try {
        let flight = await FlightModel.find({ flightNo });
        if (flight.length)
            return res.status(403).json({ message: `Flight ${flightNo} Already Registered!` });
        let payload = { airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price }
        await FlightModel(payload).save()
        res.status(200).json({ msg: 'Flights added successfully🎉' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong while adding flights.' });
        console.log(error)
    }
}

exports.editFlight = async (req, res) => {
    try {
        let id = req.params.id;
        await FlightModel.findByIdAndUpdate(id, req.body)
        res.status(204).send({ msg: `Flight with id: ${id} edited successfully🎉` })
    } catch (error) {
        res.status(500).json({ message: `Something went wrong while editing flight ${id}.` });
        console.log(error)
    }
}
exports.deleteFlight = async (req, res) => {
    try {
        let id = req.params.id;
        await FlightModel.findByIdAndDelete(id);
        res.status(202).json({ msg: `flight with id: ${id} has been deleted🎉` })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong while deleting flight.' });
        console.log(error)
    }
}
