import "./header.css";
import Budget from "../Budget/Budget";
type HeadingProps = {
    title: string;
};

const Header = ({ title }: HeadingProps) => {

    return (
        <div className="header">
            <div className="header_title">
                <h1>{title}</h1>
                <Budget />
            </div>
        </div>
    );
};

export default Header;