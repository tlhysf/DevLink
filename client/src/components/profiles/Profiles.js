import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import {getProfiles} from '../../actions/profileActions';
import ProfileItems from './ProfileItems'

class Profiles extends Component {

    componentDidMount(){
        this.props.getProfiles();
    }
    render() {
        const {profiles, loading} = this.props.profile;

        let profileItems;

        if(profiles === null || loading){
            profileItems = <Spinner></Spinner>;
        } else {
            if(profiles.length > 0){
                profileItems = profiles.map(profile => (
                    <ProfileItems key={profile._id} profile={profile}/>
                ))
               

            } else {
                profileItems = (
                    <div class='info-card'>
                        <div className="alert alert-info" role="alert">
						<p style={{marginTop:'10px'}}>{"Error404 Nothing Found :("}</p>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Community</h1>
                                <p className="lead text-center">Connect with other developers</p>
							{profileItems}
						</div>
					</div>
				</div>
			</div>
        )
    }
}

Profiles.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors,
});

export default connect(mapStateToProps, { getProfiles })(
	withRouter(Profiles)
);