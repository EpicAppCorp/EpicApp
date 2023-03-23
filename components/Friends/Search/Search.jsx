//components
import Button from '@epicapp/components/Button';
import { useMutation, useQueryClient } from 'react-query';
import { getAuthorById } from '@epicapp/services/author';
import { sendFollowRequest } from '@epicapp/services/inbox';

export default function ({authorSendingRequest}) {
    console.log("Your Mom" + authorSendingRequest);

    const sendFollow = useMutation((body) => {
        return (
            sendFollowRequest(body)
        )
    });


    const verifyAuthor = useMutation((authorToVerify) => {
        console.log(authorToVerify);
        return (
            getAuthorById(authorToVerify)
        )
    }, {
        onSuccess(data) {
            const authorRecievingRequest = data.data;
            console.log("Author Sending: " + authorSendingRequest)
            console.log("Author Recieving: " + data.data.displayName)
            sendFollow.mutate("2c1d218a-76d8-498a-b57e-83a6df062ca3", {
                type: "inbox",
                summary: "Sending a follow request",
                actor: authorSendingRequest,
                object: authorRecievingRequest,
            })
            close();
        },
    })

    const searchSubmit = async (e) => {
        e.preventDefault();
        verifyAuthor.mutate(e.target.authorDisplayName.value);
    };

    return (
        <section className="rounded-3xl bg-surface p-4">
            <form onSubmit={searchSubmit}>
                <div className="flex flex-row gap-4">
                    <div className="w-full overflow-hidden rounded-2xl bg-foreground text-text">
                        <input
                            className="h-9 w-full border-b border-layer bg-transparent p-3 placeholder:text-textAlt/20 focus:outline-none"
                            type="text"
                            id="authorDisplayName"
                            name="authorDisplayName"
                            placeholder="Creative title for your new post."
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <Button
                            type="submit"
                            className="rounded-2xl bg-layer px-6 py-2 text-textAlt transition-colors hover:bg-primary hover:text-black"
                        >
                            Share
                        </Button>
                    </div>
                </div>
            </form>
        </section>
    )
}