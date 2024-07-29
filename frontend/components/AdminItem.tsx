import React from 'react';
import "../components/AdminItems.css"
import setProducts from "../app/admin/page"
interface Item {
    id: number,
    title: string,
    handleDelete: any,
    array: any[],
    endpoint: string
}


const AdminItem = (props: Item) => {
    const handleDelete = (id:number, endpoint: string) => {
        console.log(props.endpoint);
        console.log("id is " + id);
        props.handleDelete(id, endpoint, props.array);
    }


    return (
        <div className="items">
            <div className="info">
                <span >ID: {props.id}&nbsp;</span>
                <span >Title/Name: {props.title}</span>
            </div>
            <div className="button-container">
                <button className="button" onClick={() => handleDelete(props.id, props.endpoint)}>DELETE</button>
                <button className="button">EDIT</button>
            </div>

        </div>)
}

export default AdminItem;
