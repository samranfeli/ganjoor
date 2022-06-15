import Logo from "../../assets/images/ganjoor-logo.svg";
const Header = () => (
  <header>
    <div className="container px-4 mx-auto">
        <img src={Logo} alt="گنجور" className="w-20 h-20 my-4 mx-auto" />
        <hr className="border-neutral-400"/>
    </div>

  </header>
);
export default Header;
