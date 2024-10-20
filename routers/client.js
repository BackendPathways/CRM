const express = require('express');
const { db } = require('../utils/db');
const clientRouter = express.Router();

clientRouter
  .get('/', (req, res) => {
    res.render('client/list-all', {
      clients: db.getAll(),
    });
    // res.send(userId ? db.getOne(userId):db.getAll())
  })
  .get('/:id', (req, res) => {
    res.render('client/one', {
      client: db.getOne(req.params.id),
    });
  })
  .post('/', (req, res) => {
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
        id
    });
  })

  .put('/:id', (req, res) => {
    db.update(req.params.id, req.body);
    res.render('client/modified', {
      name: req.body.name,
      id: req.params.id 
    });
  })

  .delete('/:id', (req, res) => {
    const userId = req.params.id;
    const deletedUser = db.getOne(userId);
    db.delete(userId);
    res.render('client/deleted', {
      user: deletedUser,
    });
  })

  .get('/form/add', (req, res) => {
    res.render('client/forms/addUser');
  })

  .get('/form/editUser/:id', (req, res) => {
    res.render('client/forms/EditUser', {
      client: db.getOne(req.params.id),
    });
  });

module.exports = {
  clientRouter,
};
