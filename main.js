var creepCreator = require('creep.creator');
var creepRunner = require('creep.runner');

module.exports.loop = function () {
    PathFinder.use(true);

    creepRunner.run();
    creepCreator.run();
}