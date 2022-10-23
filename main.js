var status = "";
audio = "";
objects = [];

function preload() {
    audio = createAudio('mixkit-vintage-warning-alarm-990.wav');
}


function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function startPressed() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function modelLoaded() {
    console.log("Your model is loaded!");
    status = true;
    audio.loop();
    audio.speed(1);
    audio.volume(1);
}

function draw() {
    image(video, 0, 0, 500, 450);

    if (status != "") {
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {
            if (objects[i].label == "person") {
                
                audio.stop();

                document.getElementById("status").innerHTML = "A person is detected";

                fill("red");

                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);

                noFill();
                stroke("red");
                rect(objects[i].width, objects[i].height, objects[i].x, objects[i].y);
            } 
            if(objects[i].label != "person") {
                document.getElementById("status").innerHTML = "A person is not detected";
                audio.play();
            }

        }
    }
}

function modelLoaded() {
    console.log("The COCOSsd model is loaded!");
    status = true;
    objectDetector.detect(video, gotResults);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        current_status = true;
        objects = results;
    }
}