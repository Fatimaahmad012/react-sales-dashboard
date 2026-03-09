import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatCard from './StatCard';

describe('StatCard Component', () => {
  it('renders subtext when provided', () => {
  render(<StatCard title="Orders" value="50" subtext="+10% growth" />);
  expect(screen.getByText('+10% growth')).toBeInTheDocument();
});
});