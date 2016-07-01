var names = ['sourceCollector1', 'sourceCollector2', 'sourceCollector3', 'sourceCollector4']

var sourceCollector = {
    build: function(){
        //check to see if collector needs to be built
        var sourceCollectors = _.filter(Game.creeps, (creep) => creep.memory.role == 'sourceCollector');
        var sourceCollectors = sourceCollectors.filter(function(sourceCollector){
           return (!_.includes(names, sourceCollector.name)) 
        });
        
        if(sourceCollectors.length > 0){
            var sourceCollectors = sourceCollectors.filter(function(sourceHarvester){
                return (!_.includes(names, sourceHarvester.name)) 
            });
            
            for (var i in sourceCollectors){
                Memory.buildQueue.push({name: sourceCollectors[i].name, role: 'sourceCollector'});
            }    
        } else {
            for (var i in names){
                var buildQueue = Memory.buildQueue;
                
                var found = false;
                for (var j in buildQueue){
                    if(buildQueue[j].name == names[i]){
                        found = true;
                        break;
                    }
                }
                
                if(found == false){
                    Memory.buildQueue.push({name: names[i], role: 'sourceCollector'});   
                }
            }
        }
    },
    run: function(creep){
        //run source collector functionality
        // if(creep.carry.energy == 0){
        //     creep.memory.droppingOff = false;
        // }
        
        // if((_.sum(creep.carry) < creep.carryCapacity) && creep.memory.droppingOff == false){
        //     var sourceHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'sourceHarvester');
        //     var sourceHarvester;
        //     if(creep.name = 'sourceCollector1'){
        //         sourceHarvester = sourceHarvesters.filter(function(sourceHarvester){
        //             return sourceHarvester.name == 'sourceHarvester1'
        //         });
        //     } else if(creep.name = 'sourceCollector2'){
        //         sourceHarvester = sourceHarvesters.filter(function(sourceHarvester){
        //             return sourceHarvester.name == 'sourceHarvester2'
        //         });
        //     } else if(creep.name = 'sourceCollector3'){
        //         sourceHarvester = sourceHarvesters.filter(function(sourceHarvester){
        //             return sourceHarvester.name == 'sourceHarvester3'
        //         });
        //     } else if(creep.name = 'sourceCollector4'){
        //         sourceHarvester = sourceHarvesters.filter(function(sourceHarvester){
        //             return sourceHarvester.name == 'sourceHarvester4'
        //         });
        //     }  
            
        //     if(!creep.pos.isNearTo(sourceHarvester)){
        //         creep.moveTo(sourceHarvester)
        //     } else {
        //         sourceHarvester.transfer(creep, RESOURCE_ENERGY)
        //     }
        // } else {
        //     creep.memory.droppingOff = true;
            
        //     var targets = creep.room.find(FIND_STRUCTURES, {
        //         filter: (structure) => {
        //             return (
        //                 (
        //                     (structure.structureType == STRUCTURE_EXTENSION ||
        //                     structure.structureType == STRUCTURE_SPAWN ||
        //                     structure.structureType == STRUCTURE_TOWER ||
        //                     structure.structureType == STRUCTURE_STORAGE) && 
        //                     structure.energy < structure.energyCapacity
        //                 )
        //             ) ;
        //         }
        //     });

        //     if(targets.length == 0){
        //         var targets = creep.room.find(FIND_STRUCTURES, {
        //             filter: (structure) => {
        //                 return ((structure.structureType == STRUCTURE_CONTAINER) &&
        //                 (_.sum(structure.store) < structure.storeCapacity));
        //             }
        //         });
        //     }
            
        //     // walks through each possible target looking for storage space
        //     if(targets.length > 0) {
        //         for(target in targets){
        //             if(targets[target].structureType != STRUCTURE_CONTAINER && targets[target].energy < targets[target].energyCapacity){
        //                 if(creep.pos.isNearTo(targets[target])){
        //                     creep.transfer(targets[target], RESOURCE_ENERGY);
        //                     break;
        //                 } else {
        //                     creep.moveTo(targets[target]);
        //                     break;
        //                 }
        //             } else if (targets[target].structureType == STRUCTURE_CONTAINER && (_.sum(targets[target].store) < targets[target].storeCapacity)){
        //                 if(creep.pos.isNearTo(targets[target])){
        //                     creep.transfer(targets[target], RESOURCE_ENERGY);
        //                     break;
        //                 } else {
        //                     creep.moveTo(targets[target]);
        //                     break;
        //                 }
        //             }
        //         }
        //     }
        // }
    }
}

module.exports = sourceCollector;