var slug = require('slug');
module.exports = function(Article) {
  Article.getApp(function(err, app) {
    // set Type model
    var Type = app.dataSources.db.models.Type;

    // crate
    Article.beforeRemote('create', function(ctx, article, next) {
      ctx.req.body.slug = slug(ctx.req.body.title).toLowerCase();
      ctx.req.body['created_at'] = new Date();
      ctx.req.body['updated_at'] = new Date();
      ctx.req.body['user_id'] = ctx.req.accessToken.userId;

      // find duplicate slug
      Article.findOne({where: {slug: ctx.req.body.slug}}, function(err, articles) {
        if (err) {
          next(new Error(err));
        }
        else if (articles !== null) {
          var err = new Error('Ya existe un artículo con este título.');
          err.statusCode = 409;
          next(err);
        }
        else {
          Type.findOne({
            where: {
              id: ctx.req.body['type_id']
            }
          }, function(err, type) {
            if (err) {
              next(new Error(err));
            }
            else if (type === null) {
              var err = new Error('No existe el tipo de artículo que ha definido.');
              err.statusCode = 409;
              next(err);
            }
            else {
              next();
            }
          });
        }
      });
    });
  });

  // update
  Article.beforeRemote('**', function(ctx, article, next) {
    ctx.req.body['updated_at'] = new Date();
    next();
  });
};
