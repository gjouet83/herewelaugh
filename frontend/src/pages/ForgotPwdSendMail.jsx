import logo from '../assets/Logonew_transparent.webp';
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ForgotPwdSendMail = () => {
  const [resBackErrMail, setResBackErrMail] = useState('');
  const [resBackMessageMail, setResBackMessageMail] = useState('');
  const [emailToCompare, setEmailToCompare] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .lowercase()
      .email('email invalide')
      .required("l'email est obligatoire"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: '', password: '', confirmpassword: '' },
    mode: 'onChange',
    shouldFocusError: true,
  });

  const email = watch('email');

  const onSubmit = (data) => {
    setResBackErrMail('');
    setEmailToCompare(email);
    sendForm(data);
  };

  const sendForm = (data) => {
    axios
      .post(`${process.env.REACT_APP_REQ_URL}/api/forgot-pwd/sendMail`, {
        email: data.email,
      })
      .then((message) => {
        //on stocke le token dans le localstorage
        setResBackMessageMail(message.data.messageMail);
        setTimeout(() => setResBackMessageMail(''), 3000);
      })
      .catch((error) => {
        if (error.response.status === 401 && error.response.data.errorMail) {
          //setSignupEmail('wrong');
          setResBackErrMail(error.response.data.errorMail);
        }
      });
  };

  return (
    <main>
      <section className="forgotPwdSendMail">
        <div className="forgotPwdSendMail__logo">
          <img
            className="forgotPwdSendMail__logo__img"
            src={logo}
            alt="emojoi qui pleur de rire"
          />
        </div>
        <h1 className="forgotPwdSendMail__describ">Mot de passe oublié</h1>
        <h2 className="forgotPwdSendMail__name">
          Veuillez indiquer l'adresse e-mail utilisée pour la connexion à votre
          compte.
        </h2>
        <form
          className="forgotPwdSendMail__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="forgotPwdSendMail__form__field">
            <div className="forgotPwdSendMail__form__field__ico">
              <FontAwesomeIcon
                icon={faEnvelope}
                aria-label="Icone qui représente une enveloppe"
              ></FontAwesomeIcon>
            </div>
            <input
              className={`forgotPwdSendMail__form__field__input ${
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
            <div className="forgotPwdSendMail__form__field__info">
              <span
                className={
                  (dirtyFields.email || errors.email) && !resBackMessageMail
                    ? 'alerte'
                    : 'succes'
                }
              >
                {errors.email?.message}
                {resBackErrMail !== '' &&
                  email === emailToCompare &&
                  resBackErrMail}
                {resBackMessageMail}
              </span>
            </div>
          </div>
          <input
            className="forgotPwdSendMail__form__validate"
            name="sendMail"
            type="submit"
            value="Valider"
            disabled={errors.email || !dirtyFields.email ? true : false}
          />
        </form>
      </section>
    </main>
  );
};

export default ForgotPwdSendMail;
