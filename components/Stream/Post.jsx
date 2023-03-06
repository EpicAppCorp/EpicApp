import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Post({post, user}) {
    const [comments, setComments] = useState();
    const [comment, setComment] = useState("");
    const [likes, setLikes] = useState([]);
    const authorId = user.host + "api/authors" + user.id;
    if (post.contentType === "image/jpeg;base64") {
        console.log("got image")
    }

    useEffect(() => {
        axios.get(post.id + "/comments?page=1&size=1000")
        .then((res) =>  {
            setComments(res.data);
        })
        axios.get(post.id + "/likes")
        .then((res) => {
            setLikes(res.data)
        })
    }, [post])
    const CommentSubmit = () => {
        axios.post(post.id + "/comments",{
            "comment": comment,
            "post_id": post.id,
            "author": {
                "type": "author",
                "id": user.id, // Temporarily hardcoded
                "host": user.host,
                "displayName": user.displayName,
                "url": user.url,
                "github": user.github,
                "profile_image": user.profile_image
            },
            "author_id": authorId
        }).finally(() => {
            axios.get(post.id + "/comments?page=1&size=1000")
            .then((res) =>  {
                setComments(res.data);
            })
        });
    }
    const LikePost = () => {
        const inboxEndpoint = post.id.split('/posts')[0] + "/inbox";
        axios.post(inboxEndpoint ,{
            "@context": "https://www.w3.org/ns/activitystreams",
            "summary": user.displayName + " liked your post",
            "type": "Like",
            "author": {
                "type": "author",
                "id": user.id, // Temporarily hardcoded
                "host": user.host,
                "displayName": user.displayName,
                "url": user.url,
                "github": user.github,
                "profile_image": user.profile_image
            },
            "object": post.id
        }).finally(() => {
            axios.get(post.id + "/likes")
            .then((res) => {
                setLikes(res.data)
            })
        });
    }
    if (post.contentType == "text/plain") {
        return (
            <div key={post.id} className="m-auto">
                <div className="m-4 text-gray-900 md:text-2xl">
                    {post.title}
                </div>
                <div className="m-4">
                    {post.content}
                </div>
                <div className="mb-4 flex flex-row ...">
                    <div>
                    <input 
                        className="grow py-2 ml-4 mr-2 pl-2" 
                        placeholder="Comment..."
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    </div>
                    <button 
                        className="bg-submitBg text-white px-4 py-1 rounded-md mr-4" 
                        onClick={CommentSubmit}>
                        <p className="font-black">→</p>
                    </button>
                    <button 
                        className="bg-submitBg text-white px-4 py-1 rounded-md"
                        onClick={LikePost}>
                        <p className="font-black">♥</p>
                    </button>
                    <div className="ml-4 m-auto" >
                        Likes: {likes.length}
                    </div>
                </div>
                <div className="m-4">
                    <div>Comments:</div>
                    {
                        comments?.comments.map((comment) => {
                            return (
                                <div key={comment.id}>{comment.author.displayName}: {comment.comment}</div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    if (post.contentType == "image/jpeg;base64") {
        <div>DOPE IMAGE</div>
    }
}