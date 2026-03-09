import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BarChart from './BarChart';

describe('BarChart Component', () => {
  it('calculates and applies correct bar widths based on data values', () => {
    const mockData = [
      { label: 'Beauty', value: 1000 },
      { label: 'Laptops', value: 500 },
    ];
    const { container } = render(<BarChart data={mockData} />);
    const bars = container.querySelectorAll('.bg-blue-500');
    expect(bars[0].style.width).toBe('100%');
    expect(bars[1].style.width).toBe('50%');
  });
});