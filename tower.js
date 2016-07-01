var tower = {
    defend: function(roomName){
        var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    
        if(hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${roomName}`);
            var towers = Game.rooms[roomName].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach(tower => tower.attack(hostiles[0]));
        }
        
        var creeps = Game.rooms[roomName].find(FIND_MY_CREEPS);
        
        for (i in creeps){
            if(creeps[i].hits < creeps[i].hitsMax){
                var towers = Game.rooms[roomName].find(
                    FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                towers.forEach(tower => tower.heal(creeps[i]));
            }
        }
    }
}

module.exports = tower;