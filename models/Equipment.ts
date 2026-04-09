import mongoose, { Schema, Model } from "mongoose";
import type { ServerEquipment } from "@/types";

const EquipmentSchema = new Schema<ServerEquipment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    price: String,
    type: String,
    description: { type: String, required: true },
    brand: { type: String },
    images: [String],
    year: Number,
    date: {
      type: Date,
      default: () => new Date(new Date().toISOString())
    },
  },
  {
    collection: "equipment",
  }
);

const EquipmentModel: Model<ServerEquipment> =
  mongoose.models.Equipment || mongoose.model<ServerEquipment>("Equipment", EquipmentSchema);

export default EquipmentModel;
