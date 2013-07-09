helpers = (app) ->
  
  app.locals
    urlFor: (obj)->
      if obj.id
        "/admin/pies/#{obj.id}"
      else
        "/admin/pies"

    cssClassForState: (expected, actual) ->
      if actual is expected
        [expected, 'on']
      else
        expected

module.exports = helpers
