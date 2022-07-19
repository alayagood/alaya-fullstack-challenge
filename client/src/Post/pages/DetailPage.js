import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import configs from "@/utils/configs";
import { Image } from "cloudinary-react";
import { fetchPost } from "@/Post/Actions";
import { useParams } from "react-router-dom";

export function DetailPage() {

    const { cuid } = useParams();
    const post = useSelector(state => state.posts.data.find(currentPost => (currentPost.cuid === cuid)));
    const dispatch = useDispatch();

    useEffect(() => {
        if (!post) dispatch(fetchPost(cuid));
    }, [cuid, post, dispatch]);

    return (post
            ?
            (<div className="container">
                <div className="row">
                    <div className="col-12">
                        {post.image && <Image
                            className="mb-2"
                            cloudName={configs.cloudinary.cloud_name}
                            publicId={post.image}
                            width="300"
                            crop="scale"
                        />}
                        <h1>{post.title}</h1>
                        <p>By {post.author.firstName}</p>
                        <p>{post.content}</p>
                    </div>
                </div>
            </div>)
            : (<div>Loading</div>)
    );
}

export default DetailPage;
