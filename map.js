// polyfills of map

if(!Array.prototype.myMap){
  Array.prototype.myMap = function(callback){
    if (this == null) {
      throw new TypeError("this is null or undefined");
    }

    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    let arr = [];
    for(let i=0; i<this.length; i++){
      if(i in this){
        arr[i]=(callback(this[i],i,this));
      }
    }
    return arr;
  }
}

let arr = [1,2,3,];

let value = arr.myMap((item)=>item*2);

console.log(value);


// number * undefined = NaN