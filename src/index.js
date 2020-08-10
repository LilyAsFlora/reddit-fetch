const FetchError = require('./errors/FetchError.js');
const nfetch = require('node-fetch');

/**
 *  Makes a HTTP GET request to retrieve JSON data from a post of the specified subreddit.
 *
 * @param {Object} options - Function options.
 * @param {string} options.subreddit - The target subreddit to retrieve the post from.
 * @param {string?} [options.sort] - The sorting option to search for data.
 * @param {boolean?} [options.allowNSFW] - Whether or not the returned post can be marked as NSFW.
 * @param {boolean?} [options.allowModPost] - Whether or not the returned post can be distinguished as a moderator post.
 * @param {boolean?} [options.allowCrossPost] - Whether or not the returned post can be a crosspost.
 *
 * @returns {Promise<object>} Promise that resolves to a JSON object value.
 */

 /* Asynchronous functions allow writing promise-based code as if it were synchronous, but without blocking the main thread */
async function redditFetch({ subreddit, sort = 'top', allowNSFW, allowModPost, allowCrossPost }) {
    return new Promise((resolve, reject) => {

    /* Check required argument */
    if (!subreddit)
    return reject(new Error('Missing required argument "subreddit"'));

    /* Validate options */
    // TODO: Find a better way to validate the options
    if (typeof(subreddit) !== 'string')
    return reject(new TypeError(`Expected type "string" but got "${typeof(subreddit)}"`));

    if (sort && typeof(sort) !== 'string')
    return reject(new TypeError(`Expected type "string" but got "${typeof(sort)}"`));

    if (allowNSFW && typeof(allowNSFW) !== 'boolean')
    return reject(new TypeError(`Expected type "boolean" but got "${typeof(allowNSFW)}"`));

    if (allowModPost && typeof(allowModPost) !== 'boolean')
    return reject(new TypeError(`Expected type "boolean" but got "${typeof(allowModPost)}"`));

    if (allowCrossPost && typeof(allowCrossPost) !== 'boolean')
    return reject(new TypeError(`Expected type "boolean" but got "${typeof(allowCrossPost)}"`));

    /* Sorting options & subreddit to lowercase */
    sort = sort.toLowerCase();
    const sub = subreddit.toLowerCase();

    /* Target URL for the request */
    const targetURL = `https://reddit.com/r/${sub}.json?sort=${sort}&t=week`;

    // @ts-ignore
    nfetch(targetURL).then(res => res.json())
    .then(body => {

        /* Array of found posts */
		let found = body.data.children;

		if (!found.length)
        return reject(new FetchError(`Unable to find a post. The subreddit "${sub}" does not exist, or it has no available post data.`));

        /* Apply options by filtering the array */
        if (!allowNSFW)
        found = found.filter(p => !p.data.over_18);

        if (!allowModPost)
        found = found.filter(p => !p.data.distinguished);

        if (!allowCrossPost)
        found = found.filter(p => !p.data.crosspost_parent_list);

        /* Reject if the found array has no elements */
        if (!found.length)
        return reject(new FetchError('Unable to find a post that meets specified criteria. There may be an error in the options passed in.'));

        /* Get a random post from the array of found data */
        let randInt = Math.floor(Math.random() * found.length);
		resolve(found[randInt].data);

        });
    });
};

module.exports = redditFetch;
