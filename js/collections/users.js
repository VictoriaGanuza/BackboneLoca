define([
  'underscore',
  'backbone',
  'localStorage',
  // Pull in the Model module from above
  'models/users'
], function(_, Backbone, LocalStorage, UserModel){
  var UsersCollection = Backbone.Collection.extend({
    model: UserModel,
    localStorage: new LocalStorage('users-local-storage')
  });
  // You don't usually return a collection instantiated
  return new UsersCollection();
});