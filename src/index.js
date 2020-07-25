'use strict'
const nfetch = require('node-fetch');

/**
 *  Makes a HTTP GET request to retrieve the specified subreddit's JSON data.
 *
 * @param {Object} options Function options.
 * @param {string} options.subreddit The target subreddit to retrieve the post from.
 * @param {string} options.sort The sorting option to search for data.
 * @param {boolean?} [options.allowNSFW] Whether or not the returned post can be marked as NSFW.
 * @param {boolean?} [options.allowModPost] Whether or not the returned post can be distinguished as a moderator post.
 * @param {boolean?} [options.allowCrossPost] Whether or not the returned post can be a crosspost.
 *
 * @returns {Promise<object>} Promise that resolves to a JSON object value.
 */

async function redditFetch({ subreddit, sort = 'top', allowNSFW, allowModPost, allowCrossPost }) {
    return new Promise((resolve, reject) => {

    /* Check required argument */
    if (!subreddit)
    return reject(new Error('Missing required argument "subreddit"'));

    if (typeof(subreddit) !== 'string')
    return reject(new TypeError(`Expected type "string" but got "${typeof(subreddit)}"`))

    /* Check types */
    if (sort && typeof(sort) !== 'string')
    return reject(new TypeError(`Expected type "string" but got "${typeof(sort)}"`));

    if (allowNSFW && typeof(allowNSFW) !== 'boolean')
    return reject(new TypeError(`Expected type "boolean" but got "${typeof(allowNSFW)}"`));

    if (allowModPost && typeof(allowModPost) !== 'boolean')
    return reject(new TypeError(`Expected type "boolean" but got "${typeof(allowModPost)}"`));

    if (allowCrossPost && typeof(allowCrossPost) !== 'boolean')
    return reject(new TypeError(`Expected type "boolean" but got "${typeof(allowCrossPost)}"`));

    /* Configuration & target URL */
    sort = sort.toLowerCase();
    const sub = subreddit.toLowerCase();
    const targetURL = `https://reddit.com/r/${sub}.json?sort=${sort}&t=week`;

    // @ts-ignore
    nfetch(targetURL).then(res => res.json())
    .then(body => {
        let found = body.data.children;

        /* Apply options */
        if (!allowNSFW)
        found = found.filter(p => !p.data.over_18);

        if (!allowModPost)
        found = found.filter(p => !p.data.distinguished);

        if (!allowCrossPost)
        found = found.filter(p => !p.data.crosspost_parent_list);

        if (!found.length)
        return reject(new Error('Unable to find a post that meets specified criteria.'));

        /* Pick random post from array of found data */
        let randInt = Math.floor(Math.random() * found.length);
        let post = found[randInt].data;
        resolve(post);
        });
    });
}

module.exports = redditFetch;