module.exports = function(Type) {
  Type.beforeRemote('create', function(ctx, type, next) {
    Type.findOne({where: {name: ctx.req.body.name}}, function(err, result) {
      if (err) {
        next(new Error(err));
      }
      else if (result !== null) {
        var err = new Error('Ya se ha definido este tipo.');
        err.statusCode = 409;
        next(err);
      }
      else {
        next();
      }
    });
  });

};
