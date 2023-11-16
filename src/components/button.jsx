import './button.css';

export default function Button ({value, onClick}) {
    return (<button className="Button" onClick={onClick}>{value}</button>);
}