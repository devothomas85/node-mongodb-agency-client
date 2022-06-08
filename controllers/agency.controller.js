module.exports = exports = {};
const Agency = require("../models/agency.model");
const Client= require('../models/client.model');

// Create and Save
exports.createAgency = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create an Agency
    const agency = new Agency(req.body);
    // Save Agency in the database
    agency
        .save(agency)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the agency."
            });
        });

};
// Retrieve
exports.getAgencies = (req, res) => {
    const title = req.query.name;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Agency.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving agenies."
            });
        });
};
// Find a single Agency with an id
exports.fetchAgencyDetails = (req, res) => {
    const id = req.params.Id;
    console.log(id, "id")
    Agency.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Agency with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Agency with id=" + id });
        });
};
// Update an Agency by the id in the request
exports.updateAgencyDetails = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.Id;
    Agency.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Agency with id=${id}`
                });
            } else res.send({ message: "Agency was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Agency with id=" + id
            });
        });
};
// Delete an Agency with the specified id in the request
exports.deleteAgency = (req, res) => {
    const id = req.params.Id;
    Agency.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Agency with id=${id}`
                });
            } else {
                res.send({
                    message: "Agency was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Agency with id=" + id
            });
        });
};