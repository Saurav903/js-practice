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