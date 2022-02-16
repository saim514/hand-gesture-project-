Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/K6o7hbRXW/model.json',modelLoaded);

function modelLoaded()
{
    console.log("Model is loaded!");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data1 = "The prediction is" + prediction1;
    var utterThis = new SpeechSynthesisUtterance(speak_data1);
    utterThis.rate = 0.5;
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img , gotResult);
}

function gotResult(error, results)
{
    if(error){
        console.error(error)
    } else{
        console.log(results);
        document.getElementById("result_signal_name").innerHTML = results[0].label;
        prediction1 = results[0].label;
        speak();
        if(results[0].label == "good"){
            document.getElementById("update_signal").innerHTML = "&#128077;"
        }
        if(results[0].label == "peace"){
            document.getElementById("update_signal").innerHTML = "&#9996;"
        }
        if(results[0].label == "okay"){
            document.getElementById("update_signal").innerHTML = "&#9996;"
        } 
    }
}