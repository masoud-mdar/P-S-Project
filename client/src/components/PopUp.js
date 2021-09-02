import React from "react"

const PopUp = (props) => {

    let selectedBookInfo = props.data.booksList.find(book => {
        if (book.isbn === props.data.selectedBook) {
            return true
        } else {
            return false
        }
    })

    return (
        <div className="pop-up">
            <h4>
                {selectedBookInfo.title} successfully added to the Cart !
            </h4>
        </div>
    )
}

export default PopUp