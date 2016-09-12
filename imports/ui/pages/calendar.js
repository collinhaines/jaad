//
// Full Calendar: https://fullcalendar.io/
//

import './calendar.html';

import { Template } from 'meteor/templating';

Template.calendar.helpers({
  configuration() {
    return {
      // Capitalize visual text.
      buttonText: {
        today: 'Today',
        month: 'Month',
        week:  'Week',
        day:   'Day'
      },

      // Reorganize Header.
      header: {
        left:   'agendaDay, agendaWeek, month',
        right:  'today, prev, next',
        center: 'title'
      }
    }
  }
});

Template.calendar.onRendered(() => {
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
