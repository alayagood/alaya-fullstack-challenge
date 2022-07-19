import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import configs from "@/utils/configs";
import { getUser } from "@/Auth/Reducer";

function ListItem({ post, onDelete }) {
    const user = useSelector(getUser);

    return (
        <Card className="w-100 mt-3">
            <CardContent>
                {post.image && <Image
                    className="mb-2"
                    cloudName={configs.cloudinary.cloud_name}
                    publicId={post.image}
                    width="300"
                    crop="scale"
                />}
                <Typography gutterBottom variant="h5" component="h2">
                    <Link to={`/posts/${post.cuid}/${post.slug}`}>
                        {post.title}
                    </Link>
                </Typography>
                <Typography component="p" className="mt-3">
                    {post.content}
                </Typography>
                <Typography color="textSecondary" component="p" className="mt-3 font-italic">
                    From {post.author.firstName}
                </Typography>
            </CardContent>
            {user && user.id === post.author._id &&
                <CardActions>
                    <Button size="small" color="secondary" onClick={onDelete}>
                        Delete post
                    </Button>
                </CardActions>
            }
        </Card>
    );
}

ListItem.propTypes = {
    post: PropTypes.shape({
        author: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        cuid: PropTypes.string.isRequired
    }).isRequired,
    onDelete: PropTypes.func.isRequired
};

export default ListItem;
