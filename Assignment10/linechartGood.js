var canvasWidth = document.getElementById('goodChart').clientWidth;
var canvasHeight = document.getElementById('goodChart').clientHeight;
var margin = 200;

var svg = d3.select("#goodChart").append("svg")
    .attr("width",  canvasWidth)
    .attr("height", canvasHeight)

var width = svg.attr("width") - margin;
var height = svg.attr("height") - margin;

var line = d3.line()
    .x(function(d) { return xScale(d.horsepower)})
    .y(function(d) { return yScale(+d.mpg)})

svg.append("text")
    .attr("transform", "translate(100, 0)")
    .attr("x", 85)
    .attr("y", 50)
    .attr("font-size", "24px")
    .text("Hepatits A Cases from 2000 to 2008")

var xScale = d3.scaleLinear().range([0, width]);
var yScale = d3.scaleLinear().range([height, 0]);

var container_g = svg.append("g")
    .attr("transform",
        "translate(" + 100 + ", " + 100 + ")");

d3.csv("health3.csv").then(data => {

    //Reference: https://www.d3-graph-gallery.com/graph/line_basic.html
    
    data = data.filter(function (a) { return a.disease === "HEPATITIS A"})

    dataNest = Array.from(
        d3.group(data, d => d.loc), ([key, value]) => ({key, value})
    );

    xScale.domain(d3.extent(data, function(d) { return +d.year; }));
    yScale.domain([0, d3.max(data, function(d) {
        return +d.number;
    })]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    console.log(dataNest)


    // Display the Y-axis
    container_g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function(d) {
            return d;
        }).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x", -200)
        .attr("dy", "-5.1em")
        .attr("stroke", "black")
        .text("Number of Cases")

    //Display the X-axis
    container_g.append("g")
        .call(d3.axisBottom(xScale).tickFormat(function(d) {
            return d;
        }).ticks(10))
        .attr("transform", "translate(0," + height+")")
        .append("text")
        .attr("y", 40)
        .attr("x", width-275)
        .attr("stroke", "black")
        .text("Year")

    container_g.append("path")
        .datum(dataNest[0].value)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return xScale(d.year) })
            .y(function(d) { return yScale(d.number) })
    )

    container_g.append("path")
        .datum(dataNest[1].value)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return xScale(d.year) })
            .y(function(d) { return yScale(d.number) })
    )

    container_g.append("path")
        .datum(dataNest[2].value)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return xScale(d.year) })
            .y(function(d) { return yScale(d.number) })
    )

    var ordinal = d3.scaleOrdinal()
    .domain(["California", "Florida","New York"])
    .range([ "red", "steelblue", "green"]);

    svg.append("g")
    .attr("class", "legendOrdinal")
    .attr("transform", "translate("+width+", 110)");

    var legendOrdinal = d3.legendColor()
    //d3 symbol creates a path-string, for example
    //"M0,-8.059274488676564L9.306048591020996,
    //8.059274488676564 -9.306048591020996,8.059274488676564Z"
    .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
    .shapePadding(10)
    //use cellFilter to hide the "e" cell
    .cellFilter(function(d){ return d.label !== "e" })
    .scale(ordinal);

    svg.select(".legendOrdinal")
    .call(legendOrdinal);
})

