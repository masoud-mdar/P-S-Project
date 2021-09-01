import React, {useState} from "react"

import axios from "axios"
import LoadPage from "./LoadPage"

const App = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [isMainPage, setIsMainPage] = useState(true)
    const [isListPage, setIsListPage] = useState(false)
    const [isPanier, setIsPanier] = useState(false)

    const handleClick = (Event) => {
        const {name} = Event.target

        switch (name) {
            case "book-list" :
                console.log("yessss")
                setIsListPage(true)
                setIsMainPage(false)
                setIsPanier(false)
                break

            case "panier" :
                setIsPanier(true)
                setIsMainPage(false)
                setIsListPage(false)

            case "fetch" :
                fetch("https://henri-potier.techx.fr/books")
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                    })
            default :
                console.log(name)
        }
    }



    return (
        <div>

            <div>
                {
                    isLoading ? (

                        <LoadPage />

                    ) : (

                        <div className="container">

                            <div className="nav-bar"></div>

                            {
                                isMainPage ? (

                                    <div className="main-page">
                                        <div className="btn-wrapper">
                                            <button name="book-list" onClick={handleClick} className="btn">Book List</button>
                                            <button name="panier" onClick={handleClick} className="btn">Panier</button>
                                            {/*<button name="fetch" onClick={handleClick} className="btn">Fetch Data</button>*/}
                                        </div>
                                        <div className="smile"></div>

                                    </div>      

                                ) : isListPage ? (

                                    <div className="list-page"></div>

                                ) : (
                                    <div className="panier"></div>
                                )
                            }
                        </div>

                        
                    )
                }
            </div>

        </div>

    )
}

export default App