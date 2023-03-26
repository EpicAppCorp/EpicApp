//components
import Button from '@epicapp/components/Button';
import { useMutation, useQuery } from 'react-query';
import Image from 'next/image';
import { getFollowers, unFollow } from '@epicapp/services/follow';

export default function FriendsList({author}) {
    let followers = useQuery(['followers'], () => getFollowers(author), {
        retry: 1,
        staleTime: 10000,
        enabled: !!author,
    });

    const deleteFollow = useMutation((follower) => unFollow(author, follower), {
        onSuccess() {
            followers = useQuery(['followers'], () => getFollowers(author), {
                retry: 1,
                staleTime: 10000,
                enabled: !!author,
            });
        },
    });

    let mockFollowers = {
        "type": "followers",      
        "items":[
            {
                "type":"author",
                "id":"http://127.0.0.1:5454/authors/1d698d25ff008f7538453c120f581471",
                "url":"http://127.0.0.1:5454/authors/1d698d25ff008f7538453c120f581471",
                "host":"http://127.0.0.1:5454/",
                "displayName":"Greg Johnson",
                "github": "http://github.com/gjohnson",
                "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
            },
            {
                "type":"author",
                "id":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
                "host":"http://127.0.0.1:5454/",
                "displayName":"Lara Croft",
                "url":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
                "github": "http://github.com/laracroft",
                "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
            }
        ]
    };
     
    return (
        <div>
            {mockFollowers.items?.map((follower) => (
                <section className="rounded-3xl bg-surface p-4 mb-4">
                    <div className="flex items-center justify-between gap-4">
                        <span className='flex items-center gap-4'>
                            <Image
                                className="self-start overflow-hidden rounded-full border-4 border-background object-cover"
                                src="profile image"
                                alt="profile image"
                                loader={() => follower.profileImage}
                                width={60}
                                height={60}
                                priority={true}
                            />
                            <span className="text-textAlt">@{follower.displayName}</span>
                        </span>
                        <Button
                            onClick={() => deleteFollow.mutate(follower)}
                            className="rounded-2xl bg-layer px-4 mx-10 text-xl text-textAlt transition-all hover:scale-105 hover:bg-primary hover:text-black "
                        >
                            <i className="fa-regular fa-xmark" />
                        </Button>
                    </div>
                </section>
            ))}
        </div>
    )
}