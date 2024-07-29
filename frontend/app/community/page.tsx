'use client'
import "./page.css"
import React, {useEffect, useState} from "react";
import ForumEntryForm from "@/components/ForumEntryForm";
import ForumCard from "@/components/ForumCard";
import ForumPageEntry from "@/components/ForumPageEntry";
import NothingHereForum from "@/components/NothingHereForum";
import {getUser} from "@/components/ForumEntryForm";

interface Forum {
    id: number,
    title: string,
    date: string
}

interface ForumEntry {
    id: number,
    text: string,
    date: string,
    username: string,
    user_id: string
}


const Community = () => {
    const [forums, setForums] = useState<Forum[]>([]);
    const [activeForum, setActiveForum] = useState<Forum>();
    const [activeForumEntries, setActiveForumEntries] = useState<ForumEntry[]>([]);
    const [entry, setEntry] = useState('');
    const fetchForums = async () => {
        try {
            const responseForums = await fetch('/api/forums/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await responseForums.json();
            setForums(data);
            setActiveForum(data[0]);
            return responseForums;
        } catch (error) {
            console.log(error);
        }
    }

    const fetchForumEntries = async () => {
        try {
            const response = await fetch(`/api/forums/entries?forum_id=${activeForum?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setActiveForumEntries(data);
            return response;
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        fetchForums();
    }, []);

    useEffect(() => {
        fetchForumEntries();
    }, [activeForum]);

    const handle = () => {
        const response = fetchForums();
        setActiveForum(forums.length ? forums[0] : undefined);
        const resp = fetchForumEntries();
        console.log(activeForumEntries.length);
        console.log(resp);
    }

    const handleSelect = async (forum: Forum) => {
        setActiveForum(forum);
        await fetchForumEntries();
    }

    const handleClick = async () => {
        try{
            if (activeForum == undefined){
                alert("Please select a forum");
                return;
            }
            const forum_id = activeForum.id;
            const text = entry;
            setEntry('');
            if (text == ''){
                alert("Type something first!")
                return;
            }
            const user = await getUser();
            if (user == null){
                alert("Please login first!");
                return;
            }

            const userId = user.id;
            const body = JSON.stringify({text, userId, forum_id});
            const response = await fetch(`/api/forums/entries`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: body

            })
            if (response.ok){
                await fetchForumEntries();
            } else {
                alert("Something's wrong!");
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="container">
            <div>

            </div>
            <div className="scroll-area">
                <h1>Community - Everythings For You</h1>
                <ForumEntryForm refresh={fetchForums}></ForumEntryForm>
                {forums.length ? forums.map((forum: Forum) => (
                    <ForumCard key={forum.id} id={forum.id} title={forum.title} handleSelect={handleSelect}></ForumCard>
                )) : <NothingHereForum/>}
            </div>
            <div className="forum-page">
                <h2 className="forum-header">{activeForum?.title}</h2>
                <div className="forum-entries">
                    {activeForumEntries.length ? activeForumEntries.map((forum: ForumEntry) => (
                        <ForumPageEntry key={forum.id} text={forum.text} date={forum.date}
                                        username={forum.username}></ForumPageEntry>
                    )) : <div>
                        <h1>THERES NOTHING HERE</h1>
                    </div>}
                </div>
                <div className="entry">
                    <textarea value={entry} onChange={(e) => setEntry(e.target.value)} placeholder="Your ideas..." className="input-area"></textarea>
                    <button className="submit-button" onClick={handleClick}>SUBMIT</button>
                </div>
            </div>


        </div>
    )
}

export default Community;