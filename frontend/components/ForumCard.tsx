import './ForumCard.css'
const ForumCard = (props: any) => {
    const id = props.id;
    const forum = {
        id: id,
        title: props.title
    }


    return (
        <div className="forum-card" onClick={() => props.handleSelect(forum)}>
            <p>{props.title}</p>
        </div>
    )
}

export default ForumCard;