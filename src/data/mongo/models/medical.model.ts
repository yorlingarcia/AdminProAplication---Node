import { model, Schema } from "mongoose";

const MedicalSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  img: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
});

MedicalSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret.password;
  },
});

// userSchema.method('toJSON', function () {
// })

export const MedicalModel = model("Medical", MedicalSchema);
