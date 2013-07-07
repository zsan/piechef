routes = (app) ->

  app.get '/login', (req, res) ->
    res.render "#{__dirname}/views/login", {title: 'Login', stylesheet: 'login'}
    title: 'Login'
    stylesheet: 'login'

  app.post '/sessions', (req, res) ->
    if ('piechef' is req.body.user) and ('12345' is req.body.password)
      req.session.currentUser = req.body.user
      req.session.success = "You are logged in as #{req.session.currentUser}"
      res.redirect '/login'
      return
    req.session.error = 'Those credential were incorrect. Try again.'
    res.redirect '/login'
    return

  app.del '/sessions', (req, res) ->
    req.session.regenerate (err) ->
      req.flash 'info', "You have been logged out."
      res.redirect '/login'

module.exports = routes