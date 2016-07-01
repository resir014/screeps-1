/*
 * This module creates creeps, currently only "basic" creeps.
 */
 
var creepCreator = {
    run: function(){
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        var wallMaintainer = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallmaintainer');
        
        if(harvesters.length < 3) {
            this.createBasicCreep('harvester');
        } else if(upgraders.length < 4) {
            this.createBasicCreep('upgrader');
        } else if(builders.length < 4) {
            this.createBasicCreep('builder');
        } else if(repairers.length < 1) {
            this.createBasicCreep('repairer');
        }  else if(wallMaintainer.length < 0) {
            this.createBasicCreep('wallmaintainer');
        }
    },
    createBasicCreep: function(role){
        var emergencyCreepTemplate =[WORK, CARRY, MOVE];
        var basicCreepTemplate = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];
        
        var status = Game.spawns.Spawn1.createCreep(emergencyCreepTemplate, role + (Math.round(Math.random() * (20 - 1) + 1)), {role: role});
        
        if(status == -6){
            console.log("Waiting on resources to build " + role)
        } else {
            console.log("Building " + role)
        }
    },
    
    createNewCreep: function(){
        var emergencyCreepTemplate =[WORK, CARRY, CARRY, MOVE];
        var basicCreepTemplate = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];
        
        var status = Game.spawns.Spawn1.createCreep(basicCreepTemplate, 'creep' + (Math.round(Math.random() * (20 - 1) + 1)), {});
        
        if(status == -6){
            console.log("Waiting on resources to build needed creep");
        } else {
            console.log("Building new creep");
        }
    } 
}

module.exports = creepCreator;