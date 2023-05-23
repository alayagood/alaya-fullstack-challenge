import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import styles from "./styles.module.css";

function PostListItem({ post, onDelete }) {
  return (
    <Link className={styles.card} to={`/posts/${post.cuid}/${post.slug}`}>
      {!!post.image && (
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${post.image})` }}
        />
      )}
      <div className={styles.body}>
        <Typography gutterBottom variant="h6" component="h4">
          {post.title}
        </Typography>
        <div className={styles.content}>{post.content}</div>
        <Typography
          color="textSecondary"
          component="div"
          className="mt-3 font-italic"
        >
          From {post.name}
        </Typography>
        <div className={styles.actions}>
          <Button
            size="small"
            color="secondary"
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Link>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
