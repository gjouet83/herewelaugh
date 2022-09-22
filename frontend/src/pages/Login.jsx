import logo from '../assets/Logonew_transparent.webp';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [resBackErrLogin, setResBackErrLogin] = useState('');
  const [resBackErrPwd, setResBackErrPwd] = useState('');
  const [switchHidePwd, setswitchHidePwd] = useState('false');

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('email invalide')
      .required("l'email est obligatoire"),
    password: Yup.string()
      .required('Mot de passe est obligatoire')
      .matches(/([0-9])/, 'Au moins un entier')
      .min(9, 'Mot de passe doit être plus grand que 8 caractères')
      .max(50, 'Mot de passe doit être plus petit que 50 caractères'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields, touchedFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
    shouldFocusError: true,
  });
  const onSubmit = (data) => sendForm(data);

  const sendForm = (data) => {
    axios
      .post(`${process.env.REACT_APP_REQ_URL}/api/auth/login`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        //on stocke le token dans le localstorage
        localStorage.setItem('user', JSON.stringify(res.data.token));
      })
      .catch((error) => {
        if (error.response.status === 401 && error.response.data.errorMail) {
          //setLoginEmail('wrong');
          setResBackErrLogin(error.response.data.errorMail);
        }
        if (
          error.response.status === 401 &&
          error.response.data.errorPassword
        ) {
          //setLoginPassword('wrong');
          setResBackErrPwd(error.response.data.errorPassword);
        }
      });
  };

  console.log(isDirty);
  console.log(dirtyFields);
  console.log(touchedFields);
  console.log(errors.email);

  return (
    <main>
      <section className="login">
        <div className="login__logo">
          <img
            className="login__logo__img"
            src={logo}
            alt="emojoi qui pleur de rire"
          />
        </div>
        <h1 className="login__describ">
          Avec HereWeLaugh, prenez un petit moment pour vous détendre en lisant
          ou en partageant vos images, vidéos ou histoires drôles.
        </h1>
        <h2 className="login__name">Connexion</h2>
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login__form__email">
            <input
              className={`login__form__email__input ${
                errors.email ? 'error' : null
              } ${dirtyFields.email && !errors.email ? 'valid' : null}`}
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
              {resBackErrLogin}
            </span>
          </div>
          <div className="login__form__password">
            <input
              className={`login__form__password__input ${
                errors.password ? 'error' : null
              } ${dirtyFields.password && !errors.password ? 'valid' : null}`}
              autoComplete="current-password"
              id="password"
              name="password"
              type={switchHidePwd ? 'password' : 'text'}
              placeholder="Mot de passe*"
              aria-label="Mot de passe"
              {...register('password')}
            />
            <div className="login__form__password__input__switchButton">
              {!switchHidePwd && (
                <FontAwesomeIcon
                  className="login__form__password__input__switchButton__showPwd"
                  icon={faEye}
                  onClick={() => setswitchHidePwd(!switchHidePwd)}
                />
              )}
              {switchHidePwd && (
                <FontAwesomeIcon
                  className="login__form__password__input__switchButton__hidePwd"
                  icon={faEyeSlash}
                  onClick={() => setswitchHidePwd(!switchHidePwd)}
                />
              )}
            </div>
            <span
              className={
                dirtyFields.password || errors.password
                  ? 'alerte'
                  : 'login__form__password__info'
              }
            >
              {!dirtyFields.password &&
                !errors.password &&
                '*Au moins 9 Caractères dont 1 majuscule, 1 chiffre, pas de caractères spéciaux'}
              {errors.password?.message}
              {resBackErrPwd}
            </span>
          </div>
          <input
            className="login__form__validate"
            name="login"
            type="submit"
            value="Se connecter"
            disabled={
              errors.email ||
              errors.password ||
              !dirtyFields.password ||
              !dirtyFields.email ||
              (!touchedFields.email && !touchedFields.password)
                ? true
                : false
            }
          />
        </form>
        <div className="login__signupLink">
          <span>
            <Link to="/signup">Créer un compte</Link>
          </span>
        </div>
      </section>
    </main>
  );
};

export default Login;
