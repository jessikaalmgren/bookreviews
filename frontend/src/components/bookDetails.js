import {useBooksContext} from '../hooks/useBooksContext'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BookDetails = ({book}) => {
    const {dispatch} = useBooksContext()

    const handleClick = async () => {
        const response = await fetch('/api/books/' + book._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_BOOK', payload: json})
        }
    }

    return (
        <div className="book-details">
            <h4>{book.title}</h4>
            <p><strong>Author: </strong>{book.author}</p>
            <p><strong>Description: </strong>{book.description}</p>
            <p>{formatDistanceToNow(new Date(book.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}
export default BookDetails