# Polymorphism

- Having multiple forms.

## Types

### Compile-Time Polymorphism (Static Polymorphism)

#### Function Overloading

```cpp
class A{
public :
  void sayHello(){
    cout<<"Hello\n";
  }

  void sayHello(String name){
    cout<<"Hello "<<name<<"\n";
  }
}
```

- Functions that differ only in return type cannot be overloaded

#### Operator Overloading

```cpp
class B{
public:
  int a;
  int b;

  int add(){
    return a+b;
  }

  void operator+ (B &obj){
    cout<<this->a+obj.a<<"\n";
  }
}
```

### Operators That Can Be Overloaded

| Operator | Operator | Operator | Operator | Operator | Operator |
|----------|----------|----------|----------|----------|----------|
| `+` | `-` | `*` | `/` | `%` | `^` |
| `&` | `\|` | `~` | `!` | `,` | `=` |
| `<` | `>` | `<=` | `>=` | `++` | `--` |
| `<<` | `>>` | `==` | `!=` | `&&` | `\|\|` |
| `+=` | `-=` | `/=` | `%=` | `^=` | `&=` |
| `\|=` | `*=` | `<<=` | `>>=` | `[]` | `()` |
| `->` | `->*` | `new` | `new[]` | `delete` | `delete[]` |

### Operators That Cannot Be Overloaded

| Operator | Meaning |
|----------|---------|
| `::` | Scope resolution |
| `.` | Member access |
| `.*` | Pointer-to-member access |
| `?:` | Conditional / ternary operator |

### Runtime Polymorphism (Dynamic Polymorphism)

#### Method Overriding

- Only possible via inheritance

```cpp
class Base{
public :
  virtual void show(){
    cout<<"Inside base class\n";
  }
};

class Derived{
public:
  void show() override{
    cout<<"Derived show\n";
  }
}
```

- A compile-time polymorphism feature called overloading allows an entity to have numerous implementations of the same name. Method overloading and operator overloading are two examples

- Overriding is a form of runtime polymorphism where an entity with the same name but a different implementation is executed.

`Compile-time binding happens when the method call is resolved during compilation. The compiler already knows which function to call. Also called as early binding/ static binding`

`Runtime binding happens when the method call is resolved during execution (runtime). Also called as Late binding/ Dyanmic binding`

`Dynamic Binding : The function call is resolved at runtime, not at compile time. It happens when we use virtual functions`

`Message Passing : It refers to the process by which objects communicate with each other by invoking methods. It promotes encapsulation and abstraction by allowing interaction only through public interface`
