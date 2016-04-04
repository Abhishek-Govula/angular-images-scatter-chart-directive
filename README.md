# Scatter chart(d3.js) with images Angular JS directive
An application which uses Angular JS directive for rendering a D3.js scatter chart with images.

The directive is [here](https://github.com/Abhishek-Govula/repo1/tree/master/public/shared/scatter-chart)

Requires Jquery, D3.js
Also include the [css](https://github.com/Abhishek-Govula/repo1/tree/master/public/css/my-scatter-chart.css)

Here are the parameters which can/should be added to the config object

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