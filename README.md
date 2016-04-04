# Scatter chart(d3.js) with images Angular JS directive
An application which uses Angular JS directive for rendering a D3.js scatter chart with images.

The directive is [here](https://github.com/Abhishek-Govula/repo1/tree/master/public/shared/scatter-chart)

Requires Jquery, D3.js
Also include the [css](https://github.com/Abhishek-Govula/repo1/tree/master/public/css/my-scatter-chart.css)

Here are the parameters which can/should be added to the config object

timeseries - boolean(true) Optional
label - Object{xAxis-String,yAxis-String} Required
    xAxis
		label: {
			xAxis: "Time",
			yAxis: "Stages"
		},
		margin: {
			top: 20, 
			right: 20, 
			bottom: 30, 
			left: 40
		},
        ticks: {
            xAxis: 3,
            yAxis: 5
        },
        images: [
            {
                id: "tree",
                url: "images/tree.png"
            },{
                id: "sapling",
                url: "images/sapling.jpg"
            },{
                id: "plant",
                url: "images/plant.png"
            },{
                id: "flower",
                url: "images/flower.png"
            }
        ],
        animationDuration: 300,
        animRadius: 6,
        circleRadius: 20
