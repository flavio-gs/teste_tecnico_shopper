import mongoose, {Schema, Document} from "mongoose";

export interface NewReading {
    id: string;
    userId: string;
    readingType: 'water' | 'gas';
    value: number;
    imageUrl: string;
    timeStamp: Date;
  }

export interface Reading extends Document{
    id: string;
    userId: string;
    readingType: 'water' | 'gas';
    value: number;
    imageUrl: string;
    timeStamp: Date;
}

const ReadingSchema: Schema = new Schema({
    id: {type: String, required: true, unique: true},
    userId: {type: String, required: true},
    readingType: {type: String, required: true, enum: ['water','gas']},
    value: {type: Number, required: true},
    imageUrl: {type: String, required: true},
    timeStamp: {type:Date, required: true}
});

export default mongoose.model<Reading>('Reading', ReadingSchema);