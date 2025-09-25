import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  // Show button and determine position
  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.pageYOffset;
      
      if (scrollY > 300) {
        setIsAtTop(false);
      } else if (scrollY > 50) {
        setIsAtTop(false);
      } else {
        setIsAtTop(true);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll function - to top if at bottom, to bottom if at top
  const handleScroll = () => {
    if (isAtTop) {
      // If at top, scroll to bottom
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    } else {
      // If scrolled down, scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <button
      onClick={handleScroll}
      className={`fixed bottom-6 right-24 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40 group ${
        isAtTop 
          ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' 
          : 'bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-700 hover:to-yellow-600'
      }`}
      aria-label={isAtTop ? "Scroll to bottom" : "Scroll to top"}
    >
      {isAtTop ? (
        <ChevronDown className="h-6 w-6 group-hover:animate-bounce" />
      ) : (
        <ChevronUp className="h-6 w-6 group-hover:animate-bounce" />
      )}
    </button>
  );
};

export default ScrollToTop;
