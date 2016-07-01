
var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == 0) {
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER &&
                    (_.sum(structure.store) > creep.carryCapacity));
                }
            });
            
            if (targets == null){
                var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            (
                                (structure.structureType == STRUCTURE_EXTENSION && 
                                structure.energy > creep.carryCapacity) ||
                                (structure.structureType == STRUCTURE_SPAWN && 
                                structure.energy > creep.carryCapacity)
                            )
                        ) ;
                    }
                });
                
                if(creep.pos.isNearTo(targets)){
                    if(targets.energy > creep.carryCapacity){
                        targets.transferEnergy(creep)
                    }    
                } else {
                    creep.moveTo(targets);
                }    
                
            } else {
                if(creep.pos.isNearTo(targets)){
                    if(_.sum(targets.store) > creep.carryCapacity){
                        targets.transfer(creep, RESOURCE_ENERGY)
                    }    
                } else {
                    creep.moveTo(targets);
                }  
            }
        } else {
            var structToRepair = creep.room.find(FIND_STRUCTURES);
            
            structToRepair = structToRepair.filter(function(object){
                return ((object.hits < (object.hitsMax - (object.hitsMax * 0.1)) && (object.structureType !== STRUCTURE_WALL && object.structureType !== STRUCTURE_ROAD)));
            });
            
            if (structToRepair.length == 0){
                structToRepair = creep.room.find(FIND_STRUCTURES);
                
                structToRepair = structToRepair.filter(function(object){
                    return ((object.hits < (object.hitsMax - (object.hitsMax * 0.1)) && object.structureType !== STRUCTURE_WALL));
                });
            }

            if(creep.pos.isNearTo(structToRepair[0])){
                creep.repair(structToRepair[0]);
            } else {
                creep.moveTo(structToRepair[0]);
            }
        }
    }
};

module.exports = roleRepairer;