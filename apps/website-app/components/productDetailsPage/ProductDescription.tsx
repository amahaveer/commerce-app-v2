import React, { useState } from 'react';

interface DescriptionProps {
  description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle function
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        className={`font-tp-ff-p text-[15px] font-normal text-tp-text-body leading-[26px] transition-all duration-300 ${
          isExpanded ? 'max-h-[none]' : 'max-h-[52px] overflow-hidden'
        }`}
        style={{ display: '-webkit-box', WebkitLineClamp: isExpanded ? 'unset' : '2', WebkitBoxOrient: 'vertical' }}
      >
        {description}
      </div>
      <button
        onClick={toggleExpand}
        className="text-blue-500 mt-2"
      >
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
};

export default Description;
