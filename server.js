
const cluster = require("cluster");
const os = require("node:os")

const numCPUs = os.cpus.length;
console.log(numCPUs);