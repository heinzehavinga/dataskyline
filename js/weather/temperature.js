// Define the TempatureVis constructor
function TempatureVis(svg, woied) {
  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  WeatherVis.call(this, svg, woied);
  this.unit = 'c';
  this.icons = {
      "tropical storm": "x",
      "hurricane": "x",
      "severe thunderstorms": "heavythunder",
      "thunderstorms": "thunder",
      "mixed rain and snow": "mixrainsnow",
      "mixed rain and sleet": "mixrainsnow",
      "mixed snow and sleet": "mixrainsnow",
      "freezing drizzle": "snow",
      "drizzle": "shower",
      "freezing rain": "mixrainsnow",
      "showers": "shower",
      "showers": "shower",
      "snow flurries": "snow",
      "light snow showers": "snow",
      "blowing snow": "snow",
      "snow": "snow",
      "hail": "snow",
      "sleet": "snow",
      "dust": "snow",
      "foggy": "cloudfog",
      "haze": "cloudfog",
      "smoky": "cloudfog",
      "blustery": "cloudfog",
      "windy": "arrow",
      "cold": "cold",
      "cloudy": "cold",
      "mostly cloudy (night)": "twincloud",
      "mostly cloudy (day)": "twincloud",
      "partly cloudy (night)": "darkcloud",
      "partly cloudy (day)": "cloud",
      "clear (night)": "moon",
      "sunny": "sun",
      "fair (night)": "moon",
      "fair (day)": "sun",
      "mixed rain and hail": "mixrainsnow",
      "hot": "sun",
      "isolated thunderstorms": "thunder",
      "scattered thunderstorms": "thunder",
      "scattered thunderstorms": "heavythunder",
      "scattered showers": "shower",
      "heavy snow": "snow",
      "scattered snow showers": "snow",
      "heavy snow": "snow",
      "partly cloudy": "suncloud",
      "thundershowers": "thunderrain",
      "snow showers": "snow",
      "isolated thundershowers": "thunderrain"
  };
}

// Create a TempatureVis.prototype object that inherits from WeatherVis.prototype.
// Note: A common error here is to use "new WeatherVis()" to create the
// TempatureVis.prototype. That's incorrect for several reasons, not least 
// that we don't have anything to give WeatherVis for the "firstName" 
// argument. The correct place to call WeatherVis is above, where we call 
// it from TempatureVis.
TempatureVis.prototype = Object.create(WeatherVis.prototype); // See note below

// Set the "constructor" property to refer to TempatureVis
TempatureVis.prototype.constructor = TempatureVis;


// Replace the "sayHello" method
TempatureVis.prototype.drawGraph = function(){
        console.log("drawGraph",  this.data);
    
        var iconFile = this.icons[this.data.text.toLocaleLowerCase()]
                        
        var vis = this;
    
      d3.xml("../icons/"+ iconFile +".svg", "image/svg+xml", function(error, xml) {
            if (error) throw error;


    //importing an icon from a svg file
    //If anybody knows a better way to import a simple icon, please let me know, this one is killing me.
            $("#svgbackup").append(xml.documentElement);
            d3.select("#svgbackup").select("g").attr("class","weatherIcon");
            $("#svgbackup g").appendTo("#svg");

            var rect = d3.select(".weatherIcon").node().getBBox();
            var widthPerc = rect.width/(vis.canvasWidth/2);
            var heightPerc = rect.height/vis.canvasHeight;

            var newScale = (0.9/widthPerc);

            d3.selectAll(".weatherIcon").attr("transform","scale("+newScale+")");
            console.log(rect.width,vis.canvasWidth);
            var xOffset = 10;

            var yOffset = (vis.canvasHeight/10);
            d3.selectAll(".weatherIcon").attr("transform","translate("+xOffset+","+yOffset+")scale("+(0.8/widthPerc)+")");
          
            
          

            var end_val =[parseInt(vis.data.temp)];
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
                 .style("font-size",vis.canvasHeight/3)
                .text("°C");

       });
}