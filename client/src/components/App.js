import React, {useState} from "react"

import LoadPage from "./LoadPage"
import MainPage from "./MainPage"
import ListPage from "./ListPage"
import MoreInfo from "./MoreInfo"
import Panier from "./Panier"
import Navbar from "./Navbar"
import PopOut from "./PopOut"

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
    const [panierPopOut, setPanierPopOut] = useState(false)
    const [offers, setOffers] = useState([])
    const [bestOffer, setBestOffer] = useState({})

    const handleClick = (Event) => {
        const {name, id} = Event.target

        switch (name) {

            case "book-list" :

                if (!booksList.length) {

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

                } else {

                    setIsListPage(true)
                    setIsMainPage(false)
                    setIsPanier(false)
                    setSelectedBook("")
                }
                
                break

            case "panier" :

                if (!isPanier && panier.length) {

                    setIsLoading(true)

                    // https://henri-potier.techx.fr/books/{ISBN1, ISBN2, ...}/commercialOffers

                    let url = ""

                    panier.forEach((item, index) => {
                        if (!index) {
                            url += item
                        } else {
                            url += `,${item}`
                        }
                    })

                    console.log(url)

                    fetch(`https://henri-potier.techx.fr/books/${url}/commercialOffers`)

                        .then(response => response.json())
                        .then(data => {

                            console.log(data)
                            setOffers(data)

                            setIsLoading(false)

                            setIsPanier(true)
                            setIsMainPage(false)
                            setIsListPage(false)
                            setIsMoreInfo(false)
                            setIsShowMore(false)
                            setSelectedBook("")
                        })



                } else if (!panier.length) {

                    setIsPanier(true)
                    setIsMainPage(false)
                    setIsListPage(false)
                    setIsMoreInfo(false)
                    setIsShowMore(false)
                    setSelectedBook("")
                }

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

                // [{isbn:"", num: int}]

                if (!panierPopOut) {

                    if (panier.length) {

                        let index = panier.findIndex(item => {
                            return item.isbn === id
                        })

                        if (index < 0) {

                            setPanier(prevPanier => {
                                prevPanier.push({isbn: id, num: 1})
                                return prevPanier
                            })

                        } else {

                            let tempArr = [...panier]
                            let book = tempArr[index]
                            book.num = book.num + 1
                            
                            tempArr.splice(index, 1, book)

                            setPanier(tempArr) 
                        }

                    } else {

                        setPanier(prevPanier => {
                            prevPanier.push({isbn: id, num: 1})
                            return prevPanier
                        })                    
                    }
                }



                setIsShowMore(false)
                setIsMoreInfo(false)

                setSelectedBook(id)

                setPanierPopOut(true)

                setTimeout(() => {
                    setPanierPopOut(false)
                }, 2000)

                break

            case "nav-home-btn" :
                setIsMainPage(true)
                setIsMoreInfo(false)
                setIsShowMore(false)
                setIsPanier(false)
                setIsListPage(false)
                setSelectedBook("")
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

                            <Navbar
                                data={{
                                    handleClick: handleClick,
                                    panier: panier,
                                    isMainPage: isMainPage,
                                    isListPage: isListPage,
                                    isPanier: isPanier
                                }}
                            />

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

                                ) : isPanier ? (

                                    <Panier
                                        data={{
                                            handleClick: handleClick,
                                            panier: panier,
                                            bestOffer: bestOffer,
                                            booksList: booksList
                                        }}
                                    />

                                ) : (
                                    <div></div>
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

                            {
                                panierPopOut && (
                                    <PopOut
                                        data={{
                                            selectedBook: selectedBook,
                                            booksList: booksList
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