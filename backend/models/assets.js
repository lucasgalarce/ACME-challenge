import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const assetSchema = new Schema({
    id: {
        type      : String,
        index     : true,
		trim      : true,
		required  : true,
        maxlength : 36
    },
    brand: {
        type: String,
        unique: true,
        required: [true, 'Brand is require']
    },
    model: {
        type: String,
        required: [true, 'Model is require']
    },
    type: {
        type: String,
        enum: ['laptop', 'keyboard', 'mouse', 'headset', 'monitor'],
        required: [true, 'Model is require']
    }
});

assetSchema.methods.toJSON = function() {
    let asset = this;
    let assetObject = asset.toObject();
    delete assetObject.password;

    return assetObject;
}

const Assets = mongoose.model('Assets', assetSchema);
export default Assets;
