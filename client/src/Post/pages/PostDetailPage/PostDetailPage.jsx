import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../../PostActions';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';

export function PostDetailPage() {
  const navigate = useNavigate();
  const { cuid } = useParams();
  const post = useSelector(state => state.posts.data.find(currentPost => (currentPost.cuid === cuid)));
  const dispatch = useDispatch();
  const defaultImage = 'http://res.cloudinary.com/dpgq65llh/image/upload/v1689102655/vweelp4lfjgrgduevlz8.jpg';
  useEffect(() => {
    if (!post) dispatch(fetchPost(cuid));
  }, [cuid, dispatch, post]);
  const handleGoBack = () => {
    navigate('/posts');
  };
  return (
    post ? (
      <div className="container">
        <Button className="text-white" variant="contained" onClick={handleGoBack}>
          Back to Posts
        </Button>
        <div className="row mt-3">
          <div className="col-12">
            <Card>
              
              <CardMedia
                component="img"
                height="400"
                image={post.image ? post.image : defaultImage}
                alt="Post Image"
              />
              <CardContent>
                <Typography variant="h1" component="h1">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" component="p" color="textSecondary">
                  By {post.name}
                </Typography>
                <Typography variant="body1" component="p">
                  {post.content}
                </Typography> 
        
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    ) : (
      <div>Loading</div>
    )
  );
}

export default PostDetailPage;
