import 'dotenv/config'
import mongoose from 'mongoose' 

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI 

console.log('connecting to', url)

mongoose.connect(url, { family: 4 }) 
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String, 
    minLength: 8,

    validate: {
      validator: function(value) {
         return /^\d{2,3}-\d+$/.test(value)
      },

      message: props => 
        `${props.value} is not a valid phone number`
    }
  }
    
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Phone = mongoose.model('Phone', phoneSchema)

export default Phone 

