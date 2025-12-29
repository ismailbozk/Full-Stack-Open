import React from 'react';
import { Pressable, StyleProp, Text, TextInput, TextStyle, View } from "react-native";
import { useFormik } from "formik";
import styles from "../../DesignSystem/FormStyles";
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { useCreateUser } from '../hooks/useCreateUser';
import { useSignIn } from '../hooks/useSignIn';

export interface SignUpProps {
    username: string;
    password: string;
    repassword: string;
}
export interface SignUpContainerProps {
    // eslint-disable-next-line no-unused-vars
    onSubmit: (values: SignUpProps) => Promise<void>;
}

export const SignUpContainer: React.FC<SignUpContainerProps> = ({ onSubmit }) => {

    const SignUpValidationSchema = yup.object().shape({
        username: yup.string().trim()
            .min(5, 'Username must be at least 5 characters long')
            .max(30, 'Username cannot be longer than 30 characters')
            .required('Username is required'),
        password: yup.string()
            .min(5, 'Password must be at least 5 characters long')
            .max(30, 'Password cannot be longer than 30 characters')
            .required('Password is required'),
        repassword: yup.string()
            .min(5, 'Password must be at least 5 characters long')
            .max(30, 'Password cannot be longer than 30 characters')
            .oneOf([yup.ref('password')], 'Passwords must match') // this is how you validate if the passwords are the same
            .required('Password is required'),
    });

    const initialValues: SignUpProps = {
        username: '',
        password: '',
        repassword: ''
    };

    const formik = useFormik({
        initialValues,
        validationSchema: SignUpValidationSchema,
        onSubmit,
    });

    const getInputStyle = (fieldName: keyof SignUpProps): StyleProp<TextStyle> => {
        const hasError = formik.touched[fieldName] && formik.errors[fieldName];
        return [styles.input, hasError ? styles.inputError : undefined];
    };

    return (
        <View style={styles.form}>

            <TextInput
                testID='sign-up-user-name-input'
                placeholder="User name"
                onChangeText={formik.handleChange('username')}
                onBlur={formik.handleBlur('username')}
                value={formik.values.username}
                style={getInputStyle('username')}
            />
            {
                formik.touched.username && formik.errors.username && (
                    <Text style={styles.errorText}>{formik.errors.username}</Text>
                )
            }
            <TextInput
                testID='sign-up-password-input'
                placeholder="Password"
                secureTextEntry
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                value={formik.values.password}
                style={getInputStyle('password')}
            />
            {
                formik.touched.password && formik.errors.password && (
                    <Text style={styles.errorText}>{formik.errors.password}</Text>
                )
            }
            <TextInput
                testID='sign-up-repassword-input'
                placeholder="Re-enter Password"
                secureTextEntry
                onChangeText={formik.handleChange('repassword')}
                onBlur={formik.handleBlur('repassword')}
                value={formik.values.repassword}
                style={getInputStyle('repassword')}
            />
            {
                formik.touched.repassword && formik.errors.repassword && (
                    <Text style={styles.errorText}>{formik.errors.repassword}</Text>
                )
            }

            <Pressable
                testID='sign-in-submit-pressable'
                style={styles.button}
                onPress={() => formik.handleSubmit()}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
        </View>
    );
};

const SignUp = (): React.JSX.Element => {

    const [signIn] = useSignIn();
    const [createUser] = useCreateUser();
    const navigate = useNavigate();

    const onSubmit = async (values: SignUpProps) => {
        // const { username, password, repassword } = values;
        try {
            await createUser({ username: values.username, password: values.password });
            await signIn({ username: values.username, password: values.password });
            navigate('/');
        } catch (e) {
            globalThis.console.error("Something failed during sign in", e);
        }
    }

    return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;