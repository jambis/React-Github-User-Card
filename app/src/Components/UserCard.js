import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EmailIcon from "@material-ui/icons/Email";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Skeleton from "@material-ui/lab/Skeleton";
import axios from "axios";

const styles = theme => ({
  card: {
    maxWidth: "600px",
    margin: "30px auto"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  titleText: {
    fontSize: "30px",
    fontWeight: "bold",
    marginLeft: "10px"
  },
  subTitleText: {
    fontSize: "24px",
    marginLeft: "10px"
  },
  bioText: {
    fontSize: "18px",
    marginBottom: "10px"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    width: "100px",
    height: "100px"
  },
  iconAndText: {
    display: "flex",
    margin: "15px 0"
  },
  icon: {
    marginRight: "10px",
    color: "grey"
  }
});

class UserCard extends Component {
  state = { expanded: false, repos: [] };

  componentDidMount() {
    if (this.props.data) {
      axios
        .get(this.props.data.repos_url)
        .then(res => {
          let repoArray = [...res.data];
          let sortedRepoArray = repoArray.sort((a, b) => {
            return Date.parse(b.updated_at) - Date.parse(a.updated_at);
          });
          this.setState({ ...this.state, repos: sortedRepoArray.slice(0, 5) });
        })
        .catch(err => console.error(err));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      axios
        .get(this.props.data.repos_url)
        .then(res => {
          let repoArray = [...res.data];
          let sortedRepoArray = repoArray.sort((a, b) => {
            return Date.parse(b.updated_at) - Date.parse(a.updated_at);
          });
          this.setState({ ...this.state, repos: sortedRepoArray.slice(0, 5) });
        })
        .catch(err => console.error(err));
    }
  }

  handleExpandClick = () => {
    this.setState({ ...this.state, expanded: !this.state.expanded });
  };

  renderUserCard = () => {
    const { classes, data } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={data.avatar_url}
            />
          }
          title={data.name ? data.name : data.login}
          titleTypographyProps={{ classes: { root: classes.titleText } }}
          subheader={`@${data.login}`}
          subheaderTypographyProps={{ classes: { root: classes.subTitleText } }}
        />
        <CardContent>
          <Typography
            variant="body1"
            color="textPrimary"
            component="p"
            className={classes.bioText}
          >
            {data.bio
              ? data.bio
              : "This is where I would put a bio... IF I HAD ONE!"}
          </Typography>

          <div className={classes.iconAndText}>
            <LocationOnIcon className={classes.icon} />
            <Typography variant="body2" color="textSecondary" component="p">
              {data.location ? data.location : "Unknown"}
            </Typography>
          </div>
          <div className={classes.iconAndText}>
            <EmailIcon className={classes.icon} />
            <Typography variant="body2" color="textSecondary" component="p">
              {data.email ? (
                <a href={`mailto:${data.email}`}>{data.email}</a>
              ) : (
                "N/A"
              )}
            </Typography>
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={
              !this.state.expanded
                ? `${classes.expand}`
                : `${classes.expandOpen} ${classes.expand}`
            }
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Most recently worked repos</Typography>
            {this.state.repos.length > 0 ? this.renderRepos() : null}
          </CardContent>
        </Collapse>
      </Card>
    );
  };

  renderRepos = () => {
    return this.state.repos.map(repo => {
      return (
        <>
          <Typography paragraph>
            <a href={repo.html_url}>{repo.name}</a>
            {repo.description ? ` - ${repo.description}` : null}
          </Typography>
          <Typography paragraph></Typography>
        </>
      );
    });
  };

  renderSkeleton = () => {
    //Skeleton stuff here
    return (
      <Card className={this.props.classes.card}>
        <div style={{ display: "flex" }}>
          <Skeleton variant="circle" width={100} height={100} />
          <div style={{ marginLeft: "10px" }}>
            <Skeleton variant="text" width={200} height={36} />
            <Skeleton variant="text" width={100} height={24} />
          </div>
        </div>
        <Skeleton
          variant="text"
          height={18}
          width={"90%"}
          style={{ margin: "40px 20px" }}
        />
        <div style={{ display: "flex", margin: "15px 0" }}>
          <Skeleton
            variant="circle"
            width={18}
            height={18}
            style={{ marginTop: "15px", marginRight: "15px" }}
          />
          <Skeleton variant="text" width={100} height={18} />
        </div>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <Skeleton
            variant="circle"
            width={18}
            height={18}
            style={{ marginTop: "15px", marginRight: "15px" }}
          />
          <Skeleton variant="text" width={100} height={18} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "10px"
          }}
        >
          <Skeleton variant="circle" width={36} height={36} />
        </div>
      </Card>
    );
  };

  render() {
    console.log(this.state.repos);
    return (
      <>{this.props.data ? this.renderUserCard() : this.renderSkeleton()}</>
    );
  }
}

export default withStyles(styles)(UserCard);
