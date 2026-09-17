import mongoose from 'mongoose'

if(process.argv.length < 3) {
    console.log('give password also please')
    process.exit[1]
}

const password = process.argv[2]

const url = `mongodb+srv://eshaan:${password}@cluster0.lp39ldm.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 }) 

const phoneSchema = new mongoose.Schema({
    id: Number, 
    name: String, 
    number: String,
})

const Phone = mongoose.model('Phone', phoneSchema)

if(process.argv.length === 3) {

    Phone.find({}).then(persons => {

        console.log('phonebook:')

        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })

        mongoose.connection.close()
    })
}

else {

    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Phone({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)

        mongoose.connection.close()
    })
}
