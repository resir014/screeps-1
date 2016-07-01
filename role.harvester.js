var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == 0){
            creep.memory.droppingOff = false;
        }
        
        if(creep.carry.energy < creep.carryCapacity && creep.memory.droppingOff == false) {
            var sources = Game.getObjectById('576a9c0d57110ab231d886a7');
            
            if(creep.pos.isNearTo(sources)){
                creep.harvest(sources)
            } else {
                creep.moveTo(sources);
            }
        }
        else {
            creep.memory.droppingOff = true;
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        (
                            (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER ||
                            structure.structureType == STRUCTURE_STORAGE) && 
                            structure.energy < structure.energyCapacity
                        )
                    ) ;
                }
            });

            if(targets.length == 0){
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER) &&
                        (_.sum(structure.store) < structure.storeCapacity));
                    }
                });
            }
            
            // walks through each possible target looking for storage space
            if(targets.length > 0) {
                for(target in targets){
                    if(targets[target].structureType != STRUCTURE_CONTAINER && targets[target].energy < targets[target].energyCapacity){
                        if(creep.pos.isNearTo(targets[target])){
                            creep.transfer(targets[target], RESOURCE_ENERGY);
                            break;
                        } else {
                            creep.moveTo(targets[target]);
                            break;
                        }
                    } else if (targets[target].structureType == STRUCTURE_CONTAINER && (_.sum(targets[target].store) < targets[target].storeCapacity)){
                        if(creep.pos.isNearTo(targets[target])){
                            creep.transfer(targets[target], RESOURCE_ENERGY);
                            break;
                        } else {
                            creep.moveTo(targets[target]);
                            break;
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester;