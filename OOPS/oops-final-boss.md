# Object-Oriented Programming: Final Notes

```cpp
#include <bits/stdc++.h>
using namespace std;

class Account{
    private : 
    int accountNumber;
    double balance;
    string customerName;

    static int totalAccounts;

    protected :
    string accountType;

    public :
    Account(int accountNumber, double balance, string customerName, string accountType) :
        accountNumber(accountNumber),
        balance(balance),
        customerName(customerName),
        accountType(accountType) {
            totalAccounts++;
        }
    
    virtual ~Account(){}

    virtual void calculateInterest() = 0;

    virtual void withdraw(double amount){
        balance-=amount;
        cout<<"Amount withdrawed : "<<amount<<"\n";
        cout<<"Account balance : "<<balance<<"\n";
    };

    void deposit(double amount){
        balance+=amount;
    };

    void deposit(double amount, string note){
        balance+=amount;
        cout<<note<<"\n";
    }

    double getBalance(){

        return this->balance;
    }

    int getAccountNumber(){
        return this->accountNumber;
    }


    string getCustomerName(){
        return this->customerName;
    }

    static int getTotalAccounts(){
        return totalAccounts;
    }

    friend class FriendAccount;

    friend void friendFunction(Account &a);

    virtual void finalFunction() final{
        cout<<"You can't change me child\n";
        return;
    }
};

void friendFunction(Account &a){
    cout<<"You're hacked"<<"\n";
}


class FriendAccount{

    public : 
    FriendAccount(){};

    void print(Account &a){
        cout<<"I'm friend of your account\n";
        cout<<"Here is your balance : "<<a.balance<<"\n";
    }
};

int Account::totalAccounts = 0;

class SavingsAccount : public Account{

    private : 
    double interestRate;

    public : 
    SavingsAccount(int accountNumber, double balance, string customerName,string accountType, double interestRate) :
        Account(accountNumber,balance,customerName,accountType),interestRate(interestRate){}
    
    void calculateInterest() override{
        double interest = getBalance() * interestRate;
        cout<<"Interest : " << interest<<"\n";
    }

    void withdraw(double amount) override{
        if(getBalance()<amount){
            cout<<"Insufficient balance"<<"\n";
            return;
        }

        Account::withdraw(amount);

        cout<<"Amount withdrawed : "<<amount<<"\n";
        cout<<"Account balance : "<<getBalance()<<"\n";
    }

    SavingsAccount operator+(SavingsAccount &a){
        return SavingsAccount(getAccountNumber(),this->getBalance()+a.getBalance(),getCustomerName(),accountType, interestRate);
    }
};

class CurrentAccount : public Account{

    private : 
    double overDraftLimit;
    double interestRate;

    public : 
    CurrentAccount(int accountNumber, double balance, string customerName, string accountType, double interestRate, double overDraftLimit) :
        Account(accountNumber,balance,customerName,accountType),overDraftLimit(overDraftLimit), interestRate(interestRate) {}
    
    void calculateInterest() override{
        double interest = getBalance() * interestRate;
        cout<<"Interest : " << interest<<"\n";
    }

    void withdraw(double amount) override{
        if(getBalance()+overDraftLimit<amount){
            cout<<"Insufficient balance"<<"\n";
            return;
        }

        Account::withdraw(amount);

        cout<<"Amount withdrawed : "<<amount<<"\n";
        cout<<"Account balance : "<<getBalance()<<"\n";
    }
};

class FixedDepositAccount : public Account{
    private : 
    double interestRate;
    int tenureYears;
    bool matured;

    public :
    FixedDepositAccount(int accountNumber, double balance, string customerName, string accountType, double interestRate, int tenureYears, bool matured) :
        Account(accountNumber,balance,customerName,accountType), interestRate(interestRate),tenureYears(tenureYears), matured(matured) {}
    
    void calculateInterest() override {
        double interest = getBalance() * interestRate * tenureYears;
        cout<<"Total Interest after "<<tenureYears<<" years: "<<interest<<"\n"; 
    }

    void withdraw(double amount) override {
        if(!matured){
            cout<<"Cannot withdraw before maturity!\n";
        }

        Account::withdraw(amount);
    }

    void markAsMatured() {
        matured = true;
        cout<<"Account has matured. Withdrawal allowed.\n";
    }
};

class Notifiable {
    public : 
    virtual void sendNotification(string message) = 0;
};

class EmailNotification : public Notifiable {
    public : 
    void sendNotification(string message) override{
        cout<<"Email Notification : "<<message<<"\n";
    }
};

class SMSNotificaiton : public Notifiable{
    public :
    void sendNotification(string message) override{
        cout<<"SMS Notification : "<<message<<"\n";
    }
};

class Employee {
    private : 
    string name;
    string designation;

    public : 
    Employee(string name, string designation) : name(name), designation(designation) {}

    virtual void approveLoan(){
        cout<<"You don't have the permission to approve loan\n";
    }
};

class Manager : public Employee {
    public : 
    Manager(string name, string designation) : Employee(name,designation){}

    void approveLoan() override{
        //process to lend loan;
        cout<<"Loan approved\n";
    }
};

class Bank {
    vector<Account*>accounts;
    vector<Employee*>employees;
    string name;

    public : 
    Bank(string name) : name(name) {};

    void createAccount(){
        // logic to create multiple types of account
    }

    ~Bank(){
        for(auto acc:accounts){
            delete acc;
        }

        for(auto emp:employees){
            delete emp;
        }
    }
};

class Customer {
    vector<Account*>accounts;
    string name;

    public : 
    Customer(string name) : name(name) {};
};


int main(){
    return 0;
}
```
