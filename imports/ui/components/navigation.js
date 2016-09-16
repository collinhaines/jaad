import './navigation.html';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

Template.navigation.onRendered(() => {
  window.onpopstate = function (event) {
    // Remove active link.
    $('#sidebar li.active')
      .removeClass('active')
      .find('> a')
      .blur();

    // Add active link.
    $('#sidebar li a[href="' + FlowRouter.current().path + '"]')
      .parent()
      .addClass('active');
  };
});

Template.navigation.events({
  'click .navbar-brand'(event) {
    // Remove active link.
    $('#sidebar li.active')
      .removeClass('active')
      .find('> a')
      .blur();

    // Add active link.
    $('#sidebar li a[href="/"]')
      .parent()
      .addClass('active');

    event.target.blur();
  }
});
