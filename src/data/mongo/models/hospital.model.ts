import { model, Schema } from "mongoose";

const HospitalSchema = new Schema({
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
});

HospitalSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret.password;
  },
});

// userSchema.method('toJSON', function () {
// })

export const HospitalModel = model("Hospital", HospitalSchema);
