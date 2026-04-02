import mongoose, { Schema, Document } from "mongoose";

export interface GoogleTokenDoc extends Document {
  access_token: string;
  refresh_token: string;
  expiry_date?: number;
  token_type?: string;
  scope?: string;
}

const GoogleTokenSchema = new Schema<GoogleTokenDoc>(
  {
    access_token: { type: String, required: true },
    refresh_token: { type: String, required: true },
    expiry_date: { type: Number },
    token_type: { type: String },
    scope: { type: String },
  },
  { timestamps: true }
);

export const GoogleToken =
  mongoose.models.GoogleToken ||
  mongoose.model<GoogleTokenDoc>("GoogleToken", GoogleTokenSchema);