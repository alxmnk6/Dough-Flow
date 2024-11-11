import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  date: Date;
  description: string;
  amount: number;
  category?: string;
  isSubscription?: boolean;
  isPotentialFraud?: boolean;
  userId: string;
}

const TransactionSchema = new Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String },
  isSubscription: { type: Boolean, default: false },
  isPotentialFraud: { type: Boolean, default: false },
  userId: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema); 