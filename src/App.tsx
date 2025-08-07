import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, RotateCcw, Home, Play, TrendingUp, Award, Users, Sparkles, Briefcase, ArrowRight, Target, Brain, Heart, BookOpen, Mail, UserX, GitBranch, Compass, Mountain, Star } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  icon: React.ComponentType<any>;
  category: string;
  gradient: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Votre emploi actuel correspond-il à ce que vous aviez initialement envisagé ?",
    icon: Target,
    category: "Alignement",
    gradient: "from-violet-500 via-purple-500 to-indigo-600"
  },
  {
    id: 2,
    text: "Avez-vous des perspectives d'évolution dans votre poste ?",
    icon: TrendingUp,
    category: "Évolution",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600"
  },
  {
    id: 3,
    text: "Votre entreprise vous encourage-t-elle à vous former ou à développer de nouvelles compétences ?",
    icon: Brain,
    category: "Formation",
    gradient: "from-orange-500 via-amber-500 to-yellow-500"
  },
  {
    id: 4,
    text: "Votre travail vous semble-t-il porteur de sens ?",
    icon: Heart,
    category: "Sens",
    gradient: "from-rose-500 via-pink-500 to-red-500"
  },
  {
    id: 5,
    text: "Vos compétences sont-elles reconnues à leur juste valeur ?",
    icon: Award,
    category: "Reconnaissance",
    gradient: "from-blue-500 via-indigo-500 to-purple-600"
  },
  {
    id: 6,
    text: "Avez-vous le sentiment d'être utile aux autres dans votre activité ?",
    icon: Users,
    category: "Impact",
    gradient: "from-green-500 via-emerald-500 to-teal-600"
  }
];

