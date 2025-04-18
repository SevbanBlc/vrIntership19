import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CareerSuggestion {
  title: string;
  description: string;
  matchPercentage: number;
  requiredSkills: string[];
  growthAreas: string[];
}

interface AnalysisSectionProps {
  analysisText: string[];
  currentStep: number;
  careerSuggestions: CareerSuggestion[];
  onCareerSelect: (career: string) => void;
}

export const AnalysisSection: React.FC<AnalysisSectionProps> = ({
  analysisText,
  currentStep,
  careerSuggestions,
  onCareerSelect
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  useEffect(() => {
    if (currentTextIndex < analysisText.length - 1) {
      const timer = setTimeout(() => {
        setCurrentTextIndex(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (currentTextIndex === analysisText.length - 1 && !showSuggestions) {
      const timer = setTimeout(() => {
        setShowSuggestions(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentTextIndex, analysisText.length, showSuggestions]);

  function getSkillBadgeColor(index: number): string {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-yellow-100 text-yellow-800',
      'bg-red-100 text-red-800',
      'bg-indigo-100 text-indigo-800',
      'bg-pink-100 text-pink-800',
    ];
    return colors[index % colors.length];
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="pb-8"
    >
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            className="font-bold text-3xl text-white text-center drop-shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Analiz Sonuçları
          </motion.h1>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-5">
          <AnimatePresence>
            {analysisText.slice(0, currentTextIndex + 1).map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-4 rounded-lg shadow border border-gray-100"
              >
                <p className="text-gray-700">{text}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8"
          >
            <h2 className="text-xl font-semibold text-center mb-6 text-gray-800 relative">
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                Sana en uygun kariyer yolları
              </span>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-600/20 to-purple-600/20"></div>
            </h2>

            <div className="space-y-6 mt-8">
              {careerSuggestions.map((career, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden cursor-pointer"
                  onClick={() => onCareerSelect(career.title)}
                >
                  <div className="md:flex">
                    <div className="p-6 md:flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">{career.title}</h3>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-yellow-400 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-semibold text-gray-600">
                            %{career.matchPercentage} Uyumluluk
                          </span>
                        </div>
                      </div>
                      
                      <p className="mt-3 text-gray-600">{career.description}</p>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2">Gereken Beceriler:</h4>
                        <div className="flex flex-wrap gap-2">
                          {career.requiredSkills.map((skill, skillIndex) => (
                            <span 
                              key={skillIndex} 
                              className={`text-xs px-2 py-1 rounded-full ${getSkillBadgeColor(skillIndex)}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2">Gelişim Alanları:</h4>
                        <div className="flex flex-wrap gap-2">
                          {career.growthAreas.map((area, areaIndex) => (
                            <span 
                              key={areaIndex} 
                              className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-6 pb-6 md:w-44 flex flex-col items-center justify-end md:border-l md:border-gray-200">
                      <div className="w-full h-24 flex items-center justify-center">
                        <div className="relative w-20 h-20">
                          <svg className="w-20 h-20" viewBox="0 0 100 100">
                            <circle 
                              cx="50" 
                              cy="50" 
                              r="45" 
                              fill="none" 
                              stroke="#e2e8f0" 
                              strokeWidth="10" 
                            />
                            <circle 
                              cx="50" 
                              cy="50" 
                              r="45" 
                              fill="none" 
                              stroke="url(#gradient)" 
                              strokeWidth="10" 
                              strokeDasharray={`${career.matchPercentage * 2.83} 283`} 
                              strokeDashoffset="0" 
                              transform="rotate(-90, 50, 50)" 
                            />
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#e879f9" />
                                <stop offset="100%" stopColor="#c026d3" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold text-gray-800">%{career.matchPercentage}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCareerSelect(career.title);
                        }}
                        className="w-full py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-md font-medium hover:opacity-90 transition-opacity"
                      >
                        Seç ve Devam Et
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};