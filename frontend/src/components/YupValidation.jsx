import * as Yup from 'yup';

const username = Yup.string().when({
  is: (exists) => !!exists,
  then: (rule) =>
    rule
      .required("veuillez choisir un nom d'utilisateur")
      .min(2, 'Au moins 2 caractères'),
});

const email = Yup.string().when({
  is: (exists) => !!exists,
  then: (rule) =>
    rule
      .lowercase()
      .email('email invalide')
      .required("l'email est obligatoire"),
});

const newemail = Yup.string().when({
  is: (exists) => !!exists,
  then: (rule) =>
    rule
      .lowercase()
      .email('email invalide')
      .required("l'email est obligatoire")
      .notOneOf(
        [Yup.ref('email')],
        'Le nouvel E-mail ne doit pas être identique'
      ),
});

const password = Yup.string().when({
  is: (exists) => !!exists,
  then: (rule) =>
    rule
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
});

const newloginpassword = password;

const newpassword = password;

const confirmpassword = Yup.string().when({
  is: (exists) => !!exists,
  then: (rule) =>
    rule.oneOf(
      [Yup.ref('password' || 'newpassword')],
      'Le mot de passe ne correspond pas'
    ),
});

const confirmnewpassword = Yup.string().when({
  is: (exists) => !!exists,
  then: (rule) =>
    rule.oneOf([Yup.ref('newpassword')], 'Le mot de passe ne correspond pas'),
});

export const useYupValidation = () => {
  const validationSchema = Yup.object().shape({
    username: username,
    email: email,
    newemail: newemail,
    newloginpassword: newloginpassword,
    password: password,
    newpassword: newpassword,
    confirmpassword: confirmpassword,
    confirmnewpassword: confirmnewpassword,
  });
  return validationSchema;
};