const IntroductionPage: React.FC<{ onStart: () => void; onContact: () => void }> = ({ onStart, onContact }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300);
  }, []);

  const startTest = () => {
    onStart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <Header onContact={onContact} />

      {/* Animated Geometric Shapes Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-full animate-float" style={{ animationDuration: '15s' }} />
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-teal-400/20 to-cyan-500/20 transform rotate-45 animate-float" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-lg animate-float" style={{ animationDuration: '18s', animationDelay: '4s' }} />
        <div className="absolute top-60 left-1/3 w-12 h-12 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full animate-float" style={{ animationDuration: '14s', animationDelay: '1s' }} />
        <div className="absolute bottom-60 right-1/4 w-18 h-18 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 transform rotate-12 animate-float" style={{ animationDuration: '16s', animationDelay: '3s' }} />
        
        {/* Curved geometric lines */}
      {/* Geometric Background Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute top-0 right-0 w-full h-full" viewBox="0 0 1200 800" fill="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {[...Array(20)].map((_, i) => (
            <path
              key={i}
              d={`M ${800 + i * 15} 0 Q ${900 + i * 20} ${200 + i * 30} ${1000 + i * 25} ${400 + i * 20} T ${1200} ${600 + i * 10}`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </svg>
      </div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 px-6 py-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-800 rounded-3xl p-10 shadow-2xl relative overflow-hidden transform hover:scale-105 transition-all duration-500 group border border-blue-700/30">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
                
                {/* Animated background elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-indigo-400/20 rounded-full blur-lg animate-float" style={{ animationDuration: '8s' }} />
                <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-slate-400/10 rounded-full blur-md animate-float" style={{ animationDuration: '12s', animationDelay: '2s' }} />
                
                {/* Mock Image Content */}
                <div className="relative z-10 text-center transform group-hover:translate-y-[-4px] transition-transform duration-500">
                  <div className="w-36 h-36 mx-auto mb-8 bg-gradient-to-br from-blue-500/30 to-indigo-500/20 rounded-full flex items-center justify-center backdrop-blur-md border-2 border-blue-400/40 shadow-xl relative overflow-hidden">
                    {/* Animated background rings */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                    
                    {/* Personality test inspired shapes - rotating analysis rings */}
                    <div className="absolute inset-2 rounded-full border-2 border-blue-300/30 border-dashed animate-spin" style={{ animationDuration: '15s' }} />
                    <div className="absolute inset-4 rounded-full border border-indigo-300/20 border-dotted animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
                    
                    {/* Brain synapses - connecting dots representing thoughts/analysis */}
                    <div className="absolute inset-6 rounded-full">
                      {/* Synaptic connections */}
                      <div className="absolute top-2 left-4 w-1 h-1 bg-blue-300/60 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
                      <div className="absolute top-6 right-3 w-1.5 h-1.5 bg-indigo-300/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <div className="absolute bottom-4 left-2 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                      <div className="absolute bottom-2 right-4 w-1.5 h-1.5 bg-indigo-400/60 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
                      <div className="absolute top-1/2 left-1 w-1 h-1 bg-blue-300/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                      <div className="absolute top-1/2 right-1 w-1 h-1 bg-indigo-300/40 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }} />
                      
                      {/* Connecting lines - neural pathways */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        <path d="M20 30 Q50 20 80 40" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="0.5" fill="none" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <path d="M15 60 Q50 80 85 50" stroke="rgba(165, 180, 252, 0.2)" strokeWidth="0.5" fill="none" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
                        <path d="M30 15 Q70 50 40 85" stroke="rgba(147, 197, 253, 0.25)" strokeWidth="0.5" fill="none" className="animate-pulse" style={{ animationDelay: '1.3s' }} />
                      </svg>
                    </div>
                    
                    {/* Personality dimensions - geometric shapes representing different traits */}
                    <div className="absolute top-3 right-6 w-2 h-2 bg-blue-300/40 transform rotate-45 animate-float" style={{ animationDuration: '6s', animationDelay: '0s' }} />
                    <div className="absolute bottom-4 left-5 w-1.5 h-1.5 bg-indigo-300/50 rounded-full animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }} />
                    <div className="absolute top-8 left-3 w-1 h-3 bg-blue-400/30 animate-float" style={{ animationDuration: '7s', animationDelay: '2s' }} />
                    <div className="absolute bottom-6 right-2 w-2 h-1 bg-indigo-400/40 rounded-full animate-float" style={{ animationDuration: '9s', animationDelay: '1.5s' }} />
                    
                    {/* Analysis waves - representing psychological evaluation */}
                    <div className="absolute inset-8 rounded-full border border-blue-200/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0s' }} />
                    <div className="absolute inset-10 rounded-full border border-indigo-200/15 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                    
                    {/* Rotating border effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-400/20 via-transparent via-indigo-400/20 via-transparent to-blue-400/20 animate-spin" style={{ animationDuration: '25s' }} />
                    
                    {/* Central icon - brain representing personality analysis */}
                    {/* Central icon - representing career change and new directions */}
                    <div className="relative z-10 flex items-center justify-center">
                      {/* Briefcase transforming into different paths */}
                      <div className="relative">
                        <Briefcase size={32} className="text-white drop-shadow-lg animate-pulse" style={{ animationDuration: '2s' }} />
                        
                        {/* Arrow paths showing different career directions */}
                        <div className="absolute -top-4 -right-4 transform rotate-45">
                          <div className="w-6 h-0.5 bg-white/60 animate-pulse" style={{ animationDelay: '0.5s' }} />
                          <div className="absolute right-0 top-0 w-0 h-0 border-l-2 border-l-white/60 border-t border-t-transparent border-b border-b-transparent" />
                        </div>
                        
                        <div className="absolute -top-2 -right-6 transform rotate-12">
                          <div className="w-5 h-0.5 bg-white/50 animate-pulse" style={{ animationDelay: '1s' }} />
                          <div className="absolute right-0 top-0 w-0 h-0 border-l-2 border-l-white/50 border-t border-t-transparent border-b border-b-transparent" />
                        </div>
                        
                        <div className="absolute -bottom-2 -right-5 transform -rotate-12">
                          <div className="w-4 h-0.5 bg-white/40 animate-pulse" style={{ animationDelay: '1.5s' }} />
                          <div className="absolute right-0 top-0 w-0 h-0 border-l-2 border-l-white/40 border-t border-t-transparent border-b border-b-transparent" />
                        </div>
                        
                        {/* Small icons representing different career paths */}
                        <div className="absolute -top-6 -left-2 w-3 h-3 bg-white/30 rounded-full animate-float" style={{ animationDuration: '4s', animationDelay: '0s' }} />
                        <div className="absolute -right-8 top-1 w-2 h-2 bg-white/40 transform rotate-45 animate-float" style={{ animationDuration: '5s', animationDelay: '1s' }} />
                        <div className="absolute -bottom-4 -left-4 w-2.5 h-2.5 bg-white/25 rounded-sm animate-float" style={{ animationDuration: '6s', animationDelay: '2s' }} />
                        
                        {/* Transformation effect - morphing shapes */}
                        <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" style={{ animationDuration: '3s' }} />
                        <div className="absolute inset-2 rounded-full border border-white/15 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                      </div>
                    </div>
                    
                    {/* Enhanced overlay */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-blue-400/5 to-indigo-400/15" />
                    
                    {/* Glow effect */}
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 text-left shadow-xl border border-blue-200/50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-600" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl font-black text-gray-800 mb-4 leading-tight">
                        ENVIE DE CHANGER DE 
                        <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text"> MÉTIER</span> ?
                      </h3>
                      <p className="text-base text-gray-700 mb-6 font-bold bg-gradient-to-r from-indigo-600 to-blue-700 bg-clip-text text-transparent">
                        RÉALISEZ VOTRE TEST EN 10 MINUTES
                      </p>
                    
                      <div className="space-y-3 text-sm text-gray-700">
                        <div className="flex items-center space-x-3 group/item hover:translate-x-2 transition-transform duration-300">
                          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg" />
                          <span className="font-medium">Découvrez comment vous positionner</span>
                        </div>
                        <div className="flex items-center space-x-3 group/item hover:translate-x-2 transition-transform duration-300">
                          <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-slate-600 rounded-full shadow-lg" />
                          <span className="font-medium">Identifiez vos motivations profondes</span>
                        </div>
                        <div className="flex items-center space-x-3 group/item hover:translate-x-2 transition-transform duration-300">
                          <div className="w-3 h-3 bg-gradient-to-r from-slate-500 to-blue-600 rounded-full shadow-lg" />
                          <span className="font-medium">Obtenez des conseils personnalisés</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={startTest}
                      className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                    </button>
                  </div>
                </div>

                {/* Decorative cursor */}
                <div className="absolute top-6 right-6 w-8 h-8 bg-white/90 rounded-lg transform rotate-12 shadow-xl flex items-center justify-center hover:rotate-0 transition-transform duration-300 cursor-pointer border border-blue-200/50">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full" />
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                  Devez-vous faire une 
                  <span className="text-transparent bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text"> reconversion</span> ?
                </h2>
                
                <div className="flex items-center space-x-3 mb-8">
                  <Clock size={20} className="text-amber-400" />
                  <span className="text-xl text-gray-300 font-medium">Durée du test : 8 min</span>
                </div>
              </div>

              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p className="italic border-l-4 border-amber-400 pl-6 bg-white/5 backdrop-blur-sm rounded-r-lg py-4">
                  « Si vous n'aimez pas quelque chose, changez-la. Si vous ne pouvez pas la changer, changez votre attitude. » 
                </p>
                
                <p>
                  Si votre travail ne vous permet pas de vous épanouir, une reconversion professionnelle peut être la solution. 
                  Il s'agit de se réorienter vers une voie qui correspond davantage à vos besoins, vos valeurs et votre personnalité.
                </p>
                
                <p>
                  Ce test vous amène à faire le point sur votre situation professionnelle actuelle. Des questions axées sur le bien-être 
                  au travail vous aident à déterminer si changer de métier est la bonne décision pour vous.
                </p>
              </div>

              {/* CTA Section */}
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <ArrowRight size={14} className="text-white" />
                  </div>
                  <p className="text-gray-300">
                    <span className="text-red-400 font-semibold">Cliquez</span> pour en savoir + sur les modalités d'accompagnement 
                    des reconversions proposées par ZEN ACADEMY.
                  </p>
                </div>
                
                <button
                  onClick={onStart}
                  className="group bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden flex items-center space-x-3"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Play size={24} className="relative" />
                  <span className="relative">C'est parti !</span>
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 hover:bg-white/20 transition-all duration-300">
                    <Target size={20} className="text-blue-200" />
                  </div>
                  <p className="text-sm text-gray-400">Évaluation précise</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 hover:bg-white/20 transition-all duration-300">
                    <BookOpen size={20} className="text-blue-200" />
                  </div>
                  <p className="text-sm text-gray-400">Conseils personnalisés</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 hover:bg-white/20 transition-all duration-300">
                    <Award size={20} className="text-blue-200" />
                  </div>
                  <p className="text-sm text-gray-400">Expertise reconnue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StarRating: React.FC<{
  rating: number;
  onRatingChange: (rating: number) => void;
  disabled?: boolean;
  gradient: string;
}> = ({ rating, onRatingChange, disabled = false, gradient }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex justify-center items-center space-x-4 my-12">
      <div className="flex space-x-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={disabled}
            className={`group relative transform transition-all duration-300 hover:scale-125 ${
              disabled ? 'cursor-default' : 'cursor-pointer'
            }`}
            onMouseEnter={() => !disabled && setHoverRating(star)}
            onMouseLeave={() => !disabled && setHoverRating(0)}
            onClick={() => !disabled && onRatingChange(star)}
          >
            <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-r ${gradient}`} />
            <Star
              size={48}
              className={`relative transition-all duration-300 ${
                star <= (hoverRating || rating)
                  ? `fill-current text-transparent bg-gradient-to-r ${gradient} bg-clip-text drop-shadow-2xl`
                  : 'text-gray-300 hover:text-gray-400'
              }`}
              style={{
                filter: star <= (hoverRating || rating) ? 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))' : 'none'
              }}
            />
            {star <= (hoverRating || rating) && (
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradient} opacity-20 blur-md animate-pulse`} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const progress = (current / total) * 100;
  
  return (
    <div className="relative w-full h-3 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden shadow-inner border border-white/30">
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-full" />
      <div
        className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-full transition-all duration-500 ease-out relative shadow-lg"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full" />
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-xl animate-pulse border-2 border-orange-400" />
      </div>
      <div className="absolute top-full left-0 right-0 mt-3 flex justify-between text-white/80 text-sm font-medium">
        <span>Question {current}</span>
        <span>{Math.round(progress)}% complété</span>
        <span>{total} questions</span>
      </div>
    </div>
  );
};

const FloatingParticles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 10 + 5}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

