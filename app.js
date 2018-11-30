// import * as tf from '@tensorflow/tfjs';

// replace these values with those generated in your TokBox Account
const MODEL_URL = './../face-api.js/weights'
var apiKey = "46228452";
var sessionId = "1_MX40NjIyODQ1Mn5-MTU0MzQ5ODkwNTA0Mn5nNXZTNUF2K1o3OVVjMEg2a3NhK1FzS1B-fg";
var token = "T1==cGFydG5lcl9pZD00NjIyODQ1MiZzaWc9NTlkMzlmZGRkOGI3YjM3Zjg1YmVhOGM5NDRiY2M5M2VmM2RkMWRjYTpzZXNzaW9uX2lkPTFfTVg0ME5qSXlPRFExTW41LU1UVTBNelE1T0Rrd05UQTBNbjVuTlhaVE5VRjJLMW8zT1ZWak1FZzJhM05oSzFGelMxQi1mZyZjcmVhdGVfdGltZT0xNTQzNDk4OTY5Jm5vbmNlPTAuOTA0MjY5Njc0ODU0MDY0NiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTQzNTg1MzY4JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";
var publisher;
var fullFaceDescriptions;
var session;
var y = 0;
var ids = [];
var sub;



var imgtest = 'data:image/png;base64,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'

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  var sub = 'subscriber0';
  session.on('streamCreated', function(event) {


  	session.subscribe(event.stream, sub, {
    		insertMode: 'append',
    		width: '100%',
    		height: '100%'
  		}, handleError);
  		y++;
  		sub = 'subscriber' + y.toString();
	});

  // Create a publisher
  publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);
   
   console.log("Y is: " + y);
   console.log("Id is = " + session.sessionId);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });

  session.on("connectionDestroyed", function(event) {
  	console.log(event);
  	y--;
  	var n = -1;
  	for(var i = 0; i < ids.length; i++) {
        if(event.connection.id == ids[i]) {
        	ids.splice(i, 1);
        	n = i;
        }
    }
    if(n != -1) {
    	var elementId = 'emoji' + n.toString();
		var elementTextId = 'emojitext' + n.toString();
		console.log("Updating:  " + elementTextId);
		document.getElementById(elementId).innerHTML = "";
		document.getElementById(elementTextId).innerHTML = "";
    }
    sub = 'subscriber' + y.toString();
    console.log("Y: " + y);
  });

  session.on("signal", function(event) {
  		var currId = event.from.id;
        console.log("Signal sent from connection: " + currId);
        console.log("Signal data: " + event.data);
        var n = -1;
        for(var i = 0; i < ids.length; i++) {
        	if(event.from.id == ids[i]) {
        		n = i;
        		break;
        	}
        } 
        if(n == -1) {
        	ids[ids.length] = currId;
        	n = ids.length - 1;
        }
        console.log("Updating emoji" + n.toString());
        updateEmoji(event.data, n);
      });
  	console.log("We are done initializeSession");
}

async function getImage() {
	var imgData = publisher.getImgData();
	var image = document.createElement("img");
 	image.setAttribute("src", "data:image/png;base64," + imgData);
/*
 	image.onload = function () {
 		var canvas = document.createElement('canvas');
    	canvas.width = image.width;
    	canvas.height = image.height;

    	var context = canvas.getContext('2d');
    	context.drawImage(image, 0, 0);

    	var imageData = context.getImageData(0, 0, canvas.width, canvas.height);


    // Now you can access pixel data from imageData.data.
    // It's a one-dimensional array of RGBA values.
    // Here's an example of how to get a pixel's color at (x,y)
    //var index = (y*imageData.width + x) * 4;
    //var red = imageData.data[index];
    //var green = imageData.data[index + 1];
    //var blue = imageData.data[index + 2];
    //var alpha = imageData.data[index + 3];
    console.log(imageData);
 	}*/

	var img = document.createElement("img");
 	img.setAttribute("src", "data:image/png;base64," + imgData);

 	//let fullFaceDescriptions = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();

 	let landmarks = await faceapi.detectFaceLandmarks(img);

 	// await sleep(1000);
 	var canvas = document.getElementById('myCanvas');

 	const landmarkPositions = landmarks.positions;

 	isSmiling(landmarks.getMouth());

// or get the positions of individual contours,
// only available for 68 point face ladnamrks (FaceLandmarks68)
/*
	const mouth = landmarks.getMouth();
	var mouthX = new Array(20);
	var mouthY = new Array(20);
	for(var i = 0; i < 20; i++) {
		mouthX[i] = mouth[i].x;
		mouthY[i] = mouth[i].y;
	}
	mouthX.sort();
	mouthY.sort();

	var avgY = 0;

	// Get avg y values
	for(var i = 3; i < 17; i++) {
		avgY += mouthY[i];
	}

	// get avg y
	avgY /= 14;
	
	// get top and bottom 3 Y
	var top3Y = (mouthY[17] + mouthY[18]+ mouthY[19])/3;
	var bottom3Y = (mouthY[0] + mouthY[1], mouthY[2])/3;

	var farX = mouthX[19];
	var closeX = mouthX[0];


	console.log(top3Y);
	console.log(bottom3Y);
	console.log(avgY);
	var YofCloseX;
	var YofFarX;

	// get y valyes of two widest Xs
	for(var i = 0; i < 20; i++){
		if(mouth[i].x == farX){
			YofFarX = mouth[i].y;
		}
		if(mouth[i].x == closeX){
			YofCloseX = mouth[i].y;
		}
	}

	console.log(YofCloseX);
	console.log(YofFarX);

	if(YofCloseX > avgY && YofFarX > avgY) {
		console.log("HAPPY");
	} else if(YofCloseX < avgY && YofFarX < avgY) {
		console.log("SAD");
	} else {
		console.log("NEUTRAL");
	}
*/








	
	//var png = new PNG(imgtest);
	//var pixels = createMatrix(1280,720);
	//var y = 0;
	/*
	while(line = imgData.readLine())
	{
		var row = pixels[y];
    	for (var x = 0; x < line.length; x++){
    	    row[x] = line[x].toString(16).padRight('0', 6);
    	}
    	y++;
	}
	console.log(y);
	console.log(pixels);*/
	//var imgWin = window.open("about:blank", "Screenshot");
 	//imgWin.document.write("<body></body>");
 	//imgWin.document.body.appendChild(image);

}

