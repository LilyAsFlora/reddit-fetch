'use strict'
const nfetch = require('node-fetch');

/**
 *  Primary fetch function
 * 
 * @param {*} obj - Options
 * @return {Promise} 
 */

async function redditFetch(obj) {
    return new Promise((resolve, reject) => {

    // Check for invalid/missing arguments
    if (!obj || !obj.subreddit)
    return reject(new Error('Missing required arguments.'));

    if (typeof(obj.subreddit) !== 'string')
    return reject(new TypeError('Invalid type, expected string.'));

    // Configuration & target URL
    const sub = obj.subreddit.toLowerCase();
    const sort = obj.sort ? obj.sort.toLowerCase() : 'top';
    const targetURL = `https://reddit.com/r/${sub}.json?sort=${sort}&t=week`;

    nfetch(targetURL).then(res => res.json())
    .then(body => {
        if (!body || !body.data) return reject(new Error('Unable to find a post.'));
        let found = body.data.children;

        // Data will be checked to meet the criteria specified by the arguments

        if (!obj.allowNSFW)
        found = body.data.children.filter(p => !p.data.over_18);

        if (!obj.allowModPost)
        found = body.data.children.filter(p => !p.data.distinguished);

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