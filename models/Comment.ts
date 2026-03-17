import mongoose, { Schema, Model } from "mongoose";
import type { ServerComment } from "@/types";

const CommentSchema = new Schema<ServerComment>(
  {
    equipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    collection: "comments",
  }
);

const CommentModel: Model<ServerComment> =
  mongoose.models.Comment || mongoose.model<ServerComment>("Comment", CommentSchema);

export default CommentModel;
