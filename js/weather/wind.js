// Define the WindVis constructor
function WindVis(svg, woied) {
  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  WeatherVis.call(this, svg, woied);
  
}

// Create a WindVis.prototype object that inherits from WeatherVis.prototype.
// Note: A common error here is to use "new WeatherVis()" to create the
// WindVis.prototype. That's incorrect for several reasons, not least 
// that we don't have anything to give WeatherVis for the "firstName" 
// argument. The correct place to call WeatherVis is above, where we call 
// it from WindVis.
WindVis.prototype = Object.create(WeatherVis.prototype); // See note below

// Set the "constructor" property to refer to WindVis
WindVis.prototype.constructor = WindVis;

WindVis.prototype.calcWind = function(wind){
    
    return 20;
//    switch(wind) {
//    case n:
//        code block
//        break;
//    case n:
//        code block
//        break;
//    default:
//        return 0;
//    }
//            
}
    

    // Replace the "sayHello" method
WindVis.prototype.drawGraph = function(){
        console.log("drawGraph",  this.data);
    
        var iconFile = this.icons[this.data.text.toLocaleLowerCase()]
                        
        var vis = this;
    
      d3.xml("../icons/arrow.svg", "image/svg+xml", function(error, xml) {
            if (error) throw error;


    //importing an icon from a svg file
    //If anybody knows a better way to import a simple icon, please let me know, this one is killing me.
            $("#svgbackup").append(xml.documentElement);
            d3.select("#svgbackup").select("g").attr("class","weatherIcon");
            $("#svgbackup g").appendTo("#svg");

            var rect = d3.select(".weatherIcon").node().getBBox();
            var widthPerc = rect.width/(vis.canvasWidth/4);
            var heightPerc = rect.height/vis.canvasHeight;

            var newScale = (0.9/widthPerc);

            d3.selectAll(".weatherIcon").attr("transform","scale("+newScale+")");
            console.log(rect.width,vis.canvasWidth);
            var xOffset = 10;

            var yOffset = 10;
            
            d3.selectAll(".weatherIcon")
//                .attr("x",xOffset)
//                .attr("y",yOffset)
//                .attr("transform","translate("+xOffset+","+yOffset+")scale("+(0.8/widthPerc)+")")
            
            .attr("transform","scale(1)")
            .transition()
            .duration(vis.aniDuration)
            .ease("elastic")
//            .attr("transform","rotate("+vis.calcWind(vis.data.wind.direction)+","+(rect.width)+","+(rect.height)+")translate("+xOffset+","+yOffset+")scale("+(0.8/widthPerc)+")");
            .attr("transform","rotate("+vis.calcWind(vis.data.wind.direction)+","+(rect.width)+","+(rect.height)+")");
            
//            .attr("transform","rotate("+vis.calcWind(vis.data.wind.direction)+","+xOffset+","+yOffset+")scale("+(0.8/widthPerc)+")");


            var end_val =[parseInt(vis.data.wind.speed)];
                vis.canvas
                .selectAll(".label")
                .data(end_val)
                .enter()
                .append("text")
                .style("fill","#383838")
                .style("font-size",vis.canvasHeight/3)
                .attr("class", "label")
                .attr("text-anchor","end")
                .attr("x",vis.canvasWidth*0.73)
                .attr("y",vis.canvasHeight*0.60)
                .text(0)
                .transition()
                .duration(vis.aniDuration)
                .tween("text", function(d) {
                    //Got the tween function from http://jsfiddle.net/c5YVX/8/
                       
                        var i = d3.interpolate(this.textContent, d),
                            prec = (d + "").split("."),
                            round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;

                        return function(t) {
                             
                            this.textContent = Math.round(i(t) * round) / round;
                        };
                    });
                
          
                vis.canvas
                .append("text")
                .attr("x",vis.canvasWidth*0.75)
                .attr("y",vis.canvasHeight*0.60)
                 .style("font-size",vis.canvasHeight/5)
                .text("km/h");

       });
}