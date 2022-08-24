import CredentialsProviders from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import db from "../../../utils/db";
import User from "../../../models/Users";
import { compareSync } from "bcryptjs";

export default NextAuth ({
    session:{
        strategy: 'jwt',
    },
    callbacks:{
         async jwt({token, user}){
            if(user?._id){token.id= user._id}
            if(user?.isAdmin){token.isAdmin= user.isAdmin}
            return token;
         },
         async session ({session, token}){
            if(token?.id){session.id= token.id}
            if(token?.id){session.isAdmin= user.isAdmin}
            return session;
         }
    },
    providers: [
        CredentialsProviders({
            async authorize(credentials){
                await db.connect();
                const user = await User.findOne({
                    email:credentials.email
                });
                await db.disconnect();
                if(user&& compareSync(credentials.password, user.password) ){
                    return {
                        name: user.name,
                        id: user._id,
                        email: user.email,
                        image: 'f',
                        isAdmin:user.isAdmin
                    }
                }
                throw new Error ('enter a valid email and password')
            }
        })
    ]
})