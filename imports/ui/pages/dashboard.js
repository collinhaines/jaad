import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { Messages } from '/imports/api/messages.js';

import './dashboard.html';

Template.dashboard.onCreated(function dashboardCreated() {
  this.subscribe('messages');
});

Template.dashboard.helpers({
  randNumber() {
    let math = (Math.floor(Math.random() * (5000 - 10)) + 10).toString();

    if (math.length === 4) {
      return math.charAt(0) + ',' + math.slice(1);
    } else if (math.length === 5) {
      return math.substring(0, 1) + ',' + math.slice(2);
    } else {
      return math;
    }
  },

  message() {
    return Messages.find({});
  },

  renderTime(timestamp) {
    return new Date(timestamp).toLocaleDateString();
  },

  calendarOptions() {
    return {
      defaultView: 'agendaDay',

      // Capitalize visual text.
      buttonText: {
        today:  'Today',
        week:   'Week',
        day:    'Day'
      },

      // Reorganize Header.
      header: {
        left:    'agendaDay, agendaWeek',
        center:  'title',
        right:   'today, prev, next'
      }
    }
  }
});

Template.dashboard.onRendered(function dashboardRendered() {
  // Override FullCalendar's default look to match the flat look of the dashboard.
  $('.fc-toolbar button').each(function () {
    $(this)
      .removeClass('fc-state-default fc-button fc-corner-left fc-corner-right')
      .addClass('btn btn-primary');

    if ($(this).hasClass('fc-prev-button')) {
      $(this).html('<i class="fa fa-angle-left"></i>');
    } else if ($(this).hasClass('fc-next-button')) {
      $(this).html('<i class="fa fa-angle-right"></i>');
    }
  });
});

