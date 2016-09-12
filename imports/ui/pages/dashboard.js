import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { Messages } from '/imports/api/messages.js';
import { Tasks } from '/imports/api/tasks.js';

import '/imports/ui/components/tasks.js';
import './dashboard.html';

Template.dashboard.helpers({
  //
  // Database
  //
  message() {
    return Messages.find();
  },

  importantTasks() {
    return Tasks.find({
      isImportant: true,
      isCompleted: false
    });
  },

  otherTasks(type) {
    let   items  = [];
    const date   = new Date('2016-09-10T00:00:00.000Z');
    const tasks  = Tasks.find({
      isCompleted: false,
      isImportant: false
    }).fetch();

    for (let i = 0; i < tasks.length; i++) {
      const temp = new Date(tasks[i].date);

      if (temp.getDate() === date.getDate() && type === 'today') {
        items.push(tasks[i]);
      } else if (temp.getDate() - 1 === date.getDate() && type === 'tomorrow') {
        items.push(tasks[i]);
      }
    }

    return items;
  },

  //
  // Functions
  //
  randomNumber() {
    let math = (Math.floor(Math.random() * (5000 - 10)) + 10).toString();

    if (math.length === 4) {
      return math.charAt(0) + ',' + math.slice(1);
    } else if (math.length === 5) {
      return math.substring(0, 1) + ',' + math.slice(2);
    } else {
      return math;
    }
  },

  renderTime(timestamp) {
    return new Date(timestamp).toLocaleDateString();
  },

  //
  // Other
  //
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

Template.dashboard.onRendered(() => {
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

  // Render Pie Chart
  new Chartist.Pie('#browser-analytics', {
    labels: ['Chrome', 'Safari', 'Firefox'],
    series: [40, 20, 25]
  });
});
