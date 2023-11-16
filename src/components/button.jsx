import PropTypes from "prop-types";
import "./button.css";

export default function Button({ value, onClick }) {
  return (
    <button className="Button" onClick={onClick}>
      {value}
    </button>
  );
}

Button.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};
