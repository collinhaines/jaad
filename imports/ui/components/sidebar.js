import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './sidebar.html';

Template.sidebar.onRendered(function sidebarRendered() {
  // When rendered add the active class.
  $('li:not(.nav-category) > a[href="' + FlowRouter.current().route.path + '"]')
    .parent()
    .addClass('active');
});

Template.sidebar.events({
  'click li:not(.nav-category) > a'(event) {
    // Remove old active.
    $('li.active').removeClass('active');

    // Add new active.
    $(event.target)
      .parent()
      .addClass('active');
  }
});
