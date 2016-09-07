import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  Meteor.publish('tasks', function messagePublication() {
    return Tasks.find();
  });
}

Tasks.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
