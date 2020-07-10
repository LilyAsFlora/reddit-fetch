# reddit-fetch
A simple wrapper for fetching information from reddit posts.

## Usage & Example
```
const redditFetch = require('reddit-fetch');

redditFetch({

    subreddit: 'all',
    sort: 'hot',
    allowNSFW: true,
    allowModPost: true,

}).then(post => {
    console.log(post);
});
```

Returns a promise.

## Options

| FIELD          | TYPE          | DESCRIPTION | DEFAULT |
| :------------- |:-------------:|:-----------:|:-------:|
| subreddit      | string | an existing reddit community |
| sort           | ?string      |   a valid reddit sorting option | top
| allowNSFW      | ?boolean     |    whether or not the returned post can be marked as NSFW | false
| allowModPost   | ?boolean     |    whether or not the returned post can be distinguished as a mod post | false

## Dependencies
- `node-fetch` v2.6.0 ([LINK](https://www.npmjs.com/package/node-fetch))

