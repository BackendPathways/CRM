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
      const deletedUser = db.getOne(req.params.id);

      db.delete(req.params.id);
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

      res.render('client/forms/editUser', {
        client,
      });
    } catch (err) {
      next(err);
    }
  });

module.exports = {
  clientRouter,
};
