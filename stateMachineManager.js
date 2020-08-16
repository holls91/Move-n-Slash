function StateMachineManager() {
  
  let state = new AbstractState();
  let heading = state.getValue();
  
  this.changeState = function(label){
    console.log('change heading');
    state.changeState(label);
    heading = state.getValue();
    console.log('changed heading to '+heading);
  };
  
  Object.defineProperty(this,"heading",{
    get: function() { console.log('Heading is '+state.getValue()); return heading; },
    set: function(value) { 
      heading = value;  
    }
  });

}