const testQuestions: Question[] = [
  {
    id: 1,
    text: "Votre emploi actuel correspond-il à ce que vous aviez initialement envisagé ?",
    icon: Target,
    category: "Alignement",
    gradient: "from-violet-500 via-purple-500 to-indigo-600"
  },
  {
    id: 2,
    text: "Avez-vous des perspectives d'évolution dans votre poste ?",
    icon: TrendingUp,
    category: "Évolution",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600"
  },
  {
    id: 3,
    text: "Votre entreprise vous encourage-t-elle à vous former ou à développer de nouvelles compétences ?",
    icon: Brain,
    category: "Formation",
    gradient: "from-orange-500 via-amber-500 to-yellow-500"
  },
  {
    id: 4,
    text: "Votre travail vous semble-t-il porteur de sens ?",
    icon: Heart,
    category: "Sens",
    gradient: "from-rose-500 via-pink-500 to-red-500"
  },
  {
    id: 5,
    text: "Vos compétences sont-elles reconnues à leur juste valeur ?",
    icon: Award,
    category: "Reconnaissance",
    gradient: "from-blue-500 via-indigo-500 to-purple-600"
  },
  {
    id: 6,
    text: "Avez-vous le sentiment d'être utile aux autres dans votre activité ?",
    icon: Users,
    category: "Impact",
    gradient: "from-green-500 via-emerald-500 to-teal-600"
  },
  {
    id: 7,
    text: "Votre environnement de travail est-il respectueux et stimulant ?",
    icon: Sparkles,
    category: "Environnement",
    gradient: "from-purple-500 via-violet-500 to-indigo-600"
  },
  {
    id: 8,
    text: "Votre rémunération vous apporte-t-elle une réelle satisfaction ?",
    icon: TrendingUp,
    category: "Rémunération",
    gradient: "from-yellow-500 via-orange-500 to-red-500"
  },
  {
    id: 9,
    text: "Disposez-vous d'une certaine liberté pour organiser vos tâches comme vous le souhaitez ?",
    icon: CheckCircle,
    category: "Autonomie",
    gradient: "from-teal-500 via-cyan-500 to-blue-600"
  },
  {
    id: 10,
    text: "Votre équilibre entre vie professionnelle et vie personnelle vous convient-il aujourd'hui ?",
    icon: Heart,
    category: "Équilibre",
    gradient: "from-pink-500 via-rose-500 to-red-600"
  },
  {
    id: 11,
    text: "Vous arrive-t-il de vous réveiller le matin en pensant : « Ce n'est pas la vie que je veux » ?",
    icon: Target,
    category: "Questionnement",
    gradient: "from-gray-500 via-slate-500 to-gray-600"
  },
  {
    id: 12,
    text: "Avez-vous l'impression de porter en vous un rêve professionnel encore en sommeil ?",
    icon: Target,
    category: "Aspiration",
    gradient: "from-gray-500 via-slate-500 to-gray-600"
  },
  {
    id: 13,
    text: "Ressentez-vous une fatigue émotionnelle persistante liée à votre travail ?",
    icon: Target,
    category: "Bien-être",
    gradient: "from-gray-500 via-slate-500 to-gray-600"
  },
  {
    id: 14,
    text: "Avez-vous le sentiment de devoir jouer un rôle pour être accepté(e) dans votre environnement professionnel ?",
    icon: Target,
    category: "Authenticité",
    gradient: "from-gray-500 via-slate-500 to-gray-600"
  },
  {
    id: 15,
    text: "Vous arrive-t-il de douter de votre légitimité ou de vos capacités professionnelles ?",
    icon: Target,
    category: "Confiance",
    gradient: "from-gray-500 via-slate-500 to-gray-600"
  },
  {
    id: 16,
    text: "Avez-vous parfois la sensation de fonctionner en pilote automatique, sans satisfaction réelle ?",
    icon: Target,
    category: "Engagement",
    gradient: "from-gray-500 via-slate-500 to-gray-600"
  },
  {
    id: 17,
    text: "Avez-vous du mal à identifier ce qui vous stimule ou vous donne de l'énergie dans vos journées professionnelles ?",
    icon: Target,
    category: "Motivation",
    gradient: "from-gray-500 via-slate-500 to-gray-600"
  },
  {
    id: 18,
    text: "Ressentez-vous un ennui profond dans vos tâches, malgré une charge de travail normale ?",
    icon: Target,
    category: "Stimulation",
    gradient: "from-gray-500 via-slate-500 to-gray-600"
  },
  {
    id: 19,
    text: "Avez-vous perdu l'élan ou l'enthousiasme qui vous animait autrefois dans votre métier ?",
    icon: Target,
    category: "Passion",
    gradient: "from-gray-500 via-slate-500 to-gray-600"
  },
  {
    id: 20,
    text: "Avez-vous déjà envisagé une autre voie sans jamais oser vous lancer ?",
    icon: Target,
    category: "Changement",
    gradient: "from-gray-500 via-slate-500 to-gray-600"
  },
  {
    id: 21,
    text: "Avez-vous parfois le sentiment d'être coincé(e) dans un parcours qui ne vous ressemble plus ?",
    icon: Target,
    category: "Liberté",
    gradient: "from-gray-500 via-slate-500 to-gray-600"
  },
  {
    id: 22,
    text: "Pensez-vous qu'un accompagnement extérieur pourrait vous aider à y voir plus clair ?",
    icon: Target,
    category: "Accompagnement",
    gradient: "from-gray-500 via-slate-500 to-gray-600"
  },
  {
    id: 23,
    text: "Parvenez-vous à vous projeter dans votre métier dans cinq ans, avec confiance ?",
    icon: Target,
    category: "Projection",
    gradient: "from-gray-500 via-slate-500 to-gray-600"
  },
  {
    id: 24,
    text: "Avez-vous envie de contribuer à un projet plus grand que vous, porteur de sens et d'impact ?",
    icon: Target,
    category: "Impact",
    gradient: "from-gray-500 via-slate-500 to-gray-600"
  },
  {
    id: 25,
    text: "Avez-vous déjà pensé à faire un bilan de compétences, sans avoir encore franchi le pas ?",
    icon: Target,
    category: "Bilan",
    gradient: "from-gray-500 via-slate-500 to-gray-600"
  },
  {
    id: 26,
    text: "Avez-vous parfois l'intuition qu'une autre version de votre vie professionnelle vous attend : plus libre, plus alignée, plus vivante ?",
    icon: Target,
    category: "Intuition",
    gradient: "from-gray-500 via-slate-500 to-gray-600"
  }
];

