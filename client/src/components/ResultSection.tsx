import React from 'react';
import { motion } from 'framer-motion';

interface ResultSectionProps {
  success: boolean;
  onRestart: () => void;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ success, onRestart }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.3, 
        staggerChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    },
    tap: { scale: 0.95 }
  };

  const successContent = {
    title: "Tebrikler! Stajı Başarıyla Tamamladın!",
    description: `Senin gösterdiğin liderlik becerileri, teknik bilgi ve problem çözme yeteneği sayesinde projeler başarıyla tamamlandı. Ekip arkadaşların ve yöneticilerin performansınla çok etkilendiler. 
    
    Bu kariyerde ilerlemek için iyi bir başlangıç yaptın ve şirket sana tam zamanlı bir pozisyon teklif etmeye karar verdi.`,
    image: "https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?q=80&w=1000",
    color: "from-green-600 to-emerald-600"
  };

  const failureContent = {
    title: "Staj Beklentileri Karşılayamadı",
    description: `Maalesef bu staj sürecinde zorluklar yaşadın. Beklentileri karşılamakta ve ekip ile iletişim kurmakta zorluk çektin. 
    
    Ancak bu bir son değil, bu deneyimden öğrenecek çok şey var. Kendini geliştirmen gereken alanları belirle ve daha iyi bir kariyer yolu için hazırlan.`,
    image: "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=1000",
    color: "from-red-600 to-orange-600"
  };

  const content = success ? successContent : failureContent;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <div className={`absolute inset-0 bg-gradient-to-r ${content.color}`}></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${content.image})` }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            className="font-bold text-2xl md:text-3xl text-white text-center drop-shadow-md px-6"
            variants={itemVariants}
          >
            {content.title}
          </motion.h1>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <motion.div 
          className="prose prose-sm md:prose-base max-w-none mb-8 text-gray-700 flex-grow"
          variants={itemVariants}
        >
          <p className="whitespace-pre-line">{content.description}</p>
        </motion.div>
        
        {success && (
          <motion.div
            variants={itemVariants}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h3 className="text-green-800 font-medium mb-2">Kazandığın Beceriler:</h3>
            <ul className="space-y-1 text-green-700">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Teknik problem çözme
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Takım çalışması ve iletişim
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Proje yönetimi becerileri
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Adaptasyon ve hızlı öğrenme
              </li>
            </ul>
          </motion.div>
        )}
        
        {!success && (
          <motion.div
            variants={itemVariants}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <h3 className="text-red-800 font-medium mb-2">Geliştirilmesi Gereken Alanlar:</h3>
            <ul className="space-y-1 text-red-700">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Teknik bilgi ve uygulama
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                İletişim ve ekip çalışması
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Problem çözme yaklaşımı
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Zaman yönetimi
              </li>
            </ul>
          </motion.div>
        )}
        
        <motion.div
          variants={buttonVariants}
          className="flex justify-center mt-auto"
        >
          <motion.button
            onClick={onRestart}
            className={`py-3 px-8 rounded-lg text-white font-medium shadow-md bg-gradient-to-r ${
              success ? 'from-purple-600 to-indigo-600' : 'from-blue-600 to-indigo-600'
            }`}
            whileHover="hover"
            whileTap="tap"
          >
            Başa Dön ve Tekrar Dene
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};