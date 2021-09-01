import React from "react"

const Navbar = (props) => {

    const {isMainPage, isListPage, isPanier} = props.data

    const selectedStyle = {"color": "brown"}

    return (
        <div className="nav-bar">
            <div className="left-nav">
                <h2 className="nav-title">
                    Henri Potier
                </h2>
            </div>
            <div className="right-nav">
                <div className="nav-btn-wrapper">
                    <button name="nav-home-btn" onClick={props.data.handleClick} style={isMainPage ? selectedStyle : {}} className="nav-btn">Home Page</button>
                    <button name="book-list" onClick={props.data.handleClick} style={isListPage ? selectedStyle : {}} className="nav-btn">Book list</button>
                    <button name="panier" onClick={props.data.handleClick} style={isPanier ? selectedStyle : {}} className="nav-btn">Panier</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar