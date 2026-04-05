require('dotenv').config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { ObjectId } = require('mongodb');
const { getDB } = require('./db');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = getDB();

        const existingUser = await db.collection('users').findOne({
          googleId: profile.id
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = {
          googleId: profile.id,
          name: profile.displayName || 'Unknown User',
          email:
            profile.emails && profile.emails.length > 0
              ? profile.emails[0].value
              : null,
          picture:
            profile.photos && profile.photos.length > 0
              ? profile.photos[0].value
              : null,
          createdAt: new Date()
        };

        const result = await db.collection('users').insertOne(newUser);

        const createdUser = await db.collection('users').findOne({
          _id: result.insertedId
        });

        return done(null, createdUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  try {
    const db = getDB();
    const user = await db.collection('users').findOne({
      _id: new ObjectId(id)
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;