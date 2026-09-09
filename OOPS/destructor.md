# Destructors

- `Used to deallocate memory`
- `It is created by default`

```cpp
class Person{
public:
  Person(){
    cout<<"Constructor called\n";
  }

  ~Person(){
    cout<<"Destructor called\n";
  }
}
```


- For object created by static allocation destructor is called automatically but not for dynamically called object;

- For dynamically created object we need to call destructor manually

```cpp
Person *p = new Person();
delete p;
```

## Virtual Destructor

- A virutal desturctor ensure that when you delete an object through a base class pointer , the derived class destructor is called first, then the base class destructor

```cpp
class Base{
  public :
  ~Base(){
    cout<<"Base Destructor\n";
  }
}

class Derived : public Base {
  public : 
  ~Derived(){
    cout<<"Derived Destructor\n"
  }
}

int main(){
  Base *ptr = new Derived();
  delete ptr;
}
```

```bash
Base Destructor
```

To delete derived class to we need to have

```cpp
virutal ~Base(){
  // task;
}
```

- A destructor can be pure virtual but you still need to define the destructor or it will give `linker error`

- We can only have one destructor, because : 
  - Has no parameters
  - Has fixed name
  - Has fixed behavior

## User defined Destructor

- User defined destructor when your class manages resources that must be released manually

```cpp
class A{
  int *ptr;

  public :
  A(){
    ptr = new int(10);
  }

  ~A(){
    delete ptr;
  }
}
```

