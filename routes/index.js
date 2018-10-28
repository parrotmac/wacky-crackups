const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('about', { title: 'Wacky Crackups', pageName: 'home' });
});

router.get('/about', function(req, res, next) {
    res.redirect('/')
});

router.get('/support', function(req, res, next) {
    const thankYou = req.query.thanks !== undefined;

    // This is passed in so that Formspree knows where to redirect back to
    const thanksReturnURL = req.protocol + '://' + req.get('host') + req.url + "?thanks";

    // Exactly what comes from the .env file, but that could be undefined if it hasn't been set
    const envFeedbackEmail = req.app.get("feedbackEmailAddress");

    // Sets up feedbackEmail to be "team@saltpeak.design" if envFeedbackEmail is undefined, otherwise uses envFeedbackEmail
    const feedbackEmail = envFeedbackEmail === undefined?"team@saltpeak.design":envFeedbackEmail;

    res.render('support', {
        title: 'Support',
        showThanks: thankYou,
        thanksReturnURL: thanksReturnURL,
        feedbackEmail: feedbackEmail,
        pageName: 'support'
    });
});

router.get('/legal', function(req, res, next) {
    res.render('tandc', { title: 'Terms and Conditions', pageName: 'legal' });
});

router.get('/characters', function(req, res, next) {
    const characters = [
        {
            name: 'Sis Boom Bunny',
            catch_phrase: '',
            image_url: '/images/character-buttons/BUNNY23.png'
        },
        {
            name: 'Wussy Cat',
            catch_phrase: '',
            image_url: '/images/character-buttons/CAT23.png'
        },
        {
            name: 'Urg',
            catch_phrase: '',
            image_url: '/images/character-buttons/CAVEMAN23.png'
        },
        {
            name: 'Sand Hill Sara',
            catch_phrase: '',
            image_url: '/images/character-buttons/COWGIRL23.png'
        },
        {
            name: 'Triggasaurus',
            catch_phrase: '',
            image_url: '/images/character-buttons/DINO23.png'
        },
        {
            name: 'Packy D',
            catch_phrase: '',
            image_url: '/images/character-buttons/ELEPHANT23.png'
        },
        {
            name: 'Flominga',
            catch_phrase: '',
            image_url: '/images/character-buttons/FLAMINGO23.png'
        },
        {
            name: 'Nibbles',
            catch_phrase: '',
            image_url: '/images/character-buttons/MOUSE23.png'
        },
        {
            name: 'Captain Crackup',
            catch_phrase: '',
            image_url: '/images/character-buttons/SUPERHERO23.png'
        },
        {
            name: 'Turtleneck',
            catch_phrase: '',
            image_url: '/images/character-buttons/TURTLE23.png'
        },
    ];

    res.render('characters', { title: 'Characters', characters: characters, pageName: 'characters' })
});

module.exports = router;
