var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wacky Crackups' });
});

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About' });
});

router.get('/blog', function(req, res, next) {
    res.render('blog', { title: 'Blog' });
});

router.get('/tandc', function(req, res, next) {
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
