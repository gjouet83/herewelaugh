import logo from '../assets/Logonew_transparent.webp';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEyeSlash,
  faEye,
  faEnvelope,
  faLock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const [resBackErrUsername, setResBackErrUsername] = useState('');
  const [resBackErrMail, setResBackErrMail] = useState('');
  const [switchHidePwd, setSwitchHidePwd] = useState(true);
  const [switchHideConfPwd, setSwitchHideConfPwd] = useState(true);
  const [emailToCompare, setEmailToCompare] = useState('');
  const [usernameToCompare, setUsernameToCompare] = useState('');

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("veuillez choisir un nom d'utilisateur"),
    email: Yup.string()
      .lowercase()
      .email('email invalide')
      .required("l'email est obligatoire"),
    password: Yup.string()
      .required('Mot de passe est obligatoire')
      .matches(/([0-9])/, 'Au moins un entier')
      .min(9, 'Mot de passe doit être plus grand que 8 caractères')
      .max(50, 'Mot de passe doit être plus petit que 50 caractères'),
    confirmpassword: Yup.string()
      .required('Mot de passe est obligatoire')
      .oneOf([Yup.ref('password')], 'Le mot de passe ne correspond pas'),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, touchedFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmpassword: '',
    },
    mode: 'onChange',
    shouldFocusError: true,
  });

  const email = watch('email');
  const username = watch('username');

  const onSubmit = (data) => {
    setResBackErrUsername('');
    setResBackErrMail('');
    setEmailToCompare(email);
    setUsernameToCompare(username);
    sendForm(data);
  };

  const sendForm = (data) => {
    axios
      .post(`${process.env.REACT_APP_REQ_URL}/api/auth/signup`, {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        //on stocke le token dans le localstorage
        localStorage.setItem('user', JSON.stringify(res.data.token));
      })
      .catch((error) => {
        if (
          error.response.data.errno === 1062 &&
          error.response.data.errField.username
        ) {
          //setSignupEmail('wrong');
          setResBackErrUsername("Nom d'utilisateur déjà utilisé");
        }
        if (
          error.response.data.errno === 1062 &&
          error.response.data.errField.email
        ) {
          //setSignupEmail('wrong');
          setResBackErrMail('E-mail déjà utilsé');
        }
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <section className="signup">
        <div className="signup__logo">
          <img
            className="signup__logo__img"
            src={logo}
            alt="emojoi qui pleur de rire"
          />
        </div>
        <h1 className="signup__describ">
          Avec HereWeLaugh, prenez un petit moment pour vous détendre en lisant
          ou en partageant vos images, vidéos et histoires drôles.
        </h1>
        <h2 className="signup__name">Inscription</h2>
        <form className={`signup__form`} onSubmit={handleSubmit(onSubmit)}>
          <div className={`signup__form__username`}>
            <FontAwesomeIcon
              className={`signup__form__username__icoUsername`}
              icon={faUser}
              aria-label="Icone qui représente un bonhomme"
            ></FontAwesomeIcon>
            <input
              className={`signup__form__username__input ${
                errors.username && 'error'
              } ${dirtyFields.username && !errors.username && 'valid'}`}
              autoComplete="username"
              id="username"
              name="username"
              type="text"
              placeholder="Nom d'utilisateur"
              aria-label="Username"
              {...register('username')}
            />
            <span className="alerte">
              {errors.username?.message}
              {resBackErrUsername !== '' &&
                username === usernameToCompare &&
                resBackErrUsername}
            </span>
          </div>
          <div className={`signup__form__email`}>
            <FontAwesomeIcon
              className={`signup__form__email__icoMail`}
              icon={faEnvelope}
              aria-label="Icone qui représente une enveloppe"
            ></FontAwesomeIcon>
            <input
              className={`signup__form__email__input ${
                errors.email && 'error'
              } ${dirtyFields.email && !errors.email && 'valid'}`}
              autoComplete="username"
              id="email"
              name="email"
              type="email"
              placeholder="Adresse e-mail"
              aria-label="e-mail"
              {...register('email')}
            />
            <span className="alerte">
              {errors.email?.message}
              {resBackErrMail !== '' &&
                email === emailToCompare &&
                resBackErrMail}
            </span>
          </div>
          <div className={`signup__form__password`}>
            <FontAwesomeIcon
              className={`signup__form__password__icoPwd`}
              icon={faLock}
              aria-label="Icone qui représente un cadena"
            ></FontAwesomeIcon>
            <input
              className={`signup__form__password__input ${
                errors.password && 'error'
              } ${dirtyFields.password && !errors.password && 'valid'}`}
              autoComplete="current-password"
              id="password"
              name="password"
              type={switchHidePwd ? 'password' : 'text'}
              placeholder="Mot de passe*"
              aria-label="Mot de passe"
              {...register('password')}
            />
            <div className={`signup__form__password__input__switchButton`}>
              {!switchHidePwd && (
                <FontAwesomeIcon
                  className={`signup__form__password__input__switchButton__showPwd`}
                  icon={faEye}
                  onClick={() => setSwitchHidePwd(!switchHidePwd)}
                />
              )}
              {switchHidePwd && (
                <FontAwesomeIcon
                  className={`signup__form__password__input__switchButton__hidePwd`}
                  icon={faEyeSlash}
                  onClick={() => setSwitchHidePwd(!switchHidePwd)}
                />
              )}
            </div>
            <span
              className={
                dirtyFields.password || errors.password
                  ? 'alerte'
                  : 'signup__form__password__info'
              }
            >
              {!dirtyFields.password &&
                !errors.password &&
                '*Au moins 9 Caractères dont 1 majuscule, 1 chiffre, pas de caractères spéciaux'}
              {errors.password?.message}
            </span>
          </div>
          <div className={`signup__form__password`}>
            <input
              className={`signup__form__password__input ${
                errors.confirmpassword && 'error'
              } ${
                dirtyFields.confirmpassword &&
                !errors.confirmpassword &&
                'valid'
              }`}
              autoComplete="confirmpassword"
              id="confirmpassword"
              name="confirmpassword"
              type={switchHideConfPwd ? 'password' : 'text'}
              placeholder="Confirmation"
              aria-label="Confirmation de mot de passe"
              {...register('confirmpassword')}
            />
            <div className={`signup__form__password__input__switchButton`}>
              {!switchHideConfPwd && (
                <FontAwesomeIcon
                  className={`signup__form__password__input__switchButton__showPwd`}
                  icon={faEye}
                  onClick={() => setSwitchHideConfPwd(!switchHideConfPwd)}
                />
              )}
              {switchHideConfPwd && (
                <FontAwesomeIcon
                  className={`signup__form__password__input__switchButton__hidePwd`}
                  icon={faEyeSlash}
                  onClick={() => setSwitchHideConfPwd(!switchHideConfPwd)}
                />
              )}
            </div>
            <span className="alerte">{errors.confirmpassword?.message}</span>
          </div>
          <input
            className={`signup__form__validate`}
            name="signup"
            type="submit"
            value="S'inscrire"
            disabled={
              errors.email ||
              errors.password ||
              !dirtyFields.password ||
              !dirtyFields.email ||
              (!touchedFields.email && !touchedFields.password) ||
              !dirtyFields.confirmpassword ||
              errors.confirmpassword
                ? true
                : false
            }
          />
        </form>
        <div className="signup__separate">
          <span className="signup__separate__text">
            Si vous possédez déjà un compte
          </span>
        </div>
        <div className="signup__signupLink">
          <span>
            <Link className="signup__signupLink__text" to="/login">
              Se connecter
            </Link>
          </span>
        </div>
      </section>
    </main>
  );
};

export default Signup;
