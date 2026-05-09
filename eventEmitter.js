class Emitter {
  constructor(){
    this.event = {}
  }

  on(item,callback){
    if(!this.event[item]){
      this.event[item] = [];
    }
    this.event[item].push(callback);
  }

  emit(item,...agr){
    if(!this.event[item]) return;
    this.event[item].forEach((value)=>{
      value(...agr);
    })
  }

  off(item,callback){
    if(!this.event[item]) return;
    this.event[item] = this.event[item].filter((value)=>{
      value !== callback
    })
  }

  once(item,callback){
    const wrapper = (...arg)=>{
      callback(...arg);
      this.off(item,wrapper);
    }
    this.on(item,wrapper);
  }
}

const emitter = new Emitter();

function greet(name) {
  console.log(`Hello ${name}`);
}

// on
emitter.on("user", greet);

emitter.emit("user", "Saurav");

// off
emitter.off("user", greet);

emitter.emit("user", "Saurav");

// once (this only register and than delete it)
emitter.once("login", (user) => {
  console.log(`${user} logged in`);
});

emitter.emit("login", "John"); // this will run the once 
emitter.emit("login", "John"); // this won't do anything as it was run before and deleted
