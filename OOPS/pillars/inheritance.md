# Inheritance

```cpp
class Human{
public:
  int height;
  int weight;
  int age;

public:
  int getAge(){
    return this->age
  }

  int getHeight(){
    return this->height
  }
};

class Gay{
public:
  void speak(){
    cout<<"I'm gay"
  }
};

class Male:public Human, public Gay{
  public:
  string color;

  void sleep(){
    cout<<"Male sleeping"<<"\n";
  }
}
```

- private data members of any class cannot be inherited

## Types of Inheritance

- Single inheritance
- Multiple inheritance
- Multi-level inheritance
- hierarchial inheritance
- Hybrid inheritance

## Inheritance Ambiguity

- '::' : scope resolution operator

## Diamond Problem

      A
     / \
    B   C
     \ /
      D

```cpp
class A{};
class B : virtual public A{};
class C : virtual public A{};

class D : public B, public C {};
```

- pure virtual function :

```cpp
virtual void calculateInterest() = 0;
```

`A pure virtual function should be overriden by derived class`

- Abstract class : A class that is intended to be used for inheritance. It cannot be instantiated. An abstract class can consist of both abstract and non-abstract methods.

