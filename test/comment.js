require('should-http');
var Settings = require('./settings.conf');
var settings = new Settings();

describe('Comment', function() {

  var form = {
    'title': 'Unit Test ' + settings.getRandomString(),
    'content': 'This is a Unit Test',
    'type_id': 1
  };

  var article = settings.http.post('Articles', form, settings.auth.bar.accessToken);
  var articleObj = JSON.parse(article.body);

  it('ALLOW create to Bar | Temporal Article', function() {
    article.should.have.status(200);
  });

  formComment = {
    'content': 'I am a comment',
    'article_id': articleObj.id
  };


  var comment = settings.http.post('Comments', formComment, settings.auth.bar.accessToken);
  var commentObj = JSON.parse(comment.body);

  describe('Create', function() {
    it('ALLOW create to Bar', function() {
      comment.should.have.status(200);
    });
    it('DENY create to Bar | Require content', function() {
      form = {
        'content': '',
        'article_id': articleObj.id
      };
      var createRequest = settings.http.post('Comments', form, settings.auth.bar.accessToken);
      createRequest.should.have.status(409);
    });
    it('DENY create to Bar | Require article_id', function() {
      form = {
        'content': 'I am a comment',
        'article_id': ''
      };
      var createRequest = settings.http.post('Comments', form, settings.auth.bar.accessToken);
      createRequest.should.have.status(409);
    });
    it('DENY create to Bar | Require exists article_id', function() {
      form = {
        'content': 'I am a comment',
        'article_id': 0
      };
      var createRequest = settings.http.post('Comments', form, settings.auth.bar.accessToken);
      createRequest.should.have.status(409);
    });
  })

  describe('Read', function() {
    it('ALLOW findById to Admin A', function() {
      var getRequest = settings.http.get('Comments/' + commentObj.id, settings.auth.adminA.accessToken);
      getRequest.should.have.status(200);
    });
    it('ALLOW findById to Admin B', function() {
      var getRequest = settings.http.get('Comments/' + commentObj.id, settings.auth.adminB.accessToken);
      getRequest.should.have.status(200);
    });
    it('ALLOW findById to Admin C', function() {
      var getRequest = settings.http.get('Comments/' + commentObj.id, settings.auth.adminC.accessToken);
      getRequest.should.have.status(200);
    });
    it('ALLOW findById to Foo', function() {
      var getRequest = settings.http.get('Comments/' + commentObj.id, settings.auth.foo.accessToken);
      getRequest.should.have.status(200);
    });
    it('ALLOW findById to Owner (Bar)', function() {
      var getRequest = settings.http.get('Comments/' + commentObj.id, settings.auth.bar.accessToken);
      getRequest.should.have.status(200);
    });
  });

  describe('Update', function() {
    it('ALLOW updateAttributes to Admin A', function() {
      var form = {
        content: 'Edited Admin A ' + settings.getRandomString()
      };
      var editRequest = settings.http.put('Comments/' + commentObj.id, form, settings.auth.adminA.accessToken);
      editRequest.should.have.status(200);
    });
    it('ALLOW updateAttributes to Admin B', function() {
      var form = {
        content: 'Edited Admin B ' + settings.getRandomString()
      };
      var editRequest = settings.http.put('Comments/' + commentObj.id, form, settings.auth.adminB.accessToken);
      editRequest.should.have.status(200);
    });
    it('ALLOW updateAttributes to Admin C', function() {
      var form = {
        content: 'Edited Admin C ' + settings.getRandomString()
      };
      var editRequest = settings.http.put('Comments/' + commentObj.id, form, settings.auth.adminC.accessToken);
      editRequest.should.have.status(200);
    });
    it('ALLOW updateAttributes to Owner (Bar)', function() {
      var form = {
        content: 'Edited Owner ' + settings.getRandomString()
      };
      var editRequest = settings.http.put('Comments/' + commentObj.id, form, settings.auth.bar.accessToken);
      editRequest.should.have.status(200);
    });
    it('DENY updateAttributes to Foo', function() {
      var form = {
        content: 'Edited Foo ' + settings.getRandomString()
      };
      var editRequest = settings.http.put('Comments/' + commentObj.id, form, settings.auth.foo.accessToken);
      editRequest.should.have.status(401);
    });
  });

  describe('Delete', function() {
    it('DENY deleteById to Foo', function() {
      var deleteRequest = settings.http.delete('Comments/' + commentObj.id, settings.auth.foo.accessToken);
      deleteRequest.should.have.status(401);
    });
    it('ALLOW deleteById to Owner (Bar)', function() {
      var deleteRequest = settings.http.delete('Comments/' + commentObj.id, settings.auth.bar.accessToken);
      deleteRequest.should.have.status(204);
    });
    it('ALLOW deleteById to Admin A', function() {
      var deleteRequest = settings.http.delete('Comments/' + commentObj.id, settings.auth.adminA.accessToken);
      deleteRequest.should.have.status(204);
    });
    it('ALLOW deleteById to Admin B', function() {
      var deleteRequest = settings.http.delete('Comments/' + commentObj.id, settings.auth.adminB.accessToken);
      deleteRequest.should.have.status(204);
    });
    it('ALLOW deleteById to Admin A', function() {
      var deleteRequest = settings.http.delete('Comments/' + commentObj.id, settings.auth.adminC.accessToken);
      deleteRequest.should.have.status(204);
    });
  });

  it('ALLOW deleteById to Bar | Temporal Article', function() {
    var deleteRequest = settings.http.delete('Articles/' + articleObj.id, settings.auth.bar.accessToken);
    deleteRequest.should.have.status(204);
  });
});
