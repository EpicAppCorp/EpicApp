export default function Post({post}) {
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
                <input className="grow py-2 ml-4 mr-2 pl-2" placeholder="Comment..."></input>
                </div>
                <button className="bg-submitBg text-white px-4 py-1 rounded-md mr-4">
                    <p className="font-black">→</p>
                </button>
                <button className="bg-submitBg text-white px-4 py-1 rounded-md ">
                    <p className="font-black">♥</p>
                </button>
            </div>
        </div>
    )
}