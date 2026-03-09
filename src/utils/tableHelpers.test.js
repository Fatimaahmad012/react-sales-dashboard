import { describe, it, expect } from 'vitest';
import { prepareTableData } from './tableHelpers';

describe('prepareTableData Utility Logic', () => {
  it('should merge users and carts correctly and calculate totals', () => {
    const mockUsers = [
      { id: 1, firstName: 'Liam', lastName: 'Garcia', email: 'liam@example.com' }
    ];
    
    const mockCarts = [
      { userId: 1, total: 100 },
      { userId: 1, total: 150 }
    ];
    const result = prepareTableData(mockUsers, mockCarts);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Liam Garcia');
    expect(result[0].orders).toBe(2);
  });
});