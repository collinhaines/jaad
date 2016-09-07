import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import { Messages } from '/imports/api/messages.js';

Meteor.startup(() => {
  if (Messages.find().count() === 0) {
    _.each(JSON.parse(Assets.getText('messages.json')), function (message) {
      Messages.insert(message);
    });
  }
});
