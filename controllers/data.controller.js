module.exports = exports = {};
const Agency = require("../models/agency.model");
const Client = require('../models/client.model');

// Create and Save
exports.createAgencyandClient = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    console.log(req.body)
    // Create an Agency
    const agency = new Agency(req.body.agency);
    // Save Tutorial in the database
    agency
        .save(agency)
        .then(data => {
            //res.send(data);
            console.log("data : ", data.id)
            req.body.client.agencyId = data.id;
            const client = new Client(req.body.client);
            client
                .save(client)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the client."
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the agency."
            });
        });

};

// Retrieve
exports.getTopClientDetails = (req, res) => {
    const title = req.params.agencyName;
    console.log(req.params.agencyName, "name")
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Agency.aggregate([
        { $match: { name: title } },
        {
            $project: {
                _id: 1,
                name: 1
            },
        },
        {
            $lookup: {
                from: "clients",
                localField: "_id",
                foreignField: "agencyId",
                as: "docs",
            }
        },
        { $unwind: "$docs" },
        { $project: { _id: 1, id: "$docs.agencyId", agencyName: '$name', clientName: "$docs.name", total: "$docs.total" } },
        {
            $group:
            {
                _id: "$id",
                agency: { $first : "$agencyName" },
                Total: { $max: "$total" }
            }
        },
        { $project: { _id: 0, agencyName: "$agency", Total: "$Total" } }
    ])
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
};