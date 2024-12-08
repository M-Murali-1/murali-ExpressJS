const express = require("express");
const app = express();
const tuts = require("../models/ tutorial.model");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;
  tuts.getAll(title, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error while fetching the data..!",
      });
    }
    // console.log(data);

    return res.send(data);
  });
};

//Retriving the Tutorials from the database (which are published)
exports.findAllPublished = (req, res) => {
  tuts.getAllPublished((err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error while fetching the data..!",
      });
    }
    // console.log(data);
    return res.send(data);
  });
};

//Retriving the single tutorial based on the id given.
exports.findOne = (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  if (!isNaN(id) && id > 0) {
    tuts.getOne(id, (err, data) => {
      if (err) {
        return res.status(500).send({
          message: err.message || "Some error while fetching the data..!",
        });
      }
      return res.status(200).json(data);
    });
  } else {
    return res.status(500).send({ message: "Invalid Id Number" });
  }
};
exports.delete = (req, res) => {
  const id = Number(req.params.id);
//   console.log(id);
  if (!isNaN(id) && id > 0) {
    tuts.delete(id, (err, data) => {
      if (err) {
        return res.status(500).send({
          message: err.message || "Some error while deleting the data..!",
        });
      }
      return res.status(200).json(data);
    });
  } else {
    return res.status(500).send({ message: "Invalid Id Number" });
  }
};

exports.deleteAll = (req, res) => {
  tuts.deleteAll((err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error while deleting the data..!",
      });
    }
    return res.status(200).json(data);
  });
};
exports.create = (req, res) => {
  data = [req.body.title, req.body.description, req.body.published || 0];
  tuts.create(data, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error while inserting the data..!",
      });
    }
    return res.status(201).json(data);
  });
};

exports.update = (req, res) => {
  const id = Number(req.params.id);
//   console.log(id);
  if (!isNaN(id) && id > 0) {
    data = [req.body.title, req.body.description, req.body.published || 0,id];
    tuts.update(data, (err, data) => {
      if (err) {
        return res.status(500).send({
          message: err.message || "Some error while updating the data..!",
        });
      }
      return res.status(201).json(data);
    });
  } else {
    return res.status(500).send({ message: "Invalid Id Number" });
  }
};
