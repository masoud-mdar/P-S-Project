import React, {useState} from "react"

import LoadPage from "./LoadPage"
import MainPage from "./MainPage"
import ListPage from "./ListPage"
import MoreInfo from "./MoreInfo"
import Panier from "./Panier"
import Navbar from "./Navbar"
import PopUp from "./PopUp"
import Footer from "./Footer"

import totalPriceCalculator from "../logic/totalPriceCalculator"
import booksListFetcher from "../logic/bookListFetcher"
import offersFetcher from "../logic/offersFetcher"

import {BASE_URL} from "../utils/constants"

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
    const [panierPopUp, setPanierPopUp] = useState(false)
    const [offers, setOffers] = useState({})
    const [totalPrice, setTotalPrice] = useState(0)
    const [bestPrice, setBestPrice] = useState(0)
    const [appliedOffer, setAppliedOffer] = useState("")

    const handleClick = (Event) => {

        const {name, id} = Event.target

        switch (name) {

            case "book-list" :

                if (!booksList.length) {

                    booksListFetcher(setIsLoading, setIsListPage, setIsMainPage, setIsPanier, setSelectedBook, setBooksList, panierPopUp, BASE_URL)

                } else {

                    setIsListPage(true)
                    setIsMainPage(false)
                    setIsPanier(false)
                    !panierPopUp && setSelectedBook("")
                }
                break

            case "panier" :

                if (!isPanier && panier.length) {

                    ///// ***** find the best offer ***** /////

                    // https://henri-potier.techx.fr/books/{ISBN1, ISBN2, ...}/commercialOffers

                    let url = ""

                    panier.forEach(item => {
                        for (let i=0; i<item.num; i++) {
                            if (url === "") {
                                url += item.isbn
                            } else {
                                url += `,${item.isbn}`
                            }
                        }
                    })

                    offersFetcher(setIsLoading, setAppliedOffer, setBestPrice, setOffers, setIsPanier, setIsMainPage, setIsListPage, setIsMoreInfo, setIsShowMore, setSelectedBook, BASE_URL, url, totalPrice, panierPopUp, true)

                } else if (!panier.length) {

                    setIsPanier(true)
                    setIsMainPage(false)
                    setIsListPage(false)
                    setIsMoreInfo(false)
                    setIsShowMore(false)
                    !panierPopUp && setSelectedBook("")
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
                !panierPopUp && setSelectedBook("")
                break

            case "add-to-panier" :

                // panier's format: [{isbn:"", num: int}, {...}, ...]

                if (!panierPopUp) {

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

                    ////// ***** total price ***** /////
                    totalPriceCalculator(booksList, id, setTotalPrice, true)
                }

                setIsShowMore(false)
                setIsMoreInfo(false)

                setSelectedBook(id)
                setPanierPopUp(true)

                setTimeout(() => {
                    setPanierPopUp(false)
                }, 1000)

                break

            case "nav-home-btn" :
                setIsMainPage(true)
                setIsMoreInfo(false)
                setIsShowMore(false)
                setIsPanier(false)
                setIsListPage(false)
                !panierPopUp && setSelectedBook("")
                break

            case "remove-from-panier" :

                ////// ***** total price ***** //////
                totalPriceCalculator(booksList, id, setTotalPrice, false)
                //////// ***** //////

                let index = panier.findIndex(item => {
                    return item.isbn === id
                })

                let tempArr = [...panier]

                let book = tempArr[index] 

                if (book.num > 1) {

                    book.num = book.num - 1

                    tempArr.splice(index, 1, book)

                } else {
                    tempArr.splice(index, 1)
                }

                setPanier(tempArr)

                if (tempArr.length) {

                    ///// ***** find the best offer ***** /////

                    let url = ""

                    tempArr.forEach(item => {
                        for (let i=0; i<item.num; i++) {
                            if (url === "") {
                                url += item.isbn
                            } else {
                                url += `,${item.isbn}`
                            }
                        }
                    })

                    offersFetcher(setIsLoading, setAppliedOffer, setBestPrice, setOffers, setIsPanier, setIsMainPage, setIsListPage, setIsMoreInfo, setIsShowMore, setSelectedBook, BASE_URL, url, totalPrice, panierPopUp, false)
                }
                break

            default :
                console.log(name)
        }
    }

    return (
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
                                        booksList: booksList,
                                        totalPrice: totalPrice,
                                        bestPrice: bestPrice,
                                        offers: offers,
                                        appliedOffer: appliedOffer
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
                                        isShowMore: isShowMore
                                    }}
                                />
                            )
                        }
                        {
                            panierPopUp && (
                                <PopUp
                                    data={{
                                        selectedBook: selectedBook,
                                        booksList: booksList
                                    }}
                                />
                            )
                        }
                        <Footer/>
                    </div>        
                )
            }
        </div>
    )
}

export default App