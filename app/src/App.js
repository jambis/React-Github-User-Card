import React, { Component } from "react";
import axios from "axios";
import SearchForm from "./Components/SearchForm";
import UserCard from "./Components/UserCard";
import FollowersList from "./Components/FollowersList";
import "./App.css";

class App extends Component {
  state = { search: "jambis", user: null, followers: [] };

  handleSubmit = value => {
    this.setState({ ...this.state, search: value });
  };

  componentDidMount() {
    axios
      .get("https://api.github.com/users/jambis")
      .then(res => {
        this.setState({ ...this.state, user: res.data });
        axios
          .get(this.state.user.followers_url)
          .then(res => this.setState({ ...this.state, followers: res.data }))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      axios
        .get(`https://api.github.com/users/${this.state.search}`)
        .then(res => {
          this.setState({ ...this.state, user: res.data });
          axios
            .get(this.state.user.followers_url)
            .then(res => this.setState({ ...this.state, followers: res.data }))
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    return (
      <div className="App">
        <SearchForm handleSubmit={this.handleSubmit} />
        <UserCard data={this.state.user} />
        <h1 className="h1text">Your Amazing Followers</h1>
        <FollowersList data={this.state.followers} />
      </div>
    );
  }
}

export default App;
