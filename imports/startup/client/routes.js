import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Load components.
import '/imports/ui/components/navigation.js';
import '/imports/ui/components/sidebar.js';
import '/imports/ui/components/footer.js';

// Load layout.
import '/imports/ui/layouts/overlord.js';

// Load pages.
import '/imports/ui/pages/';

FlowRouter.route('/', {
  name: 'Home',
  action() {
    BlazeLayout.render('overlord', { main: 'dashboard' });
  }
});
