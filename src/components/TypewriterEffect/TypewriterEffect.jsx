import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ 
  texts = [], 
  typeSpeed = 100, 
  deleteSpeed = 50, 
  pauseTime = 2000 
}) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!texts.length) return;

    const timeout = setTimeout(() => {
      const currentString = texts[currentStringIndex];
      
      if (isDeleting) {
        setDisplayText(currentString.substring(0, currentCharIndex - 1));
        setCurrentCharIndex(prev => prev - 1);
      } else {
        setDisplayText(currentString.substring(0, currentCharIndex + 1));
        setCurrentCharIndex(prev => prev + 1);
      }

      let nextTypeSpeed = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && currentCharIndex === currentString.length) {
        nextTypeSpeed = pauseTime;
        setIsDeleting(true);
      } else if (isDeleting && currentCharIndex === 0) {
        setIsDeleting(false);
        setCurrentStringIndex(prev => (prev + 1) % texts.length);
        nextTypeSpeed = 500;
      }

    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentStringIndex, currentCharIndex, isDeleting, texts, typeSpeed, deleteSpeed, pauseTime]);

  return (
    <span className="typewriter">
      {displayText}
      <span className="cursor">|</span>
    </span>
  );
};

export default TypewriterEffect;
