import { useState } from "react"
import {useBooksContext} from '../hooks/useBooksContext'


const BookForm = () => {
    const {dispatch} = useBooksContext()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
   
    const handleSubmit = async (e) => {
        e.preventDefault()

        const book = {title, author, description}

        const response = await fetch('/api/books', {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setAuthor('')
            setDescription('')
            setError(null)
            console.log('new book added', json)
            dispatch({type: 'CREATE_BOOK', payload: json})
        }
    }


    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Book</h3>

            <label>Book Title:</label>
            <input 
                type="text"
                onChange={(e)=> setTitle(e.target.value)}
                value={title}
            />

            <label>Author:</label>
            <input 
                type="text"
                onChange={(e)=> setAuthor(e.target.value)}
                value={author}
            />

            <label>Description:</label>
            <input 
                type="text"
                onChange={(e)=> setDescription(e.target.value)}
                value={description}
            />

            <button>Add Book</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default BookForm