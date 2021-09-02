const totalPriceCalculator = (booksList, id, setTotalPrice, add) => {

    let book = booksList.find(book => {
        if (book.isbn === id) {
            return true
        } else {
            return false
        }
    })

    if (add) {
        setTotalPrice(prevTotalPrice => prevTotalPrice += book.price)
    } else {
        setTotalPrice(prevTotalPrice => prevTotalPrice -= book.price)
    }

    
}

export default totalPriceCalculator