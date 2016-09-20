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
  FlowRouter.subsReady('messages', () => {
    renderMailboxArea();

    $(window).resize(() => {
      renderMailboxArea();
    });
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

    if ($(window).width() <= 768) {
      $('#message-overview')
        .css('display', 'block')
        .parent()
        .css({
          position: 'absolute',
          top:      '20px'
        })
        .addClass('animated slideInUp')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
          $(this).removeClass('slideInUp');
        });
    }

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
  },

  'click #message-overview .close'(event) {
    if ($(window).width() <= 768) {
      $('#message-overview')
        .parent()
        .addClass('fadeOutDown')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
          $(this)
            .removeClass('animated fadeOutDown')
            .removeProp('style')

          $('#message-overview')
            .removeProp('data-id')
            .css('display', '');

          Template.instance().currentMessage.set(false);
        });
    } else {
      $('#message-overview').removeProp('data-id');

      Template.instance().currentMessage.set(false);
    }
  }
});

Template.mailbox.onDestroyed(() => {
  $(window).off('resize');
});

function renderMailboxArea() {
  $('#message-preview-column').css({
    height: $(window).height() - $('#message-preview-column').offset().top
  });

  if ($(window).width() > 768) {
    $('#message-overview').css({
      height: $(window).height() - $('#message-overview').offset().top
    });
  } else {
    $('#message-overview').css({
      height: parseInt($('#message-preview-column').css('height'), 10) - 20
    });
  }
}
