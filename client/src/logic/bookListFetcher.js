const booksListFetcher = (setIsLoading, setIsListPage, setIsMainPage, setIsPanier, setSelectedBook, setBooksList, panierPopUp, BASE_URL) => {

    setIsLoading(true)

    fetch(BASE_URL)

        .then(response => response.json())
        .then(data => {

            setIsLoading(false)
            setIsListPage(true)
            setIsMainPage(false)
            setIsPanier(false)
            !panierPopUp && setSelectedBook("")

            setBooksList(data)
        })

}

export default booksListFetcher