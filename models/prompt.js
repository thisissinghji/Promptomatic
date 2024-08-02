import mongoose, { Schema, model, models } from "mongoose";


const promptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required']
    },
})

export default models.Prompt || model('Prompt', promptSchema)

// the above code is used to create a new prompt schema. it will have a creator, prompt, and tag.
// the creator will be a reference to the user model. the prompt and tag will be required. the prompt model will be exported.
// the prompt model will be created if it does not exist. otherwise, it will be used.
