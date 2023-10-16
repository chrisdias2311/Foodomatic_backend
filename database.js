const mongoose = require('mongoose');

// const url = `mongodb+srv://opfrost81:sanjoo@foodomatic.jdilhtl.mongodb.net/?retryWrites=true&w=majority`;

const url = `mongodb+srv://rebelloansley:Ansleyrebello18!@cluster0.oafuqjd.mongodb.net/?retryWrites=true&w=majority`;



const connectDB = async () => {
    try{
        const conn = await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`MongoDB connected to  ${conn.connection.host}`);
    } catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;

// uniExmembers2311: password