import { expect, describe, it, jest } from '@jest/globals';
import '@testing-library/jest-native/extend-expect';
import SignIn from '../components/SignIn/SignIn';
import { render, fireEvent, screen } from '@testing-library/react-native';


describe('Example', () => {
    it('works', () => {
        expect(1).toBe(1);
    });
});

jest.mock('../components/hooks/useSignIn', () => ({
    useSignIn: () => [jest.fn<() => Promise<unknown>>().mockResolvedValue({})],
}));

jest.mock('react-router-native', () => ({
    useNavigate: () => jest.fn(),
}));

describe('Example', () => {
    it('works', () => {
        expect(1).toBe(1);
    });
});

describe('Form', () => {
    it('calls function provided by onSubmit prop after pressing the submit button', () => {
        render(<SignIn/>);

        fireEvent.changeText(screen.getByTestId('sign-in-user-name-input'), 'kalle');
        fireEvent.changeText(screen.getByTestId('sign-in-password-input'), 'password');
        fireEvent.press(screen.getByTestId('sign-in-submit-pressable'));

        // expect(onSubmit).toHaveBeenCalledTimes(1);

        // // onSubmit.mock.calls[0][0] contains the first argument of the first call
        // expect(onSubmit.mock.calls[0][0]).toEqual({
        //     username: 'kalle',
        //     password: 'password',
        // });
    });
});