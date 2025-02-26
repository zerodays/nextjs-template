export default {
  title: 'Hello and welcome to NextJS template',
  subtitle:
    'This is a template for NextJS with TailwindCSS, TypeScript, i18n, Jest, Zod, React Hook Form, shadcn/ui and more!',

  formExample: {
    email: 'Email',
    emailPlaceholder: 'Enter your email',
    emailError: 'Invalid email',
    submit: 'Submit',
    formSubmitted: 'Form submitted',
  },
  apiExample: {
    toastTitle: 'Random cat fact',
    toastError: 'Failed to fetch a random fact!',
    submit: 'Call API',
  },
} as const;
