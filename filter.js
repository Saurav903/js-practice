if(!Array.prototype.myFilter){
  Array.prototype.myFilter = function(callback){
    let arr = [];
    for(let i=0; i<this.length; i++){
      if(i in this && callback(this[i],i,this)){
        arr.push(this[i]);
      }
    }
    return arr;
  }
}


let arr = [1,2,3,4,5];

let value = arr.myFilter((item)=> item>2);
console.log(value);

// let value = arr.filter((item)=>item >2);