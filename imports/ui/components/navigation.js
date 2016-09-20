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
  'click .sidebar-toggle'(event) {
    // Move the header, main, and sidebar content over.
    if ($('#sidebar').hasClass('sidebar-open')) {
      $('header, main').removeClass('sidebar-open');

      $('#sidebar')
        .addClass('fadeOutLeft')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
          $(this).removeClass('sidebar-open animated fadeOutLeft');
        });
    } else {
      $('header, main').addClass('sidebar-open');

      $('#sidebar')
        .addClass('sidebar-open animated fadeInLeft')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
          $(this).removeClass('fadeInLeft');
        });
    }
  },

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
