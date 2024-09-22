import mongoose from 'mongoose';

const DeveloperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://rnz-ressh.cloudinary.com/image/upload/s--WH4zBww5--/ar_16:10,c_fill,f_auto,g_auto,q_auto,w_1050/4LMON2O_49476_16599605286420_1920_jpg",
  },
}, { timestamps: true });

const Developer = mongoose.model('Developer', DeveloperSchema);
export default Developer;
