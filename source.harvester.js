var names = ['sourceHarvester1', 'sourceHarvester2', 'sourceHarvester3', 'sourceHarvester4']

var sourceHarvester = {
    build: function(){
        //check to see if sourceHarvesters needs to be built
        var sourceHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'sourceHarvester');
        
        if(sourceHarvesters.length > 0){
            var sourceHarvesters = sourceHarvesters.filter(function(sourceHarvester){
                return (!_.includes(names, sourceHarvester.name)) 
            });
            
            for (var i in sourceHarvesters){
                Memory.buildQueue.push({name: sourceHarvesters[i].name, role: 'sourceHarvester'});
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
                    Memory.buildQueue.push({name: names[i], role: 'sourceHarvester'});   
                }
            }
        }
    },
    run: function(creep) {
        //run source sourceHarvesters functionality
        // if(creep.name === 'sourceHarvester1'){
        //     if(!creep.pos.isEqualTo(5,23)){
        //         creep.moveTo(5,23);
        //         creep.memory.inPosition = false;
        //     } else {
        //         creep.memory.inPosition = true;
        //     }
        // } else if(creep.name === 'sourceHarvester2'){
        //     if(!creep.pos.isEqualTo(5,24)){
        //         creep.moveTo(5,24);
        //         creep.memory.inPosition = false;
        //     } else {
        //         creep.memory.inPosition = true;
        //     }
        // } else if(creep.name === 'sourceHarvester3'){
        //     if(!creep.pos.isEqualTo(7,24)){
        //         creep.moveTo(7,24);
        //         creep.memory.inPosition = false;
        //     } else {
        //         creep.memory.inPosition = true;
        //     }
        // } else if(creep.name === 'sourceHarvester4'){
        //     if(!creep.pos.isEqualTo(14,6)){
        //         creep.moveTo(14,6);
        //         creep.memory.inPosition = false;
        //     } else {
        //         creep.memory.inPosition = true;
        //     }
        // }
        
        // if(creep.memory.inPosition){
        //     if(creep.name == 'sourceHarvester1' || creep.name == 'sourceHarvester2'  || creep.name == 'sourceHarvester3'){
        //         var source = Game.getObjectById('576a9c0d57110ab231d886a7'); 
        //         creep.harvest(sources)
        //     } else if (creep.name == 'sourceHarvester4'){
        //         var sources = Game.getObjectById('576a9c0d57110ab231d886a5');
        //         creep.harvest(sources)
        //     }
        // }
    }
};

module.exports = sourceHarvester;