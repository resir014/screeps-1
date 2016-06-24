var creepCreator = require('creep.creator');

var collectorManager = {
    run: function(){
        var collectors = Game.creeps.filter(function(creep){
            return creep.memory.role == 'collector';
        });
        
        if(collectors.length < 6){
            creepCreator.createBasicCreep('collector');
        }
        
        var sources = Game.spawns.Spawn1.room.find(FIND_SOURCES);
        
        for(var i = 0; i < 3; i++){
            if(typeof collector[i] != undefined){
                var collector = collectors[i];
                var source = sources[0];
                
                if(collector.pos.isNearTo(source)){
                    collector.harvest(source)
                } else {
                    collector.moveTo(source);
                }
            }
        }
        
        for(var i = 3; i < 6; i++){
            if(typeof collector[i] != undefined){
                var collector = collectors[i];
                var source = sources[1];
                
                if(collector.pos.isNearTo(source)){
                    collector.harvest(source)
                } else {
                    collector.moveTo(source);
                }
            }
        }
    }
}

module.exports = roleCollector;