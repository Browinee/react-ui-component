import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './index';

describe('Input', () => {
  test('renders Input', () => {
    render(<Input>click me</Input>);
    const linkElement = screen.getByText(/click me/i);
    expect(linkElement).toBeInTheDocument();
  });

/**
  test('renders normal Input', () => {
    const { container } = render(<Input>click me</Input>);

    expect(container.querySelector('.ant-btn-normal')).toBeInTheDocument();
  });

  test('renders small Input', () => {
    const { container } = render(<Input size="small">click me</Input>);

    expect(container.querySelector('.ant-btn-small')).toBeInTheDocument();
  });

  test('should support click', () => {
    const onClick = jest.fn();
    render(<Input type="primary" onClick={onClick}>click me</Input>);

    const linkElement = screen.getByText(/click me/i);
    fireEvent.click(linkElement);

    expect(onClick).toBeCalled();
  });
  **/
});

