const mongoose = require('mongoose');

const dbConection = async () => {

    try {
        await mongoose.connect(process.env.MONGODBCNN);
        console.log('bd successfully connected ');
    } catch (error) {
        console.log(error);
        throw new Error('error conect in DB');
    }
};

module.exports = {dbConection};