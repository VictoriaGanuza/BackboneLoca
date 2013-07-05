define([
  'jquery',
  'underscore',
  'backbone',
  'models/users',
  'collections/users',
  'text!../../../templates/users/edit.html'
], function($, _, Backbone, User, UsersCollection, usersEditTemplate){
  var hideMsg = function($messageEl, classToRemove) {
    $messageEl.addClass('notShow');
    if(classToRemove)
      $messageEl.removeClass(classToRemove);
  };
  var showMsg = function($messageEl, msg, classToAdd) {
    $messageEl.html(msg);
    if(classToAdd)
      $messageEl.addClass(classToAdd);
    $messageEl.toggleClass('notShow');
  };
  function countDown(time, $messageEl, classToRemove) {
    var timer = $.Deferred();
    setTimeout(function () {
      hideMsg($messageEl,classToRemove);
      timer.resolve();
    }, time);
    return timer.promise();
  }

  var UsersEditView = Backbone.View.extend({
    el: $('#content'),
    template: _.template(usersEditTemplate),
    events: {
      'click .editBtn': 'editUser'
    },

    editUser: function () {
      var id = $('.editBtn').attr('id');
      var name = $('input[name="firstName"]').val();
      var lastName = $('input[name="lastName"]').val();
      var age = $('input[name="age"]').val();
      var user = new User();
      var $messageEl = $('.updateMsg');
      /*user.on('invalid', function(model, error) {
        var msg = 'There were errors!!!<br>' + error.reduce(function(el, el2) {
          return el + ' <br>' + el2;
        });
        showMsg($messageEl, msg, 'error');
        countDown(3000, $messageEl, 'error');
      });*/
      

      var data = {
        id: id,
        name: name,
        lastName:lastName,
        age: age
      };

      var errors = user.validate(data);
      
      if (errors.length == 0) { 
                                user.edit(data);
                                showMsg($messageEl, 'User was successfully edited!');
                                var willCountDown = countDown(3000, $messageEl);
                              }
                        else { var msg = 'There were errors!!!<br>';
                               for(i=0;i<errors.length;i++){
                                   msg = msg + errors[i] + "<br>";
                                 }
                                showMsg($messageEl, msg, 'error');
                                countDown(3000, $messageEl, 'error');
                               }
                                                
    /*willCountDown.then(function() {//transition to listing page
          document.location.href = '';
    });*/
      
    /* if(user.set({id: id, name: name, lastName: lastName, age: age}, {validate:true})) {
        localStorage.setItem('users-local-storage-'+id, JSON.stringify(user));
        showMsg($messageEl, 'User was successfully edited!');
        var willCountDown = countDown(3000, $messageEl);
        willCountDown.then(function() {//transition to listing page
          document.location.href = '';
        });
      //  
      }*/
      
    },

    render: function(id) {
      var compiledTemplate;
      if(id) {
        var userData = localStorage.getItem('users-local-storage-'+id);
        compiledTemplate = this.template(JSON.parse(userData));
        this.$el.html(compiledTemplate);
      }
    }
  });
  return UsersEditView;
});