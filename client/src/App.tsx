import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from "./hooks/use-auth";
import { IntroSection } from "./components/IntroSection";
import { UserInfoForm } from "./components/UserInfoForm";
import { PsychologistStory } from "./components/PsychologistStory";
import { QuestionSection } from "./components/QuestionSection";
import { AnalysisSection } from "./components/AnalysisSection";
import { StorySection } from "./components/StorySection";
import { ResultSection } from "./components/ResultSection";
import { Navbar } from "./components/Navbar";
import { questions } from "./questions";
import { Step, Answer, StoryChoice, StoryPart, UserData, Scores, CareerSuggestion } from "./types";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";
import AuthPage from "./pages/auth-page";
import { Loader2 } from "lucide-react";

// Career suggestions
const careerSuggestions: CareerSuggestion[] = [
  {
    title: "Frontend Geliştirici",
    description: "Kullanıcı arayüzleri ve etkileşimleri tasarlayıp geliştiren, web sitelerinin görsel ve kullanıcı deneyimi kısmında uzmanlaşan teknoloji uzmanı.",
    matchPercentage: 92,
    requiredSkills: ["HTML/CSS", "JavaScript", "React", "UI/UX Tasarım", "Responsive Tasarım"],
    growthAreas: ["Backend Entegrasyonu", "Performans Optimizasyonu", "Erişilebilirlik"]
  },
  {
    title: "Backend Geliştirici",
    description: "Web uygulamalarının sunucu tarafı mantığını, veritabanı etkileşimlerini ve API'lerini geliştiren, sistemlerin arka planında çalışan teknoloji uzmanı.",
    matchPercentage: 85,
    requiredSkills: ["Node.js", "Veritabanları", "API Tasarımı", "Sunucu Yönetimi", "Güvenlik"],
    growthAreas: ["Ölçeklendirme", "Mikroservisler", "Cloud Platformları"]
  },
  {
    title: "Veritabanı Uzmanı",
    description: "Veritabanlarını tasarlayan, yöneten ve optimize eden, veri bütünlüğünü ve erişilebilirliğini sağlayan teknoloji uzmanı.",
    matchPercentage: 78,
    requiredSkills: ["SQL", "NoSQL", "Veri Modelleme", "Performans Optimizasyonu", "Yedekleme ve Kurtarma"],
    growthAreas: ["Big Data Teknolojileri", "Veri Analizi", "Cloud Veritabanları"]
  }
];

