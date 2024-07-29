import './ForumPageEntry.css'

const ForumPageEntry = (props: any) => {
    let date = "29/03/2024 11.11"


    return (
        <div className="forum-page-entry">
            <p>qwşiqwjkgşiqwgkqwşgkqşgkqwşgkqwşgkqşikgşqwşiqwjkgşiqwgkqwşgkqşgkqwşgkqwşgkqşikgşqwşiqwjkgşiqwgkqwşgkqşgkq
                wşgkqwşgkqşikgşqwşiqwjkgşiqwgkqwşgkqşgkqwşgkqwşgkqşikgş</p>
            <p className="date">{date}</p>
            <p className="username">@USERNAME</p>
        </div>
    )
}

export default ForumPageEntry;