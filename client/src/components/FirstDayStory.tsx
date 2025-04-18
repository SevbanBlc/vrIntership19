import React from 'react';
import { StoryPart, StoryChoice } from '../types';
import { firstDayStoryParts } from '../stories/firstDayStory';

interface FirstDayStoryProps {
  currentDimension: string;
  onChoice: (choice: StoryChoice) => void;
}

export const FirstDayStory: React.FC<FirstDayStoryProps> = ({ 
  currentDimension, 
  onChoice 
}) => {
  const storyPart = firstDayStoryParts.find(part => part.dimension === currentDimension) || firstDayStoryParts[0];

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-3xl w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{storyPart.title}</h2>
      
      {storyPart.image && (
        <div className="mb-6">
          <img 
            src={storyPart.image}
            alt={storyPart.title}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>
      )}
      
      <p className="text-lg text-gray-700 mb-8">{storyPart.description}</p>
      
      <div className="space-y-4">
        {storyPart.choices?.map((choice, index) => (
          <button
            key={index}
            onClick={() => onChoice(choice)}
            className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-primary-50 hover:border-primary-400 transition-colors"
          >
            <div className="font-medium text-gray-900 mb-1">{choice.text}</div>
            {choice.consequence && (
              <div className="text-sm text-gray-500">{choice.consequence}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
