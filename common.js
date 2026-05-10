for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}


/* In programming, a closure is a function that “remembers” variables from the scope where it was created, even after that outer scope has finished executing.

Example in JavaScript:

function makeCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();

console.log(counter()); // 1
console.log(counter()); // 2

The inner function is a closure because it keeps access to count after makeCounter() has returned.

Why closures are useful

Closures are mainly about state + encapsulation + behavior.

1. Private state

They let you hide internal data without exposing it globally.

function createBankAccount(balance) {
  return {
    deposit(amount) {
      balance += amount;
    },
    getBalance() {
      return balance;
    }
  };
}

balance cannot be modified directly from outside.

This is one of the oldest patterns for data privacy in JavaScript before class #privateFields.

2. Function factories

You can generate customized functions dynamically.

function multiplyBy(n) {
  return function (x) {
    return x * n;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

Useful in:

reusable utilities
middleware
dependency injection
configuration systems
3. Maintaining state between calls

Without global variables.

function once(fn) {
  let called = false;

  return function (...args) {
    if (!called) {
      called = true;
      return fn(...args);
    }
  };
}

Common in:

caching
memoization
throttling/debouncing
retries
rate limiting
4. Callbacks and async programming

Closures preserve variables for later execution.

for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}

The callback “remembers” i.

This is foundational in:

event handlers
promises
React hooks
async APIs
Memory implications

Closures are powerful because they keep variables alive.

That also means:

variables captured by closures are not garbage-collected until the closure itself becomes unreachable.

Example:

function bigData() {
  const hugeArray = new Array(1_000_000).fill('*');

  return function () {
    console.log(hugeArray.length);
  };
}

const fn = bigData();

Even though bigData() finished, hugeArray stays in memory because the closure references it.

Potential memory problems
1. Accidental retention

A closure may keep large objects alive unintentionally.

function setup() {
  const massiveCache = loadHugeData();

  button.onclick = function () {
    console.log("clicked");
  };
}

If the closure indirectly references massiveCache, memory may never free.

2. Leaks with DOM/event listeners

Classic frontend issue.

element.addEventListener("click", () => {
  console.log(userData);
});

If the listener is never removed:

DOM node survives
closure survives
captured objects survive
3. Too many closures

Creating closures in tight loops or hot paths can increase:

allocations
GC pressure
hidden class complexity (in JS engines)

Usually not catastrophic, but important in performance-sensitive code.

How runtimes implement closures

Conceptually:

outer variables move from stack → heap
closure stores references to them

Without closures:

local variables usually disappear when function exits

With closures:

runtime preserves the environment object

This preservation has:

memory cost
indirection cost
GC tracking cost

Modern runtimes optimize heavily, though.

Real-world usage

Closures are everywhere.

JavaScript frameworks
React hooks
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }
}

handleClick closes over count.

Express middleware
function auth(role) {
  return function (req, res, next) {
    if (req.user.role === role) {
      next();
    }
  };
}

Middleware factory using closures.

Memoization
function memoize(fn) {
  const cache = new Map();

  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    }

    const result = fn(x);
    cache.set(x, result);

    return result;
  };
}

The cache persists via closure.

Debounce/throttle
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

Widely used in:

search boxes
resize handlers
scroll events
Dependency injection/configuration
function createLogger(prefix) {
  return function (msg) {
    console.log(`[${prefix}] ${msg}`);
  };
}

Used heavily in:

SDKs
libraries
service factories
When closures are preferable

Closures are excellent when:

state should be private
logic is localized
lightweight stateful behavior is needed
creating configurable functions

They are often cleaner than:

global state
mutable shared objects
class boilerplate
When NOT to overuse them

Avoid heavy closure usage when:

many instances capture huge objects
long-lived event handlers accumulate
debugging hidden state becomes difficult
object-oriented structure is clearer

Sometimes a class/object model is easier to maintain.

Mental model

A closure is basically:

“A function bundled together with the variables it depends on.”

Or more operationally:

“A function carrying its surrounding environment with it.”

That’s why they’re both:

incredibly useful
a common source of memory retention bugs in long-running applications. */