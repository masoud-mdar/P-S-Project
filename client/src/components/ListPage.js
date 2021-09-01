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
                                <li className="book" key={book.isbn}>{book.title}</li>
                            )
                            
                        })
                    )
                }
            </ul>
        </div>
    )
}

export default ListPage