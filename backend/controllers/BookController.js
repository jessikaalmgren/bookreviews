const Book = require('../models/BookModel')
const mongoose = require('mongoose')

//GET all books
const getBooks = async (req, res) => {
    const books = await Book.find({}).sort({createdAt: -1})

    res.status(200).json(books)
}

//GET a single book
const getBook = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "No such book exists"})
    }

    const book = await Book.findById(id)

    if (!book) {
        return res.status(404).json({error: "No such book exists"})
    }

    res.status(200).json(book)
}

//CREATE a new book
const createBook = async (req, res) => {
    const {title, author, description} = req.body
    
    //Add doc to DB
    try {
        const book = await Book.create({title, author, description})
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//DELETE a book
const deleteBook = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "No such book exists"})
    }

    const book = await Book.findOneAndDelete({_id: id})

    if (!book) {
        return res.status(400).json({error: "No such book exists"})
    }

    res.status(200).json(book)
}

//UPDATE a book
const updateBook = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "No such book exists"})
    }

    const book = await Book.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!book) {
        return res.status(400).json({error: "No such book exists"})
    }

    res.status(200).json(book)
}



module.exports = {
    getBooks,
    getBook,
    createBook,
    deleteBook,
    updateBook
}