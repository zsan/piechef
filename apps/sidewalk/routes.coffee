Pie = require '../../models/pie'

routes = (app) ->

  app.get '/', (req, res) ->
    Pie.active (err, pies) ->
      res.render "#{__dirname}/views/index",
        title: "What's a warm"
        stylesheet: 'sidewalk'
        pies: pies


module.exports = routes