import React from "react"

const PopOut = (props) => {

    let selectedBookInfo = props.data.booksList.find(book => {
        if (book.isbn === props.data.selectedBook) {
            return true
        } else {
            return false
        }
    })

    return (
        <div className="pop-out">
            <h4>
                {selectedBookInfo.title} successfully added to the Cart !
            </h4>
        </div>
    )
}

export default PopOut