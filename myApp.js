require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})

let arrayOfPeople = [
  {name:'Prota Mateja', age: 45, favoriteFoods:['lignje', 'prsuta']},
  {name:'Irena Gojkovic', age: 33, favoriteFoods:['spagete', 'sarma', 'brokoli']},
  {name:'Filip Sekulic', age: 23, favoriteFoods:['prase', 'jagnje', 'cevapi']},
]

const Person = mongoose.model('Person', personSchema)

const personName = Person => {
  return Person.name
};

const personId = '678292766172cab09a1a557b';



const createAndSavePerson = (done) => {
        
  let zika = new Person({name: "Zika", age:53, favoriteFoods:['ananas']});
  zika.save((err,data) => {
    if(err){
      console.log(err)
    }
    else{
      done(null,data)
    }
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, createdPeople) => {
    if (err) {
      console.log(err);
      done(err, null);
    } else {
      done(null, createdPeople); 
    }
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      console.log(err);
      done(err, null);
    } else {
      done(null, data);
    }
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food
  }, (err, data) => {
    if(err){
      console.log(err)
      done(err, null);
    }
    else{
      done(null, data)
    }
  })};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err,data)=>{
    if(err){
      console.log(err)
      done(err,null);
    }
    else{
      done(null, data)
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;