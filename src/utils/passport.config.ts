import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../resources/User/user.model';

const configurePassport = () => {
    // Google OAuth Configuration
    passport.use(
        new GoogleStrategy(
            {
                clientID: `${process.env.GOOGLE_CLIENT_ID}`,
                clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
                callbackURL: '/api/users/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log(profile);
                
                try {
                    const newUser = {
                        name: profile.displayName,
                        email: profile.emails?.[0]?.value,
                    };
                    
                    let user = await User.findOne({ email: newUser.email });
                    if (user) {
                        throw Error('User already exists!');
                    } else {
                        user = await User.create(newUser);
                        done(null, user);
                    }
                } catch (err) {
                    console.error(err);
                    done(err);
                }
                return done(null, profile);
            },
        ),
    );

    // Serialize and Deserialize User
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user: any, done) => {
        done(null, user);
    });
};

export default configurePassport;
