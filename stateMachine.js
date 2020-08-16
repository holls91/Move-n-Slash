function AbstractState(){
  var self = this;
  self.state = new IntroState(self);
  self.changeState = function(label){
    if(label === 'Hi') {
       self.state.hi(); 
    } else if (label === 'Sword') {
       self.state.sword(); 
    } else if (label === 'Nothing') {
       self.state.nothing(); 
    } else {
      self.state.next();
    }
  };
  self.getValue = function(){
    return self.state.value;
  };
}

function IntroState(container, index) {
  let intros = ['Loading game, please wait', 'New enemies are coming!', 'Are you ready to defeat them all?', 'Raise your hand to start!'];
  index = index || 0;
  
  speak(intros[index]);

  var self = this;
  self.container = container;
  self.value = intros[index];
  container.state = self;
  self.next = function() {
  };
  
  self.hi = function() {
    if(index === intros.length-1) {
      return new WorldState(self.container);
    }
  };
  
  self.nothing = function() {
    if(index < intros.length-1) {
      return new IntroState(self.container, index+1);
    }
  };
  
  self.sword = function() {
    return this;
  };
}

function WorldState(container){
  frameRate(24);
  if(!playingMusic) {
    bgMusic.setVolume(0.07);
    bgMusic.play();
    playingMusic = true;
  }
  let random = Math.random();
  if(random > 0.60) {
    console.log('Enemy'+enemyIndex);
    enemies.push('Enemy'+enemyIndex++);
    blopSound.play();
  }
  
  var self = this;
  self.container = container;
  self.value = 'World';
  container.state = self;
  self.next = function(){
    if(enemies.length > 0) {
      return new FightState(self.container);
    } else {
      return new VictoryState(self.container);
    }
  };
  
  self.hi = function() {
    self.next();
  };
  
  self.nothing = function() {
    self.next();
  };
  
  self.sword = function() {
    self.next();
  };
}

function FightState(container){
  var self = this;
  self.container = container;
  self.value = 'Fight';
  container.state = self;
  self.next = function(){
    return new VictoryState(self.container);
  };
  
  self.hi = function() {
    //return this;//--
  };
  
  self.nothing = function() {
    //return new WorldState(self.container);//--
  };
  
  self.sword = function() {
    let enemy = enemies.shift(); 
    speak(enemy+' defeated');
    return new WorldState(self.container);//--
  };
}

function VictoryState(container){
  bgMusic.stop();
  score = round(millis()/enemyIndex);
  speak('You win! Score is '+score+ ' points!');
  
  var self = this;
  self.container = container;
  self.value = 'Victory';
  container.state = self;
  self.next = function(){
    return new IntroState(self.container);
  };
  
  self.hi = function() {
    //return this;//--
  };
  
  self.nothing = function() {
    //return this;//--
  };
  
  self.sword = function() {
    //return this;//--
  };
}
