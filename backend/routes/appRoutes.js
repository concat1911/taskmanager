//Index Route
app.get('/', (req, res) => {
    res.send({homepage: ''});
})

//GOOGLE API
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'))