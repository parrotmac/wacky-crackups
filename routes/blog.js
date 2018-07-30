const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const flattenBlogPost = (postBody) => {
    let newPostBody = {...postBody};
    const featuredMedia = newPostBody['_embedded']['wp:featuredmedia'];
    if(featuredMedia.length > 0) {
        newPostBody['media_url'] = newPostBody['_embedded']['wp:featuredmedia'][0]['source_url'];
    }
    return newPostBody
};

router.get('/', function(req, res, next) {
    const blogAPIURLBase = `${req.app.get("blogPostsURL")}?_embed`;

    let pageNumber = req.query.page;
    let prevPageNumber = 0;
    let nextPageNumber = 2;

    const queryParams = [];


    if(pageNumber === undefined) {
        pageNumber = 1;
    } else {
        queryParams.push({
            "key": "page",
            "value": pageNumber,
        });
        prevPageNumber = parseInt(pageNumber) - 1;
        nextPageNumber = parseInt(pageNumber) + 1;
    }

    let blogListingFinalURL = blogAPIURLBase;

    queryParams.forEach((queryParam, qpIdx) => {
        const qsSeparator = qpIdx === 0?"?":"&";
        blogListingFinalURL += `${qsSeparator}${queryParam['key']}=${encodeURIComponent(queryParam['value'])}`;
    });

    console.log("Fetching", blogListingFinalURL);

    fetch(blogListingFinalURL, {
        // Fetch cfg here
    }).then(
        blogRes => {
            if(blogRes.status === 200) {
                blogRes.json().then(
                    blogJson => {
                        const sligtlyFlattenedPosts = blogJson.map(post => flattenBlogPost(post));
                        res.render('blog', {
                                title: 'Blog',
                                blogPosts: sligtlyFlattenedPosts,
                                pagination: {
                                    next: nextPageNumber,
                                    prev: prevPageNumber,
                                    current: pageNumber
                                }
                            }
                        )
                    }
                )
            } else {
                return Promise.reject(new Error("Blog posts not found"))
            }
        }
    ).catch(err => {
        next(err);
        console.error("Error fetching blog listing", err);
    })
});

router.get('/posts/:id/:slug', function(req, res, next) {
    const blogAPIURLBase = req.app.get("blogPostsURL");
    const blogPostID = req.params.id;

    const blogPostAPIURL = `${blogAPIURLBase}/${blogPostID}`;

    fetch(blogPostAPIURL, {}).then(
        postRes => postRes.json().then(
            postJson => {
                const {title} = postJson;
                res.render('blogPost', {
                    title: `Blog - ${title['rendered']}`,
                    blogPost: flattenBlogPost(postJson)
                })
            }
        )
    )

});

module.exports = router;
