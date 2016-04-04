# Scatter chart(d3.js) with images Angular JS directive
An application which uses Angular JS directive for rendering a D3.js scatter chart with images.

The directive is [here](https://github.com/Abhishek-Govula/repo1/tree/master/public/shared/scatter-chart)

Requires Jquery, D3.js
Also include the [css](https://github.com/Abhishek-Govula/repo1/tree/master/public/css/my-scatter-chart.css)

<h3>Here are the parameters which can/should be added to the config object</h3>
<table>
    <tr>
        <th>Variable Name</th>
        <th>Datatype</th>
        <th>Default Value</th>
        <th>Required</th>
    </tr>
    <tr>
        <td>timeseries</td>
        <td>boolean</td>
        <td>false</td>
        <td>Optional</td>
    </tr>
    <tr>
        <td>label</td>
        <td>Object</td>
        <td>label: {
			xAxis: "x-axis",
			yAxis: "y-axis"
		}</td>
        <td>Optional</td>
    </tr>
    <tr>
        <td>margin</td>
        <td>Object</td>
        <td>margin: {
			top: 20, 
            right: 20, 
            bottom: 30, 
            left: 30
		}</td>
        <td>Optional</td>
    </tr>
    <tr>
        <td>ticks</td>
        <td>Object</td>
        <td>ticks: {
            xAxis: 3,
            yAxis: 5
        }
		}</td>
        <td>Optional</td>
    </tr>
    <tr>
        <td>images</td>
        <td>Array[Objects]</td>
        <td>images: [
            {
                id: "imageId",
                url: "images/image.png"
            },....
		]</td>
        <td>Required</td>
    </tr>
    <tr>
        <td>animationDuration</td>
        <td>number(integer)</td>
        <td>500</td>
        <td>Optional</td>
    </tr>
    <tr>
        <td>animRadius</td>
        <td>number(integer)</td>
        <td>4</td>
        <td>Optional</td>
    </tr>
    <tr>
        <td>circleRadius</td>
        <td>number(integer)</td>
        <td>20</td>
        <td>Optional</td>
    </tr>
</table>

<h3>Here are the attributes for the directive</h3>
<table>
    <tr>
        <th>Attribute Name</th>
        <th>Data Type</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>id</td>
        <td>string</td>
        <td>my-scatter-chart1</td>
    </tr>
    <tr>
        <td>chartheight</td>
        <td>number</td>
        <td>400</td>
    </tr>
    <tr>
        <td>chartdata</td>
        <td>Array[JSONs]</td>
        <td>[{
	    "title": "New",
	    "xValue": 1459490422000 ,
	    "yValue": 5,
	    "imageId": "plant",
	    "action": "danger"
        }]</td>
    <tr>
    <tr>
        <td>config</td>
        <td>JSON</td>
        <td>Check below in structure of data example</td> 
<table>

<h3>Structure of data example</h3>
<h4>config object</h4>
{
    timeseries: true,
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
        xAxis: 5,
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
}

<h4>Data attribute</h4>
[{
    "title": "New",
    "xValue": 1459490422000 ,
    "yValue": 5,
    "imageId": "plant",
    "action": "danger"
  },{
    "title": "Sample",
    "xValue": 1459490450000,
    "yValue": 7,
    "imageId": "tree",
    "action": "danger"
  },{
    "title": "Test Header",
    "xValue": 1459490455000,
    "yValue": 6,
    "imageId": "flower",
    "action": "safe"
  }
]


