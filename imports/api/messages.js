import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Meteor.publish('messages', function messagePublication() {
    return Messages.find();
  });
}

Messages.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
