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

// compose function

const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

// Pipe and compose function

const pipe = (...fns) => x => fns.reduce((acc,fn)=> fn(acc),x);

// simple pipe 
// function pipes(...fns){
//   return function x(){
//     return fns.reduce((acc,fn)=>
//        fn(acc),x
//     )
//   }
// }

const double = x => x * 2;
const addTen = x => x + 10;
const square = x => x * x;

const transform = pipe(double, addTen, square);
transform(3); // ((3*2)+10)^2 = 256