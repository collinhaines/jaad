import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { Messages } from '/imports/api/messages.js';

import './dashboard.html';

Template.dashboard.onCreated(function dashboardCreated() {
  this.subscribe('messages');
});

Template.dashboard.helpers({
  message() {
    return Messages.find({});
  },

  renderTime(timestamp) {
    return new Date(timestamp).toLocaleDateString();
  }
});

Template.dashboard.onRendered(function dashboardRendered() {
  $('[data-demo="rand"]').each(function () {
    let math = (Math.floor(Math.random() * (5000 - 10)) + 10).toString();

    if (4 === math.length) {
      math = math.charAt(0) + ',' + math.slice(1);
    } else if (5 === math.length) {
      math = math.substring(0, 1) + ',' + math.slice(2);
    }

    $(this).text(math);
  });
});
