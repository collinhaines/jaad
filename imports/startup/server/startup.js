import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import { Messages } from '/imports/api/messages.js';
import { Tasks } from '/imports/api/tasks.js';

Meteor.startup(() => {
  if (Messages.find().count() === 0) {
    _.each(JSON.parse(Assets.getText('messages.json')), function (message) {
      Messages.insert(message);
    });
  }

  if (Tasks.find().count() === 0) {
    _.each(JSON.parse(Assets.getText('tasks.json')), function (task) {
      Tasks.insert(task);
    });
  }
});
