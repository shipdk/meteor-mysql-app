
Meteor.methods({
  updateField: function (table, field, value, rowId) {

    // var result = db.query('UPDATE projects SET ?', post, function(err, result) {
    var result = db.query('UPDATE '+ table +' SET '+ field +'='+ value +' WHERE id = '+ rowId, {}, function(err, result) {
      console.log(err);
      console.log(result);
    });
  }
});