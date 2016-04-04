var express = require('express');

var app = express();
app.use('/', express.static(__dirname + '/public'));

app.route('/')
    .get(sendSampleData2);
app.route('/testData')
	.get(sendSampleData);
app.route('/testData2')
	.get(sendSampleData2);

app.route('/test')
	.all(function(req, res){
		res.send("Helllo");
	});
app.route('/index')
	.all(function(req, res){
		redirect(res, "index");
	});

function redirect(res,page){
	var fileName = "index";
	switch(page){
		case "index":
			break;
		case "index2":
			fileName = "index2";
			break;
	}
	res.sendFile(__dirname+'/public/'+fileName+".html");
}
function sendSampleData2(req, res){
	var array2 = [{
	    "title": "New",
	    "xValue": 1459490422000 ,
	    "yValue": 5,
	    "image_name": "plant",
	    "action": "danger"
	  },{
        "title": "Sample",
        "xValue": 1459490450000,
        "yValue": 7,
        "image_name": "tree",
        "action": "danger"
        },{
        "title": "Test Header",
        "xValue": 1459490455000,
        "yValue": 6,
        "image_name": "flower",
        "action": "safe"
        }
    ];
	res.send(array2);
}
function sendSampleData(req, res){
	var sampleData = [{
    "title": "100%_Bran",
    "xValue": 1459490436000 ,
    "yValue": 1,
    "image_name": "tree",
    "action": "safe"
  },{
    "title": "100%_Natural_Bran",
    "xValue": 1459490444000,
    "yValue": 2,
    "image_name": "sapling",
    "action": "warning"
  },{
    "title": "All-Bran",
    "xValue": 1459490450000,
    "yValue": 3,
    "image_name": "plant",
    "action": "danger"
  },{
    "title": "All-Bran_with_Extra_Fiber",
    "xValue": 1459490455000,
    "yValue": 4,
    "image_name": "flower",
    "action": "safe"
  }
  ];
  res.send(sampleData);
}

app.listen(3000);
console.log("App has been started");