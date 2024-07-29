const GetHandler = async (req: any) => {
    const responseMerchants = await fetch(`http://localhost:8080/merchant`);
    if (responseMerchants.status !== 204){
        const parsed = await responseMerchants.json();
        return Response.json(parsed);
    }
    return Response.json({});
}

const DeleteHandler = async (req: any)=> {
    const data = await req.json();
    const id = data.body;
    const response = await fetch(`http://localhost:8080/merchant/${id}`,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return Response.json(data);

}

export {GetHandler as GET, DeleteHandler as DELETE};