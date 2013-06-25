'use strict';

function ChangeMeCtrl($s, $http) {
  $http.get('/data/stuff').
    success(successCallback).
    error(function (data, status, headers, config) {
      alert('Got error: ' + status);
    });
} ChangeMeCtrl.$inject = ['$scope', '$http'];

function successCallback(data, status, headers, config) {
  var last_x, last_y = 235;
  var color = d3.scale.linear()
    .domain([0, .5, 1])
    .range(["red", "white", "blue"]);

  d3.select("svg").selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("width", 25)
    .attr("height", 25)
    .attr("x", function(d, i) { return i % 36 ? last_x += 25 : last_x = 750; })
    .attr("y", function(d, i) { return i % 36 ? last_y : last_y += 25; })
    .attr("fill", function(d) { return color(d); });

  d3.select("svg").selectAll("text")
    .data([[], [], [], [510,240,24], [535,290,44], [625,290,20], [1500,225,17], [1562,225,17], [1625,225,17]])
    .enter().append("text")
    .attr("x", function(d) { return d[0]; })
    .attr("y", function(d) { return d[1]; })
    .attr("font-size", function(d) { return d[2]; })
    .text(function(d, i) { return i==3?"Avg. per Host":i==4?+d3.mean(data).toFixed(2):i==5?" TB":i==6?"0":i==7?".5":"1 TB"; })
    .attr("fill", "white");

  var lg = d3.select("svg").append("defs").selectAll("linearGradient")
    .data([100])
    .enter().append("linearGradient")
    .attr("id", "grad1")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", function(d) { return d+'%'; })
    .attr("y2", "0%");

  lg.selectAll("stop")
    .data(["255,0,0", "255,255,255", "0,0,255"])
    .enter().append("stop")
    .attr("offset", function(d, i) { return i==0?"0%":i==1?"50%":"100%"; })
    .attr("style", function(d) { return "stop-color:rgb(" + d + ");stop-opacity:1"; });

  d3.select("svg").selectAll("polygon")
    .data(["", "1500,230 1640,230 1640,235 1500,235"])
    .enter().append("polygon")
    .attr("points", function(d) { return d; })
    .attr("fill", "url(#grad1)");
}




