import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../src/App';

describe('Team Quest Board', () => {
  it('shows the starter tasks', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'やることリスト' })).toBeInTheDocument();
    expect(screen.getByText('チームでアイデアを出す')).toBeInTheDocument();
    expect(screen.getByText('最初の画面を作る')).toBeInTheDocument();
  });

  it('shows the current quest hint', () => {
    render(<App />);
    expect(screen.getByText('Quest 3')).toBeInTheDocument();
  });
});
