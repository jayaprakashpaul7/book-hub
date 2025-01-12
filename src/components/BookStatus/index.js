import './index.css'

const BookStatus = props => {
  const {bookshelvesList, onClickLabel} = props

  const label = value => {
    onClickLabel(value)
  }

  return (
    <>
      <div className="mobile-content">
        <h1>Bookshelves</h1>
        <ul className="labels-container">
          {bookshelvesList.map(each => (
            <li className="label-item" key={each.id}>
              <button
                type="button"
                onClick={() => {
                  label(each.label)
                }}
                className="read-status-btn btn"
              >
                {each.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="desktop-content">
        <h1>Bookshelves</h1>
        <ul className="labels-container">
          {bookshelvesList.map(each => (
            <li className="label-item" key={each.id}>
              <button
                type="button"
                onClick={() => {
                  label(each.value)
                }}
                className="read-status-btn btn"
              >
                {each.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
export default BookStatus
