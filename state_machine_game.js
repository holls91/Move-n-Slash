//CREDITS: Music: www.bensound.com

let stateMachineManager;
let currentValue;
let speech;
let isSpeaking = false;

/* VIDEO INFO */
// The model
let modelURL = 'https://teachablemachine.withgoogle.com/models/9uf1w-ya0/';
// The video
let video;
// The classifier
let classifier;

/* ENEMIES INFO */
let enemies = ['Enemy1', 'Enemy2', 'Enemy3', 'Enemy4'];
let enemyIndex = 5;

let blopSound;
let bgMusic;

let playingMusic = false;

function preload() {
  speech = new p5.Speech('it-IT');  

  stateMachineManager = new StateMachineManager();
  soundFormats('mp3', 'ogg');
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  frameRate(1);
  
  blopSound = loadSound('assets/Blop.mp3');
  bgMusic = loadSound('assets/BgMusic.mp3');
  
  createCanvas(640, 520);
  
  // Create the video
  video = createCapture(VIDEO);
  video.hide();
  
  speech.onStart = setIsSpeaking;
  speech.onEnd = setIsNotSpeaking;
  //flipVideo = ml5.flipImage(video);

  noLoop();//--
  // STEP 2: Start classifying
  //classifyVideo();//--
}

function draw() {
  if(!isSpeaking) {//--
    classifyVideo();
  }
  //noLoop();//--
  
  background(0);
  
  // Draw the video
  image(video, 0, 0);
  
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  currentValue = stateMachineManager.heading;
  text(currentValue, width / 2, height - 16);

}


// STEP 2 classify the videeo!
function classifyVideo() {
  noLoop();//--
  //flipVideo = ml5.flipImage(video);
  classifier.classify(video, gotResults);
}

function gotResults(error, results) {
    // Something went wrong!
    if (error) {
      console.error(error);
      return;
    }
    
    // Store the label and classify again!
    label = results[0].label;
    console.log('Label is '+label);
    stateMachineManager.changeState(label);
    //while(isSpeaking) {}//--
    loop();//--
}


function speak(text) {
    console.log('Speech: '+text);
  
    speech.speak(text);
}


function setIsSpeaking() {
    console.log('Is speaking'); 
    isSpeaking = true; 
}



function setIsNotSpeaking() {
    console.log('Is not speaking');
 
    isSpeaking = false; 
    //loop();//--
}

function keyPressed() {
  console.log("Key pressed: "+key);
  if(key==='n' || key==='N') {
      gotResults(false,[{label:'Nothing'}]);
    }
    else if(key==='h' || key==='H') {
      gotResults(false,[{label:'Hi'}]);
    }
    else if(key==='s' || key==='S') {
      gotResults(false,[{label:'Sword'}]);
    }
    else if(key===' ') {
      gotResults(false,[{label:'Next'}]);
    }
}
