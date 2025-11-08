// FIX: Import React to make React types like ComponentType available in this module.
import React from 'react';

export interface Pattern {
  id: string;
  name: string;
  illustration: React.ComponentType;
  demo: React.ComponentType;
  definition: string;
  useCases: string[];
  advantages: string[];
  limits: string[];
  prerequisites: string[];
  comparison: {
    scalability: number;
    robustness: number;
    latency: number;
    coupling: number;
    auditability: number;
    complexity: number;
  };
}
