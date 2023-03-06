import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Post({post}) {
    const [comments, setComments] = useState();
    const [comment, setComment] = useState("");
    const [likes, setLikes] = useState([]);
    const base64 = "base64";

    useEffect(() => {
        axios.get(post.id + "/comments")
        .then((res) =>  {
            setComments(res.data);
        })
        axios.get(post.id + "/likes")
        .then((res) => {
            setLikes(res.data)
        })
    })
    const CommentSubmit = () => {
        console.log(likes);
        axios.post(post.id + "/comments",{
            "comment": comment,
            "post_id": post.id,
            "author": {
                "type": "author",
                "id": "c2900cf7-a019-48f7-822a-ffa4023aba91", // Temporarily hardcoded
                "host": "http://127.0.0.1:5454/",
                "displayName": "Jim Jimbo",
                "url": "http://127.0.0.1:5454/authors/1d698d25ff008f7538453c120f581471",
                "github": "http://github.com/jjimbo",
                "profile_image": "https://i.imgur.com/k7XVwpB.jpeg"
            },
            "author_id": "http://localhost:8000/api/authors/c2900cf7-a019-48f7-822a-ffa4023aba91"
        });
    }
    const LikePost = () => {
        const inboxEndpoint = post.id.split('/posts')[0] + "/inbox";
        axios.post(inboxEndpoint ,{
            "@context": "https://www.w3.org/ns/activitystreams",
            "summary": "Nathan Drake liked your post Likes your post",
            "type": "Like",
            "author": {
                "type": "author",
                "id": "c2900cf7-a019-48f7-822a-ffa4023aba91", // Temporarily hardcoded
                "host": "http://127.0.0.1:5454/",
                "displayName": "Jim Jimbo",
                "url": "http://127.0.0.1:5454/authors/1d698d25ff008f7538453c120f581471",
                "github": "http://github.com/jjimbo",
                "profile_image": "https://i.imgur.com/k7XVwpB.jpeg"
            },
            "object": post.id
        });
    }
    return (
        <div key={post.id} className="m-auto">
            <div className="m-4 text-gray-900 md:text-2xl">
                {post.author.displayName}
            </div>
            {post.content.includes(base64) && (
                    <div className="m-4 w-auto">
                        <img src={post.content} alt="" className="w-auto h-60 rounded-md"/>
                    </div>
                )}
                {!post.content.includes(base64) && (
                    <div className="m-4 w-auto">
                        {post.content}
                    </div>
                )}
            
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