// Main application page
function HomePage() {
  const { user } = useAuth();
  const [step, setStep] = useState<Step>('intro');
  const [userData, setUserData] = useState<UserData>({ name: '', age: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Scores>({
    communication: 0,
    analysis: 0,
    teamwork: 0,
    creativity: 0,
    technical: 0
  });
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [currentStoryPart, setCurrentStoryPart] = useState<number>(0);
  const [storySuccess, setStorySuccess] = useState<boolean>(true);
  
  // Example story parts - we'll get these from backend in real app
  const [storyParts, setStoryParts] = useState<StoryPart[]>([
    {
      title: "İlk Gün - Ofise Giriş",
      description: "Stajyer olarak ilk günün! Büyük bir teknoloji şirketinin modern cam binasının önünde duruyorsun. İçeride seni bekleyen fırsatları ve zorlukları düşünüyorsun. Giriş kartını aldın ve şimdi ne yapacaksın?",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000",
      choices: [
        {
          text: "Doğrudan atandığın departmana git ve kendini tanıt",
          score: { communication: 4, analysis: 2 },
          consequence: "Girişken davranışın takdir edildi, ancak oryantasyon sürecini kaçırdın."
        },
        {
          text: "Resepsiyona git ve günün programını sor",
          score: { communication: 3, analysis: 4 },
          consequence: "Planlı yaklaşımın sayesinde oryantasyon programına katıldın ve önemli bilgiler edindin."
        },
        {
          text: "Diğer stajyerleri bul ve tanış",
          score: { communication: 5, analysis: 1 },
          consequence: "Sosyal bağlantılar kurdun ancak bazı önemli bilgilendirme toplantılarını kaçırdın."
        }
      ]
    },
    {
      title: "İlk Görev - Proje Toplantısı",
      description: "Ekip lideri, stajyerlik sürecinde geliştireceğin küçük bir proje için toplantı düzenledi. Ekip üyeleri fikirler sunuyor ve senin de katkı sağlamanı bekliyor. Nasıl bir yaklaşım sergileyeceksin?",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000",
      choices: [
        {
          text: "Aktif olarak söz al ve kendi projeni öner",
          score: { communication: 5, analysis: 2 },
          consequence: "Özgüvenli duruşun dikkat çekti ancak deneyimli ekip üyelerinin önerilerini yeterince dikkate almadın."
        },
        {
          text: "Önce dinle, notlar al ve sonra düşüncelerini paylaş",
          score: { communication: 3, analysis: 4 },
          consequence: "Dengeli yaklaşımın takdir topladı ve ekip dinamiklerine uyum sağladın."
        },
        {
          text: "Toplantıda sessiz kal ve sadece sana verilen görevleri kabul et",
          score: { communication: 1, analysis: 3 },
          consequence: "Pasif duruşun nedeniyle potansiyelini gösteremedin ve ekip seni tanıyamadı."
        }
      ]
    },
    {
      title: "Teknik Zorluk",
      description: "Proje geliştirme sürecinde beklenmedik bir teknik sorunla karşılaşıyorsun. Kod çalışmıyor ve teslim süresi yaklaşıyor. Ne yaparsın?",
      image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1000",
      choices: [
        {
          text: "Sorunu kendim çözmeye çalışırım, gece geç saatlere kadar çalışsam bile",
          score: { communication: 1, analysis: 5 },
          consequence: "Teknik becerilerini geliştirdin ancak takım çalışmasından uzak kaldın."
        },
        {
          text: "Ekipteki deneyimli bir geliştiriciden yardım isterim",
          score: { communication: 4, analysis: 3 },
          consequence: "Yeni bilgiler öğrendin ve ekip içi ilişkilerini güçlendirdin."
        },
        {
          text: "Alternatif bir çözüm yolu önerir ve sorunu farklı bir açıdan ele alırım",
          score: { communication: 3, analysis: 4 },
          consequence: "Yaratıcı problem çözme yeteneğin takdir edildi."
        }
      ]
    }
  ]);

  const handleStart = () => {
    setStep('name');
  };

  const handleUpdateUserData = (newData: UserData) => {
    setUserData(newData);
  };

  const handleAnswerSelect = (answer: Answer) => {
    // Update scores
    const newScores = { ...scores };
    
    // Update each score category
    Object.keys(answer.score).forEach(key => {
      if (newScores[key] !== undefined) {
        newScores[key] += answer.score[key];
      } else {
        newScores[key] = answer.score[key];
      }
    });
    
    setScores(newScores);
    
    // Move to next question or analysis screen
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setStep('analysis');
    }
  };

  const handleCareerSelect = (career: string) => {
    setSelectedCareer(career);
    setStep('story');
  };

  const handleStoryChoice = (choice: StoryChoice) => {
    // Update scores if choice has scores
    if (choice.score) {
      const newScores = { ...scores };
      
      if (choice.score.analysis) {
        newScores.analysis += choice.score.analysis;
      }
      
      if (choice.score.communication) {
        newScores.communication += choice.score.communication;
      }
      
      setScores(newScores);
    }
    
    // Move to next story part or results screen
    if (currentStoryPart < storyParts.length - 1) {
      setCurrentStoryPart(prev => prev + 1);
    } else {
      // Simple success/failure logic
      const successThreshold = 10; // Total score above this is considered success
      const totalScore = scores.analysis + scores.communication;
      
      setStorySuccess(totalScore >= successThreshold);
      setStep('results');
    }
  };

  const handleRestart = () => {
    // Reset application to initial state
    setStep('intro');
    setCurrentQuestion(0);
    setScores({
      communication: 0,
      analysis: 0,
      teamwork: 0,
      creativity: 0,
      technical: 0
    });
    setSelectedCareer(null);
    setCurrentStoryPart(0);
    setUserData({ name: '', age: 0 });
  };

  // Analysis texts
  const analysisText = [
    `Merhaba ${userData.name}, kişilik testinin sonuçlarını analiz ettim.`,
    `İletişim becerilerin ${scores.communication > 40 ? 'oldukça yüksek' : scores.communication > 25 ? 'ortalama' : 'geliştirilebilir'} görünüyor.`,
    `Analitik düşünme yeteneğin ${scores.analysis > 40 ? 'çok iyi' : scores.analysis > 25 ? 'ortalama' : 'geliştirilebilir'} seviyede.`,
    `Takım çalışması becerilerin ${scores.teamwork > 40 ? 'mükemmel' : scores.teamwork > 25 ? 'iyi' : 'daha fazla geliştirilmeli'}.`,
    `Yenilikçi skorun ${scores.creativity > 40 ? 'üst düzeyde' : scores.creativity > 25 ? 'ortalama' : 'geliştirilebilir'}.`,
    `Teknik beceri seviyeni ${scores.technical > 40 ? 'çok yüksek' : scores.technical > 25 ? 'ortalama' : 'biraz geliştirmen gerekiyor'} olarak tespit ettim.`,
    `Skorların ve profilin doğrultusunda sana en uygun teknoloji kariyerlerini belirledim. Aşağıda bu kariyer yollarını ve sana uyum yüzdelerini görebilirsin.`
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <motion.div 
          className="bg-white rounded-xl shadow-xl overflow-hidden max-w-3xl w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              type: "spring", 
              damping: 25, 
              stiffness: 120 
            }
          }}
        >
          <AnimatePresence mode="wait">
            {step === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ 
                  opacity: 0, 
                  x: -20, 
                  transition: { duration: 0.3 } 
                }}
              >
                <IntroSection onStart={handleStart} />
              </motion.div>
            )}
            
            {(step === 'name' || step === 'age') && (
              <motion.div
                key={`user-form-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    type: "spring", 
                    damping: 25, 
                    stiffness: 120 
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  x: -20, 
                  transition: { duration: 0.3 } 
                }}
              >
                <UserInfoForm
                  userData={userData}
                  onUpdateUserData={handleUpdateUserData}
                  onSubmit={() => setStep(step === 'name' ? 'age' : 'psychologist')}
                  step={step}
                />
              </motion.div>
            )}

            {step === 'psychologist' && (
              <motion.div
                key="psychologist"
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    type: "spring", 
                    damping: 25, 
                    stiffness: 120 
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  x: -20, 
                  transition: { duration: 0.3 } 
                }}
              >
                <PsychologistStory
                  userData={userData}
                  onContinue={() => setStep('questions')}
                />
              </motion.div>
            )}
            
            {step === 'questions' && (
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    type: "spring", 
                    damping: 25, 
                    stiffness: 120 
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  x: -20, 
                  transition: { duration: 0.3 } 
                }}
              >
                <QuestionSection
                  currentQuestion={currentQuestion}
                  totalQuestions={questions.length}
                  question={questions[currentQuestion]}
                  onAnswerSelect={handleAnswerSelect}
                />
              </motion.div>
            )}
            
            {step === 'analysis' && (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    type: "spring", 
                    damping: 25, 
                    stiffness: 120 
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  x: -20, 
                  transition: { duration: 0.3 } 
                }}
              >
                <AnalysisSection
                  analysisText={analysisText}
                  currentStep={0}
                  careerSuggestions={careerSuggestions}
                  onCareerSelect={handleCareerSelect}
                />
              </motion.div>
            )}
            
            {step === 'story' && storyParts[currentStoryPart] && (
              <motion.div
                key={`story-${currentStoryPart}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    type: "spring", 
                    damping: 25, 
                    stiffness: 120 
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  x: -20, 
                  transition: { duration: 0.3 } 
                }}
              >
                <StorySection
                  storyPart={storyParts[currentStoryPart]}
                  onChoice={handleStoryChoice}
                />
              </motion.div>
            )}
            
            {step === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    type: "spring", 
                    damping: 25, 
                    stiffness: 120 
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  x: -20, 
                  transition: { duration: 0.3 } 
                }}
              >
                <ResultSection
                  success={storySuccess}
                  onRestart={handleRestart}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { user, isLoading } = useAuth();
  const [location, navigate] = useLocation();

  useEffect(() => {
    if (!isLoading && !user && location !== '/auth') {
      navigate('/auth');
    }
  }, [user, isLoading, location, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;