if(!Array.prototype.myReduce){
  Array.prototype.myReduce = function(callback,initial){
     let defaultInitialValue = initial || 0;
    let acc = defaultInitialValue
    for(let i=0;i<this.length;i++){
      acc = callback(acc,this[i],i,this);
    }
    return acc;
  }
}


let arr = [1,2,3,4,5];

let val = arr.myReduce((acc,item)=>acc+item,2);
console.log(val);

// let val = arr.reduce((acc,item)=>{
//   acc + item
// },0)

// Updated reducer for some edge cases like this
// [1,2,3,4].myReduce((a,b) => a*b, 1) // works
// [1,2,3,4].myReduce((a,b) => a*b, 0) // broken logic

// argument => it like how many arguments has been passed to function call

let startIndex;
    let acc;
    if ((arguments.length < 2 && !this.length)) {
        throw new TypeError("called on null or undefined");
    }
    if ((typeof callback !== "function")) {
        throw new TypeError("callback not a function");
    }
    if (arguments.length >= 2) {
        acc = initialValue;
        startIndex = 0;
    } else {
        acc = this[0];
        startIndex = 1;
    }
    for (let i = startIndex; i <= this.length-1; i++) {
        if (i in this) {
        acc = callback(acc, this[i],i,this);
        }
    }
    return acc;