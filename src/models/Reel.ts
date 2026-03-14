import mongoose from "mongoose";

export interface ReelDocument extends mongoose.Document {
    reelId : string;
    reelName: string;
    videoUrl: string;
    publicId: string;
    createdAt: Date;
    updatedAt: Date;
}

const ReelSchema = new mongoose.Schema<ReelDocument>(
  {
    reelId: {
      type: String,
      required: true,
      unique: true,
    },

    reelName: {
      type: String,
      required: true,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Reel = mongoose.models.Reel || mongoose.model<ReelDocument>("Reel", ReelSchema);

export default Reel;