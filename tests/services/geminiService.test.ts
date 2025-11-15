
import { vi, describe, it, expect, beforeEach } from 'vitest';
import type { getPatternRecommendation as GetPatternRecommendationType } from '../../services/geminiService';

const mockGenerateContent = vi.fn();

// Mock the @google/genai module
vi.mock('@google/genai', () => {
  // Using a mock class to ensure `new` works correctly
  const MockGoogleGenAI = class {
    constructor() {
      return {
        models: {
          generateContent: mockGenerateContent,
        },
      };
    }
  };
  return { GoogleGenAI: MockGoogleGenAI };
});

describe('geminiService', () => {
  let getPatternRecommendation: typeof GetPatternRecommendationType;

  beforeEach(async () => {
    // Reset modules before each test to get a fresh instance of the service
    // with the mock applied.
    vi.resetModules();
    mockGenerateContent.mockClear();

    // Dynamically import the module to be tested
    const module = await import('../../services/geminiService');
    getPatternRecommendation = module.getPatternRecommendation;
  });

  it('should return a recommendation when the API call is successful', async () => {
    const mockResponse = { text: 'Message Queue' };
    mockGenerateContent.mockResolvedValue(mockResponse);

    const useCase = 'decoupling services';
    const constraints = ['high throughput'];
    const result = await getPatternRecommendation(useCase, constraints);

    expect(result).toBe('Message Queue');
    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
  });

  it('should return an error message when the API call fails', async () => {
    mockGenerateContent.mockRejectedValue(new Error('API Error'));

    const useCase = 'decoupling services';
    const constraints = ['high throughput'];
    const result = await getPatternRecommendation(useCase, constraints);

    expect(result).toBe('An error occurred while communicating with the AI assistant. Please check the console for more details.');
    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
  });
});
