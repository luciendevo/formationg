import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Save, FileText, CheckCircle, AlertCircle } from 'react-feather';
import { mockDataService } from '../../services/mockDataService';
import { CPFQuestion, CPFAnswer } from '../../types/formationG';

const CPFForm: React.FC = () => {
  const [questions, setQuestions] = useState<CPFQuestion[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(0);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Categories for multi-step form
  const categories = [
    { id: 'profil', title: 'Profil personnel', description: 'Votre situation actuelle' },
    { id: 'objectifs', title: 'Objectifs professionnels', description: 'Vos aspirations de carrière' },
    { id: 'competences', title: 'Compétences', description: 'Vos compétences à développer' },
    { id: 'contraintes', title: 'Contraintes', description: 'Vos disponibilités' },
    { id: 'financement', title: 'Financement', description: 'Modalités de financement' },
    { id: 'motivation', title: 'Motivation', description: 'Vos motivations profondes' }
  ];

  useEffect(() => {
    // Load questions from mock service
    const allQuestions = mockDataService.getCPFQuestions();
    setQuestions(allQuestions);

    // Load saved answers from localStorage
    const savedAnswers = localStorage.getItem('cpf_form_answers');
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers);
      setAnswers(parsedAnswers);
      calculateProgress(parsedAnswers, allQuestions);
    }

    // Load last saved timestamp
    const savedTimestamp = localStorage.getItem('cpf_form_last_saved');
    if (savedTimestamp) {
      setLastSaved(new Date(savedTimestamp));
    }
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (Object.keys(answers).length > 0) {
        autoSave();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [answers]);

  const calculateProgress = (currentAnswers: Record<string, string>, allQuestions: CPFQuestion[]) => {
    const totalQuestions = allQuestions.length;
    const answeredQuestions = Object.keys(currentAnswers).length;
    const progressPercent = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
    setProgress(Math.round(progressPercent));
  };

  const autoSave = async () => {
    setIsAutoSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    localStorage.setItem('cpf_form_answers', JSON.stringify(answers));
    localStorage.setItem('cpf_form_last_saved', new Date().toISOString());
    setLastSaved(new Date());
    setIsAutoSaving(false);
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    calculateProgress(newAnswers, questions);
  };

  const getCurrentCategoryQuestions = () => {
    const currentCategory = categories[currentStep];
    return questions.filter(q => q.category === currentCategory.id);
  };

  const canProceedToNext = () => {
    const currentQuestions = getCurrentCategoryQuestions();
    const requiredQuestions = currentQuestions.filter(q => q.required);
    return requiredQuestions.every(q => answers[q.id] && answers[q.id].trim().length > 0);
  };

  const handleNext = () => {
    if (currentStep < categories.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsAutoSaving(true);
    
    // Final save
    await autoSave();
    
    // Mark form as completed
    localStorage.setItem('cpf_form_completed', 'true');
    
    alert('Formulaire CPF soumis avec succès ! Nous traiterons votre dossier sous 48h.');
    setIsAutoSaving(false);
  };

  const currentCategory = categories[currentStep];
  const currentQuestions = getCurrentCategoryQuestions();
  const isLastStep = currentStep === categories.length - 1;

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-dark)' }}>
              Formulaire CPF
            </h1>
            <p className="text-lg" style={{ color: 'var(--text-light)' }}>
              Dossier de demande de formation professionnelle
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAutoSaving && (
              <div className="flex items-center space-x-2 text-sm" style={{ color: 'var(--text-light)' }}>
                <Save className="w-4 h-4 animate-spin" />
                <span>Sauvegarde...</span>
              </div>
            )}
            
            {lastSaved && !isAutoSaving && (
              <div className="flex items-center space-x-2 text-sm" style={{ color: 'var(--success-green)' }}>
                <CheckCircle className="w-4 h-4" />
                <span>Sauvegardé à {lastSaved.toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span style={{ color: 'var(--text-light)' }}>Progression globale</span>
            <span style={{ color: 'var(--text-dark)' }}>{progress}% complété</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full transition-all duration-500"
              style={{ 
                width: `${progress}%`,
                backgroundColor: 'var(--primary-blue)'
              }}
            />
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto">
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className={`flex items-center ${index < categories.length - 1 ? 'flex-1' : ''}`}
            >
              <div className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    index === currentStep 
                      ? 'text-white' 
                      : index < currentStep 
                        ? 'text-white' 
                        : 'text-gray-400'
                  }`}
                  style={{ 
                    backgroundColor: index === currentStep 
                      ? 'var(--primary-blue)' 
                      : index < currentStep 
                        ? 'var(--success-green)' 
                        : 'var(--secondary-grey)'
                  }}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="text-center mt-2 min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: 'var(--text-dark)' }}>
                    {category.title}
                  </p>
                </div>
              </div>
              
              {index < categories.length - 1 && (
                <div 
                  className="flex-1 h-0.5 mx-4"
                  style={{ 
                    backgroundColor: index < currentStep 
                      ? 'var(--success-green)' 
                      : 'var(--secondary-grey)'
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="card">
        <div className="card-body">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>
              {currentCategory.title}
            </h2>
            <p style={{ color: 'var(--text-light)' }}>
              {currentCategory.description}
            </p>
          </div>

          {/* Questions */}
          <div className="space-y-8">
            {currentQuestions.map((question, index) => (
              <div key={question.id} className="form-group">
                <label className="form-label flex items-start">
                  <span className="flex-1">
                    <span className="text-sm font-medium text-gray-500 mr-2">
                      Question {index + 1}
                    </span>
                    {question.question}
                    {question.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </span>
                </label>
                
                {question.helpText && (
                  <p className="text-sm mb-3" style={{ color: 'var(--text-light)' }}>
                    💡 {question.helpText}
                  </p>
                )}

                {question.type === 'textarea' ? (
                  <textarea
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="form-input form-textarea"
                    placeholder={question.placeholder}
                    rows={6}
                    style={{ minHeight: '150px' }}
                  />
                ) : question.type === 'select' ? (
                  <select
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="form-input form-select"
                  >
                    <option value="">Sélectionnez une option</option>
                    {question.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="form-input"
                    placeholder={question.placeholder}
                  />
                )}

                {question.validation && answers[question.id] && (
                  <div className="mt-2">
                    {question.validation.minLength && answers[question.id].length < question.validation.minLength && (
                      <p className="text-sm flex items-center" style={{ color: 'var(--warning-yellow)' }}>
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Minimum {question.validation.minLength} caractères requis
                      </p>
                    )}
                    {question.validation.maxLength && answers[question.id].length > question.validation.maxLength && (
                      <p className="text-sm flex items-center" style={{ color: 'var(--error-red)' }}>
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Maximum {question.validation.maxLength} caractères autorisés
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="card-footer">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`btn ${currentStep === 0 ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-outline'}`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Précédent
            </button>

            <div className="text-sm" style={{ color: 'var(--text-light)' }}>
              Étape {currentStep + 1} sur {categories.length}
            </div>

            {isLastStep ? (
              <button
                onClick={handleSubmit}
                disabled={!canProceedToNext()}
                className={`btn ${canProceedToNext() ? 'btn-success' : 'btn-secondary opacity-50 cursor-not-allowed'}`}
              >
                <FileText className="w-4 h-4 mr-2" />
                Soumettre le dossier
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canProceedToNext()}
                className={`btn ${canProceedToNext() ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'}`}
              >
                Suivant
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>

          {!canProceedToNext() && (
            <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(237, 137, 54, 0.1)' }}>
              <p className="text-sm flex items-center" style={{ color: 'var(--warning-yellow)' }}>
                <AlertCircle className="w-4 h-4 mr-2" />
                Veuillez répondre à toutes les questions obligatoires pour continuer
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: 'var(--secondary-grey)' }}>
        <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-dark)' }}>
          💡 Conseils pour remplir votre dossier
        </h3>
        <ul className="space-y-2 text-sm" style={{ color: 'var(--text-light)' }}>
          <li>• Soyez précis et détaillé dans vos réponses</li>
          <li>• Vos réponses sont sauvegardées automatiquement toutes les 30 secondes</li>
          <li>• Vous pouvez revenir modifier vos réponses à tout moment</li>
          <li>• En cas de difficulté, n'hésitez pas à nous contacter</li>
        </ul>
      </div>
    </div>
  );
};

export default CPFForm;
