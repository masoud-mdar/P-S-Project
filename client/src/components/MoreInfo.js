import React from "react"

const MoreInfo = (props) => {

    let selectedBookInfo = props.data.booksList.find(book => {
        if (book.isbn === props.data.selectedBook) {
            return true
        } else {
            return false
        }
    })

    return (
        <div className="more-info">

            <button name="synopsis-close" className="close-btn" onClick={props.data.handleClick}>X</button>

            <div className="synopsis-wrapper">

                <h4>
                    {selectedBookInfo.title}
                </h4>
                <h5>
                    {selectedBookInfo.price} €
                </h5>

                <p className="synopsis-first">{selectedBookInfo.synopsis[0]}</p>

                {
                    props.data.isShowMore && selectedBookInfo.synopsis.length > 1 ? (

                        <div>
                            <ul className="synopsis-list">
                                {
                                    selectedBookInfo.synopsis.map((item, index) => {

                                        if (index === 0) {

                                            return (<li key={Math.random()}><p>...</p></li>)

                                        } else {

                                            return (
                                                <li key={Math.random()}>
                                                    <p>
                                                        {item}
                                                    </p>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>

                            <button name="show-less" className="synop-btn" onClick={props.data.handleClick}>show less...</button>

                        </div>

                    ) : selectedBookInfo.synopsis.length > 1 ? (

                        <div>
                            <button name="show-more" className="synop-btn" onClick={props.data.handleClick}>show more...</button>
                        </div>

                    ) : (

                        <div></div>
                    )
                }
            </div>
        </div>
    )
}


export default MoreInfo