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
| sort           | ?string      |   a valid reddit sorting option | top
| allowNSFW      | ?boolean     |    whether or not the returned post can be marked as NSFW | false
| allowModPost   | ?boolean     |    whether or not the returned post can be distinguished as a mod post | false
| allowCrossPost | ?boolean  | whether or not the returned post can be a crosspost | 



## Dependencies
- `node-fetch` v2.6.0 ([LINK](https://www.npmjs.com/package/node-fetch))

