import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const Menu = () => {
    const [isActiveMenu, setActiveMenu] = useState(0)

    return <div className="menu">
        <nav>
            <ul>
                <li onClick={() => setActiveMenu(1)} className={`menu__item ${isActiveMenu === 1 ? "menu__isActive" : null}`}><Link to="/">Cek Ongkir</Link></li>
                <li onClick={() => setActiveMenu(2)} className={`menu__item ${isActiveMenu === 2 ? "menu__isActive" : null}`}><Link to="/tracker">Cek Resi</Link></li>
                <li onClick={() => setActiveMenu(3)} className={`menu__item ${isActiveMenu === 3 ? "menu__isActive" : null}`}><Link to="/about">About Us</Link></li>
            </ul>
        </nav>
    </div>
}

export default Menu