function curry(fn){
  return function curried(...arg){ // this will make each parameters as array
    if(arg.length >= fn.length){ // this will check length of all arrays
      return fn.apply(this,arg);
    }
    return function more(...moreArg){
      return curried.apply(this,arg.concat(moreArg));
    }
  }
}



const add = (a,b,c)=> (a+b+c);

const val = curry(add);

console.log(val(3)(2)(1));
console.log(val(3,2)(1));
console.log(val(3)(2,1));