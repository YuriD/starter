var execFile = require('child_process').execFile;
var fs = require('fs');
var async = require('async');

/******************************************************************************/
//  CONFIGURATION 
//   The root of sample data
var collectDataRoot = __dirname + "/sampledata", fn = [];
if(!fs.existsSync(collectDataRoot)) fs.mkdirSync(collectDataRoot);
for (var i = 1; i < 289; i++) {
  fn.push(collectDataRoot + '/host_' + (i.toString().length<3?(i.toString().length<2?'00'+i:'0'+i):i));
  fs.writeFileSync(fn[i-1], +Math.random().toFixed(3));
}
/******************************************************************************/

var getData = exports.getData = function (req, res, next) {
  async.map(fn, fs.readFile, function (err, results) {
    if(err) {
      console.log("Got error: " + err);
      next(err);
    }
//  console.log(JSON.stringify(formatOutput(results)));
    res.json(formatOutput(results));
  });
}

/*
var getStuff = exports.getStuff = function (req, res, next) {
    var cmd = "ls";
    var args = ["-l"];
    var child = execFile(cmd, args, function (err, stdout, stderr) {
        if (err) {
            console.log("Error:  ", err);
            console.log("stderr: ", stderr);
            next(err);
        }
        res.json(formatOutput(stdout));
    });
}
*/

var formatOutput = function (data) {
  for (var i = 0; i < data.length; i++) {
    data[i] = +data[i].toString();
  }
  return data;
};

//getData();

// Quick & dirty testing
// Comment in and out
/*
var resmock = { json: function (data) {
   console.log(JSON.stringify(data, null, 2));
}};
var nextmock = function(err) { console.log(err); }
var reqmock = { params: { id:"123"}, query:{p1: 1, p2: "param-1"} };
getStuff(reqmock,resmock, nextmock);
*/


