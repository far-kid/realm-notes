# Static Keyword

- A static data member does not belong to an object but to the entire class.

- A static function does not have a `this` keyword because `this` points to the current object, and there is no current object.

- A static function can access only static members.

- Static member functions cannot be virtual, because
    - Belongs to the class, not object
    - No this pointer
    
