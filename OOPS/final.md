# `final`

- The `final` keyword is used to prevent inheritance or overriding.

```cpp
class A final {};

class B: public a {}; // Error
```

```cpp
class Base{
    public :
    virtual void show() final{}
}

class Derived : public Base{
    public:
    void show() override{} // Error
}
```
- A constructor cannot be marked `final` because:
  - It is not virtual.
  - It cannot be overridden.
  - It does not participate in polymorphism.

- A destructor can be marked `final` because:
  - It can be overridden.
  - It participates in polymorphism.

