import {NextRequest} from "next/server";

const GetHandler = async (req: any) => {
    const responseForums = await fetch(`http://localhost:8080/forums`);
    if (responseForums.status !== 204){
        const parsed = await responseForums.json();
        return Response.json(parsed);
    }
    return Response.json({});
}

const AddHandler = async (req: NextRequest)=> {
    const data = await req.json();
    const title = data.title;
    const response = await fetch(`http://localhost:8080/forums`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title})

    });
    return Response.json(await response.json());

}


const DeleteHandler = async (req: NextRequest)=> {
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