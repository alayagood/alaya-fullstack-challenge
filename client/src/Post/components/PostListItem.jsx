import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, Card, CardMedia, makeStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { truncateText } from '../../util/textOperation';

const useStyles = makeStyles({
  media: {
    width: '200px',
    height: 'auto'
  },
});

function PostListItem({ post, onDelete }) {
  const classes = useStyles();

  return (
    <Card className="w-100 my-4">
  <CardContent className="d-flex">
    <div className="mr-3">
      <CardMedia component="img" alt="Small Image" image={post.imgURL} className={classes.media} />
    </div>
    <div className="flex-grow-1">
      <Typography gutterBottom variant="h5" component="h2">
        <Link to={`/posts/${post.cuid}/${post.slug}`}>{post.title}</Link>
      </Typography>
      <Typography component="p" className="mt-3">
        {post.content && truncateText(post.content)}
      </Typography>
      <Typography color="textSecondary" component="p" className="mt-3 font-italic">
        From {post.name}
      </Typography>
    </div>
  </CardContent>
  <CardActions>
  <Box display="flex" justifyContent="center" width="100%">
    <Button size="small" color="secondary" onClick={onDelete}>
      Delete post
    </Button>
  </Box>
  </CardActions>
</Card>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    imgURL: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
