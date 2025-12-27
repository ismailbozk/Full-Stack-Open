import React from "react";
import { View, Text, Pressable, TextInput, StyleProp, TextStyle } from "react-native";
import { useFormik } from "formik";
import theme from "../../DesignSystem/theme";
import * as yup from 'yup';
import { useCreateReview } from "../hooks/useCreateReview";

interface AddReviewFormProps {
    repositoryOwnersName: string;
    repositoryName: string;
    rating: number;
    reviewText: string;
}

export interface AddReviewFormContainerProps {
    // eslint-disable-next-line no-unused-vars
    onSubmit: (values: AddReviewFormProps) => Promise<void>;
}

export function AddReviewFormContainer(props: AddReviewFormContainerProps): React.ReactElement {

    const AddReviewValidationSchema = yup.object().shape({
        repositoryOwnersName: yup.string().trim()
            .min(3, 'Owner name must be at least 3 characters long')
            .max(100, 'Owner name cannot be longer than 100 characters')
            .required('Owner name is required'),
        repositoryName: yup.string()
            .min(6, 'Repository name must be at least 6 characters long')
            .max(100, 'Repository name cannot be longer than 100 characters')
            .required('Repository name is required'),
        rating: yup.number()
            .min(0, 'Rating must be at least 0')
            .max(100, 'Rating cannot be more than 100')
            .required('Rating is required'),
        reviewText: yup.string()
            .max(500, 'Review text cannot be longer than 500 characters')
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

    const initialValues: AddReviewFormProps = {
        repositoryOwnersName: '',
        repositoryName: '',
        rating: 0,
        reviewText: ''
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: AddReviewValidationSchema,
        onSubmit: props.onSubmit,
    });

    const getInputStyle = (fieldName: keyof AddReviewFormProps): StyleProp<TextStyle> => {
        const hasError = formik.touched[fieldName] && formik.errors[fieldName];
        return [styles.input, hasError ? styles.inputError : undefined];
    };

    return (
        <View style={styles.form}>

            <TextInput
                placeholder="Repository owner name"
                onChangeText={formik.handleChange('repositoryOwnersName')}
                onBlur={formik.handleBlur('repositoryOwnersName')}
                value={formik.values.repositoryOwnersName}
                style={getInputStyle('repositoryOwnersName')}
            />
            {
                formik.touched.repositoryOwnersName && formik.errors.repositoryOwnersName && (
                    <Text style={styles.errorText}>{formik.errors.repositoryOwnersName}</Text>
                )
            }
            <TextInput
                placeholder="Repository name"
                onChangeText={formik.handleChange('repositoryName')}
                onBlur={formik.handleBlur('repositoryName')}
                value={formik.values.repositoryName}
                style={getInputStyle('repositoryName')}
            />
            {
                formik.touched.repositoryName && formik.errors.repositoryName && (
                    <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
                )
            }
            <TextInput
                placeholder="Rating between 0 and 100"
                onChangeText={value => formik.setFieldValue('rating', Number(value))}
                onBlur={formik.handleBlur('rating')}
                value={formik.values.rating.toString()}
                style={getInputStyle('rating')}
                keyboardType="numeric"
            />
            {
                formik.touched.rating && formik.errors.rating && (
                    <Text style={styles.errorText}>{formik.errors.rating}</Text>
                )
            }
            <TextInput
                placeholder="Review text (Optional)"
                onChangeText={formik.handleChange('reviewText')}
                onBlur={formik.handleBlur('reviewText')}
                value={formik.values.reviewText}
                style={[
                    getInputStyle('reviewText'),
                    { height: 100, textAlignVertical: 'top' }
                ]}
                multiline={true}
            />
            {
                formik.touched.reviewText && formik.errors.reviewText && (
                    <Text style={styles.errorText}>{formik.errors.reviewText}</Text>
                )
            }

            <Pressable
                style={styles.button}
                onPress={() => formik.handleSubmit()}>
                <Text style={styles.buttonText}>Create a Review</Text>
            </Pressable>
        </View>
    );
};


export default function AddReviewForm(): React.JSX.Element {
    const [createReview] = useCreateReview();

    return <AddReviewFormContainer
        onSubmit={async (values: AddReviewFormProps) => {
            globalThis.console.log("Creating review with values: ", values);
            const result = await createReview(values);
            globalThis.console.log("Create review result: ", result);
        }} />;
}