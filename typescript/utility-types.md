# Utility Types

## `Partial<T>`

Makes all properties of `T` optional.

```ts
interface User{
    id : number;
    name:string;
    email:string
}

const updateUser = (user:Partial<User>)=>{
    console.log(user);
}

updateUser({name:"Alice"});
updateUser({};)
```

## `Required<T>`

The opposite of `Partial<T>`: makes all properties of `T` required.

```ts
interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
}

const startServer = (config: Required<Config>) => {
  console.log(config);
};

startServer({ host: "localhost", port: 3000, debug: false });
```

## `Pick<T, K>`

Creates a new type by selecting only the specified keys from `T`.

```ts
interface Product {
    id: number;
    name:string;
    price:number;
    description:string;
    stock:number:
}

type ProductCard = Pick<Product, "id" | "name" | "price">;

const card : ProductCard = {
    id : 1,
    name : "Keyboard",
    price : 49.99
}
```

## `Omit<T, K>`

Creates a new type by removing specified keys from `T`. It is the inverse of `Pick`.

```ts
interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
}

type Publisher = Omit<User, "passwordHash">;

const getUser = (): Publisher => ({
  id: 42,
  name: "Bob",
  email: "bob@example.com",
});
```
