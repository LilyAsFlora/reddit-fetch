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

## Options
- `subreddit` STRING | A valid reddit community, e.g 'pics' or 'popular'
- `sort` STRING | A valid reddit sorting option (best, hot, new, top or rising)

