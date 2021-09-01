import React, {useState} from "react"

import axios from "axios"
import LoadPage from "./LoadPage"
import MainPage from "./MainPage"
import ListPage from "./ListPage"
import MoreInfo from "./MoreInfo"

const App = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [isMainPage, setIsMainPage] = useState(true)
    const [isListPage, setIsListPage] = useState(false)
    const [isPanier, setIsPanier] = useState(false)
    const [booksList, setBooksList] = useState([])
    const [isMoreInfo, setIsMoreInfo] = useState(false)
    const [selectedBook, setSelectedBook] = useState("")
    const [isShowMore, setIsShowMore] = useState(false)
    const [panier, setPanier] = useState([])

    const handleClick = (Event) => {
        const {name, id} = Event.target

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
                        setSelectedBook("")

                        setBooksList(data)
                    })

                break

            case "panier" :
                setIsPanier(true)
                setIsMainPage(false)
                setIsListPage(false)
                setIsMoreInfo(false)
                setSelectedBook("")
                break

            case "more-info" :
                setIsMoreInfo(true)
                setSelectedBook(id)
                break

            case "show-more" :
                setIsShowMore(true)
                break

            case "show-less" :
                setIsShowMore(false)
                break
            case "synopsis-close" :
                setIsMoreInfo(false)
                setIsShowMore(false)
                setSelectedBook("")
                break

            case "add-to-panier" :
                setPanier(prevPanier => {
                    prevPanier.push(id)
                    return prevPanier
                })
                console.log(panier)
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

                            {
                                isMoreInfo && (
                                    <MoreInfo
                                        data={{
                                            handleClick: handleClick,
                                            selectedBook: selectedBook,
                                            booksList: booksList,
                                            isShowMore: isShowMore,
                                            panier: panier
                                        }}
                                    />
                                )
                            }

                            <div className="footer"></div>

                        </div>

                        
                    )
                }
            </div>

        </div>

    )
}

export default App