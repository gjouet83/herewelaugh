import logo from '../assets/Logonew_transparent.webp';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useYupValidation } from '../components/YupValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEyeSlash,
  faEye,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import FormsInputs from '../components/FormsInputs';

const Login = () => {
  const [resBackErrMail, setResBackErrMail] = useState('');
  const [resBackErrPwd, setResBackErrPwd] = useState('');
  const [switchHidePwd, setSwitchHidePwd] = useState(true);
  const [emailToCompare, setEmailToCompare] = useState('');
  const [pwdToCompare, setPwdToCompare] = useState('');
  const validationSchema = useYupValidation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, touchedFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
    shouldFocusError: true,
    criteriaMode: 'all',
  });

  const email = watch('email');
  const password = watch('password');

  const onSubmit = (data) => {
    setResBackErrMail('');
    setResBackErrPwd('');
    setEmailToCompare(email);
    setPwdToCompare(password);
    sendForm(data);
  };

  const sendForm = (data) => {
    axios
      .post(`${process.env.REACT_APP_REQ_URL}/api/auth/login`, {
        ...data,
      })
      .then((res) => {
        //on stocke le token dans le localstorage
        localStorage.setItem('user', JSON.stringify(res.data.token));
        window.location.assign('/posts');
      })
      .catch((error) => {
        if (error.response.status === 401 && error.response.data.errorMail) {
          //setSignupEmail('wrong');
          setResBackErrMail(error.response.data.errorMail);
        }
        if (
          error.response.status === 401 &&
          error.response.data.errorPassword
        ) {
          //setSignupPassword('wrong');
          setResBackErrPwd(error.response.data.errorPassword);
        }
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
          Avec HereWeLaugh, prenez un petit moment pour vous détendre en
          partageant vos images, vidéos et histoires drôles.
        </h1>
        <h2 className="login__name">Connexion</h2>
        <form className={`login__form`} onSubmit={handleSubmit(onSubmit)}>
          <div className={`login__form__field`}>
            <div className={`login__form__field__ico`}>
              <FontAwesomeIcon
                icon={faEnvelope}
                aria-label="Icone qui représente une enveloppe"
              ></FontAwesomeIcon>
            </div>
            <FormsInputs
              type="email"
              errors={errors}
              dirtyFields={dirtyFields.email}
              resBackErr={resBackErrMail}
              page="login"
              inputName="email"
              register={{ ...register('email') }}
              input={email}
              inputToCompare={emailToCompare}
            />
          </div>
          <div className={`login__form__field`}>
            <div className={`login__form__field__ico`}>
              <FontAwesomeIcon
                icon={faLock}
                aria-label="Icone qui représente un cadena"
              ></FontAwesomeIcon>
            </div>
            <FormsInputs
              type={switchHidePwd ? 'password' : 'text'}
              errors={errors}
              dirtyFields={dirtyFields.password}
              page="login"
              inputName="password"
              input={password}
              inputToCompare={pwdToCompare}
              resBackErr={resBackErrPwd}
              register={{ ...register('password') }}
            />
            <div className={`login__form__field__input__switchButton`}>
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
          </div>
          <input
            className={`login__form__validate`}
            name="login"
            type="submit"
            value="Connexion"
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
          <span className="alerte">
            {(!dirtyFields.email || !dirtyFields.password) &&
              'Tous les champs sont obligatoires'}
          </span>
        </form>
        <div className={`login__forgotPwd`}>
          <Link to="/forgotPwdSendMail">Mot de passe oublié ?</Link>
        </div>
        <div className="login__separate">
          <span className="login__separate__text">
            Si n'avez pas encore de compte
          </span>
        </div>
        <div className="login__loginLink linkButton">
          <Link to="/signup">S'inscrire</Link>
        </div>
      </section>
    </main>
  );
};

export default Login;
