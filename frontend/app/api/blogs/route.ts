const GetHandler = async (req: any) => {
    const responseBlogs = await fetch(`http://localhost:8080/blogs`);
    if (responseBlogs.status != 204) {
        const parsed = await responseBlogs.json();
        console.log(parsed);
        return Response.json(parsed);
    }
    return Response.json({});

}

const DeleteHandler = async (req: any)=> {
    const data = await req.json();
    const id = data.body;
    const response = await fetch(`http://localhost:8080/blogs/${id}`,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return Response.json(data);

}

export {GetHandler as GET, DeleteHandler as DELETE};