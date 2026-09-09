# Access Modifiers

Three types of access modifiers :

- public :

  Accessibility :
  - inside the same class
  - inside derived class
  - outside the class

- private (default)

  Accessibility :
  - inside the same class

- protected :

  Accessibility :
  - Inside the same class
  - Inside the derived class

## Special Mention

- A friend is a function or class that is allowed to access the private and protected member of another class.

- Friend Function : 

```cpp
class A{
  private:
  int x = 10;

  friend void show(A obj);
}

void show(A obj){
  cout<<obj.x;
}
```

- Friend Class : 

```cpp
class A{
  private:
  int x = 10;

  friend class B;
}

class B{
  public :
  void display(A obj){
    cout<<obj.x;
  }
}
```

