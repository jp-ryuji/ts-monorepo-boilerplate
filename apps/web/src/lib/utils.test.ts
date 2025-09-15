import { formatName } from '../lib/utils';

describe('utils', () => {
  describe('formatName', () => {
    it('should format first and last name correctly', () => {
      expect(formatName('John', 'Doe')).toBe('John Doe');
    });

    it('should handle empty strings', () => {
      expect(formatName('', 'Doe')).toBe(' Doe');
      expect(formatName('John', '')).toBe('John ');
      expect(formatName('', '')).toBe(' ');
    });
  });
});
