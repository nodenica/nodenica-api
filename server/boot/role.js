module.exports = function roleInit(server) {
  var Role = server.models.Role;
  var RoleMapping = server.models.RoleMapping;

  //insert row on model RoleMapping
  function addRoleMappingAdmin(role, userId) {
    RoleMapping.findOne({
      where: {
        'principalid': userId
      }
    }, function(err, res) {
      if (res === null) {
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: userId // user ID
        }, function(err, principal) {});
      }
    });
  }

  Role.findOne({
    where: {
      'name': 'admin'
    }
  }, function(err, res) {
    if (res === null) {
      //create the admin role
      Role.create({
        name: 'admin'
      }, function(err, role) {
        //make bob an admin
        addRoleMappingAdmin(role, 1);
        addRoleMappingAdmin(role, 2);
        addRoleMappingAdmin(role, 3);
      });
    }
    else {
      addRoleMappingAdmin(res, 1);
      addRoleMappingAdmin(res, 2);
      addRoleMappingAdmin(res, 3);
    }
  });
};
