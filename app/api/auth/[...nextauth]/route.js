import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import user from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await user.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();
                // Check if user exists
                const userExists = await user.findOne({ email: profile.email });
                // If user does not exist, create a new user
                if (!userExists) {
                    await user.create({
                        email: profile.email,
                        username: profile.name.replace(/\s+/g, "_").toLowerCase(),
                        image: profile.picture
                    });
                }
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        }
    }
});

export { handler as GET, handler as POST };