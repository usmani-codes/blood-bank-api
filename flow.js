// user > hospitals > blood type > blood banks > doner, recipient >
// create Transfusion table before Reaction table

// stand alone: organization, hospitals

//a user can only be created only if any of isAdmin,isDoner,isRecipient is true.
//if any of isDoner or isRecipient is true blood and bloodBank must be provided (valid db id)
//only admin user can be deleted using DELETE users/:id, doners at /doners/:id, recipients at recipients/:id
//user can't be doner and recepient at the same time && admin can't be any of them



//pendings:
// 1. result of a test can only be updated by admin.


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
    //pending: appointments:[Appointment] //doner and recipient must have appointments in them
    // tests:[Test]
}
const recipient = {
    user: "User id",  //admin can't be a doner or recepient
    blood: "Blood id",
    bloodBank: "BloodBank id",
    //pending: appointment:[appointments] //doner and recipient must have appointments in them
    // tests:[Test]
}

const appointment = {
    "doner": "674a2c1afef8fca67be4af08",
    "appointmentDate": "2024-12-01T00:30:00"
}

const test = {
    "doner": "674a2c1afef8fca67be4af08",
    "testDate": "2024-12-01T19:30:00.000Z",
    "result": "negative"
}

const blodStock = {
    "bloodBank": "6749cc0c1a3b7d07b91ab9ee",
    "blood": "6749ac518968ef17c86a2f24",
    "quantity": 5,
    "expiryDate": "2024-12-01T19:30:00.000Z",
}

const organization = [
    {
        "name": "Blood Donation Society",
        "phone": "555-7777"
    },
    {
        "name": "Red Cross",
        "phone": "555-7777"
    }
]

const transfusion = {
    "doner": "674a2c1afef8fca67be4af08",
    "recipient": "674a2b7efef8fca67be4aef2",
    "blood": "6749ac6b8968ef17c86a2f27",
    "transfusionDate": "2024-12-01T19:30:00.000Z",
    "reaction": "do not know yet ... :)"
}


