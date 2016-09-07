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
  }
});
