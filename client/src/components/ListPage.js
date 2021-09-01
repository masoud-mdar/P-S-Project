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
                                        <p className="book-title">
                                            {book.title}
                                        </p>
                                        <div className="book-btn-wrapper">
                                            <button>Add to Cart</button>
                                            <button name="more-info" onClick={props.data.handleClick}>More info</button>
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