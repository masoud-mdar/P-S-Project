import React from "react"

const Panier = (props) => {

    const {panier, bestOffer, booksList} = props.data

    return (
        <div className="panier">
            {
                !panier.length ? (

                    <div className="empty-cart">
                        <h2>
                            Nothing yet !
                        </h2>

                        <button name="book-list" onClick={props.data.handleClick} className="main-btn">Book List</button>
                    </div>

                ) : (

                    <div className="full-cart">
                        <div className="panier-list">
                            <ul>
                                {
                                    panier.map(item => {
                                        let book = booksList.find(book => {

                                            if (book.isbn === item) {
                                                return true
                                            } else {
                                                return false
                                            }
                                        })
                                        return (
                                            <li className="book" key={book.isbn}>
                                                <img className="book-cover" src={`${book.cover}`} alt={book.title}></img>
                                                <div className="book-hover-div">
                                                    <h5 className="book-title">
                                                        {book.title}
                                                    </h5>
                                                    <h4>
                                                        {book.price} €
                                                    </h4>
                                                    <div className="book-btn-wrapper">
                                                        <button name="more-info" onClick={props.data.handleClick} id={book.isbn}>More info</button>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="panier-price"></div>
                    </div>

                )
            }
        </div>
    )
}


export default Panier