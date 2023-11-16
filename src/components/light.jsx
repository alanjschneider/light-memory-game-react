import { useState } from 'react';
import './light.css';

export default function Light({ id, state, color, onClick }) {
    const [pressed, setPressed] = useState(false);

    function handleMouseDown() {
        setPressed(true);
        onClick(id);
    }
    
    function handleMouseUp() {
        setPressed(false);
        setPressed(false);
    }

    return (
        <div className='Light-spacer'>
            <div className={`Light-border Light-${color}-border`}>
                <div
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className={`
                    Light
                    Light-${color}-${state || pressed ? 'on' : 'off'}
                    ${pressed ? 'Light-pressed' : ''}
                `}>
                </div>
            </div>
        </div>
    );
}