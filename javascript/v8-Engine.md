# V8 Engine

- The V8 engine is Google's open-source, high-performance JavaScript and WebAssembly engine. It powers the Google Chrome browser and is also the JavaScript engine used by Node.js.

## How It Works

- Parses JavaScript : 
    - Converts JavaScript source code into an Abstract Syntax Tree (AST).
- Generates Bytecode :
    - The Ignition interpreter compiles the AST into bytecode.
- Executes Bytecode :
    - Ignition begins executing the bytecode immediately.
- Optimizes Hot Code :
    - Frequently executed ("hot") functions are optimized by the TurboFan optimizing compiler into highly efficient machine code.
- Garbage Collection :
    - V8 automatically manages memory using a sophisticated garbage collector, reclaiming memory occupied by objects that are no longer referenced.

```
JavaScript Code
       │
       ▼
     Parser
       │
       ▼
 Abstract Syntax Tree (AST)
       │
       ▼
 Ignition (Interpreter)
       │
       ▼
     Bytecode
       │
       ▼
 Executes Code
       │
       ▼
 TurboFan (JIT Compiler)
       │
       ▼
 Optimized Machine Code
```


## Optimization Techniques

- Inline expansion: It is a compiler optimization by replacing the function calls with the corresponding function blocks.
- Copy elision: This is a compiler optimization method to prevent expensive extra objects from being duplicated or copied.
- Inline caching: It is a runtime optimization technique where it caches the execution of older tasks those can be lookup while executing the same task in the future.

## Hidden Classes

- Since JavaScript is a dynamic programming language, you can add or remove properties and methods from objects on the fly at runtime. This nature of JavaScript increases dynamic dictionary lookups (because objects are implemented as hash tables in memory) for retrieving a property on an object.

Let's consider the following example to see how the additional properties `age` and `gender` are added at runtime.

```js
function Person(name) {
  this.name = name;
}

var person1 = new Person("John");
var person2 = new Person("Randy");

person1.age = 40;
person1.gender = "Male";

person2.gender = "Female";
person2.age = 50;
```
- As a result, this behavior leads to lower JavaScript performance compared to the contiguous buffer method used in non-dynamic languages. The V8 engine provided a solution named hidden classes to optimize the access time when retrieving a property on an object. This optimization is achieved by sharing hidden classes among objects created in a similar fashion. These hidden classes are attached to each and every object to track its shape.

- When V8 engine sees the constructor function(e.g, Person) is declared, it creates a hidden class (let's say Class01) without any offsets. Once the first property assignment statement (this.name = name) is executed, V8 engine will create a new hidden class (let's say Class02), inheriting all properties from the previous hidden class (Class01), and assign the property to offset 0. This process enables compiler to skip dictionary lookup when you try to retrieve the same property(i.e, name). Instead, V8 will directly point to Class02. The same procedure happens when you add new properties to the object.

- For example, adding age and gender properties to Person constructor leads to transition of hidden classes(Class02 -> Class03 -> Class04). If you create a second object(Person2) based on the same Person object, both Class01 and Class02 hidden classes are going to be shared. However, the hidden classes Class03 and Class04 cannot be shared because second object has been modified with a different order of properties assignment.

- Since both the objects(person1 and person2) do not share the hidden classes, now V8 engine cannot use Inline Caching technique for the faster access of properties.


