# reddit-fetch
A simple wrapper for fetching information from reddit posts.

## Usage & Example
```
const redditFetch = require('reddit-fetch');

redditFetch({

    subreddit: 'all',
    sort: 'hot'

}).then(post => {
    console.log(post);
});
```

Returns a promise.

## Options
- `subreddit` STRING | A valid reddit community, e.g 'pics' or 'popular'
- `sort` STRING | A valid reddit sorting option (best, hot, new, top or rising)

## Dependencies
- `node-fetch` v2.6.0 ([LINK](https://www.npmjs.com/package/node-fetch))

