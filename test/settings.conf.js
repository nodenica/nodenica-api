var randomstring = require('randomstring');
var request = require('request');
var deasync = require('deasync');
var httpPost = deasync(request.post);
var httpPut = deasync(request.put);
var httpGet = deasync(request.get);
var httpDelete = deasync(request.del);

var Settings = function() {
  var self = this;

  /**
   * Url
   */
  self.url = 'http://localhost:3000/api/';

  /**
   * Make http request post / put / get / delete
   */
  self.http = {
    // post
    post: function(resource, params, accessToken) {
      var options = {
        url: self.getUrl(resource),
        headers: {
            'authorization': accessToken
        }
      };
      if (params) {
        options.form = params;
      }
      return httpPost(options);
    },
    // put
    put: function(resource, params, accessToken) {
      var options = {
        url: self.getUrl(resource),
        headers: {
            'authorization': accessToken
        }
      };
      if (params) {
        options.form = params;
      }
      return httpPut(options);
    },
    // get
    get: function(resource, accessToken) {
      var options = {
        url: self.getUrl(resource),
        headers: {
            'authorization': accessToken
        }
      };
      return httpGet(options);
    },
    // delete
    delete: function(resource, accessToken) {
      var options = {
        url: self.getUrl(resource),
        headers: {
            'authorization': accessToken
        }
      };
      return httpDelete(options);
    }
  }

  /**
   * Return a random string
   */
  self.getRandomString = function() {
    return randomstring.generate(6);
  }

  /**
   *
   */
  self.getUrl = function(resource) {
    return self.url + resource
  }

  /**
   * Auth
   */
  self.auth = {
    adminA: {
      id: 1,
      accessToken: '9RI0FbwGFOjZDACVAsRGDB56NYGGBjRMNv8974OE5uD21r7woAtoaFI60rUgqHFL'
    },
    adminB: {
      id: 2,
      accessToken: 'HtYCxpPr7F0iFZydskybHSDp6v4gtc9TC9HUBoVRQgS3Dsgg7g1qS2F2lduIUdvu'
    },
    adminC: {
      id: 3,
      accessToken: 'LPuENsmU1FdVZoDjhyAQANwZQoe7PMR1YLKSPLfzxZzuwrveAgZYF4UuzEmqvolz'
    },
    foo: {
      id: 4,
      accessToken: 'W4nqlSCBKszPeO8Al6dSa6YydGq03eF8jBFfHLEwBOMCCMk5sGor0MHHA3E3EZ0i'
    },
    bar: {
      id: 5,
      accessToken: '5jlpGWpSWAnBXDwWJB2rDH1ePzYhmpTg54fFJlcT8OXgMrh4DUCLwkRDmuwEoVPp'
    }
  }
}

module.exports = Settings;
