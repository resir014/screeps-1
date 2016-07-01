var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }
        
        if(creep.memory.building) {
            var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
        
            var roads = constructionSites.filter(function(object) {
                return object.structureType === STRUCTURE_ROAD;
            })
            
        
            if(roads.length === 0){
                var extensions = constructionSites.filter(function(object) {
                    return object.structureType === STRUCTURE_EXTENSION;
                })
                
                if (extensions.length === 0){
                    var containers = constructionSites.filter(function(object) {
                        return object.structureType === STRUCTURE_CONTAINER;
                    })
                    
                    if (containers.length === 0){
                        var walls = constructionSites.filter(function(object) {
                            return object.structureType === STRUCTURE_WALL;
                        })
                        
                        if (walls.length === 0){
                            var rampart = constructionSites.filter(function(object) {
                                return object.structureType === STRUCTURE_RAMPART;
                            })
                            
                            if (rampart.length === 0){
                                var tower = constructionSites.filter(function(object) {
                                    return object.structureType === STRUCTURE_TOWER;
                                })
                                
                                if (tower.length === 0){
                                var storage = constructionSites.filter(function(object) {
                                    return object.structureType === STRUCTURE_STORAGE;
                                })
                            }
                            }
                        }
                    }
                }  
            } 
            
            var target;
            
            if(roads.length > 0){
                for(var i = 0; i < roads.length; i++){
                    target = roads[i];
                    break;
                }
            } else if(extensions.length > 0){
                for(var i = 0; i < extensions.length; i++){
                    target = extensions[i];
                    break;
                }
            } else if(containers.length > 0){
                for(var i = 0; i < containers.length; i++){
                    target = containers[i];
                    break;
                }
            } else if(walls.length > 0){
                for(var i = 0; i < walls.length; i++){
                    target = walls[i];
                    break;
                }
            } else if(rampart.length > 0){
                for(var i = 0; i < rampart.length; i++){
                    target = rampart[i];
                    break;
                }
            } else if(tower.length > 0){
                for(var i = 0; i < tower.length; i++){
                    target = tower[i];
                    break;
                }
            } else if(storage.length > 0){
                for(var i = 0; i < storage.length; i++){
                    target = storage[i];
                    break;
                }
            } else {
                var rand = Math.round(Math.random()  * (constructionSites.length - 1) + 1);
                target = constructionSites[rand];
            }
            
            if(creep.pos.isNearTo(target)){
                creep.build(target);
            } else {
                creep.moveTo(target);
            }
        }
        else {
            var spawn = Game.spawns.Spawn1;
            if(creep.pos.isNearTo(spawn)){
                if(Memory.builderQueue == false){
                    spawn.transferEnergy(creep);
                }
            } else {
                creep.moveTo(spawn);
            }    
            
        }
    }
};

module.exports = roleBuilder;