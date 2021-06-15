import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel";

class Footer extends Component {
  render() {
    const options = {
      autoPlay: 3000, //Set AutoPlay to 5 seconds
      autoplay: true,
      smartSpeed: 2000, // Default is 250
      items: 5,
      loop: true,
      touchDrag: true,
      mouseDrag: true,
      pagination: false,
      dots: false,
      nav: false,
      navText: [
        "<i class='logo-nav-icon'></i>",
        "<i class='logo-nav-icon'></i>",
      ],
      responsive: {
        1200: {
          items: 5,
        },
        992: {
          items: 5,
        },
        768: {
          items: 4,
        },
        480: {
          items: 3,
        },
        320: {
          items: 2,
        },
        280: {
          items: 2,
        },
      },
    };
    return (
      <>
        {/* <!-- Start: Client Section --> */}
        <section className="client-section">
          {/* <!-- Container --> */}
          <div className="container">
            <div className="row">
              {/* <!-- client list  --> */}
              <div className="client_carousel" id="client_carousel">
                <OwlCarousel className="owl-theme" {...options}>
                  {/* <!-- client 1 --> */}
                  <div className="item">
                    <a href="#" className="client-box">
                      <img alt="client" src="../images/client-1.png" />
                      <h5>Cinnamon Stick</h5>
                    </a>
                  </div>
                  {/* <!-- client 2 --> */}
                  <div className="item">
                    <a href="#" className="client-box">
                      <img alt="client" src="../images/client-2.png" />
                      <h5>Black Seeds </h5>
                    </a>
                  </div>
                  {/* <!-- client 3 --> */}
                  <div className="item">
                    <a href="#" className="client-box">
                      <img alt="client" src="../images/client-3.png" />
                      <h5>Black Seeds </h5>
                    </a>
                  </div>
                  {/* <!-- client 4 --> */}
                  <div className="item">
                    <a href="#" className="client-box">
                      <img alt="client" src="../images/client-4.png" />
                      <h5>Cinnamon Stick</h5>
                    </a>
                  </div>
                  {/* <!-- client 5 --> */}
                  <div className="item">
                    <a href="#" className="client-box">
                      <img alt="client" src="../images/client-1.png" />
                      <h5>Cinnamon Stick</h5>
                    </a>
                  </div>
                  {/* <!-- client 6 --> */}
                  <div className="item">
                    <a href="#" className="client-box">
                      <img alt="client" src="../images/client-2.png" />
                      <h5>Cinnamon Stick</h5>
                    </a>
                  </div>
                  {/* <!-- client 7 --> */}
                  <div className="item">
                    <a href="#" className="client-box">
                      <img alt="client" src="../images/client-3.png" />
                      <h5>Cinnamon Stick</h5>
                    </a>
                  </div>
                </OwlCarousel>
              </div>
              {/* <!--/ client list  --> */}
            </div>
            {/* <!--/ row - --> */}
          </div>
          {/* <!--/ Container - --> */}
        </section>
        {/* <!--   End:Client Section --> */}

        {/* <!-- Start:Footer Section --> */}
        <footer className="footer-section">
          <div className="container">
            <div className="row">
              {/* <!-- Start: About --> */}
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="widget">
                  <div className="footer_logo">
                    <img
                      className="img-responsive"
                      src="../images/logo.png"
                      alt=""
                    />
                  </div>
                  <div className="footer_p">
                    <p className="footer_para">
                      Loren ipsum dolor conse ctetur at adipis cing elit sed do
                      eiu smod of tempor inci didunt know youlab{" "}
                    </p>
                  </div>
                  <div className="footer_socil">
                    <ul className="list-icons link-list footer_soc">
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-behance"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-pinterest"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <!-- End: About --> */}

              {/* <!-- Start: Contact Info --> */}
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="widget contact_info">
                  <h5>Contact Info</h5>
                  <ul>
                    <li>
                      <i className="icofont-location-pin"></i>{" "}
                      <a href="#">59 Hullbridge Road.SS6</a>
                    </li>
                    <li>
                      <i className="icofont-email"></i>{" "}
                      <a href="#">nfo@spicehutonline.co.uk</a>
                    </li>
                    <li>
                      <i className="icofont-web"></i>{" "}
                      <a href="#"> spicehut.co.uk </a>
                    </li>
                    <li>
                      <i className="icofont-ui-call"></i>{" "}
                      <a href="#"> +88 01268 785 818 </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <!-- End: Contact Info --> */}

              {/* <!-- Start: Quick Link --> */}
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="widget quick_lnk">
                  <h5>Quick Link</h5>
                  <ul>
                    <li>
                      <a href="#">Help and Ordering</a>
                    </li>
                    <li>
                      <a href="#">Return & Cancellation</a>
                    </li>
                    <li>
                      <a href="#">Online Organic Service</a>
                    </li>
                    <li>
                      <a href="#">Delevery Schedule</a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <!-- End: Quick Link --> */}

              {/* <!-- Start:Newsletter --> */}
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="widget">
                  <h5>Newsletter</h5>
                  {/* <!-- Start Subscribe --> */}
                  <div className="news_letter_wrp">
                    <p>
                      Subscribe our newsletter to get more update & join to
                      Tastery
                    </p>
                    <form className="mailchimp">
                      {/* <!-- SUBSCRIPTION SUCCESSFUL OR ERROR MESSAGES --> */}
                      <input
                        className="email_field"
                        type="text"
                        name="email"
                        id="subscriber-email"
                        placeholder="Email Address"
                      />
                      <button
                        className="submit-contact"
                        type="submit"
                        id="subscribe-button"
                      >
                        <i className="icofont-paper-plane"></i>
                      </button>
                      <span className="subscription-success"> </span>
                      <span className="subscription-error"> </span>
                      <label
                        className="subscription-label"
                        for="subscriber-email"
                      ></label>
                    </form>
                    {/* <!-- /END MAILCHIMP FORM STARTS --> */}
                  </div>
                </div>
              </div>
              {/* <!-- End: Newsletter --> */}
            </div>
            {/* <!-- End: row --> */}

            {/* <!-- Start: Subfooter --> */}
            <div className="subfooter_wrap">
              <div className="subfooter">
                <p>
                  2021 © Copyright <a href="index.html">Tastery.</a> All rights
                  Reserved.
                </p>
              </div>
              <a href="#top" className="scrollup">
                <i className="icon-glyph-266"></i>
              </a>
              {/* <!-- End:Subfooter --> */}
            </div>
            {/* <!-- End: Subfooter --> */}
          </div>
          {/* <!-- End: Container --> */}
        </footer>
        {/* <!-- End: Footer Section --> */}
      </>
    );
  }
}

export default Footer;
