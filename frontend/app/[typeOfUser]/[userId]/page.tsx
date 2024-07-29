import { notFound } from "next/navigation";
import UserDetail from "./UserDetail";
import MerchantDetail from "./UserDetail";

type UserType = 'user' | 'merchant';

export default async function UserPage({ params }: { params: { userId: string, typeOfUser: UserType } }) {
    if (params.typeOfUser !== 'user' && params.typeOfUser !== 'merchant') {
        notFound();
    }
    const req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/'+(params.typeOfUser+'s')+'/username/' + params.userId, {
        cache: 'no-store'
    });
    const res = await req.json();
    if (!res) {
        notFound();
    }
    console.log(res)
    return (
        <>
            <UserDetail typeOfUser={params.typeOfUser} user={res} />
        </>
    );
}
