module.exports = exports = {};
const Client= require('../models/client.model');

// Create and Save
exports.createClient = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create an Client
    const client = new Client(req.body);
    // Save Tutorial in the database
    client
        .save(client)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Client."
            });
        });

};
// Retrieve
exports.getClients = (req, res) => {
    const title = req.query.name;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Client.find(condition)
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
// Find a single Client with an id
exports.fetchClientDetails = (req, res) => {
    const id = req.params.Id;
    console.log(id,"id")
    Client.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Client with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Client with id=" + id });
        });
};
// Update an Client by the id in the request
exports.updateClientDetails = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.Id;
      Client.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Client with id=${id}`
            });
          } else res.send({ message: "Client was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Client with id=" + id
          });
        });
};
// Delete an Client with the specified id in the request
exports.deleteClient = (req, res) => {
    const id = req.params.Id;
    Client.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Client with id=${id}`
          });
        } else {
          res.send({
            message: "Client was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Client with id=" + id
        });
      });
};

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};