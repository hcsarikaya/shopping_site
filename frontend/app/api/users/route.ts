const GetHandler = async (req: any) => {
    const responseUsers = await fetch(`http://localhost:8080/users`);
    if (responseUsers.status !== 204){
        const parsed = await responseUsers.json();
        return Response.json(parsed);
    }
    return Response.json({});
}

const DeleteHandler = async (req: any)=> {
    const data = await req.json();
    const id = data.body;

    const response = await fetch(`http://localhost:8080/users/${id}`,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return Response.json(data);

}

export {GetHandler as GET, DeleteHandler as DELETE};