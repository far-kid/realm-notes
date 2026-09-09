# Functions

## Inside-Class Function

- When a member function is declared inside the class body, it is called an inside class function

- inline by default

```cpp
class A{
    public : 
    void show(){
        cout<<"Hello";
    }
}
```

## Outside-Class Function

- When a function is declared inside the class but defined outside, it is called an outside class function

- not inline by default

```cpp
class A{
    public :
    void show();
}

void A::show(){
    cout<<"Hello";
}
```

`inline functions : This means the compiler may expand the function at the point of call to reduce function call overhead`
