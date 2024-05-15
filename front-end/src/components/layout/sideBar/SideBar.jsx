import "./Sidebar.scss"

const SideBar = () => {
    return (
        <aside className="aside">
            <nav className="aside-nav">
                <ul className="aside-nav-link">
                    <li className="aside-nav-link-yoga"></li>
                    <li className="aside-nav-link-swim"></li>
                    <li className="aside-nav-link-bike"></li>
                    <li className="aside-nav-link-liftweight"></li>
                </ul>
            </nav>
            <span className="aside-copyright">
                Copiryght, SportSee 2024
            </span>
        </aside>
    )

}

export default SideBar;