const offersFetcher = (setIsLoading, setAppliedOffer, setBestPrice, setOffers, setIsPanier, setIsMainPage, setIsListPage, setIsMoreInfo, setIsShowMore, setSelectedBook, BASE_URL, url, totalPrice, panierPopUp, add ) => {
    setIsLoading(true)

    fetch(`${BASE_URL}/${url}/commercialOffers`)

        .then(response => response.json())
        .then(data => {

            ///// ***** find the best offer ***** /////

            let pendingPrice = totalPrice
            let total = 0
            data.offers.forEach(item => {

                if (item.type === "percentage") {

                    let percMoney = totalPrice * (item.value/100)
                    total = totalPrice - percMoney
                    if (total < pendingPrice) {
                        pendingPrice = total
                        setAppliedOffer(item.type)
                    }

                } else if (item.type === "minus") {

                    total = totalPrice - (item.value)
                    if (total < pendingPrice) {
                        pendingPrice = total
                        setAppliedOffer(item.type)
                    }

                } else if (item.type === "slice" && totalPrice >= item.sliceValue) {

                    let howMuchSlice = Math.floor(totalPrice/item.sliceValue)
                    howMuchSlice *= item.value
                    total = totalPrice - howMuchSlice
                    if (total < pendingPrice) {
                        pendingPrice = total
                        setAppliedOffer(item.type)
                    }
                }

                setBestPrice(pendingPrice)

                setOffers(data)

                setIsLoading(false)
    
                setIsPanier(false)
                setIsMainPage(true)
                setIsListPage(false)
                setIsMoreInfo(false)
                setIsShowMore(false)
            })

            setIsPanier(true)
            setIsMainPage(false)

            ///// ***** /////



            if (add) {

                !panierPopUp && setSelectedBook("")
            }
        })
}

export default offersFetcher