// Define the SunRise constructor
function SunRise(svg, woied) {
  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  WeatherVis.call(this, svg, woied);
  this.unit = 'c';    
}

// Create a SunRise.prototype object that inherits from WeatherVis.prototype.
// Note: A common error here is to use "new WeatherVis()" to create the
// SunRise.prototype. That's incorrect for several reasons, not least 
// that we don't have anything to give WeatherVis for the "firstName" 
// argument. The correct place to call WeatherVis is above, where we call 
// it from SunRise.
SunRise.prototype = Object.create(WeatherVis.prototype); // See note below

// Set the "constructor" property to refer to SunRise
SunRise.prototype.constructor = SunRise;


// Replace the "sayHello" method
SunRise.prototype.drawGraph = function(){
        console.log("drawGraph",this.data);
//    var vis = this
//    d3.xml("../icons/car.svg", "image/svg+xml", function(error, xml) {
//        if (error) throw error;
//        
//        
//        var canvas = vis.canvas
//        var group = canvas.append("g");
//        var defs= canvas.append("defs");
//        
//        
//      
//    //    .attr("height",400);
//
////importing an icon from a svg file
////If anybody knows a better way to import a simple icon, please let me know, this one is killing me.
//        $("#svgbackup").append(xml.documentElement);
//        d3.select("#svgbackup").select("path").attr("class","iconStroke iconObject");
//        $("#svgbackup path").clone().appendTo("#svg");
//        d3.select("#svgbackup").select("path").attr("class","iconFill iconObject");
//        $("#svgbackup path").appendTo("#svg");
//
//        //Scaling to whole thing
//        var rect = d3.select(".iconFill").node().getBBox();
//        console.log(rect);
//        var widthPerc = rect.width/vis.canvasWidth;
//        var heightPerc = rect.height/vis.canvasHeight;
//        
//        var newScale = (0.8/widthPerc)
//        
//        d3.selectAll(".iconObject").attr("transform","scale("+newScale+")");
//        
//        var xOffset = (vis.canvasWidth-(rect.width*newScale))/2;
//        
//        var yOffset = (vis.canvasHeight-(rect.height*newScale))-(vis.canvasHeight/20);
//        d3.selectAll(".iconObject").attr("transform","translate("+xOffset+","+yOffset+")scale("+(0.8/widthPerc)+")");
//        
//        
//        
//        var endValue = rect.width*((vis.maxValue-vis.data)/vis.maxValue);
//        
//        //Setting up the mask
//         defs
//        .append("clipPath")
//        //Id moet gekoppeld worden op de objecten die je wil masken
//        .attr("id","mask")
//        .append("rect")
//        .attr("x",0)
//        .attr("y",0)
//        .attr("height",vis.canvasHeight)
//        .attr("width",1)
//        .transition()
//        .duration(vis.aniDuration)
//        .attr("width",endValue);
//        
//        //applying the mask
//        d3.select(".iconFill").attr("clip-path","url(#mask)")
//        
//        console.log(this.label);
//        canvas
//        .append("text")
//        .attr("class",".label")
//        .style("font-size",vis.canvasHeight/5)
//        .attr("class", "label")
//        .attr("text-anchor","middle")
//        .attr("x",vis.canvasWidth/2)
//        .attr("y",vis.canvasHeight*0.25)
//        //Hier moet dus een parameter voor komen.
//        .text(vis.label);
//        
//    });
//    
//  
//    //Draw + Update 
    
};


//// Example usage:
//var SunRise1 = new SunRise("Janet", "Applied Physics");
//SunRise1.sayHello();   // "Hello, I'm Janet. I'm studying Applied Physics."
//SunRise1.walk();       // "I am walking!"
//SunRise1.sayGoodBye(); // "Goodbye!"
//
//// Check that instanceof works correctly
//console.log(SunRise1 instanceof WeatherVis);  // true 
//console.log(SunRise1 instanceof SunRise); // true
//          

