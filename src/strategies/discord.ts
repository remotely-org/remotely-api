// Import required modules
import passport from "passport";
import { Strategy, Profile } from "passport-discord";
import { VerifyCallback } from "passport-oauth2";
import { User } from "../database/schemas";

passport.serializeUser((user: any, done)=> {
  //serialize the user middleware by fetching the ID
  return done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    //if the user is found it approved, else it throws null error object
     if(user){
      return done(null, user) 
    } else {
      return done(null, null);
    }
  } catch (err) {
    console.error(err);
    return done(err, null);
  }
});

// Define the scopes for the Discord API
var scopes = ["identify", "email", "guilds", "guilds.join"];

// Get the Discord API client ID, secret, and redirect URL from the environment variables
const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URL } =
  process.env;

// Set up a new Discord authentication strategy for Passport
passport.use(
  new Strategy(
    {
      clientID: DISCORD_CLIENT_ID!, // Set the client ID from the environment variable
      clientSecret: DISCORD_CLIENT_SECRET!, // Set the client secret from the environment variable
      callbackURL: DISCORD_REDIRECT_URL!, 
      scope: scopes, 
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      // Log the access token, refresh token, and profile for debugging purposes
      console.log(accessToken, refreshToken);
      console.log(profile);

      // Extract the Discord ID from the profile
      const { id: discordId } = profile;

      try {
        // Check if the user already exists in the database, and update their access token and refresh token if so
        const existingUser = await User.findOneAndUpdate(
          { discordId },
          { accessToken, refreshToken },
          { new: true } // Return the updated document instead of the original document
        );
        if (existingUser) return done(null, existingUser);

        // If the user doesn't exist, create a new User document and save it to the database
        const newUser = new User({ discordId, accessToken, refreshToken });
        const savedUser = await newUser.save();
        return done(null, savedUser);
      } catch (err) {
        // Handle any errors that occur during the authentication process
        console.log(err);
        return done(err as any, undefined);
      }
    }
  )
)