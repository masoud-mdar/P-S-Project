import React, {useState} from "react"

import axios from "axios"
import LoadPage from "./LoadPage"
import MainPage from "./MainPage"
import ListPage from "./ListPage"

const App = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [isMainPage, setIsMainPage] = useState(true)
    const [isListPage, setIsListPage] = useState(false)
    const [isPanier, setIsPanier] = useState(false)
    const [booksList, setBooksList] = useState([])

    const handleClick = (Event) => {
        const {name} = Event.target

        switch (name) {
            case "book-list" :
                
                setIsLoading(true)

                fetch("https://henri-potier.techx.fr/books")

                    .then(response => response.json())
                    .then(data => {
                        console.log(data)

                        setIsLoading(false)
                        setIsListPage(true)
                        setIsMainPage(false)
                        setIsPanier(false)

                        setBooksList(data)
                    })
                    
                break

            case "panier" :
                setIsPanier(true)
                setIsMainPage(false)
                setIsListPage(false)
                break

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
                                    
                                    <MainPage
                                        data={{
                                            handleClick: handleClick
                                        }}
                                    />

                                ) : isListPage ? (

                                    <ListPage
                                        data={{
                                            handleClick: handleClick,
                                            booksList: booksList
                                        }}
                                    />

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