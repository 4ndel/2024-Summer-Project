# JavaScript

## Arrow Functions

() => {}

## ECS - entity, component, system


## Object literal

```
{
    key: value
}
```

## Promise
An object that promises it will eventually return a value

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

## async / await
a function that waits for promises

## Destructuring
destructuring breaks apart objects by keys into individual local variables

```
const obj = { one: 1, two: "two", three: Symbol()}

console.log(obj.one); // prints "1"
console.log(obj.two); // prints "two"
console.log(obj.three); // prints "symbol"

// destructuring breaks apart objects by keys
const {one, two, three} = obj

console.log(one); // prints "1"
console.log(two); // prints "two"
console.log(three); // prints "symbol"
```

## Spread operator
The spread operator expands an array or an object into a new array or object

```
const obj = {one: 1, two: "two"}
const newobj = {...obj, two: 2, three: 3}
const otherobj = {two: 2, three: 3, ...obj}

console.log(newobj);  // prints {one: 1, two: 2, three: 3}
console.log(otherobj);  // prints {one: 1, two: "two", three: 3}

const arr = [1, 2]
const newarr = [...arr, 2, 3]

// arrays only add values
console.log(newarr);  // prints [1, 2, 2, 3]
```

## Optional chaining
conditionally calls into an object if the key exists or returns undefined

```
const obj = { 
    one: {
        two: {
            three: 3
            hello: () => { console.log("hello world") }
        }
    }
}

console.log(obj.one?.two?.three) // prints 3
obj.one?.two?.hello?.() // prints "hello world"

console.log(obj.one?.missing?.three) // prints undefined
obj.one?.missing?.hello?.() // prints nothing
```