const totalPriceCalculator = (booksList, id, totalPrice, setTotalPrice, add) => {

    let book = booksList.find(book => {
        if (book.isbn === id) {
            return true
        } else {
            return false
        }
    })

    if (add) {
        setTotalPrice(prevTotalPrice => prevTotalPrice += book.price)
        return (totalPrice + book.price)
    } else {
        setTotalPrice(prevTotalPrice => prevTotalPrice -= book.price)
        return (totalPrice - book.price)
    }

    
}

export default totalPriceCalculator