var couchapp = require('couchapp'), 
    path = require('path');

ddoc = 
  { _id:'_design/app',
   views:{},
   rewrites : 
    [ {from:"/", to:'index.html'}, 
      {from:"/api", to:'../../'}, 
      {from:"/api/*", to:'../../*'}, 
      {from:"/*", to:'*'}
    ]
  };

module.exports = ddoc;

ddoc.views.byType = {
  map: function(doc) {
    emit(doc.type, null);
  },
  reduce: '_count'
};

ddoc.views.peopleByName = {
  map: function(doc) {
    if(doc.type == 'person') {
      emit(doc.name, null);
    }
  }
};

ddoc.views.statements = {
  map: function(doc) {
    if(doc.actor && doc.verb && doc.object) {
      emit(doc._id, doc);
    }
  }
};

ddoc.validate_doc_update = function (newDoc, oldDoc, userCtx) {   
  if (newDoc._deleted === true && userCtx.roles.indexOf('_admin') === -1) {
    throw "Only admin can delete documents on this database.";
  }
  
  if (newDoc.type == 'statement' && !newDoc.actor) {
    throw "Statements require an actor!"
  }
};

couchapp.loadAttachments(ddoc, path.join(__dirname, 'attachments', 'dist'));

