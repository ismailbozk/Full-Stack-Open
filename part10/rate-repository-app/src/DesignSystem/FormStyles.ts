import theme from "./theme"

const formStyles = {
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

export default formStyles;