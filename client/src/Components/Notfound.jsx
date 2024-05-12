import { Link } from "react-router-dom";

function Notfound() {
    return (
        <div>
           <h1>404 Page : not found <Link to={'/'}>Login</Link></h1>
        </div>
    );
}

export default Notfound;