import React, { useState, useEffect, useRef } from 'react';

const Tooltip = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const currentMousePosition = useRef({ x: 0, y: 0 });
  const hideTimeoutRef = useRef(null);

  /// sets position of tooltip as the mouse moves within the tooltip
  useEffect(() => {
    const handleMouseMove = (e) => {
      currentMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    if (isVisible) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isVisible]);


  /// sets initial position when mouse enters the component
  const handleMouseEnter = (e) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    // Set initial position before showing tooltip
    currentMousePosition.current = { x: e.clientX, y: e.clientY };
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            top: `${currentMousePosition.current.y - 30}px`,
            left: `${currentMousePosition.current.x + 10}px`,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '4px',
            fontSize: '14px',
            zIndex: 1000,
            pointerEvents: 'none',
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
