const express = require('express')
const {getBooks, getBook, createBook, deleteBook, updateBook} = require('../controllers/BookController')

const router = express.Router() 


//GET all books
router.get('/', getBooks)

//GET a single book 
router.get('/:id', getBook)

//POST a new book 
router.post('/', createBook)

//DELETE a book
router.delete('/:id', deleteBook)

//UPDATE a book
router.patch('/:id', updateBook)




module.exports = router