import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@/Post/components/List";
import CreateWidget from "@/Post/components/CreateWidget";
import { addPostRequest, deletePostRequest, fetchPosts } from "@/Post/Actions";
import { getAuthenticated } from "@/Auth/Reducer";
import Logo from "@/logo.svg";

const ListPage = () => {
    const dispatch = useDispatch(),
        isAuthenticated = useSelector(getAuthenticated),
        posts = useSelector(state => state.posts.data);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleDeletePost = post => {
        if (confirm("Do you want to delete this post")) { // eslint-disable-line
            dispatch(deletePostRequest(post));
        }
    };

    const handleAddPost = (post) => {
        dispatch(addPostRequest(post));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex align-items-center">
                    <img className="mx-3" src={Logo} alt="Logo" style={{ height: "72px" }}/>
                    <h1 className="mt-4">
                        Alaya Blog
                    </h1>
                </div>
            </div>
            <hr/>
            <div className="row">
                {isAuthenticated &&
                    <div className="col-4">
                        <CreateWidget addPost={handleAddPost}/>
                    </div>
                }
                <div className={`${isAuthenticated ? "col-8" : "col"}`}>
                    <List handleDeletePost={handleDeletePost} posts={posts}/>
                </div>
            </div>
        </div>
    );
};

export default ListPage;
