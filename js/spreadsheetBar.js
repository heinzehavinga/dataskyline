// Define the CircleVis constructor
function SpreadsheetBarVis(svg, url) {
      // Call the parent constructor, making sure (using Function#call)
      // that "this" is set correctly during the call
  SpreadsheetVis.call(this, svg, url);

}

// Create a CircleVis.prototype object that inherits from VisObject.prototype.
// Note: A common error here is to use "new VisObject()" to create the
// CircleVis.prototype. That's incorrect for several reasons, not least 
// that we don't have anything to give VisObject for the "firstName" 
// argument. The correct place to call VisObject is above, where we call 
// it from CircleVis.
SpreadsheetBarVis.prototype = Object.create(SpreadsheetVis.prototype); // See note below

// Set the "constructor" property to refer to CircleVis
SpreadsheetBarVis.prototype.constructor = SpreadsheetBarVis;

    // Replace the "sayHello" method
SpreadsheetBarVis.prototype.drawGraph = function(){
   //TODO: custom keys!
    var data = this.data.leegstand.elements;
    data.forEach(function(d) {
       d.Leegstand = parseFloat(d.Leegstand)/100;
    });
    // Set the dimensions of the canvas / graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = this.canvasWidth - margin.left - margin.right,
    height = this.canvasHeight - margin.top - margin.bottom;
    
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "%");

    var svg = this.canvas
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 

      x.domain(data.map(function(d) { return d.Stad; }));
      y.domain([0, d3.max(data, function(d) { return d.Leegstand; })]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Leegstand");

      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.Stad); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.Leegstand); })
          .attr("height", function(d) { return height - y(d.Leegstand); });
   

    function type(d) {
      d.frequency = +d.Leegstand;
      return d;
    }
};



//// Example usage:
//var CircleVis1 = new CircleVis("Janet", "Applied Physics");
//CircleVis1.sayHello();   // "Hello, I'm Janet. I'm studying Applied Physics."
//CircleVis1.walk();       // "I am walking!"
//CircleVis1.sayGoodBye(); // "Goodbye!"
//
//// Check that instanceof works correctly
//console.log(CircleVis1 instanceof VisObject);  // true 
//console.log(CircleVis1 instanceof CircleVis); // true
//          


