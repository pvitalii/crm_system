import * as yup from 'yup';

export const projectValidationSchema = yup.object({
    path: yup
        .string()
        .matches(/^[^/]+\/[^/]+$/, 'Path must follow the pattern "owner/name"')
        .required('Path is required'),
});
