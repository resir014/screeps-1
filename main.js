var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {
    PathFinder.use(true);

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

    if(harvesters.length < 3) {
        var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'harvester'+ (Math.round(Math.random() * (20 - 1) + 1)), {role: 'harvester'});
        if(newName == -6){
            console.log("Waiting on resources to build harvester ")
        } else {
            console.log("Building harvester")
        }
    } else if(upgraders.length < 3) {
        var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'upgrader'+ (Math.round(Math.random() * (20 - 1) + 1)), {role: 'upgrader'});
        if(newName == -6){
            console.log("Waiting on resources to build upgrader")
        } else {
            console.log("Building upgrader")
        }
    } else if(builders.length < 3) {
        var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'builder'+ (Math.round(Math.random() * (20 - 1) + 1)), {role: 'builder'});
        if(newName == -6){
            console.log("Waiting on resources to build builder")
        } else {
            console.log("Building builder");
        }
    } else if(repairers.length < 3) {
        var newName = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'repairer'+ (Math.round(Math.random() * (20 - 1) + 1)), {role: 'repairer'});
        if(newName == -6){
            console.log("Waiting on resources to build repairer")
        } else {
            console.log("Building repairer");
        }
    }
}