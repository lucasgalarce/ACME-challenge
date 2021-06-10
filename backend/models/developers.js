import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const developerSchema = new Schema({
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
    assetsId: {
        type: Object,
        default: []
    },
    LicensesId: {
        type: Object,
        default: []
    }
});

developerSchema.methods.toJSON = function() {
    let developer = this;
    let developerObject = developer.toObject();
    delete developerObject.password;

    return developerObject;
}

const Developers = mongoose.model('Developers', developerSchema);
export default Developers;
