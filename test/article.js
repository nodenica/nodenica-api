require('should-http');
var assert = require('assert');
var Settings = require('./settings.conf');
var settings = new Settings();

describe('Article', function() {

  var form = {
    'title': 'Unit Test ' + settings.getRandomString(),
    'content': 'This is a Unit Test',
    'type_id': 1
  };

  var article = settings.http.post('Articles', form, settings.auth.foo.accessToken);
  var articleObj = JSON.parse(article.body);

  describe('Create', function() {
    it('ALLOW create to Foo', function() {
      article.should.have.status(200);
    });
    it('DENY create to Foo | Require title', function() {
      var form = {
        'title': '',
        'content': 'This is a Unit Test',
        'type_id': 1
      };
      var createRequest = settings.http.post('Articles', form, settings.auth.foo.accessToken);
      createRequest.should.have.status(422);
    });
    it('DENY create to Foo | Require content', function() {
      var form = {
        'title': 'Unit Test ' + settings.getRandomString(),
        'content': '',
        'type_id': 1
      };
      var createRequest = settings.http.post('Articles', form, settings.auth.foo.accessToken);
      createRequest.should.have.status(422);
    });
    it('DENY create to Foo | Require type_id', function() {
      var form = {
        'title': 'Unit Test ' + settings.getRandomString(),
        'content': 'This is a Unit Test',
        'type_id': ''
      };
      var createRequest = settings.http.post('Articles', form, settings.auth.foo.accessToken);
      createRequest.should.have.status(409);
    });
    it('DENY create to Foo | Require exists type_id', function() {
      var form = {
        'title': 'Unit Test ' + settings.getRandomString(),
        'content': 'This is a Unit Test',
        'type_id': 0
      };
      var createRequest = settings.http.post('Articles', form, settings.auth.foo.accessToken);
      createRequest.should.have.status(409);
    });
  });

  describe('Read', function() {
    it('ALLOW find to Admin A', function() {
      var getRequest = settings.http.get('Articles/' + articleObj.id, settings.auth.adminA.accessToken);
      getRequest.should.have.status(200);
    });
    it('ALLOW find to Admin B', function() {
      var getRequest = settings.http.get('Articles/' + articleObj.id, settings.auth.adminB.accessToken);
      getRequest.should.have.status(200);
    });
    it('ALLOW find to Admin C', function() {
      var getRequest = settings.http.get('Articles/' + articleObj.id, settings.auth.adminC.accessToken);
      getRequest.should.have.status(200);
    });
    it('ALLOW find to Owner (Foo)', function() {
      var getRequest = settings.http.get('Articles/' + articleObj.id, settings.auth.foo.accessToken);
      getRequest.should.have.status(200);
    });
    it('ALLOW find to Bar', function() {
      var getRequest = settings.http.get('Articles/' + articleObj.id, settings.auth.bar.accessToken);
      getRequest.should.have.status(200);
    });
  });

  describe('Update', function() {
    it('ALLOW updateAttributes to Admin A', function() {
      var form = {
        title: 'Edited Admin A ' + settings.getRandomString()
      };
      var editRequest = settings.http.put('Articles/' + articleObj.id, form, settings.auth.adminA.accessToken);
      editRequest.should.have.status(200);
    });
    it('ALLOW updateAttributes to Admin B', function() {
      var form = {
        title: 'Edited Admin B ' + settings.getRandomString()
      };
      var editRequest = settings.http.put('Articles/' + articleObj.id, form, settings.auth.adminB.accessToken);
      editRequest.should.have.status(200);
    });
    it('ALLOW updateAttributes to Admin C', function() {
      var form = {
        title: 'Edited Admin C ' + settings.getRandomString()
      };
      var editRequest = settings.http.put('Articles/' + articleObj.id, form, settings.auth.adminC.accessToken);
      editRequest.should.have.status(200);
    });
    it('ALLOW updateAttributes to Owner (Foo)', function() {
      var form = {
        title: 'Edited Owner ' + settings.getRandomString()
      };
      var editRequest = settings.http.put('Articles/' + articleObj.id, form, settings.auth.foo.accessToken);
      editRequest.should.have.status(200);
    });
    it('DENY updateAttributes to Bar', function() {
      var form = {
        title: 'Edited Bar ' + settings.getRandomString()
      };
      var editRequest = settings.http.put('Articles/' + articleObj.id, form, settings.auth.bar.accessToken);
      editRequest.should.have.status(401);
    });
  });

  describe('Delete', function() {
    it('DENY deleteById to Bar', function() {
      var deleteRequest = settings.http.delete('Articles/' + articleObj.id, settings.auth.bar.accessToken);
      deleteRequest.should.have.status(401);
    });
    it('ALLOW deleteById to Owner (Foo)', function() {
      var deleteRequest = settings.http.delete('Articles/' + articleObj.id, settings.auth.foo.accessToken);
      deleteRequest.should.have.status(204);
    });
    it('ALLOW deleteById to Admin A', function() {
      var deleteRequest = settings.http.delete('Articles/' + articleObj.id, settings.auth.adminA.accessToken);
      deleteRequest.should.have.status(204);
    });
    it('ALLOW deleteById to Admin B', function() {
      var deleteRequest = settings.http.delete('Articles/' + articleObj.id, settings.auth.adminB.accessToken);
      deleteRequest.should.have.status(204);
    });
    it('ALLOW deleteById to Admin A', function() {
      var deleteRequest = settings.http.delete('Articles/' + articleObj.id, settings.auth.adminC.accessToken);
      deleteRequest.should.have.status(204);
    });
  });
});
