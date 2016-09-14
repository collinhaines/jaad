import './mailbox.html';

import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { Messages } from '/imports/api/messages.js';

Template.mailbox.onCreated(() => {
  Template.instance().currentMessage = new ReactiveVar(false);
});

Template.mailbox.helpers({
  messages() {
    return Messages.find();
  },

  currentMessage() {
    return Template.instance().currentMessage.get();
  },

  renderPreviewTime(timestamp) {
    return new Date(timestamp).toLocaleDateString();
  },

  renderMessageTime(timestamp) {
    return new Date(timestamp).toLocaleString();
  }
});

Template.mailbox.onRendered(() => {
  // TODO: Make these two into a single function.
  FlowRouter.subsReady('messages', () => {
    $('#message-preview-column').css({
      height: $(window).height() - $('#message-preview-column').offset().top
    });

    $('#message-overview').css({
      height: $(window).height() - $('#message-overview').offset().top
    });

    $(window).resize(() => {
      $('#message-preview-column').css({
        height: $(window).height() - $('#message-preview-column').offset().top
      });

      $('#message-overview').css({
        height: $(window).height() - $('#message-overview').offset().top
      });
    })
  });
});

Template.mailbox.events({
  'click .message-preview'(event) {
    let $this;

    // Figure out what /this/ is.
    if ($(event.target).hasClass('message-preview')) {
      $this = $(event.target);
    } else if ($(event.target).parent().hasClass('message-preview')) {
      $this = $(event.target).parent();
    } else {
      $this = $(event.target).parentsUntil('.message-preview').parent();
    }

    // If it's the same, don't do anything.
    if ($this.data('id') == $('#message-overview').data('id')) {
      return;
    }

    // Set the current message.
    Template.instance().currentMessage.set(Messages.findOne({ _id: $this.data('id') }));

    // Set the new ID for later check.
    $('#message-overview').data('id', $this.data('id'));

    // Dear Meteor, please implement a callback for ReactiveVar#set. Signed, me.
    setTimeout(function () {
      let height = parseFloat($('#message-overview').outerHeight(), 10) - 10;

      $('#message-overview > div').not('.message-content').each(function () {
        height -= parseFloat($(this).outerHeight(), 10);
      });

      height = height.toString() + 'px';

      $('#message-overview > .message-content').css({
        height: height
      });
    }, 10)
  }
});