function createMatrix(N, M) {
    var matrix = new Array(N); // Array with initial size of N, not fixed!

    for (var i = 0; i < N; ++i) {
        matrix[i] = new Array(M);
    }

    return matrix;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function takepicture() {
  getImage();
}

async function loadFaceAPI(resolve) {
	await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
	await faceapi.loadFaceLandmarkModel(MODEL_URL);
	await faceapi.loadFaceRecognitionModel(MODEL_URL);
	console.log("we loaded the face");
	resolve(1);
}

function isSmiling(mouth)
{

    var isSmilingState = 'normal'; 
    var mouthX = new Array(20);
    var mouthY = new Array(20);
    for(var i = 0; i < 20; i++) {
        mouthX[i] = mouth[i].x;
        mouthY[i] = mouth[i].y;
    }
    mouthX.sort();
    mouthY.sort();

    var avgY = 0;

    // Get avg y values
    for(var i = 3; i < 17; i++) {
        avgY += mouthY[i];
    }

    // get avg y
    avgY /= 14;
    
    // get top and bottom 3 Y
    var top3Y = (mouthY[17] + mouthY[18]+ mouthY[19])/3;
    var bottom3Y = (mouthY[0] + mouthY[1], mouthY[2])/3;

    var farX = mouthX[19];
    var closeX = mouthX[0];


    console.log('top3Y',top3Y);
    console.log('bottom3Y',bottom3Y);
    console.log('avgY',avgY);
    var YofCloseX;
    var YofFarX;

    // get y valyes of two widest Xs
    for(var i = 0; i < 20; i++){
        if(mouth[i].x == farX){
            YofFarX = mouth[i].y;
        }
        if(mouth[i].x == closeX){
            YofCloseX = mouth[i].y;
        }
    }

    console.log('YofCloseX',YofCloseX);
    console.log('YofFarX',YofFarX);

    var state = "NEUTRAL";

    if(YofCloseX < avgY*1.05 || YofFarX < avgY*1.05) {
        console.log("HAPPY");
        state = "HAPPY";
    } else if(YofCloseX > avgY*1.1 || YofFarX > avgY*1.1) {
        console.log("SAD");
        state = "SAD";
    } else {
    	console.log("NEUTRAL");
    }

    session.signal({
        type: "state",
        data: state
      },
      function(error) {
      	//updateEmoji(state);
      	updateEmoji(state, 0);
        if (error) {
          console.log("signal error: " + error.message);
        } else {
          console.log("signal sent");
        }
      }
    );
}

/*
function updateEmoji(state){
	var img = document.createElement("IMG");
	var elementId = 'emoji';
	console.log("Updating:  " + elementId);
	document.getElementById(elementId).innerHTML = "";
	img.width = 50;
	img.height = 50;
	if(state == "HAPPY") {
    	img.src = "images/happy.png";
    	document.getElementById(elementId).appendChild(img);
    } else if(state == "SAD") {
    	img.src = "images/sad.png";
    	document.getElementById(elementId).appendChild(img);
    } else {
    	img.src == "images/neutral.png";
    	document.getElementById(elementId).appendChild(img);
    }
}*/


function updateEmoji(state, n){
	var img = document.createElement("IMG");
	var elementId = 'emoji' + n.toString();
	var elementTextId = 'emojitext' + n.toString();
	console.log("Updating:  " + elementTextId);
	document.getElementById(elementId).innerHTML = "";
	img.width = 50;
	img.height = 50;
	if(state == "HAPPY") {
    	img.src = "images/happy.png";
    	document.getElementById(elementId).appendChild(img);
    } else if(state == "SAD") {
    	img.src = "images/sad.png";
    	document.getElementById(elementId).appendChild(img);
    } else {
    	img.src == "images/neutral.png";
    	document.getElementById(elementId).appendChild(img);
    }
    var userText = "User " + n.toString() + " is " + state; 
    document.getElementById(elementTextId).textContent=userText;
}

// (optional) add server code here
initializeSession();
var promise = new Promise(function(resolve, reject) {
  loadFaceAPI(resolve);
  console.log("we called load face");
});
console.log("we are out of the promise");
promise.then(function(result) {
  console.log("we are in the then promise");
  setInterval(takepicture, 3000);
})

//setInterval(takepicture, 3000);



