const { readFile, writeFile } = require('fs').promises;
const { join } = require('path');
const { v4: uuid } = require('uuid');
class Db {
  constructor(dbFileName) {
    this.dbFileName = join(__dirname, '../data', dbFileName);
    this._load();
  }

  async _load() {
    try {
      this._data = JSON.parse(await readFile(this.dbFileName, 'utf-8'));
    } catch (err) {
      throw new Error('Failed to load the database');
    }
  }

  _save() {
    try {
      writeFile(this.dbFileName, JSON.stringify(this._data), 'utf-8');
    } catch (err) {
      throw new Error('Failed to save the database');
    }
  }

  create(obj) {
    try {
      if (!obj || !obj.name || !obj.mail) {
        const error = new Error('Name and email are required');
        error.statusCode = 400;
        throw error;
      }
      const id = uuid();
      this._data.push({
        id: id,
        ...obj,
      });
      this._save();
      return id;
    } catch (err) {
      throw err;
    }
  }

  getAll() {
    try {
      return this._data;
    } catch (err) {
      throw new Error('Failed to fetch all data');
    }
  }

  getOne(id) {
    try {
      const record = this._data.find(oneObj => oneObj.id === id);
      if (!record) {
        const error = new Error(`User with id: ${id} not found`);
        error.statusCode = 404;
        throw error;
      }
      return record;
    } catch (err) {
      throw err;
    }
  }

  update(id, newObj) {
    try {
      const index = this._data.find(oneObj => oneObj.id === id);
      if (index === -1) {
        const error = new Error(`User with id: ${id} not found`);
        error.statusCode = 404;
        throw error;
      }
      this._data = this._data.map(oneObj =>
        oneObj.id === id
          ? {
              ...oneObj,
              ...newObj,
            }
          : oneObj
      );
      this._save();
    } catch (err) {
      throw err;
    }
  }

  delete(id) {
    try {
      const index = this._data.find(oneObj => oneObj.id === id);
      if (index === -1) {
        const error = new Error(`User with id: ${id} not found`);
        error.statusCode = 404;
        throw error;
      }
      this._data = this._data.filter(obj => obj.id !== id);
      this._save();
    } catch (err) {
      throw err
    }
  }
}
const db = new Db('client.json');

module.exports = {
  db,
};