// Header Component
const Header: React.FC<{ onContact: () => void }> = ({ onContact }) => {
  return (
    <div className="bg-white shadow-lg relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <img
              src="https://i.postimg.cc/s2MwmGKc/logo-zen.png"
              alt="Logo Zen"
              className="h-14 w-auto"
            />
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="text-sm text-gray-600">Numéro national non surtaxé</div>
              <div className="text-lg font-bold text-blue-900">01 76 35 06 84*</div>
            </div>
            <button 
              onClick={onContact}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold transition-colors duration-300 flex items-center space-x-2"
            >
              <Mail size={20} />
              <span>NOUS CONTACTER</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Test Page Component
const TestPage: React.FC<{ onBack: () => void; onContact: () => void }> = ({ onBack, onContact }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(testQuestions.length).fill(0));
  const [isCompleted, setIsCompleted] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    rgpdConsent: false
  });

  const progress = ((currentQuestion + 1) / testQuestions.length) * 100;

  const handleAnswerChange = (rating: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = rating;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Toutes les questions sont terminées, afficher le formulaire de contact
      setShowProfile(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleContactChange = (field: string, value: string) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pouvez traiter les données du formulaire
    if (!contactData.firstName || !contactData.lastName || !contactData.email || !contactData.rgpdConsent) {
      return;
    }
    console.log('Réponses au test:', answers);
    // Rediriger vers la page de résultats ou afficher un message de confirmation
    alert('Merci ! Vos informations ont été enregistrées. Nous vous contacterons bientôt.');
  };

  const handleProfileCTA = () => {
    setShowProfile(false);
    setShowContactForm(true);
  };

  const canProceed = answers[currentQuestion] > 0;
  const currentQuestionData = testQuestions[currentQuestion];

  if (isCompleted) {
    const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Header */}
        <header className="relative z-50 backdrop-blur-xl bg-white/10 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Test de Positionnement</h1>
                  <p className="text-sm text-purple-200">Bilan de Compétences</p>
                </div>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-white/80 hover:text-white transition-colors">Accueil</a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">À propos</a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Contact</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section avec Image */}
        <div className="relative h-80 overflow-hidden">
          <img 
            src="https://s15-kling.klingai.com/kimg/EMXN1y8qSQoGdXBsb2FkEg55bGFiLXN0dW50LXNncBova2xpbmcvZG93bmxvYWQvTWpnMU9UVXpORFE1TXpBME1qTTJNakkxTVRrMU1qUTA.origin?x-kcdn-pid=112372"
            alt="Résultats du test"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Vos Résultats</h2>
              <p className="text-xl md:text-2xl text-white/90">Découvrez votre profil professionnel</p>
            </div>
          </div>
        </div>

        {/* Header */}
        <header className="relative z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Bilan de Compétences</h1>
                  <p className="text-purple-200 text-sm">Découvrez votre potentiel professionnel</p>
                </div>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-white/80 hover:text-white transition-colors">Accueil</a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">À propos</a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Contact</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full animate-float" style={{animationDuration: '6s'}}></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-pink-500/30 rounded-lg animate-drift" style={{animationDuration: '10s'}}></div>
          <div className="absolute bottom-32 left-20 w-40 h-40 bg-indigo-500/20 rounded-full animate-floatSlow" style={{animationDuration: '15s'}}></div>
          <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-purple-400/25 rounded-lg animate-drift" style={{animationDuration: '12s'}}></div>
          <div className="absolute bottom-1/4 right-1/3 w-28 h-28 bg-pink-400/20 rounded-full animate-float" style={{animationDuration: '8s'}}></div>
          <div className="absolute bottom-32 right-20 w-16 h-16 bg-pink-500/30 rounded-full animate-drift" style={{animationDuration: '8s'}}></div>
        </div>

        {/* Hero Image Section */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://s15-kling.klingai.com/kimg/EMXN1y8qSQoGdXBsb2FkEg55bGFiLXN0dW50LXNncBova2xpbmcvZG93bmxvYWQvTWpnMU9UVXpORFE1TXpBME1qTTJNakkxTVRrMU1qUTA.origin?x-kcdn-pid=112372"
                alt="Résultats du test de positionnement"
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Vos Résultats</h2>
                <p className="text-white/90 text-lg">Découvrez votre profil professionnel personnalisé</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle size={48} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Test Terminé !</h2>
              <p className="text-xl text-gray-600 mb-8">
                Votre score total : <span className="font-bold text-blue-600">{totalScore}/{testQuestions.length * 5}</span>
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={onBack}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-300 flex items-center space-x-2"
                >
                  <RotateCcw size={20} />
                  <span>Retour à l'accueil</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Affichage du profil après toutes les réponses
  if (showProfile) {
    const averageScore = answers.reduce((sum, answer) => sum + answer, 0) / answers.length;
    let profile;

    if (averageScore <= 1.5) {
      profile = {
        type: "resigned",
        title: "Le·la Résigné·e lucide",
        icon: UserX,
        color: "blue",
        quote: "Je sais que ce n'est plus ma voie… mais je continue quand même.",
        description: "Tu avances dans ta vie professionnelle comme sur un tapis roulant. Tu fais ce qu'il faut, sans trop de passion, ni d'enthousiasme. Une part de toi s'est tue, une autre commence à crier. Tu sens que ce que tu vis aujourd'hui n'est plus aligné avec qui tu es devenu·e.",
        advice: "Il est temps de te réécouter. Un bilan de compétences peut t'aider à te reconnecter à tes aspirations profondes et à redonner du sens à ton quotidien.",
        cta: "Faire le point avec un expert"
      };
    } else if (averageScore <= 2.5) {
      profile = {
        type: "torn",
        title: "L'Écartelé·e entre deux mondes",
        icon: GitBranch,
        color: "orange",
        quote: "Il y a du bon dans ce que je fais… mais ce n'est pas suffisant.",
        description: "Tu vis des hauts et des bas. Ton métier t'offre certaines satisfactions, mais aussi des frustrations récurrentes : manque de reconnaissance, charge mentale, perte de sens… Tu es à mi-chemin entre ce qui rassure et ce qui t'appelle.",
        advice: "Tu n'as pas besoin de tout bouleverser. Mais tu gagnes à prendre du recul pour décider en conscience. Un bilan de compétences peut t'aider à faire les bons choix, au bon moment.",
        cta: "Découvrir comment le bilan peut t'aider"
      };
    } else if (averageScore <= 3.5) {
      profile = {
        type: "awakening",
        title: "La Boussole en éveil",
        icon: Compass,
        color: "green",
        quote: "Je ressens qu'autre chose m'attend… mais je ne sais pas quoi.",
        description: "Une intuition, une envie, un appel intérieur… Tu sais que tu veux autre chose, mais l'incertitude ou le flou te freinent. Tu portes un rêve, un projet, une idée… mais tu ne sais pas comment l'organiser ou le tester.",
        advice: "Ton envie mérite d'être clarifiée. Un bilan de compétences t'offre un cadre pour transformer ce ressenti en projet concret, réaliste, et aligné avec ta personnalité.",
        cta: "Transformer mon intuition en plan d'action"
      };
    } else {
      profile = {
        type: "ready",
        title: "Le·la Clairvoyant·e en transition",
        icon: Mountain,
        color: "purple",
        quote: "Je suis prêt·e à changer. J'ai juste besoin d'un coup de pouce.",
        description: "Tu as déjà fait une partie du chemin : tu sais que tu veux évoluer. Ce qu'il te manque maintenant, c'est un cadre structurant, une méthode, un soutien pour passer à l'action et sécuriser tes décisions.",
        advice: "Bravo, tu es au bon endroit. Le bilan de compétences est l'outil parfait pour concrétiser ta transition, valider ton projet et passer à l'étape suivante sereinement.",
        cta: "Concrétiser mon changement dès maintenant"
      };
    }

    const IconComponent = profile.icon;
    const colorClasses = {
      blue: "from-blue-500 to-blue-600 border-blue-200",
      orange: "from-orange-500 to-orange-600 border-orange-200",
      green: "from-green-500 to-green-600 border-green-200",
      purple: "from-purple-500 to-purple-600 border-purple-200"
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 animate-fadeIn">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">
                🎉 Félicitations ! Votre profil est déterminé
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
            </div>

            <div className={`backdrop-blur-sm bg-white/5 rounded-2xl border ${colorClasses[profile.color as keyof typeof colorClasses].split(' ')[2]} border-opacity-30 p-8 mb-8`}>
              <div className="flex items-center justify-center mb-6">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${colorClasses[profile.color as keyof typeof colorClasses].split(' ').slice(0, 2).join(' ')} flex items-center justify-center shadow-lg`}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white text-center mb-4">
                {profile.title}
              </h2>

              <div className="bg-white/10 rounded-xl p-4 mb-6">
                <p className="text-lg text-cyan-200 italic text-center">
                  "{profile.quote}"
                </p>
              </div>

              <p className="text-white/90 text-lg leading-relaxed mb-6 text-center">
                {profile.description}
              </p>

              <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-xl p-6 mb-8">
                <p className="text-white font-medium text-lg text-center">
                  🎯 {profile.advice}
                </p>
              </div>

              <div className="text-center">
                <button
                  onClick={handleProfileCTA}
                  className="bg-gradient-to-r from-[#01b7ba] to-[#150356] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-[#019a9d] hover:to-[#0f0240]"
                >
                  👉 {profile.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Formes animées spectaculaires */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Formes géométriques flottantes - Grande folie ! */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-500/30 to-purple-600/30 rounded-full animate-float blur-sm" style={{ animationDuration: '8s' }} />
        <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-yellow-400/40 to-orange-500/40 transform rotate-45 animate-float" style={{ animationDuration: '12s', animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-gradient-to-r from-cyan-400/25 to-blue-500/25 rounded-lg animate-floatSlow" style={{ animationDuration: '15s', animationDelay: '2s' }} />
        <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-gradient-to-r from-green-400/35 to-emerald-500/35 rounded-full animate-drift" style={{ animationDuration: '10s', animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 right-1/3 w-28 h-28 bg-gradient-to-r from-red-400/30 to-pink-500/30 transform rotate-12 animate-float" style={{ animationDuration: '14s', animationDelay: '3s' }} />
        
        {/* Formes triangulaires volantes */}
        <div className="absolute top-1/2 left-8 w-0 h-0 border-l-16 border-r-16 border-b-28 border-l-transparent border-r-transparent border-b-indigo-400/40 animate-drift" style={{ animationDuration: '18s', animationDelay: '1.5s' }} />
        <div className="absolute top-3/4 right-12 w-0 h-0 border-l-12 border-r-12 border-b-20 border-l-transparent border-r-transparent border-b-amber-400/50 animate-float" style={{ animationDuration: '11s', animationDelay: '4s' }} />
        
        {/* Hexagones magiques */}
        <div className="absolute top-16 left-1/2 w-16 h-16 bg-gradient-to-r from-violet-500/35 to-purple-600/35 transform rotate-45 animate-floatSlow clip-path-hexagon" style={{ animationDuration: '13s', animationDelay: '2.5s' }} />
        <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-gradient-to-r from-teal-400/40 to-cyan-500/40 transform rotate-12 animate-drift" style={{ animationDuration: '16s', animationDelay: '1s' }} />
        
        {/* Étoiles scintillantes */}
        <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-yellow-300/60 animate-pulse transform rotate-45" style={{ animationDuration: '2s' }}>
          <div className="absolute inset-0 bg-yellow-300/60 transform rotate-45" />
        </div>
        <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-white/70 animate-pulse transform rotate-45" style={{ animationDuration: '1.5s', animationDelay: '0.5s' }}>
          <div className="absolute inset-0 bg-white/70 transform rotate-45" />
        </div>
        
        {/* Cercles concentriques animés */}
        <div className="absolute top-1/2 right-1/4 w-32 h-32 border-2 border-blue-400/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 border border-indigo-300/40 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-purple-400/50 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '2s' }} />
        
        {/* Lignes géométriques dynamiques */}
        <svg className="absolute top-0 right-0 w-1/2 h-full opacity-60" viewBox="0 0 600 800" fill="none">
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {[...Array(20)].map((_, i) => (
            <g key={i}>
              <path
                d={`M ${i * 30} 0 Q ${150 + i * 25} ${200 + i * 40} ${300 + i * 20} ${400 + i * 30} T ${600} ${600 + i * 15}`}
                stroke={i % 2 === 0 ? "url(#lineGradient1)" : "url(#lineGradient2)"}
                strokeWidth={i % 3 === 0 ? "2" : "1"}
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.15}s`, animationDuration: `${3 + (i % 4)}s` }}
              />
            </g>
          ))}
        </svg>
        
        {/* Particules flottantes */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-float ${
              i % 4 === 0 ? 'bg-yellow-400/50' :
              i % 4 === 1 ? 'bg-pink-400/50' :
              i % 4 === 2 ? 'bg-cyan-400/50' : 'bg-purple-400/50'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 15 + 8}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        
        {/* Vagues ondulantes */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 120" fill="none">
            <path
              d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
              fill="url(#waveGradient)"
              className="animate-pulse"
              style={{ animationDuration: '4s' }}
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      {/* Header with Progress Bar */}
      <div className="bg-white shadow-lg relative z-20">
        <div className="max-w-7xl mx-auto px-8 py-3">
          <div className="flex items-center">
            {/* Logo - positioned further left */}
            <div className="flex-shrink-0 mr-8">
              <img 
                src="https://i.postimg.cc/s2MwmGKc/logo-zen.png" 
                alt="Logo Zen" 
                className="h-14 w-auto"
              />
            </div>
            
            {/* Progress Bar - centered with more space */}
            <div className="flex-1 flex justify-center px-12">
              <div className="w-full max-w-3xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">Question {currentQuestion + 1}</span>
                  <span className="text-xs font-semibold text-gray-700">{Math.round(progress)}%</span>
                  <span className="text-xs text-gray-500">{testQuestions.length} questions</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#01b7ba] to-[#150356] transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
            
            {/* Right-side elements - pushed further right */}
            <div className="flex items-center space-x-8 flex-shrink-0 ml-8">
              <div className="text-right whitespace-nowrap">
                <div className="text-sm text-gray-600">Numéro national non surtaxé</div>
                <div className="text-lg font-bold text-blue-900">01 76 35 06 84</div>
              </div>
              <button 
                onClick={onContact}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-full font-semibold transition-colors duration-300 flex items-center space-x-2 whitespace-nowrap"
              >
                <Mail className="w-4 h-4" />
                <span>NOUS CONTACTER</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Formulaire de contact */}
        {showContactForm && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Félicitations ! Vous avez terminé le test
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                Pour recevoir votre analyse personnalisée, merci de renseigner vos coordonnées
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-white font-medium mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={contactData.firstName}
                    onChange={(e) => handleContactChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-white font-medium mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={contactData.lastName}
                    onChange={(e) => handleContactChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={contactData.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="votre.email@exemple.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-white font-medium mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={contactData.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="company" className="block text-white font-medium mb-2">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={contactData.company}
                    onChange={(e) => handleContactChange('company', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Nom de votre entreprise"
                  />
                </div>
                <div>
                  <label htmlFor="position" className="block text-white font-medium mb-2">
                    Poste actuel
                  </label>
                  <input
                    type="text"
                    id="position"
                    value={contactData.position}
                    onChange={(e) => handleContactChange('position', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Votre fonction"
                  />
                </div>
              </div>

              {/* Mentions RGPD */}
              <div className="col-span-1 md:col-span-2 space-y-4 pt-4 border-t border-white/20">
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">
                    Consentement au traitement de vos données personnelles
                  </h4>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    En soumettant ce formulaire, je consens expressément à ce que mes données personnelles 
                    soient utilisées par Zen Academy dans le seul but d'être recontacté(e) par un conseiller 
                    au sujet d'un bilan de compétences.
                  </p>
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="rgpdConsent"
                      checked={contactData.rgpdConsent}
                      onChange={(e) => setContactData({...contactData, rgpdConsent: e.target.checked})}
                      className="mt-1 w-4 h-4 text-[#01b7ba] bg-white/10 border-white/30 rounded focus:ring-[#01b7ba] focus:ring-2"
                      required
                    />
                    <label htmlFor="rgpdConsent" className="text-sm text-gray-200 leading-relaxed cursor-pointer">
                      J'accepte d'être contacté(e) par Zen Academy pour des informations relatives à un bilan de compétences.
                    </label>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#01b7ba] to-[#150356] text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Recevoir mon analyse personnalisée
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Question actuelle */}
        {!showContactForm && (
          <div className="animate-fadeIn">
            {/* Question Number */}
            <div className="text-center mb-8">
              <h3 className="text-white text-lg font-medium">Question {currentQuestion + 1}</h3>
            </div>
            
            {/* Question */}
            <div className="text-center mb-16">
              <h2 className="text-white text-2xl md:text-3xl font-medium leading-relaxed max-w-4xl mx-auto">
                {currentQuestionData.text}
              </h2>
            </div>
            
            {/* Answer Options */}
            <div className="max-w-4xl mx-auto space-y-4 mb-16">
              {['Pas du tout d\'accord', 'Plutôt pas d\'accord', 'Neutre', 'Plutôt d\'accord', 'Tout à fait d\'accord'].map((option, index) => (
                <button
                  key={index + 1}
                  onClick={() => handleAnswerChange(index + 1)}
                  className={`w-full bg-white rounded-2xl p-6 text-left font-medium text-lg transition-all duration-300 hover:shadow-lg flex items-center space-x-4 ${
                    answers[currentQuestion] === index + 1
                      ? 'ring-2 ring-blue-500 shadow-lg'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestion] === index + 1
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestion] === index + 1 && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  <span className={answers[currentQuestion] === index + 1 ? 'text-blue-900' : 'text-gray-800'}>
                    {option}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between items-center max-w-4xl mx-auto">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentQuestion === 0
                    ? 'text-white/50 cursor-not-allowed'
                    : 'text-white border border-white/30 hover:bg-white/10'
                }`}
              >
                <ChevronLeft size={20} />
                <span>Question précédente</span>
              </button>
              
              <button
                onClick={handleNext}
                disabled={!canProceed}
                className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                  canProceed
                    ? 'bg-white text-blue-900 hover:bg-gray-100 shadow-lg'
                    : 'bg-white/30 text-white/50 cursor-not-allowed'
                }`}
              >
                <span>{currentQuestion === testQuestions.length - 1 ? 'Voir mes résultats' : 'Question suivante'}</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Formes décoratives animées */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-float" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-400/20 rounded-lg animate-float" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-green-400/20 rounded-full animate-float" style={{animationDuration: '10s', animationDelay: '1s'}}></div>
      </div>
    </div>
  );
};

const ResultCard: React.FC<{ score: number; onRestart: () => void }> = ({ score, onRestart }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300);
  }, []);

  const getRecommendation = (score: number) => {
    if (score >= 23) {
      return {
        title: "🌟 Excellence Professionnelle",
        subtitle: "Votre épanouissement est remarquable",
        message: "Vous évoluez dans un environnement professionnel idéal. Un bilan de compétences pourrait révéler de nouvelles opportunités d'excellence et d'innovation dans votre parcours.",
        gradient: "from-emerald-400 via-teal-500 to-cyan-600",
        bgGradient: "from-emerald-50 via-teal-50 to-cyan-50",
        icon: "🚀"
      };
    } else if (score >= 18) {
      return {
        title: "✨ Potentiel d'Optimisation",
        subtitle: "Une base solide à développer",
        message: "Votre situation présente de belles perspectives. Un bilan de compétences vous permettrait d'identifier les leviers pour maximiser votre épanouissement professionnel.",
        gradient: "from-blue-400 via-indigo-500 to-purple-600",
        bgGradient: "from-blue-50 via-indigo-50 to-purple-50",
        icon: "💎"
      };
    } else if (score >= 12) {
      return {
        title: "🎯 Moment de Réflexion",
        subtitle: "Des ajustements à envisager",
        message: "Votre parcours mérite une attention particulière. Un bilan de compétences serait l'opportunité parfaite pour clarifier vos aspirations et définir une stratégie d'évolution.",
        gradient: "from-amber-400 via-orange-500 to-red-500",
        bgGradient: "from-amber-50 via-orange-50 to-red-50",
        icon: "🎨"
      };
    } else {
      return {
        title: "🌅 Nouveau Départ",
        subtitle: "L'opportunité d'une transformation",
        message: "Il est temps d'explorer de nouveaux horizons. Un bilan de compétences sera votre boussole pour naviguer vers un avenir professionnel plus aligné avec vos aspirations.",
        gradient: "from-rose-400 via-pink-500 to-purple-600",
        bgGradient: "from-rose-50 via-pink-50 to-purple-50",
        icon: "🦋"
      };
    }
  };

  const recommendation = getRecommendation(score);

  return (
    <div className={`transform transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <FloatingParticles />
      
      <div className="text-center space-y-8 relative">
        {/* Hero Section */}
        <div className="relative">
          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r ${recommendation.gradient} mb-8 shadow-2xl relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
            <div className="text-6xl animate-bounce">{recommendation.icon}</div>
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${recommendation.gradient} opacity-30 blur-xl animate-pulse`} />
          </div>
          
          <div className={`inline-block px-8 py-4 rounded-full bg-gradient-to-r ${recommendation.gradient} text-white font-bold text-2xl shadow-xl mb-6 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
            <span className="relative">Score: {score}/30</span>
          </div>
        </div>

        {/* Main Content */}
        <div className={`max-w-4xl mx-auto bg-gradient-to-br ${recommendation.bgGradient} rounded-3xl p-12 shadow-2xl border border-white/50 backdrop-blur-sm relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-gray-800 mb-4 leading-tight">
              {recommendation.title}
            </h2>
            <p className={`text-xl font-semibold bg-gradient-to-r ${recommendation.gradient} bg-clip-text text-transparent mb-8`}>
              {recommendation.subtitle}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto">
              {recommendation.message}
            </p>
            
            {/* CTA Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <Sparkles className={`w-8 h-8 text-transparent bg-gradient-to-r ${recommendation.gradient} bg-clip-text mr-3`} />
                  <h3 className="text-2xl font-bold text-gray-800">Prêt(e) pour votre bilan de compétences ?</h3>
                  <Sparkles className={`w-8 h-8 text-transparent bg-gradient-to-r ${recommendation.gradient} bg-clip-text ml-3`} />
                </div>
                <p className="text-gray-600 mb-8 text-lg">
                  Transformez cette évaluation en plan d'action concret. Nos experts vous accompagnent dans la définition de votre projet professionnel.
                </p>
                <button className={`bg-gradient-to-r ${recommendation.gradient} text-white px-12 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Demander un entretien personnalisé
                    <Sparkles className="w-5 h-5 ml-2" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="inline-flex items-center space-x-3 text-gray-500 hover:text-gray-700 font-semibold transition-all duration-300 transform hover:scale-105 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/50"
        >
          <RotateCcw size={24} />
          <span className="text-lg">Refaire le test</span>
        </button>
      </div>
    </div>
  );
};

// Contact Page Component
const ContactPage: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    rgpdConsent: false
  });

  const handleContactChange = (field: string, value: string | boolean) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.firstName || !contactData.lastName || !contactData.email || !contactData.rgpdConsent) {
      return;
    }
    console.log('Données de contact:', contactData);
    alert('Merci ! Votre demande a été envoyée. Nous vous contacterons bientôt.');
    onClose();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-full animate-float" style={{ animationDuration: '15s' }} />
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-teal-400/20 to-cyan-500/20 transform rotate-45 animate-float" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-lg animate-float" style={{ animationDuration: '18s', animationDelay: '4s' }} />
        <div className="absolute top-60 left-1/3 w-12 h-12 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full animate-float" style={{ animationDuration: '14s', animationDelay: '1s' }} />
        <div className="absolute bottom-60 right-1/4 w-18 h-18 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 transform rotate-12 animate-float" style={{ animationDuration: '16s', animationDelay: '3s' }} />
      </div>

      {/* Header */}
      <Header onContact={() => {}} />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Contactez-nous
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            Notre équipe d'experts est à votre disposition pour vous accompagner dans votre projet professionnel
          </p>
        </div>

        <form onSubmit={handleContactSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="firstName" className="block text-white font-medium mb-2">
                Prénom *
              </label>
              <input
                type="text"
                id="firstName"
                required
                value={contactData.firstName}
                onChange={(e) => handleContactChange('firstName', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Votre prénom"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-white font-medium mb-2">
                Nom *
              </label>
              <input
                type="text"
                id="lastName"
                required
                value={contactData.lastName}
                onChange={(e) => handleContactChange('lastName', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Votre nom"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="email" className="block text-white font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                required
                value={contactData.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="votre.email@exemple.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-white font-medium mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                value={contactData.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="06 12 34 56 78"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="company" className="block text-white font-medium mb-2">
                Entreprise
              </label>
              <input
                type="text"
                id="company"
                value={contactData.company}
                onChange={(e) => handleContactChange('company', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Nom de votre entreprise"
              />
            </div>
            <div>
              <label htmlFor="position" className="block text-white font-medium mb-2">
                Poste actuel
              </label>
              <input
                type="text"
                id="position"
                value={contactData.position}
                onChange={(e) => handleContactChange('position', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Votre fonction"
              />
            </div>
          </div>

          {/* Message field */}
          <div className="mb-8">
            <label htmlFor="message" className="block text-white font-medium mb-2">
              Votre message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
              placeholder="Décrivez-nous votre projet ou vos questions..."
            />
          </div>

          {/* Mentions RGPD */}
          <div className="space-y-4 pt-4 border-t border-white/20 mb-8">
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">
                Consentement au traitement de vos données personnelles
              </h4>
              <p className="text-sm text-gray-200 leading-relaxed">
                En soumettant ce formulaire, je consens expressément à ce que mes données personnelles 
                soient utilisées par Zen Academy dans le seul but d'être recontacté(e) par un conseiller 
                au sujet d'un bilan de compétences.
              </p>
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="rgpdConsent"
                  checked={contactData.rgpdConsent}
                  onChange={(e) => handleContactChange('rgpdConsent', e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#01b7ba] bg-white/10 border-white/30 rounded focus:ring-[#01b7ba] focus:ring-2"
                  required
                />
                <label htmlFor="rgpdConsent" className="text-sm text-gray-200 leading-relaxed cursor-pointer">
                  J'accepte d'être contacté(e) par Zen Academy pour des informations relatives à un bilan de compétences. *
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#01b7ba] to-[#150356] text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Envoyer ma demande
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              Retour à l'accueil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function App() {
  const [view, setView] = useState<'intro' | 'test' | 'contact'>('intro');

  return (
    <>
      {view === 'intro' && (
        <IntroductionPage
          onStart={() => setView('test')}
          onContact={() => setView('contact')}
        />
      )}

      {view === 'test' && (
        <TestPage
          onBack={() => setView('intro')}
          onContact={() => setView('contact')}
        />
      )}

      {view === 'contact' && (
        <ContactPage onClose={() => setView('intro')} />
      )}
    </>
  );
}

export default App;