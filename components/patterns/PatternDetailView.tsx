import React from 'react';
import { Pattern } from '../../types';
import { PATTERNS } from '../../constants';
import Card from '../layout/Card';
import { CheckCircleIcon, XCircleIcon } from '../icons/Icons';

interface PatternDetailViewProps {
  pattern: Pattern;
  onSelectPattern: (pattern: Pattern) => void;
}

const PatternDetailView: React.FC<PatternDetailViewProps> = ({ pattern, onSelectPattern }) => {
  const { name, definition, illustration: Illustration, demo: Demo, useCases, advantages, limits, prerequisites } = pattern;
  
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-1/4 xl:w-1/5">
        <div className="sticky top-24">
            <h2 className="text-sm font-semibold text-navy-400 uppercase tracking-wider mb-3">Patterns</h2>
            <div className="border border-navy-800 rounded-lg overflow-hidden max-h-[calc(100vh-8rem)] overflow-y-auto">
                <table className="w-full text-left table-auto">
                    <thead className="bg-navy-800 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-2 text-xs font-medium text-navy-300 uppercase tracking-wider">Pattern</th>
                            <th className="px-4 py-2 text-xs font-medium text-navy-300 uppercase tracking-wider">Description</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-navy-800">
                        {PATTERNS.map(p => (
                            <tr 
                                key={p.id} 
                                onClick={() => onSelectPattern(p)}
                                className={`cursor-pointer transition-colors duration-150 ${
                                    pattern.id === p.id ? 'bg-navy-700' : 'bg-navy-900 hover:bg-navy-800'
                                }`}
                            >
                                <td className={`px-4 py-3 text-sm whitespace-nowrap ${pattern.id === p.id ? 'text-white font-semibold' : 'text-navy-300'}`}>
                                    {p.name}
                                </td>
                                <td className={`px-4 py-3 text-xs ${pattern.id === p.id ? 'text-navy-100' : 'text-navy-400'}`}>
                                    {`${p.definition.substring(0, 70)}...`}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </aside>

      <div className="lg:w-3/4 xl:w-4/5 space-y-8 animate-fade-in">
        <header>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">{name}</h1>
          <p className="text-lg text-navy-300">{definition}</p>
        </header>

        <Card title="Animated Illustration">
          <div className="h-64 md:h-80 flex items-center justify-center bg-navy-950 rounded-md p-4">
            <Illustration />
          </div>
        </Card>

        <Card title="Functional Demonstration">
          <Demo />
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card title="Typical Use Cases">
            <ul className="space-y-3 text-navy-300">
              {useCases.map((uc, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">&#10148;</span>
                  <span>{uc}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Advantages & Limits">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Advantages</h4>
                <ul className="space-y-2">
                  {advantages.map((adv, i) => (
                    <li key={i} className="flex items-start text-navy-300">
                      <CheckCircleIcon />
                      <span className="ml-2">{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-navy-800 my-4"></div>
              <div>
                <h4 className="font-semibold text-white mb-2">Limits</h4>
                <ul className="space-y-2">
                  {limits.map((lim, i) => (
                    <li key={i} className="flex items-start text-navy-300">
                      <XCircleIcon />
                      <span className="ml-2">{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <Card title="Technical Prerequisites">
          <ul className="space-y-3 text-navy-300">
            {prerequisites.map((pre, i) => (
              <li key={i} className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">&#10148;</span>
                <span>{pre}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default PatternDetailView;