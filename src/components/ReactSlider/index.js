import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

/* Add css to your project */
import './index.css'

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class ReactSlider extends Component {
  state = {favBooksData: []}

  componentDidMount() {
    this.getFavBooks()
  }

  getFavBooks = async () => {
    const url = ' https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)

    const data = await response.json()
    const {books} = data
    console.log(data)
    const formatedData = books.map(each => ({
      id: each.id,
      authorName: each.author_name,
      coverPic: each.cover_pic,
      title: each.title,
    }))
    this.setState({favBooksData: formatedData})
  }

  renderSlider = () => {
    const {favBooksData} = this.state

    return (
      <Slider {...settings} className="slider-container">
        {favBooksData.map(each => {
          const {id, coverPic, title, authorName} = each
          return (
            <div className="slick-item" key={id}>
              <img
                className="slick-item-pic"
                src={coverPic}
                alt="company logo"
              />
              <h1>{title}</h1>
              <p>{authorName}</p>
            </div>
          )
        })}
      </Slider>
    )
  }

  render() {
    return (
      <div className="main-container">
        <h1>Top rated Books</h1>
        <div>{this.renderSlider()}</div>
      </div>
    )
  }
}

export default ReactSlider
