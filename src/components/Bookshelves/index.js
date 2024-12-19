import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {searchInput: '', booksData: [], shelf: bookshelvesList[0].value}

  componentDidMount() {
    this.getBooksData()
  }

  getBooksData = async event => {
    const {searchInput, shelf} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${shelf}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)

    const data = await response.json()
    const {books} = data

    const updatedBooksData = books.map(each => ({
      id: each.id,
      title: each.title,
      authorName: each.author_name,
      coverPic: each.cover_pic,
      rating: each.rating,
      readStatus: each.read_status,
    }))

    this.setState({booksData: updatedBooksData})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getBooksData)
  }

  onClickLabel = value => {
    this.setState({shelf: value}, this.getBooksData)
  }

  render() {
    const {searchInput, booksData} = this.state

    return (
      <div>
        <Header />
        <div className="bookshelves-bg">
          <div className="search-container">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
            <BsSearch className="search-icon" />
          </div>
          <div className="mobile-content">
            <h1>Bookshelves</h1>
            <ul className="labels-container">
              {bookshelvesList.map(each => (
                <li className="label-item">
                  <button
                    type="button"
                    onClick={() => {
                      this.onClickLabel(each.value)
                    }}
                    className="read-status-btn btn"
                  >
                    {each.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <ul className="books-ul">
            {booksData.map(each => (
              <Link to={`/books/${each.id}`}>
                <li className="book-item">
                  <div className="book-container">
                    <img
                      src={each.coverPic}
                      alt={each.title}
                      className="cover-pic"
                    />
                    <div className="text-container">
                      <h1 className="book-title">{each.title}</h1>
                      <p className="author-name">{each.authorName}</p>
                      <p className="rating">Avg rating {each.rating}</p>
                      <p>Status: {each.readStatus}</p>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Bookshelves
