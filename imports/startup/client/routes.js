import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Load components.
import '/imports/ui/components/navigation.js';
import '/imports/ui/components/sidebar.js';
import '/imports/ui/components/footer.js';

// Load layout.
import '/imports/ui/layouts/exterior.js';
import '/imports/ui/layouts/overlord.js';

// Load pages.
import '/imports/ui/pages';

FlowRouter.route('/', {
  subscriptions() {
    Meteor.subscribe('messages');
    Meteor.subscribe('tasks');
  },

  action() {
    BlazeLayout.render('overlord', { main: 'dashboard' });
  }
});

FlowRouter.route('/calendar', {
  action() {
    BlazeLayout.render('overlord', { main: 'calendar' });
  }
});

FlowRouter.route('/mailbox', {
  subscriptions() {
    this.register('messages', Meteor.subscribe('messages'));
  },

  action() {
    BlazeLayout.render('overlord', { main: 'mailbox' });
  }
});

FlowRouter.route('/forms', {
  action() {
    BlazeLayout.render('overlord', { main: 'forms' });
  }
});

FlowRouter.route('/graphs', {
  action() {
    BlazeLayout.render('overlord', { main: 'graphs' });
  }
});

FlowRouter.route('/tables', {
  action() {
    BlazeLayout.render('overlord', { main: 'tables' });
  }
});

FlowRouter.route('/other-layouts', {
  action() {
    BlazeLayout.render('overlord', { main: 'otherLayouts' });
  }
});

FlowRouter.route('/alerts', {
  action() {
    BlazeLayout.render('overlord', { main: 'alerts' });
  }
});

FlowRouter.route('/grid', {
  action() {
    BlazeLayout.render('overlord', { main: 'grid' });
  }
});

FlowRouter.route('/icons', {
  action() {
    BlazeLayout.render('overlord', { main: 'icons' });
  }
});

FlowRouter.route('/typography', {
  action() {
    BlazeLayout.render('overlord', { main: 'typography' });
  }
});

FlowRouter.route('/other-elements', {
  action() {
    BlazeLayout.render('overlord', { main: 'otherElements' });
  }
});

FlowRouter.route('/404', {
  action() {
    BlazeLayout.render('exterior', { page: '404' });
  }
});

FlowRouter.route('/500', {
  action() {
    BlazeLayout.render('exterior', { page: '500' });
  }
});

FlowRouter.route('/login', {
  action() {
    BlazeLayout.render('exterior', { page: 'login' });
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('exterior', { page: '404' });
  }
};
