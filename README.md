# reddit-fetch
A simple wrapper for fetching information from reddit posts.

[Reddit API Documentation](https://www.reddit.com/dev/api/)

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

Returns a promise that resolves to a JSON object (`Promise<object>`).

## Options

| FIELD          | TYPE          | DESCRIPTION | DEFAULT |
| :------------- |:-------------:|:-----------:|:-------:|
| subreddit      | string | an existing reddit community |
| sort           | string?      |   a valid reddit sorting option | 'top'
| allowNSFW      | boolean?     |    whether or not the returned post can be marked as NSFW | false
| allowModPost   | boolean?     |    whether or not the returned post can be distinguished as a mod post | false
| allowCrossPost | boolean?  | whether or not the returned post can be a crosspost | false |

## Tips & Tricks
- Data returned has all sorts of conditionals you can check to specify further what kind of post you're looking for.
- See contribution guidelines at [CONTRIBUTING.md](https://github.com/LilyAsFlora/reddit-fetch/blob/master/CONTRIBUTING.md)

## Dependencies
- `node-fetch` v2.6.0 ([LINK](https://www.npmjs.com/package/node-fetch))

