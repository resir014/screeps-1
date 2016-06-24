var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(typeof creep.memory.building === 'undefined'){
            creep.memory.upgrading = false;
        }
        
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
                    }
                }  
            } 
            
            var target;
            
            if(roads.length > 0){
                for(var i = 0; i < roads.length; i++){
                    target = roads[i];
                }
            } else if(extensions.length > 0){
                for(var i = 0; i < extensions.length; i++){
                    target = extensions[i];
                }
            } else if(containers.length > 0){
                for(var i = 0; i < containers.length; i++){
                    target = containers[i];
                }
            } else if(walls.length > 0){
                for(var i = 0; i < walls.length; i++){
                    target = walls[i];
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
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.pos.isNearTo(sources)){
                creep.harvest(sources)
            } else {
                creep.moveTo(sources);
            }
        }
    }
};

module.exports = roleBuilder;