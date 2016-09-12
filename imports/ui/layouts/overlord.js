import './overlord.html';

import { Template } from 'meteor/templating';

Template.overlord.onCreated(() => {
  console.log('Overlord Created:', new Date());
});
