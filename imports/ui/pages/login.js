import './login.html';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

Template.login.events({
  'focus .form-control, blur .form-control'(event) {
    $(event.target)
      .parents('.form-group')
      .toggleClass('focused');
  },

  'keyup .form-control'(event) {
    $(event.target)
      .parent()
      .parent()
      .addClass('has-text')

    if (event.target.value.trim() === '') {
      $(event.target)
        .parent()
        .removeClass('has-text');
    }
  },

  'submit #form-login'(event) {
    FlowRouter.go('/');

    event.preventDefault();
  },

  'click #form-login #clear'() {
    // Clear all values.
    $('#form-login input').val('');

    // Reset the labels.
    $('.form-group.has-text').removeClass('has-text');
  }
});
