module.exports = function(Comment) {
  Comment.getApp(function(err, app) {
    // set Article model
    var Article = app.dataSources.db.models.Article;

    // crate
    Comment.beforeRemote('create', function(ctx, comment, next) {
      ctx.req.body['created_at'] = new Date();
      ctx.req.body['updated_at'] = new Date();
      ctx.req.body['user_id'] = ctx.req.accessToken.userId;

      Article.findOne({where: {id: ctx.req.body['article_id']}}, function(err, article) {
        if (err) {
          next(new Error(err));
        }
        else if (article === null) {
          var err = new Error('No existe el artículo que ha definido.');
          err.statusCode = 409;
          next(err);
        }
        else {
          next();
        }
      });

    });
  });

};
