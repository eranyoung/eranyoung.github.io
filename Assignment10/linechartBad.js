var canvasWidth = document.getElementById('badChart').clientWidth;
var canvasHeight = document.getElementById('badChart').clientHeight;
var margin = 200;

var svg1 = d3.select("#badChart").append("svg")
    .attr("width",  canvasWidth)
    .attr("height", canvasHeight)

var width = svg1.attr("width") - margin;
var height = svg1.attr("height") - margin;

var line = d3.line()
    .x(function(d) { return xScale1(d.horsepower)})
    .y(function(d) { return yScale1(+d.mpg)})

svg1.append("text")
    .attr("transform", "translate(100, 0)")
    .attr("x", 85)
    .attr("y", 50)
    .attr("font-size", "24px")
    .text("Hepatits A Cases from 2000 to 2008")

var xScale1 = d3.scaleLinear().range([0, width]);
var yScale1 = d3.scalePow().range([height, 0]).exponent(0.1);

var container_g1 = svg1.append("g")
    .attr("transform",
        "translate(" + 100 + ", " + 100 + ")");

d3.csv("health3.csv").then(data => {

    //Reference: https://www.d3-graph-gallery.com/graph/line_basic.html
    
    data = data.filter(function (a) { return a.disease === "HEPATITIS A"})

    dataNest = Array.from(
        d3.group(data, d => d.loc), ([key, value]) => ({key, value})
    );

    xScale1.domain(d3.extent(data, function(d) { return +d.year; }))
    yScale1.domain([0, d3.max(data, function(d) {
        return +d.number;
    })]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    console.log(dataNest)


    // Display the Y-axis
    container_g1.append("g")
        .call(d3.axisLeft(yScale1).tickFormat(function(d) {
            return d;
        }).ticks(10))

    //Display the X-axis
    container_g1.append("g")
        .call(d3.axisBottom(xScale1).tickFormat(function(d) {
            return d;
        }).ticks(10))
        .attr("transform", "translate(0, " + height + ")")

    container_g1.append("path")
        .datum(dataNest[0].value)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return xScale1(d.year) })
            .y(function(d) { return yScale1(+d.number) })
    )

    container_g1.append("path")
        .datum(dataNest[1].value)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return xScale1(d.year) })
            .y(function(d) { return yScale1(+d.number) })
    )

    container_g1.append("path")
        .datum(dataNest[2].value)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return xScale1(d.year) })
            .y(function(d) { return yScale1(+d.number) })
    )
})

