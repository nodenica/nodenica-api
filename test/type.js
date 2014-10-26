require('should-http');
var Settings = require('./settings.conf');
var settings = new Settings();

describe('Type', function() {

  var uniqueName = 'Type ' + settings.getRandomString();

  var formType = {
    'name': uniqueName
  };

  var type = settings.http.post('Types', formType, settings.auth.adminA.accessToken);
  var typeObj = JSON.parse(type.body);

  describe('Create', function() {
    it('ALLOW create to Admin (A or B or C)', function() {
      type.should.have.status(200);
    });
    it('DENY create to Admin (A or B or C) | Require name', function() {
      var form = {
        'name': ''
      };
      var createRequest = settings.http.post('Types', form, settings.auth.adminA.accessToken);
      createRequest.should.have.status(422);
    });
    it('DENY create to Admin (A or B or C) | Duplicate name', function() {
      var form = {
        'name': uniqueName
      };
      var createRequest = settings.http.post('Types', form, settings.auth.adminA.accessToken);
      createRequest.should.have.status(409);
    });
    it('DENY create to Foo | Only Admin', function() {
      var form = {
        'name': 'Type ' + settings.getRandomString()
      };
      var createRequest = settings.http.post('Types', form, settings.auth.foo.accessToken);
      createRequest.should.have.status(401);
    });
    it('DENY create to Bar| Only Admin', function() {
      var form = {
        'name': 'Type ' + settings.getRandomString()
      };
      var createRequest = settings.http.post('Types', form, settings.auth.bar.accessToken);
      createRequest.should.have.status(401);
    });
  });

  describe('Read', function() {
    it('ALLOW findById to Admin A', function() {
      var getRequest = settings.http.get('Types/' + typeObj.id, settings.auth.adminA.accessToken);
      getRequest.should.have.status(200);
    });
    it('ALLOW findById to Admin B', function() {
      var getRequest = settings.http.get('Types/' + typeObj.id, settings.auth.adminB.accessToken);
      getRequest.should.have.status(200);
    });
    it('ALLOW findById to Admin C', function() {
      var getRequest = settings.http.get('Types/' + typeObj.id, settings.auth.adminC.accessToken);
      getRequest.should.have.status(200);
    });
    it('ALLOW findById to Owner (Foo)', function() {
      var getRequest = settings.http.get('Types/' + typeObj.id, settings.auth.foo.accessToken);
      getRequest.should.have.status(200);
    });
    it('ALLOW findById to Bar', function() {
      var getRequest = settings.http.get('Types/' + typeObj.id, settings.auth.bar.accessToken);
      getRequest.should.have.status(200);
    });
  });

  describe('Update', function() {
    it('ALLOW updateAttributes to Admin A', function() {
      var form = {
        name: 'Edited Admin A ' + settings.getRandomString()
      };
      var editRequest = settings.http.put('Types/' + typeObj.id, form, settings.auth.adminA.accessToken);
      editRequest.should.have.status(200);
    });
    it('ALLOW updateAttributes to Admin B', function() {
      var form = {
        name: 'Edited Admin B ' + settings.getRandomString()
      };
      var editRequest = settings.http.put('Types/' + typeObj.id, form, settings.auth.adminB.accessToken);
      editRequest.should.have.status(200);
    });
    it('ALLOW updateAttributes to Admin C', function() {
      var form = {
        name: 'Edited Admin C ' + settings.getRandomString()
      };
      var editRequest = settings.http.put('Types/' + typeObj.id, form, settings.auth.adminC.accessToken);
      editRequest.should.have.status(200);
    });
    it('DENY updateAttributes to Foo', function() {
      var form = {
        name: 'Edited Foo ' + settings.getRandomString()
      };
      var editRequest = settings.http.put('Types/' + typeObj.id, form, settings.auth.foo.accessToken);
      editRequest.should.have.status(401);
    });
    it('DENY updateAttributes to Bar', function() {
      var form = {
        name: 'Edited Bar ' + settings.getRandomString()
      };
      var editRequest = settings.http.put('Types/' + typeObj.id, form, settings.auth.bar.accessToken);
      editRequest.should.have.status(401);
    });
  });

  describe('Delete', function() {
    it('DENY deleteById to Foo', function() {
      var deleteRequest = settings.http.delete('Types/' + typeObj.id, settings.auth.foo.accessToken);
      deleteRequest.should.have.status(401);
    });
    it('DENY deleteById to Bar', function() {
      var deleteRequest = settings.http.delete('Types/' + typeObj.id, settings.auth.bar.accessToken);
      deleteRequest.should.have.status(401);
    });
    it('ALLOW deleteById to Admin A', function() {
      var deleteRequest = settings.http.delete('Types/' + typeObj.id, settings.auth.adminA.accessToken);
      deleteRequest.should.have.status(204);
    });
    it('ALLOW deleteById to Admin B', function() {
      var deleteRequest = settings.http.delete('Types/' + typeObj.id, settings.auth.adminB.accessToken);
      deleteRequest.should.have.status(204);
    });
    it('ALLOW deleteById to Admin A', function() {
      var deleteRequest = settings.http.delete('Types/' + typeObj.id, settings.auth.adminC.accessToken);
      deleteRequest.should.have.status(204);
    });
  });
});
