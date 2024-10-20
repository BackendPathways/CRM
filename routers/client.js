const express = require('express');
const { db } = require('../utils/db');
const clientRouter = express.Router();

clientRouter
  .get('/', (req, res, next) => {
    try {
      const clients = db.getAll();
      res.render('client/list-all', { clients });
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', (req, res, next) => {
    try {
      const client = db.getOne(req.params.id);
      if (!client) {
        const error = new Error('Client not found');
        error.statusCode = 404;
        throw error;
      }
      res.render('client/one', { client });
    } catch (err) {
      next(err);
    }
  })
  .post('/', (req, res, next) => {
    try {
      const { name, mail, nextContact, notes } = req.body;

      const id = db.create({
        name,
        mail,
        nextContact,
        notes,
      });
      console.log(db._data);
      res.render('client/added', {
        name,
        id,
      });
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', (req, res, next) => {
    try {
      const client = db.getOne(req.params.id);
      if (!client) {
        const error = new Error('Client not found');
        error.statusCode = 404;
        throw error;
      }

      db.update(req.params.id, req.body);

      res.render('client/modified', {
        name: req.body.name,
        id: req.params.id,
      });
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', (req, res, next) => {
    try {
      const userId = req.params.id;
      const deletedUser = db.getOne(userId);

      if (!deletedUser) {
        const error = new Error('Client not found');
        error.statusCode = 404;
        throw error;
      }
      db.delete(userId);
      res.render('client/deleted', {
        user: deletedUser,
      });
    } catch (err) {
      next(err);
    }
  })

  .get('/form/add', (req, res) => {
    res.render('client/forms/addUser');
  })

  .get('/form/editUser/:id', (req, res, next) => {
    try {
      const client = db.getOne(req.params.id);
      if (!client) {
        const error = new Error('Client not found');
        error.statusCode = 404;
        throw error;
      }
      res.render('client/forms/EditUser', {
        client: db.getOne(client),
      });
    } catch (err) {
      next(err);
    }
  });

module.exports = {
  clientRouter,
};
