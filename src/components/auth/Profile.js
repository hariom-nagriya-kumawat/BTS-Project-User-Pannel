import React, { Component } from "react";
import {Button } from "react-bootstrap";
import { async } from "rxjs";
import ChangePassword from "./ChangePassword";
import ProfileUpdate from "./ProfileUpdate";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  
  updateUser = async (data) => {
    this.props.updateUser(data);
  };
  onLogOut =()=>{
    return false
  }
  onChangepassword = async(data) =>{
    
  }

  render() {
    const { UserDetail } = this.props;
    return (
      <>

        <section className="review-form-section">
          <div className="container">
            <div class="row g-0">
              <div class="col-4 col-md-2  bg-white">
                <div
                  className="nav nav-pills d-flex flex-column card-tab"
                  role="tablist"
                >
                  <a className="nav-link rounded-pill" id="v-pills-one-tab" data-toggle="pill" href="#v-pills-one" role="tab" aria-controls="v-pills-one" aria-selected="true"
                  >
                    <i class="fas fa-cogs mr-2"></i> Profile Setting
                  </a>
                  <a className="nav-link rounded-pill" id="v-pills-one-tab" data-toggle="pill" href="#v-pills-one" role="tab" aria-controls="v-pills-one" aria-selected="true"
                  >
                    <i class="fas fa-wallet mr-2"></i> Wallet
                  </a>
                  <div>

                    <Button
                      className="submit rounded-pill bg-light mt-5 ml-3"
                      onClick={(e) => this.onLogOut(e)}
                    >
                      LogOut
                    </Button>
                  </div>
                </div>
              </div>

              <div className="col-sm-8 col-md-8 px-5">
                <div className="tab-content">

                  <div
                    className="tab-pane fade show active"
                    id="v-pills-one"
                    role="tabpanel"
                    aria-labelledby="v-pills-one-tab"
                  >

                    <div className="card-header bg1 text-white">
                      <a
                        className="card-link text-white w-100 d-flex flex-row justify-content-between"
                        data-toggle="collapse"
                        href="#customerCollapse"
                      >
                        <span> Update Information</span> <i className="icofont-thin-down text-white text-right" />
                      </a>
                    </div>
                    <div
                      id="customerCollapse"
                      className="collapse show"
                      data-parent="#accordion"
                    >
                      <ProfileUpdate {...this.props} UserDetail={UserDetail}
                        updateUser={this.updateUser} />
                    </div>
                    
                    <div className="card-header bg1 text-white mt-3">
                      <a
                        className="card-link text-white w-100 d-flex flex-row justify-content-between"
                        data-toggle="collapse"
                        href="#changepass"
                      >
                        <span>Change password</span> <i className="icofont-thin-down text-white text-right" />
                      </a>
                    </div>
                    <div
                      id="changepass"
                      className="collapse show"
                      data-parent="#accordion"
                    >
                      <ChangePassword {...this.props} 
                     onChangepassword={this.onChangepassword} />
                    </div>
                  </div>

                </div>
              </div>
            </div></div></section>
      </>
    );
  }
}

export default Profile;
