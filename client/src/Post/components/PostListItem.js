import React from "react";
import ReactMarkdown from "react-markdown";
import { Card, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userDataSelector } from "../../redux/user/userSelectors";
import { useMemo } from "react";

const useStyles = makeStyles({
  link: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export function PostListItem({ post, onDelete }) {
  const classes = useStyles();
  const user = useSelector(userDataSelector);
  const isOwner = useMemo(() => user.id === post.owner._id, [user, post]);

  return (
    <Card className="w-100 my-4">
      <CardContent>
        <Typography
          className={classes.link}
          gutterBottom
          variant="h5"
          component="h2"
        >
          <Link to={`/posts/${post.cuid}/${post.slug}`}>{post.title}</Link>
        </Typography>
        <ReactMarkdown>{post.content}</ReactMarkdown>
        {/* <Typography component="p" className="mt-3">
          {post.content}
        </Typography> */}
        <Typography
          color="textSecondary"
          component="p"
          className="mt-3 font-italic"
        >
          From {post.name}
        </Typography>
      </CardContent>
      <CardActions>
        {isOwner && (
          <Button size="small" color="secondary" onClick={onDelete}>
            Delete post
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    slug: PropTypes.string,
    cuid: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export function PostListEmptyItem() {
  return (
    <Card className="w-100 my-4">
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          No posts
        </Typography>
      </CardContent>
    </Card>
  );
}
