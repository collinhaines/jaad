import './overlord.html';

import { Template } from 'meteor/templating';

Template.overlord.onCreated(function overlordCreated() {
  console.log('Overlord Created:', new Date());
});
