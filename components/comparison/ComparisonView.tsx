import React, { useState, useMemo, useCallback } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { PATTERNS } from '../../constants';
import { Pattern } from '../../types';
import Card from '../layout/Card';

const CRITERIA = [
  { name: 'Scalability', key: 'scalability', desc: 'Ability to handle growing load.' },
  { name: 'Robustness', key: 'robustness', desc: 'Resilience to failures.' },
  { name: 'Low Latency', key: 'latency', desc: 'Speed of message delivery (lower is better).' },
  { name: 'Loose Coupling', key: 'coupling', desc: 'Independence of components (lower is better).' },
  { name: 'Auditability', key: 'auditability', desc: 'Ease of tracking history and state.' },
  { name: 'Complexity', key: 'complexity', desc: 'Difficulty of implementation (lower is better).' },
];

const COLORS = ['#38bdf8', '#fbbf24', '#34d399', '#f87171', '#c084fc', '#f97316', '#ec4899'];

const ComparisonView: React.FC = () => {
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([PATTERNS[0].id, PATTERNS[1].id]);

  const handleTogglePattern = (patternId: string) => {
    setSelectedPatterns(prev =>
      prev.includes(patternId)
        ? prev.filter(id => id !== patternId)
        : [...prev, patternId]
    );
  };
  
  const handleSelectAll = useCallback(() => {
    setSelectedPatterns(PATTERNS.map(p => p.id));
  }, []);

  const handleUnselectAll = useCallback(() => {
    setSelectedPatterns([]);
  }, []);


  const chartData = useMemo(() => {
    return CRITERIA.map(criterion => {
      const dataPoint: { [key: string]: string | number } = { criterion: criterion.name };
      selectedPatterns.forEach(patternId => {
        const pattern = PATTERNS.find(p => p.id === patternId);
        if (pattern) {
          // Invert scores for latency, coupling, and complexity so higher is always better on the chart
          let value = pattern.comparison[criterion.key as keyof Pattern['comparison']];
          if(['latency', 'coupling', 'complexity'].includes(criterion.key)) {
            value = 6 - value; // Max score is 5, so 6 - score inverts it (1->5, 5->1)
          }
          dataPoint[pattern.name] = value;
        }
      });
      return dataPoint;
    });
  }, [selectedPatterns]);

  return (
    <div className="space-y-8 animate-fade-in">
       <header>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Compare Patterns</h1>
          <p className="text-lg text-navy-300">Select multiple patterns to compare their characteristics on a radar chart. Higher values are generally better.</p>
        </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1" title="Select Patterns">
            <div className="flex space-x-2 mb-4">
                <button
                    onClick={handleSelectAll}
                    className="flex-1 text-center bg-navy-700 text-white text-sm py-2 px-3 rounded hover:bg-navy-600 transition-colors duration-200"
                >
                    Tout sélectionner
                </button>
                <button
                    onClick={handleUnselectAll}
                    className="flex-1 text-center bg-navy-700 text-white text-sm py-2 px-3 rounded hover:bg-navy-600 transition-colors duration-200"
                >
                    Tout désélectionner
                </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
            {PATTERNS.map(pattern => (
                <label
                key={pattern.id}
                className={`flex items-center space-x-2 p-3 rounded-md cursor-pointer transition-all duration-200 border ${
                    selectedPatterns.includes(pattern.id)
                    ? 'bg-navy-700 border-cyan-500'
                    : 'bg-navy-800 border-navy-700 hover:border-navy-600'
                }`}
                >
                <input
                    type="checkbox"
                    checked={selectedPatterns.includes(pattern.id)}
                    onChange={() => handleTogglePattern(pattern.id)}
                    className="h-4 w-4 rounded bg-navy-900 border-navy-600 text-cyan-500 focus:ring-cyan-600"
                />
                <span className="text-sm font-medium text-white">{pattern.name}</span>
                </label>
            ))}
            </div>
        </Card>

        <Card className="lg:col-span-2" title="Comparison Chart">
            <div className="w-full h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid stroke="#475569" />
                    <PolarAngleAxis dataKey="criterion" tick={{ fill: '#cbd5e1', fontSize: 14 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: 'transparent' }} />
                    {selectedPatterns.map((patternId, index) => {
                        const pattern = PATTERNS.find(p => p.id === patternId);
                        return pattern ? (
                        <Radar
                            key={pattern.id}
                            name={pattern.name}
                            dataKey={pattern.name}
                            stroke={COLORS[index % COLORS.length]}
                            fill={COLORS[index % COLORS.length]}
                            fillOpacity={0.2}
                            strokeWidth={2}
                        />
                        ) : null;
                    })}
                    <Legend wrapperStyle={{ color: '#e2e8f0', paddingTop: '20px' }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(30, 41, 59, 0.9)',
                            borderColor: '#475569',
                            color: '#e2e8f0',
                            borderRadius: '0.5rem',
                        }}
                    />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default ComparisonView;