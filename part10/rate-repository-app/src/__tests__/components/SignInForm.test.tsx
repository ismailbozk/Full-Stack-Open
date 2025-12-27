import { expect, describe, it, jest } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';

import { SignInContainer, SignInProps } from '../../components/SignIn/SignIn';

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('renders sign in form elements', () => {
            const onSubmit = jest.fn<(_values: SignInProps) => Promise<void>>().mockResolvedValue(undefined);

            render(<SignInContainer onSubmit={onSubmit} />);

            // Check if elements are present
            expect(screen.getByTestId('sign-in-user-name-input')).toBeTruthy();
            expect(screen.getByTestId('sign-in-password-input')).toBeTruthy();
            expect(screen.getByTestId('sign-in-submit-pressable')).toBeTruthy();
        });


        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const onSubmit = jest.fn<(_values: SignInProps) => Promise<void>>().mockResolvedValue(undefined);

            render(<SignInContainer onSubmit={onSubmit} />);

            fireEvent.changeText(screen.getByTestId('sign-in-user-name-input'), 'kalle');
            fireEvent.changeText(screen.getByTestId('sign-in-password-input'), 'password');
            fireEvent.press(screen.getByTestId('sign-in-submit-pressable'));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);
                expect(onSubmit.mock.calls[0]?.[0] ?? {}).toEqual({
                    username: 'kalle',
                    password: 'password',
                });
            }, {
                timeout: 3000,      // Maximum time to wait (default: 1000ms)
                interval: 50,       // How often to check (default: 50ms)
            });
        });
    });
});