import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({
  date: { type: String, unique: true },
  visits: { type: Number, default: 0 },
  uniqueUsers: { type: Number, default: 0 },
});

export const Stat = mongoose.model('Stat', statSchema);
