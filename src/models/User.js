import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  telegramId: { type: Number, unique: true, required: true },

  username: String,
  firstName: String,
  lastName: String,

  firstVisitAt: { type: Date, default: Date.now },
  lastVisitAt: { type: Date, default: Date.now },

  visitsCount: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true },
});

export const User = mongoose.model('User', userSchema);
