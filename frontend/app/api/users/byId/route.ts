const GetHandler = async (req: any) => {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const username = searchParams.get('username');
    const responseUsers = await fetch(`http://localhost:8080/users/${username}`);
    if (responseUsers.status !== 204){
        const parsed = await responseUsers.json();
        return Response.json(parsed);
    }
    return Response.json({});
}

export {GetHandler as GET};