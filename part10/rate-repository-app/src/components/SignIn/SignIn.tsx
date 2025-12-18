import React from 'react';
import { Pressable, Text, TextInput, View } from "react-native";
import { useFormik } from "formik";
import theme from "../../DesignSystem/theme";

const SignIn = () => {

    const styles = {
        form: {
            margin: theme.spacing.large,
        },
        input: {
            height: 40,
            borderColor: theme.colors.formBorder,
            borderWidth: 1,
            marginBottom: theme.spacing.medium,
            padding: theme.spacing.medium,
            borderRadius: theme.form.borderRadius,
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
        onSubmit,
    });

    return (
        <View style={styles.form}>
            <TextInput
                placeholder="User name"
                onChangeText={formik.handleChange('username')}
                value={formik.values.username}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                onChangeText={formik.handleChange('password')}
                value={formik.values.password}
                style={styles.input}
            />
            <Pressable
                style={styles.button}
                onPress={() => formik.handleSubmit()}>
                <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
        </View>
    );
};

export default SignIn;