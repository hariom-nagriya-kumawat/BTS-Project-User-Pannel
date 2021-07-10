import React, { Component } from "react";
import { getUserRequest ,updateUserRequest} from "../actions";
import { connect } from "react-redux";
import ProfilePage from "../components/auth/Profile";


class Profile extends Component {
  componentDidMount() {
    this.props.getUserData();
  }

  updateUser=(data)=>{
      this.props.updateUserData(data);
  }
  render() {
  const { UserDetail } = this.props;
    return (
      <>
        <ProfilePage {...this.props} UserDetail={UserDetail} 
        updateUser = {this.updateUser}/>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  UserDetail: state.AuthReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {

    getUserData: (data) => {
      dispatch(getUserRequest(data));
    },
    updateUserData:(data)=>{
      dispatch(updateUserRequest(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
