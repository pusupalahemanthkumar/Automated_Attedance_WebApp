// Importing Required Files And Packages Here
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const SubcriptionDataSchema = mongoose.Schema({
    endpoint: {
        type: String,
    },
    expirationTime: {
        type: String,
    },
    keys: {
        p256dh: String,
        auth: String,
    },
});

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: String,
    },
    role: {
        type: String,
        required: true,
    },
    course: {
        type: String,
    },
    year: {
        type: Number,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    department: {
        type: String,
    },
    subject: {
        type: String,
    },
    subcriptionDetails: [SubcriptionDataSchema]

}, {
    timestamps: true
})



userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;