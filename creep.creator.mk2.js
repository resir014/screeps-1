/*
 * This module creates creeps, currently only "basic" creeps.
 */
 
var creepCreator = {
    run: function(){
        var buildQueue = Memory.buildQueue;
        
        for (var i in buildQueue){
            createNewCreep(buildQueue[i].name, buildQueue[i].role);
            Memory.builderQueue = true;
        }
        
        if(buildQueue.length == 0){
            Memory.builderQueue = false;
        }
    },

    createNewCreep: function(name, role){
        var emergencyCreepTemplate =[WORK, CARRY, MOVE];
        var phase1CreepTemplate = [WORK, WORK, CARRY, CARRY, MOVE];
        var phase2CreepTemplate = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
        
        var status = Game.spawns.Spawn1.createCreep(basicCreepTemplate, name, {role:role});
        
        if(status == -6){
            console.log("Waiting on resources to build needed " + role);
        } else {
            console.log("Building new " + role);
        }
    } 
}

module.exports = creepCreator;