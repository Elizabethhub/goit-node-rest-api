import { Schema, model } from "mongoose";
import { handleSaveError, handleFindError, setUpdateSetting } from "./hooks.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
// throw new Error

contactSchema.post("save", handleSaveError);

contactSchema.pre("findByIdAndUpdate", setUpdateSetting);

contactSchema.post("findByIdAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);
// mouse = mice
// contact = contacts

export default Contact;
