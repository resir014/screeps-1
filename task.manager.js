var creepManager = require('task.manager.creep');
var creepCreator = require('creep.creator');

var room;
var roomName;
var spawns;
var constructionSites;
var structures;
var sources;


    init: function(roomKeys, i){
        room = Game.rooms[roomKeys[i]];
        roomName = room.name;
        
        //Save the latest alive creeps to memory
        var creeps = room.find(FIND_MY_CREEPS)
        
        //saves the old creeps for a diff against existing creeps
        var oldCreeps = Memory.roomCreeps[roomName];
        
        //creates the latest list of creeps
        Memory.roomCreeps = {};
        Memory.roomCreeps[roomName] = []    
        for(var i in creeps){
            if(!_.includes(Memory.roomCreeps[roomName], creeps[i].id)){
                Memory.roomCreeps[roomName].push(creeps[i].id);    
            }
        }
        
        //diffs the lists and returns an array of deleted creeps
        var deadCreeps = _.difference(oldCreeps, Memory.roomCreeps[roomName])
        
    
        //Get the spawns in a given room
        spawns = room.find(FIND_MY_SPAWNS);
        var spawnKeys = _.keys(spawns);
        
        //Get the construction sites of a given room.
        constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);
       
        //Get the structures for each room
        structures = room.find(FIND_MY_STRUCTURES);
        
        // Get the sources for each room
        sources = room.find(FIND_SOURCES);
        
        //clean up jobs
        if(typeof Memory.jobs == 'undefined'){
            Memory.jobs = [];    
        }
        
        var jobs = Memory.jobs;
        
        for (var i in jobs){
            if(_.contains(deadCreeps, i.creepId)){
                _.pull(jobs, jobs[i]);
            } 
            
            if(Memory.jobs[i] == null){
                _.pull(jobs, jobs[i]);
            }
        }
        
        Memory.jobs = jobs;
    },
    
    jobManager: function(){
        var jobs = Memory.jobs;
        
        //generate construction jobs
        var currentJobs = jobs.filter(function(job){
            if(job.name === 'builder'){
                return job;
            }
        });
        
        if(currentJobs.length < (constructionSites.length / 4)){
            jobs.push({name: 'builder', creepId: 0});
        }
        
        //generate repair jobs
        currentJobs = jobs.filter(function(job){
            if(job.name === 'repairer'){
                return job;
            }
        });
        
        if(currentJobs.length < (structures.length / 8)){
            jobs.push({name: 'repairer', creepId: 0});
        }
        
        //generate upgrader jobs
        currentJobs = jobs.filter(function(job){
            if(job.name === 'upgrader'){
                return job;
            }
        });
        
        if(currentJobs.length < 3){
            jobs.push({name: 'upgrader', creepId: 0});
        }
        
        //generate miner jobs
        currentJobs = jobs.filter(function(job){
            if(job.name === 'miner'){
                return job;
            }
        });
        
        if(currentJobs.length < (sources.length*3)){
            jobs.push({name: 'miner', creepId: 0});
        }
        
        //generate courier jobs
        currentJobs = jobs.filter(function(job){
            if(job.name === 'courier'){
                return job;
            }
        });
        
        if(currentJobs.length < sources.length){
            jobs.push({name: 'courier', creepId: 0});
        }
        
        Memory.jobs = jobs;
    },
    
    creepManager: function(){
        var creeps = Memory.roomCreeps[roomName];
        var jobs = Memory.jobs;
        
        // console.log(creeps);
        
        // //get the assigned jobs so that we can see which creeps are busy
        // var assignedJobs = jobs.filter(function(job){
        //     return (job.creepId != 0);
        // })
        
        // //get the assigned creep list based on assigned jobs
        // var assignedCreeps = creeps.filter(function(creep){
        //     return (_.includes(assignedJobs, creep))
        // });
        
        // //remove assigned creeps from the available creeps list
        // var unAssignedCreeps = _.pull(creeps, assignedCreeps);
        
        // //get a list of jobs needing creeps assigned to them;
        // var unAssignedJobs = jobs.filter(function(job){
        //     return (job.creepId === 0);
        // })
        
        // //if there are not enough creeps available, create more
        // if(unAssignedJobs.length != unAssignedCreeps.length){
        //     // creepCreator.createNewCreep();
        // }
        
        // _.forEach(unAssignedJobs, function(job){
        //     var creep = unAssignedCreeps.pop();
        //     if (typeof creep != 'undefined'){
        //         console.log(creep);
        //         // unAssignedJobs.creepId = 
        //     }
        // });
        
    },
    
    run: function(roomKeys, i){
        this.init(roomKeys, i);
        this.jobManager();
        this.creepManager();
    }
}

module.exports = taskManager;

// energyStorage = structures.filter(function(structure){
//     return 
//     (
//         (structure.structureType == STRUCTURE_EXTENSION ||
//         structure.structureType == STRUCTURE_SPAWN ||
//         structure.structureType == STRUCTURE_TOWER) && 
//         structure.energy < structure.energyCapacity
//     ) ;
// });