# Object-Oriented Programming

- `class` is the blueprint for creating object
- `object` is instance of the class
- `this` is a pointer that holds the address ofthe objedct that called the member function.
- Classes do not use memory. They merely serve as a template from which items are made. Now, objects actually initialize the class members and methods when they are created, using memory in the process.

- OOP it bottom up paradigm

- `Composition (strong 'has-a') : ` Composition is a relationship where one object strongly owns another object. If the parent object is destroyed, the child object is also destroyed.

- `Aggregation (weak 'has-a) : ` Aggregation is a relationship where one object contains a reference to another object, but both can exist independently

- `Inheritance represents 'is-a' relationship `

- Size of the object of class is the sum of sizes of all the properties in that class
- In case of empty class 1 byte is allocated to that class to keep track of the object

- Padding : Extra unused bytes added by the compiler inside a struct/class
- Alignment : Rule that data type types must start at addresses divisible by some number
- Greedy Alignment : The compiler aligns each member according to its own alignment requirement,
  inserting padding immediately when needed.

  ```cpp
  struct B {
    char c1;   // 1 byte
    double d;  // 8 bytes
    char c2;   // 1 byte
    int   i;   // 4 bytes
  };
  ```

  - char c1 :
    offset : 0
    size:1
    Next offset : 1

  - double d :
    offset : 1
    size : 8 (requires next multiple of 8)
    Next offset : 16 (7 (padding) + 8 (size of d))

  - char c2 :
    offset : 16
    size : 1
    Next offset : 17

  - int i :
    offset : 17
    size : 4 (required next multiple of 4)
    Next offset : 24(3 (padding) + 4 (size of i))

  - Tail padding : Struct/Class size must be mulitple of largest alignment
    (No extra padding needed in this case)

## Advantages

- Improved software development productivity
- Improved software maintainability
- Faster Development
- Low cost of development
- Higher quality Software

## Disadvantages

- Steep learning curve
- Large program size
- Slower programs
- Not suitable for all types of problems

- Constructor chaining : Constructor chaining is the process of calling and constructor from another within the same class or between class and derived classes.
  It allows constructors to resue code and perform common intialization tasks.

`In imperative programming, you tell the computer how to do something. We control the flow (loops, conditions, variables, state changes)`

`In declarative programming, you tell the computer what you want,not how to do it`

`Liskov Substitution Principle (LSP) : Objects of a superclass should be replaceable with objects of its subclasses without breaking the correctness of the program

If class B is a subclass of class A, then we should be able to use B wherever A is expected and the program should still work correctly
`
