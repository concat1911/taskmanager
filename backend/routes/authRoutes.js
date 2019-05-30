const passport = require('passport');

module.exports = (app) => {
    //Index Route
    app.get('/', (req, res) => {
        res.send({homepage: ''});
    })
    
    //GOOGLE API
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    app.get('/auth/google/callback', passport.authenticate('google'))

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    //GET CURRENT USER
    app.get('/api/current_user', (req, res) => {
        res.send(req.session);
        // res.send(req.user);
    })
}
