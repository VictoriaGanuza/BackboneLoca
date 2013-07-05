define([
'jquery',
'underscore',
'backbone',
'localStorage',
'views/users/create',
'views/users/delete',
'views/users/edit',
'views/users/list',
'collections/users',
'models/users'
], function($, _, Backbone, LocalStorage, UserCreateView, UsersDeleteView, UserEditView, UserListView){
//], function($, _, Backbone, LocalStorage, UserCreateView, UsersDeleteView, UserEditView, UserListView){
//console.log(typeof($) + ', ' + typeof(_) + ', ' + typeof(Backbone) + ' => ' + typeof(UserListView));

  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'users/create': 'createUser',
      'users/delet/:id': 'deleteUser',
      'users/edit/:id': 'editUser',

      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){
    try{
    var app_router = new AppRouter;
      // As above, call render on our loaded module
      // 'views/users/list'

      app_router.on('route:createUser', function(){
        // Call render on the module we loaded in via the dependency array
        // 'views/projects/list'
        var userCreateView = new UserCreateView();
        userCreateView.render();
      });

      app_router.on('route:editUser', function(id){
        var userEditView = new UserEditView();
        userEditView.render(id);
      });

      app_router.on('route:deleteUser', function(id){
        var usersDeleteView = new UsersDeleteView();
        usersDeleteView.render(id);
      });

      app_router.on('route:defaultAction', function(actions){
        // We have no matching route, lets just log what the URL was
        var userListView = new UserListView();
        userListView.render();
      });
      Backbone.history.start();

  }catch(e){alert(e);}
  };

  return {
    initialize: initialize
  };

});