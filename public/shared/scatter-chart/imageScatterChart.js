var scripts = document.getElementsByTagName("script")
var currentScriptPath = scripts[scripts.length-1].src;

angular.module('customChart', [])
	.directive('imgScatterChart', ['$window', function($window){
	return{
		restrict: 'E',
		templateUrl: currentScriptPath.replace('imageScatterChart.js', 'img-scatter-chart.html'),
		link: function(scope, element, attr){
			//Watchers for any data or configuration change
            scope.$watchGroup(['data','config'], function(newValues, oldValues, scope){
               var data = newValues[0];
               var config = newValues[1];
               if(data==null){
                   if(attr.data!=null){
                       data = attr.data;
                       if(typeof(data)==='string'){
                            data = JSON.parse(data);
                       }    
                   }    
               }else{
                    if(typeof(data)==='string'){
                        data = JSON.parse(data);
                    }
               }
               if(config==null){
                   if(attr.config!=null){
                       config = attr.config;
                       if(typeof(config)==='string'){
                            config = JSON.parse(config);
                       }    
                   }    
               }else{
                    if(typeof(config)==='string'){
                        config = JSON.parse(config);
                    }
               }
               if(data!=null && config!=null){
                   updateChart(data, config);
               }
            });
            
            //updating the chart on the window resize
            angular.element($window).bind('resize', function(){
                if(attr.config!=null && attr.config.length!=0 && attr.chartdata!=null && attr.chartdata.length!=0){
                    var config = JSON.parse(attr.config);
                    var data = JSON.parse(attr.chartdata);
				    updateChart(data, config);   
                }
                // manuall $digest required as resize event
                // is outside of angular
                scope.$digest();
            });
            
			element.id = attr.id;
			if(attr.chartdata==null || attr.chartdata.length==0){
				console.log("Data not in right format");
			}else{
				var data = JSON.parse(attr.chartdata);
				var config = JSON.parse(attr.config);
				
				updateChart(data, config);
			}
			function getFormattedTime(unixDateParam){
				var _unixDate = Math.round(unixDateParam);
				var dateNow = new Date(_unixDate);

				var date = dateNow.getDate();
				var month = dateNow.getMonth();
				var year = dateNow.getFullYear();
				
				var format = d3.time.format("%d %b %Y");
				return format(new Date(year, month, date));
			}
			function updateChart(data, config){
                // Configurations
				var xAxisLabel = (config.label!=null)?(config.label.xAxis!=null)?config.label.xAxis:"x-axis":"x-axis";
				var yAxisLabel = (config.label!=null)?(config.label.yAxis!=null)?config.label.yAxis:"y-axis":"y-axis";
				var configMargin = config.margin;
				var xAxisTicks = (config.ticks!=null)?(config.ticks.xAxis!=null)?config.ticks.xAxis:5:5;
				var yAxisTicks = (config.ticks!=null)?(config.ticks.yAxis!=null)?config.ticks.yAxis:5:5;
                var imagesArray = config.images;
                var timeseries = (config.timeseries!=null)?config.timeseries:false;
                
                var svgElement = $(element).children().find("svg").first();
				svgElement.width = attr.chartwidth;
				svgElement.height = attr.chartheight;

				var atrString = "#"+attr.id+" svg";

				//Removing any existig data from the graph
				$(atrString).children().filter(":not(#mdef)").remove();
				$(atrString+" #mdef pattern").remove();
                //Every time chart tooltip is being created. So removing it. Later change patterns and tooltip to initialize only once
                $(".chart-tooltip").remove();
                
                //images update happening here
                for(var image in imagesArray){
                    /* Format of the tag pattern which goes into the defs
                    <pattern id="drupal" x="0" y="0" height="40" width="40">
                        <image x="0" y="0" width="40" height="40" xlink:href="images/drupal-icon.jpg"></image>
                    </pattern>*/
                    var patternDefs = d3.select(atrString+" #mdef");
                    //Pattern creation
                    patternDefs.append("pattern")
                                    .attr("id", imagesArray[image].id)
                                    .attr("x", "0")
                                    .attr("y", "0")
                                    .attr("height", config.circleRadius*2)
                                    .attr("width", config.circleRadius*2);
                    //Creating the image inside the pattern
                    //<image x="0" y="0" width="40" height="40" xlink:href="images/drupal-icon.jpg"></image>
                    var patternNow = d3.select(atrString+" #mdef #"+imagesArray[image].id);
                    patternNow.append("image")
                                .attr("x","0")
                                .attr("y","0")
                                .attr("height", config.circleRadius*2)
                                .attr("width", config.circleRadius*2)
                                .attr("xlink:href", imagesArray[image].url);
                }

				//Creating the graph and updating the data
				var svgWidth = document.querySelectorAll(atrString)[0].clientWidth;
	  			var svgHeight = attr.chartheight;

	  			var defaultMargin = {
                    top: 20, 
                    right: 20, 
                    bottom: 30, 
                    left: 30
                };
                var margin = (configMargin==null)?defaultMargin:configMargin,
	      		    width = svgWidth - margin.left - margin.right,
	      		    height = svgHeight - margin.top - margin.bottom;
                
	      		// setup the x-axis 
				var xValue = function(d) { return d.xValue;}, // data -> value
				  xScale = d3.scale.linear().range([0, width]), // value -> display
				  xMap = function(d) { return xScale(xValue(d));}, // data -> display
				  xAxis = d3.svg.axis().scale(xScale).orient("bottom");
				  
				  xAxis.ticks(xAxisTicks);
				  xAxis.tickFormat(function(d){
                      if(timeseries)
				  	    return getFormattedTime(d);
                      return d;
				  });
				  													
				// setup the y-axis
				var yValue = function(d) { return d.yValue;}, // data -> value
				  yScale = d3.scale.linear().range([height, 0]), // value -> display
				  yMap = function(d) { return yScale(yValue(d));}, // data -> display
				  yAxis = d3.svg.axis().scale(yScale).orient("left");
				
				yAxis.ticks(yAxisTicks);
				yAxis.tickFormat(function (d){
				  	return d;
                });

				// setup fill color
				var cValue = function(d) { return d.Manufacturer;},
				  color = d3.scale.category10();

				// add the graph canvas to the body of the webpage
				// var svg = d3.select("body").append("svg")
				var svg = d3.select(atrString)
				  .attr("width", function(){
				  	return "100%";
				  })
				  .attr("height", height + margin.top + margin.bottom)
				.append("g")
				  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				// add the tooltip area to the webpage
				var tooltip = d3.select("body").append("div")
				  .attr("class", "chart-tooltip")
				  .style("opacity", 0);

				// function for the x grid lines
				function make_x_axis() {
				  return d3.svg.axis()
				      .scale(xScale)
				      .orient("bottom")
				      .ticks(5);
				}

				// function for the y grid lines
				function make_y_axis() {
					return d3.svg.axis()
				    	.scale(yScale)
				    	.orient("left")
				    	.ticks(10)
				}

				if(data!=null){
					drawChart(data);	
				}
				
				//Updating the scatter chart with the data
				function drawChart(data){

					// change string (from CSV) into number format
					data.forEach(function(d) {
					  d.xValue = +d.xValue;
					  d.yValue = +d.yValue;
					});

					// don't want dots overlapping axis, so add in buffer to data domain
					xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
					yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

					// x-axis
					svg.append("g")
					    .attr("class", "x axis")
					    .attr("transform", "translate(0," + height + ")")
					    .call(xAxis)
					  .append("text")
					    .attr("class", "label")
					    .attr("x", width)
					    .attr("y", -6)
					    .style("text-anchor", "end")
					    .text(xAxisLabel);

					// y-axis
					svg.append("g")
					    .attr("class", "y axis")
					    .call(yAxis)
					  .append("text")
					    .attr("class", "label")
					    .attr("transform", "rotate(-90)")
					    .attr("y", 6)
					    .attr("dy", ".71em")
					    .style("text-anchor", "end")
					    .text(yAxisLabel);
                        
                    
                    // Draw the x Grid lines
					svg.append("g")
					    .attr("class", "grid")
					    .attr("transform", "translate(0," + height + ")")
					    .call(make_x_axis()
					        .tickSize(-height, 0, 0)
					        .tickFormat("")
					    );

					// Draw the y Grid lines
					svg.append("g")            
					    .attr("class", "grid")
					    .call(make_y_axis()
					        .tickSize(-width, 0, 0)
					        .tickFormat("")
					    );
                        
                    //varibles for on hover animations
                    var horizontalLine = null;
                    var verticalLine = null;
                    var animationDuration = (config.animationDuration!=null)?config.animationDuration:500;
                    var animRadius = (config.animRadius!=null)?config.animRadius:4;
                    var circleRadius = (config.circleRadius!=null)?config.circleRadius:20;
                    
					// draw dots
					svg.selectAll(".dot")
					    .data(data)
					  .enter().append("circle")
					    .attr("class", function(d){
					      var actionClass = "safe";
					      if(d.action == "warning"){
					        actionClass = "warning";
					      }else if(d.action == "danger"){
					        actionClass = "danger";
					      }
					      return "dot"+" dot-"+actionClass;
					    })
					    .attr("r", circleRadius)
					    .attr("cx", xMap)
					    .attr("cy", yMap)
					    //.style("fill", function(d) { return color(cValue(d));})
					    .style("fill", function(d) { 
                            //Here we fill in the image that was given in the defs
					        return "url(#"+d.imageId+")";
					    })
					    .on("mouseover", function(d) {
					      tooltip.transition()
					           .duration(200)
					           .style("opacity", 0.8);
					      tooltip.html("<div class='chart-tooltip-header'>"+ d.title +"</div>"+ "<div class='chart-tooltip-content'> (" + getFormattedTime(d.xValue) 
					      + ", " + yValue(d) + ")</div>")
					           .style("left", (d3.event.pageX + 15) + "px")
					           .style("top", (d3.event.pageY - 28) + "px");
                          
                          //Lines to the axis on hover
                          horizontalLine = svg.append("svg:line")
                                        .attr("class", function(){
                                            var actionClass = "safe";
                                            if(d.action == "warning"){
                                                actionClass = "warning";
                                            }else if(d.action == "danger"){
                                                actionClass = "danger";
                                            }
                                            return "line-axis"+" dot-"+actionClass;
                                        })
                                        .attr("x1", xMap(d))
                                        .attr("y1", yMap(d))
                                        .attr("x2", 0)
                                        .attr("y2", yMap(d));
                          horizontalLine.transition()
                                    .duration(animationDuration)
                                    .style("stroke-dasharray", ("5, 4"))
                                    .style("stroke-opacity", 0.9)
                                    .style("stroke", "#f00");
                          verticalLine = svg.append("svg:line")
                                        .attr("class", function(){
                                            var actionClass = "safe";
                                            if(d.action == "warning"){
                                                actionClass = "warning";
                                            }else if(d.action == "danger"){
                                                actionClass = "danger";
                                            }
                                            return "line-axis"+" dot-"+actionClass;
                                        })
                                        .attr("x1", xMap(d))
                                        .attr("y1", yMap(d))
                                        .attr("x2", xMap(d))
                                        .attr("y2", 400-yMap(d));
                          verticalLine.transition()
                                    .duration(animationDuration)            
                                    .style("stroke-dasharray", ("5, 4"))
                                    .style("stroke-opacity", 0.9)
                                    .style("stroke", "#f00");
                                    
                          circleAnimation(this, true);
                         
					    })
					    .on("mouseout", function(d) {
                            horizontalLine.transition()
                                        .duration(animationDuration)
                                        .style("opacity", 0);
                            verticalLine.transition()
                                        .duration(animationDuration)
                                        .style("opacity", 0);
                            tooltip.transition()
                                .duration(animationDuration)
                                .style("opacity", 0);
                                
                            circleAnimation(this, false);
					    })
					    .on("click", function(d) {
                            //On click, brodcasting the event to the controller where the directive is called
                            scope.$emit('scatterChartElem', d);
					    });
                        
                        function circleAnimation(elem, show){
                            if(show){
                                //Adding the hover style to the circle
                                d3.select(elem)
                                    .attr("class", $(elem).attr("class")+" dot-hover");
                                    
                                //Changing the position of the image filled as well as the radius of the circle
                                var currentFill = $(elem).css("fill").replace(/"/g, '');
                                var fillId = currentFill.substring(currentFill.indexOf("#")+1, currentFill.indexOf(")"));
                                
                                d3.select("#"+fillId+">image")
                                    .transition()
                                    .duration(animationDuration)
                                    .attr("x", animRadius)
                                    .attr("y", animRadius);
                                d3.select(elem)
                                    .transition()
                                    .duration(animationDuration)
                                    .attr("r",parseInt($(elem).attr("r"))+animRadius);
                            }else{
                                //Adding the hover style to the circle
                                d3.select(elem)
                                    .attr("class", $(elem).attr("class").replace(/ dot-hover/g, ''));
                                //Making everything else to default size on mouse out
                                var currentFill = $(elem).css("fill").replace(/"/g, '');
                                var fillId = currentFill.substring(currentFill.indexOf("#")+1, currentFill.indexOf(")"));
                                
                                d3.select("#"+fillId+">image")
                                    .transition()
                                    .duration(animationDuration)
                                    .attr("x", 0)
                                    .attr("y", 0)
                                d3.select(elem)
                                    .transition()
                                    .duration(animationDuration)
                                    .attr("r",circleRadius);
                            }
                        }

					// draw legend
					var legend = svg.selectAll(".legend")
					    .data(color.domain())
					  .enter().append("g")
					    .attr("class", "legend")
					    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

					// draw legend colored rectangles
					legend.append("rect")
					    .attr("x", width - 18)
					    .attr("width", 18)
					    .attr("height", 18)
					    .style("fill", color);

					// draw legend text
					legend.append("text")
					    .attr("x", width - 24)
					    .attr("y", 9)
					    .attr("dy", ".35em")
					    .style("text-anchor", "end")
					    .text(function(d) { return d;});
				}
			}
		}
	}
}]);