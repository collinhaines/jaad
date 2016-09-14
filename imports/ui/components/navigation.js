import './navigation.html';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';

Template.navigation.onRendered(() => {
  window.onpopstate = function (event) {
    // Remove active link.
    $('.nav li.active')
      .removeClass('active')
      .find('> a')
      .blur();

    // Add active link.
    $('.nav li a[href="' + FlowRouter.current().path + '"]')
      .parent()
      .addClass('active');
  };
});
