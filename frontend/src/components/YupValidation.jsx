import * as Yup from 'yup';

const username = Yup.string()
  .required("veuillez choisir un nom d'utilisateur")
  .min(2, 'Au moins 2 caractères');

const email = Yup.string()
  .lowercase()
  .email('email invalide')
  .required("l'email est obligatoire");

const password = Yup.string()
  .required('Mot de passe est obligatoire')
  .matches(/(^\S)/, "Pas d'espace au début")
  .matches(/(\S$)/, "Pas d'espace à la fin")
  .matches(/([!@#$%^~`_+'/&*()°,.?":{}|<>-])/, 'Au moins un caractère spécial')
  .matches(/([0-9])/, 'Au moins un entier')
  .matches(/([A-Z])/, 'Au moins une majuscule')
  .matches(/([a-z])/, 'Au moins une minuscule')
  .min(12, 'Au moins 12 caractères')
  .max(64, 'Au maximum 64 caractères');

const confirmpassword = Yup.string()
  .required('Mot de passe est obligatoire')
  .oneOf([Yup.ref('password')], 'Le mot de passe ne correspond pas');

export const useYupSignupValidation = () => {
  const validationSchema = Yup.object().shape({
    username: username,
    email: email,
    password: password,
    confirmpassword: confirmpassword,
  });
  return validationSchema;
};

export const useYupLoginValidation = () => {
  const validationSchema = Yup.object().shape({
    email: email,
    password: password,
  });
  return validationSchema;
};

export const useYupSendMailValidation = () => {
  const validationSchema = Yup.object().shape({
    email: email,
  });
  return validationSchema;
};

export const useYupFgtPwdValidation = () => {
  const validationSchema = Yup.object().shape({
    password: password,
    confirmpassword: confirmpassword,
  });
  return validationSchema;
};
