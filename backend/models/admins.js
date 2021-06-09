import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    id: {
        type      : String,
        index     : true,
		trim      : true,
		required  : true,
        maxlength : 36
    },
    active: {
        // TRUE = Enable, FALSE = Disable
        type      : Boolean,
        default   : false,
        required  : true
    },
    fullname: {
        type: String,
        unique: true,
        required: [true, 'Fullname is require']
    },

});

adminSchema.methods.toJSON = function() {
    let admin = this;
    let adminObject = admin.toObject();
    delete adminObject.password;

    return adminObject;
}

const Admins = mongoose.model('Admins', adminSchema);
export default Admins;
