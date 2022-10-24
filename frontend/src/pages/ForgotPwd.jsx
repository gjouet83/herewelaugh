import logo from '../assets/Logonew_transparent.webp';
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

const ForgotPwd = () => {
  const [switchHidePwd, setSwitchHidePwd] = useState(true);
  const [switchHideConfPwd, setSwitchHideConfPwd] = useState(true);
  const [backendErr, setBackendErr] = useState('');
  const [backendMessage, setBackendMessage] = useState('');
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');

  const validationSchema = Yup.object().shape({
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
    formState: { errors, dirtyFields, touchedFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { password: '', confirmpassword: '' },
    mode: 'onChange',
    shouldFocusError: true,
  });

  const onSubmit = (data) => {
    sendForm(data);
  };

  const sendForm = (data) => {
    console.log(token);
    axios({
      method: 'put',
      url: `${process.env.REACT_APP_REQ_URL}/api/forgot-pwd/reset`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { password: data.password },
    })
      .then(() => {
        setBackendMessage('Mot de passe réinitialisé avec succès');
        setTimeout(() => setBackendMessage(''), 3000);
      })
      .catch((err) => {
        if (err.response.data.error === 'jwt expired') {
          setBackendErr('Le lien à expiré.');
        }
        if (err.response.data.error === 'invalid token') {
          setBackendErr("Le lien n'est pas valide.");
        }
      });
  };

  return (
    <main>
      <section className="forgotPwd">
        <div className="forgotPwd__logo">
          <img
            className="forgotPwd__logo__img"
            src={logo}
            alt="emojoi qui pleur de rire"
          />
        </div>
        <h1 className="forgotPwd__describ">Mot de passe oublié</h1>
        <h2 className="forgotPwd__name">
          Saisissez votre nouveau mot de passe.
        </h2>
        <form className={`forgotPwd__form`} onSubmit={handleSubmit(onSubmit)}>
          <div className={`forgotPwd__form__password`}>
            <FontAwesomeIcon
              className={`forgotPwd__form__password__icoPwd`}
              icon={faLock}
              aria-label="Icone qui représente un cadena"
            ></FontAwesomeIcon>
            <input
              className={`forgotPwd__form__password__input ${
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
            <div className={`forgotPwd__form__password__input__switchButton`}>
              {!switchHidePwd && (
                <FontAwesomeIcon
                  className={`forgotPwd__form__password__input__switchButton__showPwd`}
                  icon={faEye}
                  onClick={() => setSwitchHidePwd(!switchHidePwd)}
                />
              )}
              {switchHidePwd && (
                <FontAwesomeIcon
                  className={`forgotPwd__form__password__input__switchButton__hidePwd`}
                  icon={faEyeSlash}
                  onClick={() => setSwitchHidePwd(!switchHidePwd)}
                />
              )}
            </div>
            <div className="forgotPwd__form__password__info">
              {(dirtyFields.password || errors.password) && (
                <span
                  className={
                    (dirtyFields.password || errors.password) && !backendMessage
                      ? 'alerte'
                      : 'succes'
                  }
                >
                  {errors.password?.message}
                  {!errors.password && backendErr}
                  {backendMessage}
                </span>
              )}
              {(!backendMessage || !backendErr || errors.password) && (
                <span>
                  {!dirtyFields.password &&
                    !errors.password &&
                    '*Au moins 9 Caractères dont 1 majuscule, 1 chiffre, pas de caractères spéciaux'}
                </span>
              )}
            </div>
          </div>
          <div className={`forgotPwd__form__password`}>
            <input
              className={`forgotPwd__form__password__input ${
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
            <div className={`forgotPwd__form__password__input__switchButton`}>
              {!switchHideConfPwd && (
                <FontAwesomeIcon
                  className={`forgotPwd__form__password__input__switchButton__showPwd`}
                  icon={faEye}
                  onClick={() => setSwitchHideConfPwd(!switchHideConfPwd)}
                />
              )}
              {switchHideConfPwd && (
                <FontAwesomeIcon
                  className={`forgotPwd__form__password__input__switchButton__hidePwd`}
                  icon={faEyeSlash}
                  onClick={() => setSwitchHideConfPwd(!switchHideConfPwd)}
                />
              )}
            </div>
            <span className="alerte">{errors.confirmpassword?.message}</span>
          </div>
          <input
            className={`forgotPwd__form__validate`}
            name="forgotPwd"
            type="submit"
            value="Réinitialiser"
            disabled={
              errors.password ||
              !dirtyFields.password ||
              !touchedFields.password ||
              !dirtyFields.confirmpassword ||
              errors.confirmpassword
                ? true
                : false
            }
          />
        </form>
      </section>
    </main>
  );
};

export default ForgotPwd;
