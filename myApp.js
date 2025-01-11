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

const personId = '67829687837c1a16f402b9e2';




const createAndSavePerson = (done) => {
        
  let zika = new Person({name: "Zika", age:53, favoriteFoods:['ananas']});
  zika.save((err,data) => {
    if(err){
      console.log(err)
      done(err,null)
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
  findPersonById(personId, (err,result)=>{
    if(err){
    console.log(err)
    }
    else{
      result.favoriteFoods.push(foodToAdd);
      result.save((err, updatedResult)=>{
        if(err){
          console.log(err)
          } 
        else{
          done(null, updatedResult)
        }
      })
    }
  })
};



const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age:ageToSet}, {new:true}, (err, updatedResult)=>{
    if(err){
      console.log(err)
    }
    else{
      done(null, updatedResult)
    }
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deletedRecords)=>{
    if(err){
      console.log(err)
    }
    else{
      done(null, deletedRecords)
    }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, removedRecords)=>{
    if(err){
      console.log(err)
    }
    else{
      done(null, removedRecords)
    }
  })
};


const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort('name').limit(2).select('name favoriteFoods').exec((err, data) => {                  
      if (err) {
        console.log(err);                 
        done(err, null);                     
      } else {
        done(null, data);                     
      }
    });
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
