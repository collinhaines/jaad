import './other-layouts.html';

import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import '/imports/library/modal.js';
import '/imports/library/tooltip.js';
import '/imports/library/popover.js';

Template.otherLayouts.onRendered(() => {
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();
});
