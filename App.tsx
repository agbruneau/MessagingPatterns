
import React, { useState, useCallback, useMemo } from 'react';
import { PATTERNS } from './constants';
import PatternDetailView from './components/patterns/PatternDetailView';
import ComparisonView from './components/comparison/ComparisonView';
import AssistantView from './components/assistant/AssistantView';
import { Pattern } from './types';
import { BookOpenIcon, ScaleIcon, SparklesIcon, XMarkIcon } from './components/icons/Icons';

type View = 'patterns' | 'comparison' | 'assistant';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('patterns');
  const [selectedPattern, setSelectedPattern] = useState<Pattern>(PATTERNS[0]);

  const handleSelectPattern = useCallback((pattern: Pattern) => {
    setSelectedPattern(pattern);
    setCurrentView('patterns');
  }, []);
  
  const navItems = useMemo(() => [
    { id: 'patterns', label: 'Patterns', icon: <BookOpenIcon /> },
    { id: 'comparison', label: 'Compare', icon: <ScaleIcon /> },
    { id: 'assistant', label: 'Assistant', icon: <SparklesIcon /> },
  ], []);

  const renderView = () => {
    switch (currentView) {
      case 'patterns':
        return <PatternDetailView pattern={selectedPattern} onSelectPattern={handleSelectPattern} />;
      case 'comparison':
        return <ComparisonView />;
      case 'assistant':
        return <AssistantView />;
      default:
        return <PatternDetailView pattern={selectedPattern} onSelectPattern={handleSelectPattern} />;
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 font-sans">
      <header className="sticky top-0 z-50 bg-navy-950/80 backdrop-blur-sm border-b border-navy-800">
        <nav className="container mx-auto px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Messaging Patterns Explorer
            </h1>
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as View)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentView === item.id
                      ? 'bg-navy-700 text-white'
                      : 'text-navy-300 hover:bg-navy-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>
      
      <main className="container mx-auto px-4 lg:px-6 py-8">
        {renderView()}
      </main>

      <footer className="bg-navy-950 border-t border-navy-800 mt-12 py-6">
        <div className="container mx-auto px-4 lg:px-6 text-center text-navy-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Messaging Architecture Patterns Explorer. Built for educational purposes.</p>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-navy-900 border-t border-navy-700 p-2 flex justify-around z-50">
        {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as View)}
              className={`flex flex-col items-center justify-center w-full px-2 py-2 rounded-md text-xs font-medium transition-colors duration-200 ${
                currentView === item.id
                  ? 'bg-navy-700 text-white'
                  : 'text-navy-300 hover:bg-navy-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default App;
