import './index.css'
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

class Header extends Component {
  state = {isMenuOpen: false}

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <nav className="navbar-header">
        <div className="content-mobile">
          <img
            src="https://res.cloudinary.com/student7/image/upload/v1729157205/Group_7732_cdkppt.png"
            alt="website logo"
            className="logo"
          />
          <button className="nav-btn">
            <img src="https://res.cloudinary.com/student7/image/upload/v1729158353/menu_wfwcri.png" />
          </button>
        </div>

        <div className="content-desktop">
          <img
            src="https://res.cloudinary.com/student7/image/upload/v1729157205/Group_7732_cdkppt.png"
            alt="website logo"
            className="logo"
          />
          <ul className="navbar-ul">
            <Link to="/">
              <li className="navbar-li">Home</li>
            </Link>
            <Link to="/shelf">
              <li className="navbar-li">Bookshelves</li>
            </Link>
            <li className="navbar-li">
              <button className="logout-btn" onClick={this.onClickLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
export default withRouter(Header)
