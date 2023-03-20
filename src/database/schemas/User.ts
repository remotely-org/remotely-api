import mongoose, { Schema } from "mongoose";

interface User {
  discordId: string,
  accessToken: string,
  refreshToken: string
}

const UserSchema = new Schema<User>({
  discordId: {
    type: mongoose.SchemaTypes.String,
    require: true,
    unique: true,
  },
  accessToken: {
    type: mongoose.SchemaTypes.String,
    require: true,
  },
  refreshToken: {
    type: mongoose.SchemaTypes.String,
    require: true,
  },
});

export default mongoose.model('users', UserSchema);
