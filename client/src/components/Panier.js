import React from "react"

const Panier = (props) => {

    const {panier, booksList, totalPrice, bestPrice, offers, appliedOffer} = props.data

    return (
        <div className="panier">
            {
                !panier.length ? (

                    <div className="empty-cart">
                        <h2>
                            Nothing here yet !
                        </h2>

                        <button name="book-list" onClick={props.data.handleClick} className="main-btn">Book List</button>
                    </div>

                ) : (

                    <div className="full-cart">
                        <ul className="panier-list">
                            {
                                panier.map(item => {
                                    let num = item.num
                                    let book = booksList.find(book => {
                                        if (book.isbn === item.isbn) {
                                            return true
                                        } else return false
                                    })

                                    return (
                                        <li className="book panier-book" key={book.isbn}>
                                            <img className="book-cover" src={`${book.cover}`} alt={book.title}></img>
                                            <div className="book-hover-div">
                                                <h5 className="book-title">
                                                    {book.title}
                                                </h5>
                                                <h3>
                                                    {book.price} €
                                                </h3>
                                                <h3>
                                                    {num}
                                                </h3>
                                                <div className="book-btn-wrapper">
                                                    <button name="remove-from-panier" onClick={props.data.handleClick} id={book.isbn}>Remove</button>
                                                    <button name="more-info" onClick={props.data.handleClick} id={book.isbn}>More info</button>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="panier-price">
                            <h3>
                                Total Price without reduction: {totalPrice} €
                            </h3>

                            <div className="offers-panier">
                                <h3>
                                    The offers available for this cart:
                                </h3>
                                <ul className="price-list">
                                    {
                                        offers.offers.map(item => {
                                            return (
                                                <li key={Math.random() * Math.random()}>
                                                    {
                                                        (item.type !== "slice") || (item.type === "slice" && totalPrice >= item.sliceValue) ? (
                                                            <div>
                                                                <p>
                                                                    Type of offer: {item.type}
                                                                </p>
                                                                <p>
                                                                    Value of offer: {item.value} {item.type === "percentage" ? "%" : "€"}
                                                                </p>                                                              
                                                            </div>
                                                        ) : (
                                                            <div></div>
                                                        )
                                                    }

                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <h3>
                                Applied offer: {appliedOffer}
                            </h3>
                            <h3>
                                Total Price after applying the best reduction: {bestPrice} €
                            </h3>
                            <a href="https://personal-library-masoud.netlify.app" target="_blank" rel="noreferrer">Try out our Personal Library application</a>
                        </div>
                    </div>

                )
            }
        </div>
    )
}


export default Panier