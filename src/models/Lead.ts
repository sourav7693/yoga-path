import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface Payment {
  course: Types.ObjectId;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  amount: number;
  currency: string;
  paidAt: Date;
}
export interface Enrollment {
  course: Types.ObjectId;
  location?: string;
  remark?: string;
  enrolledAt: Date;
}

export interface LeadDocument extends Document {
  leadId: string;
  name: string;
  mobile: string;
  enrollments: Enrollment[];
  payments: Payment[];
  status: "Lost" | "Pending" | "Enrolled";
}

const enrollmentSchema = new Schema<Enrollment>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  location: String,

  remark: String,

  enrolledAt: {
    type: Date,
    default: Date.now,
  },
});

const paymentSchema = new Schema<Payment>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  razorpayOrderId: {
    type: String,
    required: true,
  },

  razorpayPaymentId: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  currency: {
    type: String,
    default: "INR",
  },

  paidAt: {
    type: Date,
    default: Date.now,
  },

  razorpaySignature: {
    type: String,
    required: true,
  },
  
});

const leadSchema = new Schema<LeadDocument>(
  {
    leadId: { type: String, required: true, unique: true },

    name: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
    },

    enrollments: {
      type: [enrollmentSchema],
      default: [],
    },

    payments: {
      type: [paymentSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["Lost", "Pending", "Enrolled"],
      default: "Lost",
    },
  },
  { timestamps: true },
);

leadSchema.index(
  { mobile: 1, "enrollments.course": 1 },
  { unique: true, sparse: true },
);

const Lead: Model<LeadDocument> =
  mongoose.models.Lead || mongoose.model<LeadDocument>("Lead", leadSchema);

export default Lead;
