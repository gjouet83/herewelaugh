import logo from '../assets/Logonew_transparent.webp';
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useYupFgtPwdValidation } from '../components/YupValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { ErrorMessage } from '@hookform/error-message';
import { Link } from 'react-router-dom';
import FormsInputs from '../components/FormsInputs';

const ForgotPwd = () => {
  const [switchHidePwd, setSwitchHidePwd] = useState(true);
  const [switchHideConfPwd, setSwitchHideConfPwd] = useState(true);
  const [backendErr, setBackendErr] = useState('');
  const [backendMessage, setBackendMessage] = useState('');
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');

  const validationSchema = useYupFgtPwdValidation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, touchedFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { password: '', confirmpassword: '' },
    mode: 'onChange',
    shouldFocusError: true,
    criteriaMode: 'all',
  });

  const password = watch('password');

  const onSubmit = (data) => {
    sendForm(data);
  };

  const sendForm = (data) => {
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
          <div className={`forgotPwd__form__field`}>
            <div className="forgotPwdSendMail__form__field__ico">
              <FontAwesomeIcon
                icon={faLock}
                aria-label="Icone qui représente un cadena"
              ></FontAwesomeIcon>
            </div>
            <FormsInputs
              type={switchHidePwd ? 'password' : 'text'}
              errors={errors.password}
              dirtyFields={dirtyFields.password}
              page="forgotPwd"
              inputName="password"
              input={password}
              register={{ ...register('password') }}
            />
            <div className={`forgotPwd__form__field__input__switchButton`}>
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
                {!errors.password && backendErr}
                {backendMessage}
              </div>
            )}
          </div>
          <div className={`forgotPwd__form__field`}>
            <input
              className={`forgotPwd__form__field__input ${
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
            <div className={`forgotPwd__form__field__input__switchButton`}>
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
        <div className="forgotPwd__signupLink linkButton">
          <Link to="/login">Se connecter</Link>
        </div>
      </section>
    </main>
  );
};

export default ForgotPwd;
