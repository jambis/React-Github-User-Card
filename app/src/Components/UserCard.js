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
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
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
            <Typography paragraph>Recently worked repos here</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  };

  renderSkeleton = () => {
    //Skeleton stuff here
    return null;
  };

  render() {
    return <>{this.props.data ? this.renderUserCard() : null}</>;
  }
}

export default withStyles(styles)(UserCard);
