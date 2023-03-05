import Card from '@epicapp/components/Card';

export default function CreatePost() {
    return (
      <Card>
        <div className="flex gap-2">
          <div>
            <div className="w-12">
              photo
            </div>
          </div>
          <textarea className="grow py-3" placeholder={"What's on your mind?"} />
        </div>
        <div className="flex gap-3 item-center mt-3 pd-6">
          <div>
            <button className="flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              Upload Photo
            </button>
          </div>
          <div className="grow text-right">
            <button className="bg-submitBg text-white px-4 py-1 rounded-md">
              Share
            </button>
          </div>
        </div>
      </Card>
    )
  }
  