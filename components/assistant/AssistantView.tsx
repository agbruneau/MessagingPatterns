
import React, { useState, useCallback } from 'react';
import { getPatternRecommendation } from '../../services/geminiService';
import Card from '../layout/Card';

const constraintOptions = [
  'Real-time processing is critical (low latency)',
  'High scalability for millions of messages/events',
  'Guaranteed message delivery and processing',
  'Strict ordering of messages/events is required',
  'Complete audit trail of all changes is mandatory',
  'Decoupling services is the top priority',
  'The system needs to integrate with many different technologies',
  'The end-to-end business process is complex and needs to be monitored',
  'The implementation should be as simple as possible',
];

const AssistantView: React.FC = () => {
  const [useCase, setUseCase] = useState('');
  const [selectedConstraints, setSelectedConstraints] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleToggleConstraint = (constraint: string) => {
    setSelectedConstraints(prev =>
      prev.includes(constraint)
        ? prev.filter(c => c !== constraint)
        : [...prev, constraint]
    );
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!useCase.trim() || selectedConstraints.length === 0) {
      setError('Please describe your use case and select at least one constraint.');
      return;
    }
    setError('');
    setIsLoading(true);
    setRecommendation('');
    try {
      const result = await getPatternRecommendation(useCase, selectedConstraints);
      setRecommendation(result);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [useCase, selectedConstraints]);

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">AI-Powered Assistant</h1>
        <p className="text-lg text-navy-300">Describe your project and its constraints. Our assistant uses Gemini 2.5 Pro with Thinking Mode to provide in-depth recommendations for complex scenarios.</p>
      </header>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="use-case" className="block text-sm font-medium text-navy-200 mb-2">
              1. Briefly describe your use case
            </label>
            <textarea
              id="use-case"
              rows={3}
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className="w-full bg-navy-800 border-navy-700 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-navy-400"
              placeholder="e.g., 'An e-commerce platform that needs to process orders, update inventory, and notify users.'"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-200 mb-2">
              2. Select your most important constraints & priorities
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {constraintOptions.map(constraint => (
                <label
                  key={constraint}
                  className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer transition-all duration-200 border ${
                    selectedConstraints.includes(constraint)
                      ? 'bg-navy-700 border-cyan-500'
                      : 'bg-navy-800 border-navy-700 hover:border-navy-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedConstraints.includes(constraint)}
                    onChange={() => handleToggleConstraint(constraint)}
                    className="h-4 w-4 rounded bg-navy-900 border-navy-600 text-cyan-500 focus:ring-cyan-600"
                  />
                  <span className="text-sm text-navy-200">{constraint}</span>
                </label>
              ))}
            </div>
          </div>
          
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-navy-900 disabled:bg-navy-600 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Get Recommendation'}
            </button>
          </div>
        </form>
      </Card>

      {(isLoading || recommendation) && (
        <Card title="AI Recommendation">
          {isLoading && (
            <div className="flex flex-col items-center justify-center p-8 space-y-3">
              <svg className="animate-spin h-8 w-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-navy-300">Engaging Thinking Mode for in-depth analysis...</p>
            </div>
          )}
          {recommendation && (
            <div 
              className="prose prose-invert prose-p:text-navy-300 prose-headings:text-white prose-strong:text-white prose-a:text-cyan-400 max-w-none"
              dangerouslySetInnerHTML={{ __html: recommendation.replace(/\n/g, '<br />') }} 
            />
          )}
        </Card>
      )}
    </div>
  );
};

export default AssistantView;
