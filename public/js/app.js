
class patient {
    constructor(name, Illness, money, healthState) {
        this.name = name;
        this.Illness = Illness;
        this.money = money;
        this.pocket = [];
        this.healthState = healthState;
        this.treatment = "";
    }

    goTo(location) {
        this.location = location.name;
        location.patient = location.patient || [];
        location.patient.push(this);
        console.log(`${this.name} arrived to ${location.name}`);
        
    }

    takeCare() {

    }

    pay(price) {
        if (this.money >= price) {
            this.money -= price;
            console.log(`${this.name} payed ${price}€ for the treatment`);
            console.log(`${this.name} is now in a good health`);
            this.healthState = "healthy";
            
            console.log(`the money left is ${this.money} `);
        } else {
            console.log(`${this.name} doesn't have enough money`);
            console.log(`${this.name} died and has been sent to the cemetry`);

            cemetery.people.push(this)
            this.healthState = "dead"
        } 
    }

}



const Marcus = new patient("Marcus", "Indentation Error", 100, "Ill");
const Optimus = new patient("Optimus", "Unsave", 200, "Ill");
const Sangoku = new patient("Sangoku", "404", 80, "Ill");
const DarthVader = new patient("DarthVader", "Asthmatic", 110, "Ill");
const Semicolon = new patient("Semicolon", "Syntax Error", 60, "Ill");




class Doctor {
    constructor(name, money, office, waitingRoom) {
        this.name = name;
        this.money = money; 
        this.office = office;
        this.waitingRoom = waitingRoom;
    }
    
    diagnosis(patient, treatment) {
        console.log(`Diagnosing ${patient.name}, illness: ${patient.Illness}`);
        for (let item of treatment) {
        if (item.illness === patient.Illness) {
            patient.treatment = item.treatment;
            patient.treatmentPrice = item.price;
            console.log(`Treatment for ${patient.name}: ${item.treatment} (${item.price}€)`);
            break;
        }
    }
        
    }

    patientIn(waitingRoom) {
            if (waitingRoom.people && waitingRoom.people.length > 0) {
                const patient = waitingRoom.people.shift();
                this.office = this.office || [];
                this.office.push(patient);
            console.log(`${patient.name} enter the office ${this.name}`);

            if (patient.money >= 50) {
                patient.money -= 50; 
                console.log(`${patient.name} paid 50€ for consultation`);
                return patient;
            } else {
                console.log(`${patient.name} doesn't have enough money for consultation, they are dead`);
                patient.healthState = "dead";
                cemetery.patient = cemetery.patient || [];
                cemetery.people.push(patient);
                return null;  
            }
        } else {
            console.log("No one is in the waiting room");
            return null;
            
            } 
        }

    patientOn() {
        if (this.office && this.office.length > 0) {
            const patient = this.office.pop();
            console.log(`${patient.name} leave the office of  ${this.name}`);
            return patient;
        } else {
            console.log("none is in the waiting room ");
            return null;
        }
    }
}

const Debugger = new Doctor("Debugger", 0, []);

let diagnosisGrid  = [
    {
        illness: "Indentation Error",
        treatment: "Ctrl+Shift+F",
        price: 60,
    },
    {
        illness: "Unsave",
        treatment: "SaveOnFocusChange",
        price: 100,
    },
    {
        illness: "404",
        treatment: "CheckLinkRelation",
        price: 35,
    },
    {
        illness: "Asthmatic",
        treatment: "Ventolin",
        price: 40,
    },
    {
        illness: "Syntax Error",
        treatment: "F12+Doc",
        price: 20,
    }
]



class place {
    constructor(name, people) {
        this.name = name;
        this.people = people || [];
    }
}

const waitingRoom = new place("waiting room",[Marcus, Optimus, Sangoku, DarthVader, Semicolon]);
const cemetery = new place("cemetery", []);



class pharmacy extends place {
    constructor(name, people, money) {
        super(name, people)
        this.money = money;
    }
    


    givetreatment(patient) {
        let priceMed = patient.treatmentPrice;

        if (patient.money >= priceMed) {
            patient.pay(priceMed);
        } else {
            console.log(`${patient.name} cannot afford the treatment`);
            patient.healthState = "dead";
            cemetery.people.push(patient);
        }
    }
}



const Pharmacy = new pharmacy("Pharmacy", [], 0);

    while (waitingRoom.people.length > 0) {
        let p = Debugger.patientIn(waitingRoom);

        if (p) {
            Debugger.diagnosis(p, diagnosisGrid)
            Debugger.patientOn()
            Pharmacy.givetreatment(p)
            console.log("---- next ----")
        }
        
    }

console.log("Status:")
console.log(Marcus.name, "->", Marcus.healthState)
console.log(Optimus.name, "->", Optimus.healthState)
console.log(Sangoku.name, "->", Sangoku.healthState)
console.log(DarthVader.name, "->", DarthVader.healthState)
console.log(Semicolon.name, "->", Semicolon.healthState)

console.log("\nCemetery:")
cemetery.people.forEach(p => console.log(p.name))




