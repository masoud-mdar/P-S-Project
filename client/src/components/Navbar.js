import React from "react"

const Navbar = (props) => {

    const {isMainPage, isListPage, isPanier, panier} = props.data

    const selectedStyle = {"color": "brown"}

    let howMany = 0

    if (panier.length) {
        panier.forEach(book => {
            howMany += book.num
        })
    }

    return (
        <div className="nav-bar">
            <div className="left-nav">
                <h2 className="nav-title">
                    Henri Potier
                </h2>
            </div>
            <div className="right-nav">
                <div className="nav-btn-wrapper">
                    <button name="nav-home-btn" onClick={props.data.handleClick} style={isMainPage ? selectedStyle : {}} className="nav-btn">Home</button>
                    <button name="book-list" onClick={props.data.handleClick} style={isListPage ? selectedStyle : {}} className="nav-btn">List</button>
                    <button name="panier" onClick={props.data.handleClick} style={isPanier ? selectedStyle : {}} className="nav-btn">Cart</button>
                    <div className="nav-panier-counter">
                        {howMany ? howMany : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar