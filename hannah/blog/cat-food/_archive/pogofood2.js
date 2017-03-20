var drychart = dc.lineChart('#dryfood');
var wetchart = dc.lineChart('#wetfood');


var parseTime = d3.timeParse("%m/%d/%y");
var formatTime = d3.timeFormat("%b %d");
d3.csv("d3pogodata.csv", function(error, data) {
	if (error) throw error;
  
  data.forEach(function(d) {
    d.date = parseTime(d.date);
    d.dry = +d.dry;
    d.wet = +d.wet;
  });
  var food = crossfilter(data);
  var all = food.groupAll();

d3.csv('d3pogodata.csv', function (data) {
	var dateFormat = d3.time.format('%m/%d/%Y');
    //var numberFormat = d3.format('.2f');

    data.forEach(function (d) {
        d.dd = dateFormat.parse(d.date);
        d.month = d3.time.month(d.dd); // pre-calculate month for better performance
        d.dry = +d.dry; // coerce to number
        d.wet = +d.wet;
    });


var parseTime = d3.timeParse("%m/%d/%y");
var formatTime = d3.timeFormat("%b %d");
d3.csv("./d3pogodata.csv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.dry = +d.dry;
        d.wet = +d.wet;
    });

/*
var data = d3.csv.parse('d3pogodata.csv');
data.forEach(function (x) {
    x.date = parseTime(x.date);
    x.dry = +x.dry;
    x.wet = +x.wet;
});


var food = crossfilter(data),
   	dry = food.dimension(function (d) {
        return [+d.date, +d.dry];
    }),
    wet = food.dimension(function (d) {
        return [+d.date, +d.wet];
    }),
    group1 = dry.group(),
    group2 = wet.group();

chart1.width(300)
    .height(300)
    .x(d3.scale.linear().domain([0, 20]))
    .yAxisLabel("y")
    .xAxisLabel("x")
    .clipPadding(10)
    .dimension(dry)
    .excludedOpacity(0.5)
    .group(group1);
chart2.width(300)
    .height(300)
    .x(d3.scale.linear().domain([0, 20]))
    .yAxisLabel("z")
    .xAxisLabel("y")
    .clipPadding(10)
    .dimension(wet)
    .excludedColor('#ddd')
    .group(group2);
dc.renderAll();
*/

