import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { FormExample } from './form-example';

describe('FormExample Component', () => {
  it('renders correctly', () => {
    render(<FormExample />);

    // Check that inputs and button are present
    // (can get by i18n keys as localization in unit tests is identity function)
    expect(screen.getByPlaceholderText('emailPlaceholder')).toBeInTheDocument();
    expect(screen.getByText('submit')).toBeInTheDocument();
  });

  it('captures input values and handles form submission', async () => {
    render(<FormExample />);

    const emailInput = screen.getByPlaceholderText('emailPlaceholder');
    const submitButton = screen.getByText('submit');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    // Assuming that submitting would make the inputs disabled
    await waitFor(() => expect(emailInput).toBeDisabled());
    await waitFor(() => expect(submitButton).toBeDisabled());
  });

  it('shows validation errors', async () => {
    render(<FormExample />);

    const emailInput = screen.getByPlaceholderText('emailPlaceholder');
    const submitButton = screen.getByText('submit');

    // Providing invalid values
    fireEvent.change(emailInput, { target: { value: 'invalid email' } });
    fireEvent.click(submitButton);

    // Check for validation error messages
    await waitFor(() => screen.getByText('home.formExample.emailError'));
  });
});
