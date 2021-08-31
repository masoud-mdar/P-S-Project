import React, {useState} from "react"

import axios from "axios"
import LoadPage from "./LoadPage"

const App = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [isMainPage, setIsMainPage] = useState(true)

    const handleClick = (Event) => {

    }



    return (
        <div>

            <div className="container">
                {
                    isLoading ? (

                        <LoadPage />

                    ) : (

                        <div className="main-page">
                            <button name="book-list" onClick={handleClick} className="btn">Book List</button>
                            <button name="panier" onClick={handleClick} className="btn">Panier</button>
                        </div>

                    )
                }
            </div>

        </div>

    )
}

export default App