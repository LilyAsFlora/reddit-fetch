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

