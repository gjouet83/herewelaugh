import logo from '../assets/Logonew_transparent.webp';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEyeSlash,
  faEye,
  faEnvelope,
  faLock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { ErrorMessage } from '@hookform/error-message';
import { useYupSignupValidation } from '../components/YupValidation';

const Signup = () => {
  const [resBackErrUsername, setResBackErrUsername] = useState('');
  const [resBackErrMail, setResBackErrMail] = useState('');
  const [switchHidePwd, setSwitchHidePwd] = useState(true);
  const [switchHideConfPwd, setSwitchHideConfPwd] = useState(true);
  const [emailToCompare, setEmailToCompare] = useState('');
  const [usernameToCompare, setUsernameToCompare] = useState('');
  const validationSchema = useYupSignupValidation();

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
    criteriaMode: 'all',
  });

  const email = watch('email');
  const username = watch('username');
  const password = watch('password');

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
        window.location.assign('/login');
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
          Avec HereWeLaugh, prenez un petit moment pour vous détendre en
          partageant vos images, vidéos et histoires drôles.
        </h1>
        <h2 className="signup__name">Inscription</h2>
        <form className={`signup__form`} onSubmit={handleSubmit(onSubmit)}>
          <div className={`signup__form__field`}>
            <div className={`signup__form__field__ico`}>
              <FontAwesomeIcon
                icon={faUser}
                aria-label="Icone qui représente un bonhomme"
              ></FontAwesomeIcon>
            </div>
            <input
              className={`signup__form__field__input ${
                (errors.username || resBackErrUsername) && 'error'
              } ${
                dirtyFields.username &&
                !errors.username &&
                !resBackErrUsername &&
                'valid'
              }`}
              autoComplete="username"
              id="username"
              name="username"
              type="text"
              placeholder={"Nom d'utilisateur"}
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
          <div className={`signup__form__field`}>
            <div className={`signup__form__field__ico`}>
              <FontAwesomeIcon
                icon={faEnvelope}
                aria-label="Icone qui représente une enveloppe"
              ></FontAwesomeIcon>
            </div>
            <input
              className={`signup__form__field__input ${
                (errors.email || resBackErrMail) && 'error'
              } ${
                ((dirtyFields.email && !errors.email && !resBackErrMail) ||
                  (email !== emailToCompare && !errors.email)) &&
                'valid'
              }`}
              autoComplete="email"
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
          <div className={`signup__form__field`}>
            <div className={`signup__form__field__ico`}>
              <FontAwesomeIcon
                icon={faLock}
                aria-label="Icone qui représente un cadena"
              ></FontAwesomeIcon>
            </div>
            <input
              className={`signup__form__field__input ${
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
            <div className={`signup__form__field__input__switchButton`}>
              {!switchHidePwd && (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  onClick={() => setSwitchHidePwd(!switchHidePwd)}
                />
              )}
              {switchHidePwd && (
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={() => setSwitchHidePwd(!switchHidePwd)}
                />
              )}
            </div>
            {!password && (
              <span className="alerte">
                {errors?.password?.types?.required}
              </span>
            )}
            {password && (
              <div className="signup__form__field__errors alerte">
                <ul className="signup__form__field__errors__list">
                  {
                    <ErrorMessage
                      errors={errors}
                      name="password"
                      render={({ messages }) =>
                        messages &&
                        Array.isArray(messages?.matches) &&
                        Object.entries(messages?.matches).map(
                          ([type, message]) => <li key={type}>{message}</li>
                        )
                      }
                    />
                  }
                  {!Array.isArray(errors?.password?.types?.matches) &&
                    errors?.password?.types?.matches && (
                      <li>{errors?.password?.types?.matches}</li>
                    )}
                  {errors?.password?.types?.min && (
                    <li>{errors?.password?.types?.min}</li>
                  )}
                  {errors?.password?.types?.max && (
                    <li>{errors?.password?.types?.max}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <div className={`signup__form__field`}>
            <input
              className={`signup__form__field__input ${
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
            <div className={`signup__form__field__input__switchButton`}>
              {!switchHideConfPwd && (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  onClick={() => setSwitchHideConfPwd(!switchHideConfPwd)}
                />
              )}
              {switchHideConfPwd && (
                <FontAwesomeIcon
                  icon={faEye}
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
        <div className="signup__signupLink linkButton">
          <Link to="/login">Se connecter</Link>
        </div>
      </section>
    </main>
  );
};

export default Signup;
