import React, { Component } from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";

// sub-components
import Spinner from "../common/Spinner";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileGithub from "./ProfileGithub";
import ProfileCreds from "./ProfileCreds";

// actions
import { getProfileByHandle } from "../../actions/profileActions";
import { getProfileById } from "../../actions/profileActions";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    } else if (this.props.match.params.id) {
      this.props.getProfileById(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { profile, loading } = this.props.profile;

    let profileContent;

    if (profile === null || loading === true) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <button
                className="btn btn-light mb-3 float-left"
                onClick={this.goBack}
              >
                Back
              </button>
              <div className="col-md-6"></div>
            </div>
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds profile={profile} />
          <ProfileGithub profile={profile} />
        </div>
      );
    }

    return (
      <div>
        <div className="profile">
          <div className="container">
            <div className="row">
              <div className="col-md-12">{profileContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: Proptypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileByHandle, getProfileById })(
  Profile
);
