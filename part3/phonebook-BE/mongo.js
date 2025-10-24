const mongoose = require("mongoose");

if (process.argv.length < 5) {
}

const password = process.argv[2]; // 
const username = process.argv[3];
const phoneNumber = process.argv[4];

const uri = `mongodb+srv://ismailbozk_db_user:${password}@cluster0.bj935i6.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

function createPhonebookSchemModel() {
  const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const PhonebookModel = mongoose.model("Phonebook", phonebookSchema);
  return PhonebookModel;
}

function listOfPhonebookEntries() {
  const PhonebookModel = createPhonebookSchemModel();
    PhonebookModel.find({}).then((result) => {  
    console.log("phonebook:");
    result.forEach((entry) => {
      console.log(`${entry.name} ${entry.number}`);
    });
    console.log("----");
    mongoose.connection.close();
  });
}

function createPhonebookEntry(name, number) {
  const PhonebookModel = createPhonebookSchemModel();

  const phonebookEntry = new PhonebookModel({
    name: username,
    number: phoneNumber,
  });

  phonebookEntry.save().then(() => {
    console.log(`added ${username} number ${phoneNumber} to phonebook`);
    mongoose.connection.close();
  });
}

mongoose.connect(uri);

if (process.argv.length === 3) {
  listOfPhonebookEntries();
} else if (process.argv.length === 5) {
  createPhonebookEntry(username, phoneNumber);
} else {
  console.log(
    "unexpected command format. Please use one of the formats below\n node mongo.js <password> <username> <phone number> \n node mongo.js <password>"
  );
  process.exit(1);
}
