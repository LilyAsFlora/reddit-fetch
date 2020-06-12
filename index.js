'use strict'

const nfetch = require('node-fetch');

async function redditFetch(obj) {

    const sub = obj.subreddit.toLowerCase();
    const sort = obj.sort || 'top';
    const targetURL = `https://reddit.com/r/${sub}.json?sort=${sort}&t=week`; 

    return new Promise((resolve, reject) => {

        nfetch(targetURL).then(res => res.json())
        .then(body => {
            if (!body || !body.data) return reject(new Error('Unable to find a post.'));
            let found = body.data.children;

            let randInt = Math.floor(Math.random() * found.length);
            let post = found[randInt].data;
            resolve(post);
        });

    });
}

module.exports = redditFetch;