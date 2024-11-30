// user > hospitals > blood type > blood banks > doner

//a user can only be created only if any of isAdmin,isDoner,isRecipient is true.
//if any of isDoner or isRecipient is true blood and bloodBank must be provided (valid db id)
//only admin user can be deleted using DELETE users/:id, doners at /doners/:id, recipients at recipients/:id
//user can't be doner and recepient at the same time && admin can't be any of them

const user = {
    "name": "imran",
    "age": 28,
    "email": "user@gmail.com",
    "password": "user",
    "phone": "555-5555",
    "city": "xy city",
    "country": "xy country",
    "isDoner": true,
    "blood": "6749ac518968ef17c86a2f24",
    "bloodBank": "6749cbcf9f567a978b59f03c"
}

const hospital = {
    name: "ABC",
    city: "karachi",
    country: "pakistan"
}

const bloodType = {
    name: "A+",
    description: "its A+ blood group"
}
const bloodBank = {
    name: "City Blood Bank",
    hospital: "6749a9c88968ef17c86a2f14",
    pone: "222-222-121"
}

const doner = {
    user: "User id", //admin can't be a doner or recepient
    blood: "Blood id",
    bloodBank: "BloodBank id"
}
const recipient = {
    user: "User id",  //admin can't be a doner or recepient
    blood: "Blood id",
    bloodBank: "BloodBank id"
}



