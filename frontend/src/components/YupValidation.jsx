import * as Yup from 'yup';

export const useYupSignupValidation = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("veuillez choisir un nom d'utilisateur"),
    email: Yup.string()
      .lowercase()
      .email('email invalide')
      .required("l'email est obligatoire"),
    password: Yup.string()
      .required('Mot de passe est obligatoire')
      .matches(/(^\S)/, "Pas d'espace au début")
      .matches(/(\S$)/, "Pas d'espace à la fin")
      .matches(
        /([!@#$%^~`_+'/&*()°,.?":{}|<>-])/,
        'Au moins un caractère spécial'
      )
      .matches(/([0-9])/, 'Au moins un entier')
      .matches(/([A-Z])/, 'Au moins une majuscule')
      .matches(/([a-z])/, 'Au moins une minuscule')
      .min(12, 'Au moins 12 caractères')
      .max(64, 'Au maximum 64 caractères'),
    confirmpassword: Yup.string()
      .required('Mot de passe est obligatoire')
      .oneOf([Yup.ref('password')], 'Le mot de passe ne correspond pas'),
  });
  return validationSchema;
};

export const useYupLoginValidation = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .lowercase()
      .email('email invalide')
      .required("l'email est obligatoire"),
    password: Yup.string()
      .required('Mot de passe est obligatoire')
      .matches(/(^\S)/, "Pas d'espace au début")
      .matches(/(\S$)/, "Pas d'espace à la fin")
      .matches(
        /([!@#$%^~`_+'/&*()°,.?":{}|<>-])/,
        'Au moins un caractère special'
      )
      .matches(/([0-9])/, 'Au moins un entier')
      .matches(/([A-Z])/, 'Au moins une majuscule')
      .matches(/([a-z])/, 'Au moins une minuscule')
      .min(12, 'Mot de passe doit contenir au moins 12 caractères')
      .max(64, 'Mot de passe doit contenir un maximum 64 caractères'),
  });
  return validationSchema;
};
