import React from "react";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";

// Import Components
import ListItem from "@/Post/components/ListItem";

function List({ posts, handleDeletePost }) {
    return (
        <div className="d-flex flex-column w-100 my-4">
            <Typography variant="h4" className="w-100 mb-3 text-left">
                Posts
            </Typography>
            {posts.length
                ? posts.map(post => {
                    return (
                        <ListItem
                            post={post}
                            key={post.cuid}
                            onDelete={() => handleDeletePost(post.cuid)}
                        />
                    );
                })
                : <Alert severity="warning">There are no posts yet!</Alert>
            }
        </div>
    );
}

List.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        cuid: PropTypes.string.isRequired
    })).isRequired,
    handleDeletePost: PropTypes.func.isRequired
};

export default List;
