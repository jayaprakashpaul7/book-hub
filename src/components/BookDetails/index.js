import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class BookDetails extends Component {
  state = {bookdetails: {}}

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const bookDetails = data.book_details

    const updatedData = {
      aboutAuthor: bookDetails.about_author,
      aboutBook: bookDetails.about_book,
      authorName: bookDetails.author_name,
      coverPic: bookDetails.cover_pic,
      id: bookDetails.id,
      rating: bookDetails.rating,
      readStatus: bookDetails.read_status,
      title: bookDetails.title,
    }
    this.setState({bookdetails: updatedData})
  }

  render() {
    const {bookdetails} = this.state
    return (
      <div>
        <h1>book</h1>
        <ul>{bookdetails.title}</ul>
      </div>
    )
  }
}
export default BookDetails
