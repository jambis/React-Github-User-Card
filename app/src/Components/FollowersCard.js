import React, { Component } from "react";
import axios from "axios";
import UserCard from "./UserCard";

class FollowersCard extends Component {
  state = { data: null };

  componentDidMount() {
    axios
      .get(this.props.data)
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.error(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      axios
        .get(this.props.data)
        .then(res => this.setState({ data: res.data }))
        .catch(err => console.error(err));
    }
  }

  renderFollowerCard = () => {
    return <UserCard data={this.state.data} />;
  };

  renderSkeleton = () => {
    //skeleton stuff here
    return null;
  };

  render() {
    return (
      <div>
        {this.state.data ? this.renderFollowerCard() : this.renderSkeleton()}
      </div>
    );
  }
}

export default FollowersCard;
