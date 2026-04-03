import mongoose from "mongoose";


export interface GalleryDocument extends mongoose.Document {
  galleryId: string;
  title: string;
  imageUrl: string;
  publicId: string;
}

const gallerySchema = new mongoose.Schema<GalleryDocument>(
  {
    galleryId: { type: String, required: true, unique: true },
    title: { type: String },
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Gallery ||
  mongoose.model<GalleryDocument>("Gallery", gallerySchema);
