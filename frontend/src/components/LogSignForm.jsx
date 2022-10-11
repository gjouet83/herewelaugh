import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEyeSlash,
  faEye,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

const LogSignForm = ({ page }) => {
  const [resBackErrMail, setResBackErrMail] = useState('');
  const [resBackErrPwd, setResBackErrPwd] = useState('');
  const [switchHidePwd, setSwitchHidePwd] = useState('false');
  const [switchHideConfPwd, setSwitchHideConfPwd] = useState('false');

  const validationSchema = Yup.object().shape({
    email: Yup.string()
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
    formState: { errors, dirtyFields, touchedFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: '', password: '', confirmpassword: '' },
    mode: 'onChange',
    shouldFocusError: true,
  });
  const onSubmit = (data) => sendForm(data);

  const sendForm = (data) => {
    axios
      .post(`${process.env.REACT_APP_REQ_URL}/api/auth/${page}`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        //on stocke le token dans le localstorage
        localStorage.setItem('user', JSON.stringify(res.data.token));
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

  return (
    <form className={`${page}__form`} onSubmit={handleSubmit(onSubmit)}>
      <div className={`${page}__form__email`}>
        <FontAwesomeIcon
          className={`${page}__form__email__icoMail`}
          icon={faEnvelope}
          aria-label="Icone qui représente une enveloppe"
        ></FontAwesomeIcon>
        <input
          className={`${page}__form__email__input ${errors.email && 'error'} ${
            dirtyFields.email && !errors.email && 'valid'
          }`}
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
          {resBackErrMail}
        </span>
      </div>
      <div className={`${page}__form__password`}>
        <FontAwesomeIcon
          className={`${page}__form__password__icoPwd`}
          icon={faLock}
          aria-label="Icone qui représente un cadena"
        ></FontAwesomeIcon>
        <input
          className={`${page}__form__password__input ${
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
        <div className={`${page}__form__password__input__switchButton`}>
          {!switchHidePwd && (
            <FontAwesomeIcon
              className={`${page}__form__password__input__switchButton__showPwd`}
              icon={faEye}
              onClick={() => setSwitchHidePwd(!switchHidePwd)}
            />
          )}
          {switchHidePwd && (
            <FontAwesomeIcon
              className={`${page}__form__password__input__switchButton__hidePwd`}
              icon={faEyeSlash}
              onClick={() => setSwitchHidePwd(!switchHidePwd)}
            />
          )}
        </div>
        <span
          className={
            dirtyFields.password || errors.password
              ? 'alerte'
              : page + '__form__password__info'
          }
        >
          {!dirtyFields.password &&
            !errors.password &&
            '*Au moins 9 Caractères dont 1 majuscule, 1 chiffre, pas de caractères spéciaux'}
          {errors.password?.message}
          {resBackErrPwd}
        </span>
      </div>
      {page === 'signup' && (
        <div className={`${page}__form__password`}>
          <input
            className={`${page}__form__password__input ${
              errors.confirmpassword && 'error'
            } ${
              dirtyFields.confirmpassword && !errors.confirmpassword && 'valid'
            }`}
            autoComplete="confirmpassword"
            id="confirmpassword"
            name="confirmpassword"
            type={switchHideConfPwd ? 'password' : 'text'}
            placeholder="Confirmation"
            aria-label="Confirmation de mot de passe"
            {...register('confirmpassword')}
          />
          <div className={`${page}__form__password__input__switchButton`}>
            {!switchHideConfPwd && (
              <FontAwesomeIcon
                className={`${page}__form__password__input__switchButton__showPwd`}
                icon={faEye}
                onClick={() => setSwitchHideConfPwd(!switchHideConfPwd)}
              />
            )}
            {switchHideConfPwd && (
              <FontAwesomeIcon
                className={`${page}__form__password__input__switchButton__hidePwd`}
                icon={faEyeSlash}
                onClick={() => setSwitchHideConfPwd(!switchHideConfPwd)}
              />
            )}
          </div>
          <span className="alerte">{errors.confirmpassword?.message}</span>
        </div>
      )}
      <input
        className={`${page}__form__validate`}
        name={page}
        type="submit"
        value={page === 'signup' ? "S'inscrire" : 'Connexion'}
        disabled={
          errors.email ||
          errors.password ||
          !dirtyFields.password ||
          !dirtyFields.email ||
          (!touchedFields.email && !touchedFields.password) ||
          (page === 'signup' &&
            (!dirtyFields.confirmpassword || errors.confirmpassword))
            ? true
            : false
        }
      />
    </form>
  );
};

export default LogSignForm;
