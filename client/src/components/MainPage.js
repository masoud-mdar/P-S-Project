import React from "react"

const MainPage = (props) => {

    return (
        
        <div className="main-page">
            <div className="btn-wrapper">
                <button name="book-list" onClick={props.data.handleClick} className="btn">Book List</button>
                <button name="panier" onClick={props.data.handleClick} className="btn">Panier</button>
            </div>
            <div className="smile"></div>
        </div> 
    )
}


export default MainPage