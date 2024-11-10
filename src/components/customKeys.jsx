import React from 'react'

const CustomKeys = ({ setDirectionFromPhone, containerStyles }) => {

  const handleOnClick = (direction) => {
    if (direction === 'up') setDirectionFromPhone('ArrowUp')
    else if (direction === 'down') setDirectionFromPhone('ArrowDown')
    else if (direction === 'left') setDirectionFromPhone('ArrowLeft')
    else if (direction === 'right') setDirectionFromPhone('ArrowRight')
  }

  return (
    <div className="custom-keys-container" style={containerStyles}>
      <div className="keys-top">
        <button onClick={() => handleOnClick("up")} className="phone-keys">
          ↑
        </button>
      </div>
      <div className="keys-middle">
        <button onClick={() => handleOnClick("left")} className="phone-keys">
          ←
        </button>

        <button onClick={() => handleOnClick("right")} className="phone-keys">
          →
        </button>
      </div>
      <div className="keys-bottom keys-top">
        <button onClick={() => handleOnClick("down")} className="phone-keys">
          ↓
        </button>
      </div>
    </div>
  );
};

export default CustomKeys