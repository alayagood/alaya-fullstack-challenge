import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CardMedia, Typography, makeStyles } from "@material-ui/core";
// Import Actions
import { useParams } from "react-router-dom";
import { fetchPost } from "../../PostActions";
// Import Selectors

const useStyles = makeStyles({
  media: {
    maxWidth: '100%',
    margin: '16px 0',
    height: '300px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  contentText: {
    width: '100%',
    height: '500px',
    overflowWrap: 'break-word'
  }
});

function PostDetailPage() {
  const { cuid } = useParams();
  const post = useSelector((state) =>
    state.posts.data.find((currentPost) => currentPost.cuid === cuid)
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (!post) dispatch(fetchPost(cuid));
  }, [post, cuid, dispatch]);

  return post ? (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Box textAlign="center">
            <h1>{post.title}</h1>
          </Box>
          <CardMedia className={classes.media} component="img" alt="Small Image" image={post.imgURL} />
          <p>
            <Box paddingTop={2} textAlign='center'>
              <Typography variant='subtitle1'>
                {`By ${post.name}`}
              </Typography>
            </Box>
          </p>
          <Box className={classes.contentText}>
            <Typography>{post.content}</Typography>
          </Box>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}
export default PostDetailPage;
