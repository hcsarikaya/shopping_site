const GetHandler = async (req: any) => {
    const url = new URL(req.url);
    const searchParam = url.searchParams;
    const id = searchParam.get("id");
    console.log(id);

    const responseBlogs = await fetch(`http://localhost:8080/blogs/${id}`);
    if (responseBlogs.status != 204) {
        const parsed = await responseBlogs.json();
        console.log(parsed);
        return Response.json(parsed);
    }
    return Response.json({});

}

export {GetHandler as GET};
