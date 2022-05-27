const mongoose = require('mongoose');
const dbURL = "mongodb+srv://Drigger91:Piyush9192%40@cluster0.ehq3p.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbURL , {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

