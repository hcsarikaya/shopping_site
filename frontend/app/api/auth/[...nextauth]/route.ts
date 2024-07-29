import users from "@/lib/users";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                if (!credentials || !credentials?.email || !credentials?.password) {
                    return null;
                }
                const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/login', {
                    cache: 'no-store',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password
                    }),
                })
                const foundUser = await res.json();
                console.log(foundUser)
                if (foundUser) {
                    return {
                        id: foundUser.username,
                        name: foundUser.name,
                        email: foundUser.email,
                        image: foundUser.imgname,
                        username: foundUser.username,
                        role: foundUser.role,
                        token: foundUser.token
                    }
                }
                return null;
            }
        })
    ],
    callbacks: {
        
        async jwt({ token, user, trigger, session }) {
            if (trigger === 'update') {
                return { ...token, ...session.user }
            }
            if (user) {
                token.username = user.username;
                token.role = user.role;
                token.token = user.token;
            };
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.username = token.username;
                session.user.role = token.role;
                session.user.token = token.token;
            };
            return session;
        }
    },
    pages: {
        signIn: '/auth/login',
    },
})

export { handler as GET, handler as POST }