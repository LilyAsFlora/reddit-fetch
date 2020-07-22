'use strict'
const nfetch = require('node-fetch');

/**
 *  Makes a HTTP GET request to retrieve the specified subreddit's JSON data.
 *
 * @param {object} options Function parameters (see docs for info).
 * @return {Promise<object>} Promise
 */

async function redditFetch(options) {
    return new Promise((resolve, reject) => {

    // Check for invalid/missing arguments
    if (!options || !options.subreddit)
    return reject(new Error('Missing required arguments. Must specify at least the subreddit.'));

    if (typeof(options.subreddit) !== 'string')
    return reject(new TypeError('Invalid type, expected string.'));

    if (options.allowNSFW && typeof(options.allowNSFW) !== 'boolean')
    return reject(new TypeError('Invalid type, expected boolean.'));

    if (options.allowModPost && typeof(options.allowModPost) !== 'boolean')
    return reject(new TypeError('Invalid type, expected boolean.'));

    // Configuration & target URL
    const sub = options.subreddit.toLowerCase();
    const sort = options.sort ? options.sort.toLowerCase() : 'top';
    const targetURL = `https://reddit.com/r/${sub}.json?sort=${sort}&t=week`;

    nfetch(targetURL).then(res => res.json())
    .then(body => {
        if (!body || !body.data) return reject(new Error('Unable to find a post.'));
        let found = body.data.children;

        // Data will be checked to meet the criteria specified by the arguments

        if (!options.allowNSFW)
        found = found.filter(p => !p.data.over_18);

        if (!options.allowModPost)
        found = found.filter(p => !p.data.distinguished);

        if (!found.length)
        return reject(new Error('Unable to find a post which meets specified criteria.'));

        // Pick a random post from the array of allowed data
        let randInt = Math.floor(Math.random() * found.length);
        let post = found[randInt].data;
        resolve(post);
        });
    });
}

module.exports = redditFetch;