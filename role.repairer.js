
var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == 0) {
            var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            
            if(creep.pos.isNearTo(spawn)){
                if(spawn.energy > creep.carryCapacity){
                    spawn.transferEnergy(creep)
                }    
            } else {
                creep.moveTo(spawn);
            }
            
            creep.memory.repairing = false;
        } else {
            creep.memory.repairing = true;
        }
        
        // console.log(creep.memory.repairing);
        
        if(creep.memory.repairing) {
            var structToRepair = creep.room.find(FIND_STRUCTURES);
            
            var wallsToRepair = structToRepair.filter(function(object){
                return object.structureType === STRUCTURE_WALL;
            });
            
            if(wallsToRepair[0].hits < 15000){
                console.log("repairing wall");
                if(creep.pos.isNearTo(wallsToRepair[0])){
                    creep.repair(structToRepair[0]);
                } else {
                    creep.moveTo(structToRepair[0]);
                }
            } else {
                structToRepair = structToRepair.filter(function(object){
                    return ((object.hits < (object.hitsMax - 500) && object.structureType !== STRUCTURE_WALL));
                });
                
                if(creep.pos.isNearTo(structToRepair[0])){
                    creep.repair(structToRepair[0]);
                } else {
                    creep.moveTo(structToRepair[0]);
                }
            }
        }
    }
};

module.exports = roleRepairer;