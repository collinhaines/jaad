import './tables.html';

import { Template } from 'meteor/templating';

// Demo only.
Template.tablePanel.helpers({
  headerData() {
    return ['#', 'First Name', 'Last Name', 'Username'];
  },

  bodyData() {
    return [
      { row: ['1', 'Mark', 'Otto', '@mdo'] },
      { row: ['2', 'Jacob', 'Thornton', '@fat'] },
      { row: ['3', 'Larry', 'the Bird', '@twitter'] }
    ]
  }
});
