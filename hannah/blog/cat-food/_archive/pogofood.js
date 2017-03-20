'use strict';

// Clear cache perhaps?
d3.selectAll("svg > *").remove();

// Set the dimensions of the canvas / graph
var	margin = {top: 20, right: 10, bottom: 40, left: 50},
	width = 500 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;

// Parse the date / time
var parseTime = d3.timeParse("%m/%d/%y");
var formatTime = d3.timeFormat("%b %d");

// Define the divs for the tooltip
var drydiv = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);
var wetdiv = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

// get page position of dry and wet svgs to determine position of tooltip
function getpositions() {
    var top  = window.pageYOffset || document.documentElement.scrollTop,
        left = window.pageXOffset || document.documentElement.scrollLeft,
        drydims = document.getElementById("dryfood").getBoundingClientRect(),
        wetdims = document.getElementById("wetfood").getBoundingClientRect();
    var drytop = drydims.top + top,
        dryleft = drydims.left + left,
        wettop = wetdims.top + top,
        wetleft = wetdims.left + left;
    return {
        drytop: drytop,
        dryleft: dryleft,
        wettop: wettop,
        wetleft: wetleft
    };
};


// DRY
// Adds the first svg canvas
var chart1 = d3.select("#dryfood")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
// Get the data
d3.csv("./d3pogodata2.csv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.dry = +d.dry;
    });

	var x = d3.scaleTime().rangeRound([0, width]);
	var y = d3.scaleLinear().rangeRound([height, 0]);
	var valueline = d3.line()
    	.x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.dry); });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.dry; })]);

	// Define the axes
	var	xAxis = d3.axisBottom()
		.scale(x)
		.ticks(7);

	var	yAxis = d3.axisLeft()
		.scale(y)
		.ticks(5);

	// Add y axis title		
	chart1.append("text")
		.attr("transform", "rotate(-90)")
		.attr("fill", "#000")
		.attr("y", 0 - margin.left + 3)
		.attr("x",0 - (height / 2))
		.attr("dy", ".7em")
		.style("text-anchor", "middle")
		.text("Daily dry food (Tbsp)");

    // Add the valueline path.
    chart1.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));
        
    // Add the scatterplot
    chart1.selectAll("dot")    
        .data(data)         
    .enter().append("circle")                               
        .attr("r", 3.5)       
        .attr("cx", function(d) { return x(d.date); })       
        .attr("cy", function(d) { return y(d.dry); })
        .on("mouseover", function(d) { 
            drydiv.transition()        
                .duration(200)      
                .style("opacity", .9);      
            drydiv.html(formatTime(d.date) + "<br/>"  + d.dry + " Tbsp")
                .style("left", (parseInt(d3.select(this).attr("cx")) + getpositions().dryleft + 21) + "px")
                .style("top", (parseInt(d3.select(this).attr("cy")) + getpositions().drytop - 4) + "px");
                /*.style("left", (d3.event.pageX - 30) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");*/
        })  
        .on("mouseout", function(d) {    
            drydiv.transition()        
                .duration(500)      
                .style("opacity", 0);   
        })
        .on("click", function(d) {
            var thisdate = d.date;
            d3.selectAll("circle").attr("fill","black")
            //chart2.selectAll('circle[d.date=="'+thisdate+'"]').attr("fill","red")
            d3.select(this).attr("fill","red");
        });

    // Add the X Axis
    chart1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
    .selectAll("text")
        .attr("y", 0)
        .attr("x", -40)
        .attr("dy", ".35em")
        .attr("transform", "rotate(-60)")
        .style("text-anchor", "start");

    // Add the Y Axis
    chart1.append("g")
        .attr("class", "y axis")
        .call(yAxis);

});

// WET
// Adds the second svg canvas
var chart2 = d3.select("#wetfood")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
// Get the data
d3.csv("./d3pogodata2.csv", function(error, data) {
    data.forEach(function(d) {
        //d.date = parseDate(d.date);
        d.date = parseTime(d.date);
        d.wet = +d.wet;
    });
    //console.log(d3.max(data, function(d) { return d.date}));

	var x = d3.scaleTime().rangeRound([0, width]);
	var y = d3.scaleLinear()
    .rangeRound([height, 0]);
	var valueline = d3.line()
    	.x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.wet); });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.wet; })]);

    // Define the axes
	var	xAxis = d3.axisBottom()
		.scale(x)
		.ticks(7);

	var	yAxis = d3.axisLeft()
		.scale(y)
		.ticks(5);

	// Add y axis title		
	chart2.append("text")
		.attr("transform", "rotate(-90)")
		.attr("fill", "#000")
		.attr("y", 0 - margin.left + 3)
		.attr("x",0 - (height / 2))
		.attr("dy", ".7em")
		.style("text-anchor", "middle")
		.text("Daily wet food (Oz)");

    // Add the valueline path.
    chart2.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the scatterplot
    chart2.selectAll("dot")    
        .data(data)         
    .enter().append("circle")                               
        .attr("r", 3.5)       
        .attr("cx", function(d) { return x(d.date); })       
        .attr("cy", function(d) { return y(d.wet); })
        .on("mouseover", function(d) { 
            wetdiv.transition()        
                .duration(200)      
                .style("opacity", .9);      
            wetdiv.html(formatTime(d.date) + "<br/>"  + d.wet + " Oz")  
                .style("left", (parseInt(d3.select(this).attr("cx")) + getpositions().wetleft + 18) + "px")
                .style("top", (parseInt(d3.select(this).attr("cy")) + getpositions().wettop - 4) + "px");
                //.style("left", (d3.event.pageX - 30) + "px")     
                //.style("top", (d3.event.pageY - 28) + "px");    
            })                  
        .on("mouseout", function(d) { 
            //d3.select(this).style("cursor", "default")    
            wetdiv.transition()        
                .duration(500)      
                .style("opacity", 0);   
        });    

    // Add the X Axis
    chart2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
    .selectAll("text")
        .attr("y", 0)
        .attr("x", -40)
        .attr("dy", ".35em")
        .attr("transform", "rotate(-60)")
        .style("text-anchor", "start");

    // Add the Y Axis
    chart2.append("g")
        .attr("class", "y axis")
        .call(yAxis);

});

