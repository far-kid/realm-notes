class Person{
    constructor(email,password){
        this.email = email;
        this.password = password;
    }

    get email(){
        return this._email;
    }

    set email(value){
        this._email = value
    }

    get password(){
        return this._password;
    }

    set password(value){
        this._password = value;
    }
}

const p1 = new Person("chandan@gmail.com","123")

console.log(p1.email);