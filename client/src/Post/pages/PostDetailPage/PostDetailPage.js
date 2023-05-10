import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
// Import Actions
import { fetchPost } from '../../PostActions';
// Import Selectors
import { useParams } from 'react-router-dom';
// Import Style
const useStyles = makeStyles(theme => ({
  postContainer: {
      borderRadius: '20px',
      boxShadow: '2px 2px 5px #888888',
      maxWidth: '800px',
      margin: 'auto',
      marginTop: '100px',
      marginBottom: '100px',
      padding: '50px'
  },
  slider: {
      maxWidth: '500px',
      margin: 'auto',
  },
  eachSlideEffect: {
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundSize: 'cover',
      height: '350px',
    },
    '& span': {
      padding: '20px',
      fontSize: '20px',
      background: '#efefef',
      textAlign: 'center',
    },
  },
}));

export function PostDetailPage() {

  const { cuid } = useParams();
  const post = useSelector(state => state.posts.data.find(currentPost => (currentPost.cuid === cuid)));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchPost(cuid));
  }, []);

  return (post
    ?
      (<div className="container mt-5">
        <div className={`${classes.postContainer} row`}>
          <div className="col-12">
            <div className="w-100 text-center">
              <h1>{post.title}</h1>
              <p>By {post.name}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            {post.images?.length > 0 && 
            <div className={`${classes.slider}`}>
              <Slide>
                {post.images.map(image => (
                  <div className={`${classes.eachSlideEffect}`}>
                    <div style={{ 'backgroundImage': `url(${image.url})` }}>
                    </div>
                  </div>
                ))}
              </Slide>
            </div>
            }
          </div>
        </div>
      </div>)
    : (<div>Loading</div>)
  );
}
export default PostDetailPage;
