'use client'
import './ForumEntryForm.css'
import {useState} from "react";
import {valibotResolver} from "@hookform/resolvers/valibot";
import {flowStartParseObjPropValue} from "sucrase/dist/types/parser/plugins/flow";
const getUser = async () => {
    try {
        const res = await fetch('/api/users?id=${session.user.username}');
        const data = await res.json();
        if (data.length > 0){
            console.log(data[0]);
            return data[0];
        }
        return null;
    } catch (e){
        console.log(e);
    }
}

const ForumEntryForm = (props: any) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const body = JSON.stringify({title});
    console.log(body);
    const handleSubmit = async () => {
        try{
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({title}),
            };
            if (title != '' && description != '') {
                const response = await fetch("/api/forums", options);
                if (response.ok) {
                    const data = await response.json();
                    const user = await getUser();
                    const userId = user.user_id;
                    const text = description;
                    const forum_id = data.id;
                    const options = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({text, userId, forum_id})
                    }
                    try{
                        const responseEntry = await fetch(`/api/forums/entries`, options);
                        const data = await responseEntry.json();
                        console.log(responseEntry.status);
                    }catch(e){
                        console.log(e);
                    }
                    props.refresh();
                    setTitle('');
                    setDescription('');
                }
            } else {
                alert("Fill properly!");

            }

        } catch(e){
            console.log(e);
        }

    }

    return (
        <div>
            <textarea placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)} className="title"/>
            <textarea placeholder="Your ideas..." value={description} onChange={(e) => setDescription(e.target.value)} className="message-box"/>
            <button className="send-button" onClick={handleSubmit}>SEND</button>
        </div>
    )
}
export {getUser};
export default ForumEntryForm;