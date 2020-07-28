# reddit-fetch

![Downloads](https://img.shields.io/npm/dm/reddit-fetch)
![Minified size](https://img.shields.io/bundlephobia/min/reddit-fetch)
![Version](https://img.shields.io/github/package-json/v/LilyAsFlora/reddit-fetch)
![License](https://img.shields.io/npm/l/reddit-fetch)

[![NPM](https://nodei.co/npm/reddit-fetch.png)](https://nodei.co/npm/reddit-fetch/)

A simple wrapper for fetching information from reddit posts.

- [NPM Package](https://npmjs.com/package/reddit-fetch/)

- [Reddit API Documentation](https://www.reddit.com/dev/api/)

## Usage & Example
```
const redditFetch = require('reddit-fetch');

redditFetch({

    subreddit: 'all',
    sort: 'hot',
    allowNSFW: true,
    allowModPost: true,
    allowCrossPost: true,

}).then(post => {
    console.log(post);
});
```

## Function details
- Returns a promise that resolves to a JSON object (`Promise<object>`). 
- Unhandled rejections can be caught and handled:
```
...
}).then(post => {
    // Use post data
}).catch(e => {
    console.error(`Promise rejection: ${e}`);
});
```

## Options

| FIELD          | TYPE          | DESCRIPTION                                                         | DEFAULT |
| :------------- |:-------------:|:-------------------------------------------------------------------:|:-------:|
| subreddit      | string        | an existing reddit community                                        | N/A     |
| sort           | ?string       | a valid reddit sorting option                                       | 'top'   |
| allowNSFW      | ?boolean      | whether or not the returned post can be marked as NSFW              | false   |
| allowModPost   | ?boolean      | whether or not the returned post can be distinguished as a mod post | false   |
| allowCrossPost | ?boolean      | whether or not the returned post can be a crosspost                 | false   |

## Tips & Tricks
- Data returned has all sorts of boolean values you can check to determine further what kind of post you're looking for.
- See contribution guidelines at [CONTRIBUTING.md](https://github.com/LilyAsFlora/reddit-fetch/blob/master/CONTRIBUTING.md)

By default, the Reddit JSON API should **not** return any removed or deleted posts, though please report an issue if this happens.

## Dependencies
- [node-fetch v2.6.0](https://www.npmjs.com/package/node-fetch)

***
Made with <3 by Lily 
