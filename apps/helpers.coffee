helpers = (app) ->
  
#  app.dynamicHelpers
#    flash: (req, res) -> req.flash

  # app.locals (req,res) ->
  # 	res.locals.flash = req.flash()

# app.use(function(req, res, next) {
# 	res.locals.flash = function() { 
# 		return req.flash() 
# 	};
# 	next();
# })
module.exports = helpers
