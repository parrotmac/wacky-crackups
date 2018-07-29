const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wacky Crackups' });
});

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About' });
});

router.get('/blog', function(req, res, next) {
    // TODO: Use env-vars or a conf.json or similar to configure this rather than hard-coding
    const blogAPIURLBase = 'https://admin.insights.ubuntu.com/wp-json/wp/v2/posts';

    const pageNumber = req.query.page;

    const queryParams = [];

    if(pageNumber !== undefined) {
        queryParams.push({
            "key": "page",
            "value": pageNumber,
        })
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
        blogRes => blogRes.json().then(
            blogJson => res.render('blog', { title: 'Blog', blogPosts: blogJson })
        )
    );
});

router.get('/legal', function(req, res, next) {
    res.render('tandc', { title: 'Terms and Conditions' });
});

router.get('/characters', function(req, res, next) {
    const characters = [
        {
            name: 'Bunny',
            catch_phrase: '',
            image_url: '/images/character-buttons/BUNNY23.png'
        },
        {
            name: 'Cat',
            catch_phrase: '',
            image_url: '/images/character-buttons/CAT23.png'
        },
        {
            name: 'Cave Man',
            catch_phrase: '',
            image_url: '/images/character-buttons/CAVEMAN23.png'
        },
        {
            name: 'Cow Girl',
            catch_phrase: '',
            image_url: '/images/character-buttons/COWGIRL23.png'
        },
        {
            name: 'Dino',
            catch_phrase: '',
            image_url: '/images/character-buttons/DINO23.png'
        },
        {
            name: 'Elephant',
            catch_phrase: '',
            image_url: '/images/character-buttons/ELEPHANT23.png'
        },
        {
            name: 'Flamingo',
            catch_phrase: '',
            image_url: '/images/character-buttons/FLAMINGO23.png'
        },
        {
            name: 'Mouse',
            catch_phrase: '',
            image_url: '/images/character-buttons/MOUSE23.png'
        },
        {
            name: 'Superhero',
            catch_phrase: '',
            image_url: '/images/character-buttons/SUPERHERO23.png'
        },
        {
            name: 'Turtle',
            catch_phrase: '',
            image_url: '/images/character-buttons/TURTLE23.png'
        },
    ];

    res.render('characters', { title: 'Characters', characters: characters })
});

module.exports = router;
