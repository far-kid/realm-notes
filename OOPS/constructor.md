

# Constructors

- `Constructors have no return type`

- `Constructors are not inherited because they are responsible for creating and initializing the specifc class they belong to`

## Default Constructor

- Takes no arguments
- Automatically called when an object is created without parameters
- if a constructor is not defined , C++ provides an implicit default constructor

```cpp
class Person{
public:
  Person(){
    cout<<"Default constructor called\n";
  }
};
```

## Parameterized Constructor

- `this` is pointer which points to the current object
- Takes arguments
- Used to initialize objects with specific values

```cpp
class Person{
  string name;
  Person(string n){
    name = n;
    cout<<"Hello "<<name<<"\n";
  }
};

class Person{
  string name;
  Person(string n) : name(n){
    cout<<"Hello "<<name<<"\n";
  }
};
```

## Copy Constructor (available by default)

- Intializes a new object as a copy of an existing object
- Pass by reference (if not it leads to infinite recursion)

- Default copy constructor :
  - Deep copy for primitive types
  - Shallow copy for pointers



```cpp
class Person{
public:
  string name;
  Person(string n) : name(n) {}

  Person(const Person &p){
    name = p.name;
    cout<<"Copy constructor called\n";
  }
}
```
