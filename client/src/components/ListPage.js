import React from "react"

const ListPage = (props) => {

    const {booksList} = props.data

    return (

        <div className="list-page">
            <ul className="book-list">
                {
                    booksList && (

                        booksList.map(book => {

                            return (
                                <li className="book" key={book.isbn}>
                                    <img className="book-cover" src={`${book.cover}`} alt={book.title}></img>
                                    <div className="book-hover-div">
                                        <h5 className="book-title">
                                            {book.title}
                                        </h5>
                                        <h5>
                                            {book.price} €
                                        </h5>
                                        <div className="book-btn-wrapper">
                                            <button name="add-to-panier" onClick={props.data.handleClick} id={book.isbn}>Add to Cart</button>
                                            <button name="more-info" onClick={props.data.handleClick} id={book.isbn}>More info</button>
                                        </div>
                                    </div>
                                </li>
                            )                   
                        })
                    )
                }
            </ul>
        </div>
    )
}

export default ListPage