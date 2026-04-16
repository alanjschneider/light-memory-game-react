import PropTypes from 'prop-types';
import './light.css';

const hue = {
  red: 0,
  yellow: 60,
  green: 120,
  blue: 240,
};

export default function Light({ id, state, color, onClick }) {
  function handleMouseDown() {
    onClick(id);
  }

  return (
    <div className="Light-spacer">
      <div className={`Light-border Light-${color}`}>
        <div
          style={{ '--hue': hue[color] }}
          onMouseDown={handleMouseDown}
          data-state={state}
          className={`
            Light
            Light-${color}
        `}
        ></div>
      </div>
    </div>
  );
}

Light.propTypes = {
  id: PropTypes.number,
  state: PropTypes.number,
  color: PropTypes.string,
  onClick: PropTypes.func,
};
