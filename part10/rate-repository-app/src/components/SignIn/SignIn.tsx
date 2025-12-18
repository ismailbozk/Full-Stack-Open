import React from 'react';
import { Pressable, StyleProp, Text, TextInput, TextStyle, View } from "react-native";
import { useFormik } from "formik";
import theme from "../../DesignSystem/theme";
import * as yup from 'yup';

const SignIn = () => {

    const SignInValidationSchema = yup.object().shape({
        username: yup.string().trim()
            .min(3, 'Username must be at least 3 characters long')
            .max(100, 'Username cannot be longer than 100 characters')
            .required('Username is required'),
        password: yup.string()
            .min(6, 'Password must be at least 6 characters long')
            .max(100, 'Password cannot be longer than 100 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
            .required('Password is required'),
    });

    const styles = {
        form: {
            margin: theme.spacing.large,
        },
        input: {
            height: 40,
            borderColor: theme.colors.formBorder,
            borderWidth: 1,
            marginBottom: theme.spacing.small,
            padding: theme.spacing.medium,
            borderRadius: theme.form.borderRadius,
        },
        inputError: {
            borderColor: theme.colors.error,
        },
        errorText: {
            color: theme.colors.error,
            fontSize: 12,
            marginBottom: theme.spacing.medium,
        },
        button: {
            height: 40,
            backgroundColor: theme.colors.primary,
            flexGrow: 1,
            padding: theme.spacing.medium,
            borderRadius: theme.form.borderRadius,
            justifyContent: 'center' as const,
            alignItems: 'center' as const,
        },
        buttonText: {
            color: 'white',
            fontWeight: theme.fontWeights.bold,
        }
    }
    interface SignInProps {
        username: string;
        password: string;
    }

    const initialValues: SignInProps = {
        username: '',
        password: ''
    };

    const onSubmit = (values: SignInProps) => {
        console.log(values);
    }

    const formik = useFormik({
        initialValues,
        validationSchema: SignInValidationSchema,
        onSubmit,
    });

    const getInputStyle = (fieldName: keyof SignInProps): StyleProp<TextStyle> => {
        const hasError = formik.touched[fieldName] && formik.errors[fieldName];
        return [styles.input, hasError ? styles.inputError : undefined];
    };

    return (
        <View style={styles.form}>

            <TextInput
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

            <Pressable
                style={styles.button}
                onPress={() => formik.handleSubmit()}>
                <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
        </View>
    );
};

export default SignIn;