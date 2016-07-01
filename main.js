var creepCreator = require('creep.creator');
var creepRunner = require('creep.runner');
var tower = require('tower');
module.exports.loop = function () {
    //Ensure all memory variables exist
    // if(typeof Memory.buildQueue == 'undefined'){
    //     Memory.buildQueue = [];
    // }
    
    PathFinder.use(true);

    creepRunner.run();
    creepCreator.run();
    
    //build the creator queue
    // sourceHarvester.build();
    // sourceCollector.build();
    // creepCreatorMk2.run();
    
    
    
    //Manage tower
    var roomKeys = _.keys(Game.rooms);
    Memory.roomKeys = roomKeys;
    for(var i = 0; i < roomKeys.length; i ++){
        tower.defend(roomKeys);
    }
}
