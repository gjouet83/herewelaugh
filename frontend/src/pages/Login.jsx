import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Login = () => {
  const [resBackErrLogin, setResBackErrLogin] = useState('');
  const [resBackErrPwd, setResBackErrPwd] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('email invalide')
      .required("l'email est obligatoire"),
    password: Yup.string()
      .required('Mot de passe est obligatoire')
      .matches(/([0-9])/, 'Au moins un entier')
      .min(8, 'Mot de passe doit être plus grand que 8 caractères')
      .max(50, 'Mot de passe doit être plus petit que 50 caractères'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = (data) => sendForm(data);

  const sendForm = (data) => {
    axios
      .post('http://localhost:3000/api/auth/login', {
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

  return (
    <main>
      <section className="login">
        <h1 className="login__title">HereWeLaugh</h1>
        <h2 className="login__describ">
          Avec HereWeLaugh, prenez un petit moment pour vous détendre en lisant
          ou en partageant vos images, vidéos ou histoires drôles.
        </h2>
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login__form__email">
            <label className="login__form__email__lbl">
              E-mail:*
              <input
                className={`login__form__email__input`}
                autoComplete="username"
                id="email"
                name="email"
                type="email"
                {...register('email')}
              />
              <span className="login__form__email__info">
                *exemple@provider.com
              </span>
              <span className="alerte">{errors.email?.message}</span>
              {resBackErrLogin && (
                <span className="alerte">{resBackErrLogin}</span>
              )}
            </label>
          </div>
          <div className="login__form__password">
            <label className="login__form__password__lbl">
              Mot de passe:*
              <input
                className={`login__form__password__input`}
                autoComplete="current-password"
                id="password"
                name="password"
                type="password"
                {...register('password')}
              />
              <span className="login__form__password__info">
                *Au moins 9 Caractères dont 1 majuscule, 1 chiffre et pas de
                caractères spéciaux
              </span>
              <span className="alerte">{errors.password?.message}</span>
              {resBackErrPwd && <span className="alerte">{resBackErrPwd}</span>}
            </label>
          </div>
          <input
            className="login__form__validate"
            name="login"
            type="submit"
            value="Valider"
          />
        </form>
        <div className="login__signuplink">
          <span>
            Si vous ne possedez pas de compte{' '}
            <Link to="/signup">Créer un compte</Link>
          </span>
        </div>
      </section>
    </main>
  );
};

export default Login;
