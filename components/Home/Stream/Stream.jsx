import { useQuery } from 'react-query';

//components
import Post from './Post';
import Follow from '@epicapp/components/Home/Stream/Follow';
import Like from '@epicapp/components/Home/Stream/Like';
import Comment from '@epicapp/components/Home/Stream/Comment';

//services
import { getInbox } from '@epicapp/services/inbox';

export default function Stream({ author, isInbox }) {
  // const inbox = useQuery(['inbox', author], () => getInbox(author), {
  //   staleTime: 10000,
  // });

  const inbox = {
    data: {
      data: {
        items: [
          {
            '@context': 'https://www.w3.org/ns/activitystreams',
            summary: 'Lara Croft Likes your post',
            type: 'like',
            author: {
              type: 'author',
              id: 'http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e',
              host: 'http://127.0.0.1:5454/',
              displayName: 'Lara Croft',
              url: 'http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e',
              github: 'http://github.com/laracroft',
              profileImage: 'https://i.imgur.com/k7XVwpB.jpeg',
            },
            object:
              'http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/764efa883dda1e11db47671c4a3bbd9e',
          },
          {
            type: 'follow',
            summary: 'Greg wants to follow Lara',
            actor: {
              type: 'author',
              id: 'http://127.0.0.1:5454/authors/1d698d25ff008f7538453c120f581471',
              url: 'http://127.0.0.1:5454/authors/1d698d25ff008f7538453c120f581471',
              host: 'http://localhost:8000/api',
              displayName: 'Greg Johnson',
              github: 'http://github.com/gjohnson',
              profileImage: 'https://i.imgur.com/k7XVwpB.jpeg',
            },
            object: {
              type: 'author',
              id: 'http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e',
              host: 'http://127.0.0.1:5454/',
              displayName: 'Lara Croft',
              url: 'http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e',
              github: 'http://github.com/laracroft',
              profileImage: 'https://i.imgur.com/k7XVwpB.jpeg',
            },
          },
          {
            type: 'comment',
            author: {
              type: 'author',
              id: 'http://127.0.0.1:5454/authors/1d698d25ff008f7538453c120f581471',
              url: 'http://127.0.0.1:5454/authors/1d698d25ff008f7538453c120f581471',
              host: 'http://127.0.0.1:5454/',
              displayName: 'Greg Johnson',
              github: 'http://github.com/gjohnson',
              profileImage: 'https://i.imgur.com/k7XVwpB.jpeg',
            },
            comment: 'Sick Olde English',
            contentType: 'text/markdown',
            published: '2015-03-09T13:07:04+00:00',
            id: 'http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments/f6255bb01c648fe967714d52a89e8e9c',
          },
          {
            type: 'post',
            title: 'A Friendly post title about a post about web dev',
            id: 'http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/764efa883dda1e11db47671c4a3bbd9e',
            source: 'http://lastplaceigotthisfrom.com/posts/yyyyy',
            origin: 'http://whereitcamefrom.com/posts/zzzzz',
            description: 'This post discusses stuff -- brief',
            contentType: 'text/plain',
            content:
              'Þā wæs on burgum Bēowulf Scyldinga, lēof lēod-cyning, longe þrāge folcum gefrǣge (fæder ellor hwearf, aldor of earde), oð þæt him eft onwōc hēah Healfdene; hēold þenden lifde, gamol and gūð-rēow, glæde Scyldingas. Þǣm fēower bearn forð-gerīmed in worold wōcun, weoroda rǣswan, Heorogār and Hrōðgār and Hālga til; hȳrde ic, þat Elan cwēn Ongenþēowes wæs Heaðoscilfinges heals-gebedde. Þā wæs Hrōðgāre here-spēd gyfen, wīges weorð-mynd, þæt him his wine-māgas georne hȳrdon, oð þæt sēo geogoð gewēox, mago-driht micel. Him on mōd bearn, þæt heal-reced hātan wolde, medo-ærn micel men gewyrcean, þone yldo bearn ǣfre gefrūnon, and þǣr on innan eall gedǣlan geongum and ealdum, swylc him god sealde, būton folc-scare and feorum gumena. Þā ic wīde gefrægn weorc gebannan manigre mǣgðe geond þisne middan-geard, folc-stede frætwan. Him on fyrste gelomp ǣdre mid yldum, þæt hit wearð eal gearo, heal-ærna mǣst; scōp him Heort naman, sē þe his wordes geweald wīde hæfde. Hē bēot ne ālēh, bēagas dǣlde, sinc æt symle. Sele hlīfade hēah and horn-gēap: heaðo-wylma bād, lāðan līges; ne wæs hit lenge þā gēn þæt se ecg-hete āðum-swerian 85 æfter wæl-nīðe wæcnan scolde. Þā se ellen-gǣst earfoðlīce þrāge geþolode, sē þe in þȳstrum bād, þæt hē dōgora gehwām drēam gehȳrde hlūdne in healle; þǣr wæs hearpan swēg, swutol sang scopes. Sægde sē þe cūðe frum-sceaft fīra feorran reccan',
            author: {
              type: 'author',
              id: 'http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e',
              host: 'http://localhost:8000/api',
              displayName: 'Lara Croft',
              url: 'http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e',
              github: 'http://github.com/laracroft',
              profileImage: 'https://i.imgur.com/k7XVwpB.jpeg',
            },
            categories: ['web', 'tutorial'],
            comments:
              'http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments',
            published: '2015-03-09T13:07:04+00:00',
            visibility: 'FRIENDS',
            unlisted: false,
          },
          {
            type: 'post',
            title: 'DID YOU READ MY POST YET?',
            id: 'http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/999999983dda1e11db47671c4a3bbd9e',
            source: 'http://lastplaceigotthisfrom.com/posts/yyyyy',
            origin: 'http://whereitcamefrom.com/posts/zzzzz',
            description: 'Whatever',
            contentType: 'text/plain',
            content: 'Are you even reading my posts Arjun?',
            author: {
              type: 'author',
              id: 'http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e',
              host: 'http://127.0.0.1:5454/',
              displayName: 'Lara Croft',
              url: 'http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e',
              github: 'http://github.com/laracroft',
              profileImage: 'https://i.imgur.com/k7XVwpB.jpeg',
            },
            categories: ['web', 'tutorial'],
            comments:
              'http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments',
            published: '2015-03-09T13:07:04+00:00',
            visibility: 'FRIENDS',
            unlisted: false,
          },
        ],
      },
    },
  };

  //loading animation
  if (inbox.isLoading)
    return (
      <div className="flex h-full items-center justify-center text-9xl text-primary">
        {/* // maybe a ekelton loading animation here? */}
        <i className="fa-solid fa-spinner-third animate-spin bg-transparent text-2xl text-primary" />
      </div>
    );
  else if (
    isInbox &&
    !inbox.data?.data.items.filter((item) => item.type !== 'post').length
  )
    return (
      <p className="py-4 text-center text-sm text-textAlt">
        No new notifications.
      </p>
    );
  // if no items
  else if (!inbox.data?.data.items.length)
    return (
      <p className="py-4 text-center text-sm text-textAlt">
        Nothing here yet... weird.
      </p>
    );
  //inbox stream
  else if (isInbox)
    return (
      <div className="flex flex-col">
        {inbox.data.data.items.map((item, idx) => {
          if (item.type === 'follow')
            return <Follow key={idx} follow={{ ...item, idx }} />;
          else if (item.type === 'like')
            return <Like key={idx} like={{ ...item, idx }} />;
          else if (item.type === 'comment')
            return <Comment key={idx} comment={{ ...item, idx }} />;
        })}
      </div>
    );
  //posts only inbox stream
  else
    return (
      <div className="flex flex-col gap-6">
        {inbox.data.data.items
          .filter(({ type }) => type === 'post')
          .map((item) => (
            <Post key={item.id} post={item} author={author} />
          ))}
      </div>
    );
}
