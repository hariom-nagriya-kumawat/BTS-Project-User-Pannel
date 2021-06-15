import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
class Header extends Component {
  render() {
    return (
      <>
        {/* <!--::::::::::::::::::::::::::: Start: Preloader section :::::::::::::::::::::::::::--> */}
        <div className="preloader">
          <div className="loader loader1"></div>
          <div className="loader loader2"></div>
          <div className="loader loader3"></div>
          <div className="loader loader4"></div>
          <div className="loader loader5"></div>
          <div className="loader loader6"></div>
          <div className="loader loader7"></div>
          <div className="loader loader8"></div>
        </div>
        {/* <!-- ::::::::::::::::::::::::::: End: Preloader section :::::::::::::::::::::::::::--> */}

        {/* <!-- Start: Header Section --> */}
        <div className="header_topbar" id="top">
          {/* <!-- Logo --> */}
          <div className="container">
            <div className="row">
              <div className="header_top_right list-unstyled">
                {/* <!-- Header Contact  --> */}
                <ul className="header_contact">
                  <li>
                    <i className="fas fa-envelope"></i>
                    <a href="mailto:info@tastery.co.uk" className="text-white">
                      info@tastery.co.uk
                    </a>
                  </li>
                  <li>
                    <i className="fas fa-phone"></i>+234 567 234 875
                  </li>
                </ul>
                {/* <!-- End: Header Contact --> */}
              </div>
              <div className="header_top_left">
                <div className="opening-hrs">
                  <p>
                    <i className="fas fa-business-time"></i> Hours : 9am-5pm &
                    9am-11pm
                  </p>
                  <div className="opening-table-wrap">
                    <table className="table opening-table">
                      <thead>
                        <tr>
                          <th colspan="2">Evening Opening Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td> Sunday </td>
                          <td>5pm-10:30pm</td>
                        </tr>
                        <tr>
                          <td> Monday </td>
                          <td>5pm-10:30pm</td>
                        </tr>
                        <tr>
                          <td> Tuesday </td>
                          <td>5pm-10:30pm</td>
                        </tr>
                        <tr>
                          <td> Wednesday</td>
                          <td>5pm-10:30pm</td>
                        </tr>
                        <tr>
                          <td> Thusday </td>
                          <td>5pm-10:30pm</td>
                        </tr>
                        <tr>
                          <td> Friday </td>
                          <td>5pm-11pm</td>
                        </tr>
                        <tr>
                          <td> Statarday </td>
                          <td>5pm-11pm</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* <!--  End: Opening Hrs Table --> */}
                </div>
                {/* <!--  Endd: opening-hrs --> */}

                <ul className="header_cart">
                  <li>
                    <Link to="/login"> Login </Link>
                  </li>
                  <li>
                    <Link
                      to="/checkout"
                      className="icofont-cart-alt cart"
                    ></Link>
                  </li>
                </ul>
                {/* <!--  Endd: Header  Login & Cart --> */}
              </div>
              {/* <!-- End: header_top_left --> */}
            </div>
            {/* <!-- End: row  --> */}
          </div>
          {/* <!-- End: Container  --> */}
        </div>
        {/* <!-- End: Header Info --> */}

        {/* <!-- Start: header navigation --> */}
        <div className="navigation">
          <div className="container">
            <div className="row">
              <div className="logo col-md-3 col-sm-12">
                <Link to="/home">
                  <img
                    className="img-responsive"
                    src="../images/logo.png"
                    alt="tastery"
                  />
                </Link>
              </div>
              {/* <!-- end: logo --> */}

              <div className="col-md-9 col-sm-12">
                <div id="navigation">
                  <ul>
                    <li>
                      <NavLink exact to="/home" activeClassName="active">Home</NavLink>
                    </li>
                    <li>
                      <NavLink exact to="/order" activeClassName="active">Orderr</NavLink>
                    </li>
                    <li>
                      <NavLink exact to="/menu"activeClassName="active">Menus</NavLink>
                    </li>
                    <li className="has-sub">
                      <NavLink  to="/pages" activeClassName="active">Pages</NavLink>
                      <ul>
                        <li>
                          <NavLink exact to="/pages/Merchandise" activeClassName="active">Merchandise</NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/pages/event-catering" activeClassName="active">Event Categing</NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/pages/our-branches" activeClassName="active">Our Branches</NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/pages/single-event" activeClassName="active">Single Event</NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/pages/event" activeClassName="active">Event</NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/pages/offer" activeClassName="active">Offer</NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/pages/faq" activeClassName="active">Faq</NavLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <NavLink exact to="/about" activeClassName="active">About</NavLink>
                    </li>
                    <li>
                      <NavLink exact to="/review" activeClassName="active">Review</NavLink>
                    </li>
                    <li>
                      <NavLink exact to="/contact" activeClassName="active">Contact</NavLink>
                    </li>
                  </ul>
                </div>
                {/* <!-- End: navigation  --> */}
              </div>
              {/* <!--/ col-md-9 col-sm-12 --> */}
            </div>
            {/* <!--/ row --> */}
          </div>
          {/* <!--/ container --> */}
        </div>
        {/* <!-- End: header navigation --> */}
      </>
    );
  }
}

export default Header;
