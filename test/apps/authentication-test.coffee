assert  = require 'assert'
request = require 'request'
app     = require '../../app'

describe "authentication", ->
  describe "GET /login", ->
    body = null
    before (done) ->
      options = 
        uri: "http://localhost:3001/login"
      request options, (err, response, _body) ->
        body = _body
        done()

    it "has title", ->
      assert.hasTag body, '//head/title', 'Hot Pie - Login'
