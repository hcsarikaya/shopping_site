import * as sea from "node:sea";
import {NextRequest} from "next/server";

const GetHandler = async (req: any) => {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const id =  searchParams.get("forum_id");

    const responseForums = await fetch(`http://localhost:8080/forums/entries/${id}`);
    if (responseForums.status !== 204){
        const parsed = await responseForums.json();
        console.log(parsed);
        return Response.json(parsed);
    }
    return Response.json({});
}


const AddHandler = async (req: NextRequest)=> {
    const data = await req.json();
    const forum_id = data.forum_id;
    const userId = data.userId;
    const text = data.text;
    const body = JSON.stringify({text, userId});

    const response = await fetch(`http://localhost:8080/forums/entries/${forum_id}`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, userId})

    });

    return Response.json(await response.json());

}


const DeleteHandler = async (req: any)=> {
    const data = await req.json();
    const id = data.body;
    const response = await fetch(`http://localhost:8080/forums/${id}`,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return Response.json(data);

}

export {GetHandler as GET, DeleteHandler as DELETE, AddHandler as POST};