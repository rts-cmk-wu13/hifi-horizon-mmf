import { Link } from 'react-router-dom';

const style = {
  header: {
    backgroundColor: '#000000',
    padding: '20px',
    color: 'white',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  li: {
    margin: 0,
    listStyle: 'none',
    display: 'inline',
    padding: '0 15px',
    fontFamily: 'sans-serif',
    fontSize: '14px',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default function Header() {
  return (
    <header style={style.header}>
      <nav style={style.nav}>
        <img src="./logo_sml 1.png" alt="Logo" style={{ width: '50px', height: '50px' }} />
        <ul style={{ margin: 0, padding: 0, display: 'flex' }}>
          <li style={style.li}>
            <Link to="/shop" style={{ color: 'white', textDecoration: 'none' }}>SHOP</Link>
          </li>
          <li style={style.li}>
            <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>ABOUT US</Link>
          </li>
          <li style={style.li}>
            <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>CONTACT US</Link>
          </li>
        </ul>
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '252px', backgroundColor: '#fff', borderRadius: '5px', padding: '5px' }}>
          <input type="text" placeholder="Search Products" style={{ padding: '10px', width: '200px', borderRadius: '5px', border: 'none' }} />
          <i className="fa-solid fa-magnifying-glass" style={{ color: 'black', fontSize: 'x-large' }}></i>
        </div>
        <i className="fa-solid fa-user"></i>
        <i className="fa-solid fa-cart-shopping"></i>
      </div>
    </header>
  );
}