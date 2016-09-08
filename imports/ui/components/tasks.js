import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './tasks.html';

Template.tasks.events({
  'click li:not([data-is-completed]) input[type="checkbox"]'(event) {
    const $item  = $(event.target).parents('li');
    let   $clone = $item.clone();

    // Fade out the old one.
    $item.fadeOut(function () {
      $(this).remove();
    });

    // Prepare for fade-in.
    $clone.css('display', 'none');

    // Add the same task, fade it in.
    $('.list-tasks-completed')
      .append($clone)
      .find('> li:last-child')
      .fadeIn();

    // Developers: This is where `Meteor.call('my-task-is-completed')` would occur.
    console.log('Production: Tell the database this task is completed. Reference ID: ' + $($clone).data('id'));
  }
});
