import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type      : String,
        index     : true,
		trim      : true,
		required  : true,
        maxlength : 36
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is require']
    },
    password: {
        type: String,
        required: [true, 'Password is require']
    }
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

const Users = mongoose.model('Users', userSchema);
export default Users;
