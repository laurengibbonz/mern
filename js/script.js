var myData = [ 5, 16, 55, 86, 164, 347, 373, 759, 1000, 860, 2100];

//LG check if chart in view
function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}

window.addEventListener('scroll', function (event) {
	if(isScrolledIntoView(chart)) {
		chart.classList.add('active');
	}
}, false);

var margin = {top: 20, right: 20, bottom: 30, left: 40}
var width = 600 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var animateDuration = 700;
var animateDelay = 30;
var tooltip = d3.select("body").append("div")
	.style("position", "absolute")
	.style("background", "#ffd5c7", "#f9b9db")
	.style("color", "#454545")
	.style("font-family", "Arial, sans-serif")
	.style("padding", "2px 10px")
	.style("opacity", "0")

var yScale = d3.scaleLinear()
	.domain([0, d3.max(myData)])
	.range([height, 0]);

var xScale = d3.scaleBand()
	.domain(d3.range(0, myData.length))
	.range([0, width])
	.padding(.1);

var colors = d3.scaleLinear()
	.domain([0, myData.length])
	.range(["#000000", "#6d2428", "#304833", "#fdf4f3", "#77cdec", "#f1f6ad", "#111111", "#89cfc3", "#f4f7fd", "#161824", "#f3aac7"])

var tip = d3.tip()
	.attr('class', 'tooltip')
	.offset([0, 2])
	.html(function(d) {
		return "<strong>" + d + "</strong>";
});

tip.direction('e');

var yAxis = d3.axisRight(yScale)
		.ticks(4);

var xAxis = d3.axisBottom(xScale);

var myChart = d3.select("#chart").append("svg")
	.attr("width", width)
	.attr("height", height)
	.selectAll("rect")
	// .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	.data(myData)
	.enter().append("rect")
	.style("fill", (d, i) => colors(i))
	.attr("width", xScale.bandwidth())
	.attr("height", height)
	.attr("x", (d, i) => xScale(i))
	.attr("y", 0)

	.on('mouseover', function(d) {
        tip.attr('class', 'tooltip animate').show(d)
      })
    .on('mouseout', function(d) {
        tip.attr('class', 'tooltip').show(d)
        tip.hide()
	})
	
myChart.transition()
	.attr("height", function (d) {
		return height - yScale(d);
	})
	.attr("y", function (d) {
		return yScale(d);
	})
	.duration(animateDuration)
	.delay(function (d, i) {
		return i * animateDelay;
	})
	.ease(d3.easeElastic);

myChart.call(tip);

var svg = d3.select("svg");

svg.append("g")
		.attr("class", "axis y")
		// .attr("transform", "translate(-100,0)")
		.style("fill", "black")
		.call(yAxis);