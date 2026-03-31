const router = require('express').Router();
const passport = require('passport'); // ✅ was missing

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  //#swagger.tags=['Hello World']
  res.send('Hello World!');
});

router.use('/books', require('./books'));
router.use('/authors', require('./authors'));

router.get('/login', passport.authenticate('github', { scope: ['user'] }), (req, res) => {});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;