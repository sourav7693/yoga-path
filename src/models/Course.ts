import mongoose, { Schema, Document, Types } from "mongoose";

export interface CourseDoc extends Document {
  courseId: string;
  courseName: string;
  courseSlug: string;
  description?: string;

  category?: string;
  days?: string;

  startDate?: Date;
  endDate?: Date;
  meetingDuration?: string;

  courseMRP: number;
  discount?: number;
  offerPrice?: number;

  thumbnail?: {
    secure_url: string;
    public_id: string;
  };

  status: "Active" | "Draft";

  students: Types.ObjectId[];
}

const CourseSchema = new Schema<CourseDoc>(
  {
    courseId: {
      type: String,
      required: true,
      unique: true,
    },
    courseName: {
      type: String,
      required: true,
      trim: true,
    },

    courseSlug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
    },

    category: {
      type: String,
    },

    days: {
      type: String,
    },

    startDate: Date,
    endDate: Date,

    meetingDuration: String,

    courseMRP: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    offerPrice: Number,

    thumbnail: {
      secure_url: String,
      public_id: String,
    },

    status: {
      type: String,
      enum: ["Active", "Draft"],
      default: "Active",
    },

    students: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Lead",
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export const Course =
  mongoose.models.Course || mongoose.model<CourseDoc>("Course", CourseSchema);