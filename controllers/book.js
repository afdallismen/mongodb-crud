const { Book } = require('../models')

module.exports = {
  list: function (req, res) {
    Book.findAll()
      .then(books => {
        res.status(200).json(books)
      })
      .catch(err => res.status(500).json(err))
  },
  get: function (req, res) {
    Book.findById(req.params.id)
      .then(book => {
        if (!book) res.status(204)
        else res.status(200)
        res.json(book)
      })
      .catch(err => res.status(500).json(err))
  },
  create: function (req, res) {
    Book.create({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    })
    .then(created => {
      res.status(201).json(created)
    })
    .catch(err => res.status(500).json(err))
  },
  update: function (req, res) {
    Book
      .update(req.params.id, {
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        stock: req.body.stock
      })
      .then(updated => {
        res.status(201).json(updated)
      })
      .catch(err => res.status(500).json(err))
  },
  edit: function (req, res) {
    Book
      .edit(req.params.id, { ...req.body })
      .then(edited => {
        res.status(201).json(edited)
      })
      .catch(err => res.status(500).json(err))
  },
  remove: function (req, res) {
    Book
      .remove(req.params.id)
      .then(_ => res.status(204).json())
      .catch(err => res.status(500).json(err))
  }
}