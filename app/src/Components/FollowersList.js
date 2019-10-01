import React, { Component } from "react";
import FollowersCard from "./FollowersCard";

class FollowersList extends Component {
  renderFollowers = () => {
    return this.props.data.map((follower, index) => (
      <FollowersCard key={index} data={follower.url} />
    ));
  };

  render() {
    return <>{this.props.data ? this.renderFollowers() : null}</>;
  }
}

export default FollowersList;
