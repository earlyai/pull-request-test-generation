
import { sum } from '../sum';


// sum.test.ts
describe('sum() sum method', () => {
  // Happy paths
  describe('Happy paths', () => {
    it('should return the correct sum for two positive integers', () => {
      // Test adding two positive numbers
      expect(sum(2, 3)).toBe(5);
    });

    it('should return the correct sum for two negative integers', () => {
      // Test adding two negative numbers
      expect(sum(-4, -6)).toBe(-10);
    });

    it('should return the correct sum for a positive and a negative integer', () => {
      // Test adding a positive and a negative number
      expect(sum(7, -2)).toBe(5);
    });

    it('should return the correct sum for zero and a positive integer', () => {
      // Test adding zero and a positive number
      expect(sum(0, 8)).toBe(8);
    });

    it('should return the correct sum for zero and a negative integer', () => {
      // Test adding zero and a negative number
      expect(sum(0, -5)).toBe(-5);
    });

    it('should return the correct sum for two zeros', () => {
      // Test adding zero and zero
      expect(sum(0, 0)).toBe(0);
    });

    it('should return the correct sum for decimal numbers', () => {
      // Test adding two decimal numbers
      expect(sum(1.5, 2.3)).toBeCloseTo(3.8);
    });

    it('should return the correct sum for a positive and a negative decimal', () => {
      // Test adding a positive and a negative decimal
      expect(sum(2.5, -1.2)).toBeCloseTo(1.3);
    });
  });

  // Edge cases
  describe('Edge cases', () => {
    it('should return the correct sum for very large positive numbers', () => {
      // Test adding two very large numbers
      expect(sum(1e+15, 1e+15)).toBe(2e+15);
    });

    it('should return the correct sum for very large negative numbers', () => {
      // Test adding two very large negative numbers
      expect(sum(-1e+15, -1e+15)).toBe(-2e+15);
    });

    it('should return the correct sum for very small (close to zero) numbers', () => {
      // Test adding two very small numbers
      expect(sum(1e-15, 2e-15)).toBeCloseTo(3e-15);
    });

    it('should return the correct sum when adding Number.MAX_VALUE and a small number', () => {
      // Test adding Number.MAX_VALUE and a small number
      expect(sum(Number.MAX_VALUE, 1)).toBe(Number.MAX_VALUE + 1);
    });

    it('should return the correct sum when adding Number.MIN_VALUE and a small number', () => {
      // Test adding Number.MIN_VALUE and a small number
      expect(sum(Number.MIN_VALUE, 1)).toBeCloseTo(1);
    });

    it('should return the correct sum when adding Infinity and a finite number', () => {
      // Test adding Infinity and a finite number
      expect(sum(Infinity, 5)).toBe(Infinity);
    });

    it('should return the correct sum when adding -Infinity and a finite number', () => {
      // Test adding -Infinity and a finite number
      expect(sum(-Infinity, 5)).toBe(-Infinity);
    });

    it('should return NaN when adding NaN and a number', () => {
      // Test adding NaN and a number
      expect(sum(NaN, 5)).toBeNaN();
    });

    it('should return NaN when adding a number and NaN', () => {
      // Test adding a number and NaN
      expect(sum(5, NaN)).toBeNaN();
    });

    it('should return NaN when adding NaN and NaN', () => {
      // Test adding NaN and NaN
      expect(sum(NaN, NaN)).toBeNaN();
    });
  });
});