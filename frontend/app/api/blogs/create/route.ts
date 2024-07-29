import {baseParseConditional} from "sucrase/dist/types/parser/traverser/expression";

const GetHandler = async (req: any) => {
    const responseBlogs = await fetch(`http://localhost:8080/blogs/create`);
    if (responseBlogs.status != 204) {
        const parsed = await responseBlogs.json();
        return Response.json(parsed);
    }
    return Response.json({});

}

const POSTHandler = async (req: any)=> {

    const data = await req.json();
    const body = data;
    if (body.username == undefined){
        return Response.json({});
    }
    const url = `http://localhost:8080/blogs/${body.username}`;
    console.log(url);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: body.title,
            blog_text: body.blog_text,
            photoURI: ""
        })
    });
    console.log(response);
    return Response.json(data);

}

export {GetHandler as GET, POSTHandler as POST};