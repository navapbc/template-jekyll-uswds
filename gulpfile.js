const uswds = require("@uswds/compile");

/** USWDS version **/
uswds.settings.version = 3;

// define paths `jekyll-sass-converter` will not see
uswds.paths.src.projectSass	= "./_uswds_sass"
uswds.paths.dist.theme = "./_uswds_sass"

/** Exports **/
// exports.init = uswds.init; // Use init only once
exports.compile = uswds.compile;
exports.watch = uswds.watch;
exports.updateUswds = uswds.updateUswds;
exports.default = uswds.watch;
