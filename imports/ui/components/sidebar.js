import './sidebar.html';

import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

Template.sidebar.onRendered(() => {
  // When rendered add the active class.
  $('#sidebar li:not(.nav-category) > a[href="' + FlowRouter.current().route.path + '"]')
    .parent()
    .addClass('active');
});

Template.sidebar.events({
  'click li:not(.nav-category) > a'(event) {
    // Remove old active.
    $('#sidebar li.active').removeClass('active');

    // Add new active.
    $(event.target)
      .parent()
      .addClass('active');
  }
});
