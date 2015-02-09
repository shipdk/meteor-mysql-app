// Template.frontpage.helpers({
//   projects: function () {
//     return projects.reactive();
//   },
//   isChecked: function (open) {
//     console.log(open);
//     return (open == 1) ? "checked" : "";
//   }


// });

// Template.frontpage.events({
//   "change .checkbox__open": function(elem) {
//     Meteor.call("updateField", "projects", "project_open", elem.target.checked, this.id)
//     console.log(this.id +" = " + elem.target.checked)
//   }
// })

// Data is read from select statements published by server
players = new MysqlSubscription('allPlayers');
myScore = new MysqlSubscription('playerScore', 'Maxwell');

myScore.addEventListener('update', function(index, msg){
  console.log(msg.fields.score);
});

if (Meteor.isClient) {

  // Provide a client side stub
  Meteor.methods({
    'incScore': function(id, amount){
      var originalIndex;
      players.forEach(function(player, index){
        if(player.id === id){
          originalIndex = index;
          players[index].score += amount;
          players.changed();
        }
      });

      // Reverse changes if needed (due to resorting) on update
      players.addEventListener('update.incScoreStub', function(index, msg){
        if(originalIndex !== index){
          players[originalIndex].score -= amount;
        }
        players.removeEventListener('update.incScoreStub');
      });
    }
  });

  Template.leaderboard.helpers({
    players: function () {
      return players.reactive();
    },
    selectedName: function () {
      players.depend();
      var player = players.filter(function(player){
        return player.id === Session.get("selectedPlayer");
      });
      return player.length && player[0].name;
    }
  });

  Template.leaderboard.events({
    'click .inc': function () {
      Meteor.call('incScore', Session.get("selectedPlayer"), 5);
    }
  });

  Template.player.helpers({
    selected: function () {
      return Session.equals("selectedPlayer", this.id) ? "selected" : '';
    }
  });

  Template.player.events({
    'click': function () {
      Session.set("selectedPlayer", this.id);
    }
  });
}

if (Meteor.isServer) {
  var db;
  var mysqlSettings = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'structure'
  };

db = mysql.createConnection(mysqlSettings);

  Meteor.startup(function () {
    db = mysql.createConnection(mysqlSettings);
    db.connect();
    db.initUpdateTable('updates22');

    Meteor.publish('allPlayers', function(){
      db.select(this, {
        query: 'select * from players order by score desc',
        triggers: [
          { table: 'players' }
        ]
      });
    });

    Meteor.publish('playerScore', function(name){
      db.select(this, {
        query: function(esc, escId){
          return 'select `score` from `players` where `name`=' + esc(name);
        },
        triggers: [
          {
            table: 'players',
            condition: function(esc, escId){
              return '$ROW.name = ' + esc(name);
            }
          }
        ]
      });
    });
  });

  Meteor.methods({
    'incScore': function(id, amount){
      // Synchronous query method with support for escaping values by passing
      // function instead of string query
      return db.queryEx(function(esc, escId){
        return 'update players set `score`=`score` + ' + esc(amount) +
                  ' where `id`=' + esc(id);
      });
    }
  });
}