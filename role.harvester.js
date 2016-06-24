var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = Game.spawns.Spawn1.pos.findClosestByPath(FIND_SOURCES);
            
            if(creep.pos.isNearTo(sources)){
                creep.harvest(sources)
            } else {
                creep.moveTo(sources);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.pos.isNearTo(targets[0])){
                    creep.transfer(targets[0], RESOURCE_ENERGY);
                } else {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleHarvester;