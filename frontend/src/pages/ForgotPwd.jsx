import logo from '../assets/Logonew_transparent.webp';
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useYupValidation } from '../components/YupValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import FormsInputs from '../components/FormsInputs';

const ForgotPwd = () => {
  const [switchHidePwd, setSwitchHidePwd] = useState(true);
  const [switchHideConfPwd, setSwitchHideConfPwd] = useState(true);
  const [backendErr, setBackendErr] = useState('');
  const [backendMessage, setBackendMessage] = useState('');
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');

  const validationSchema = useYupValidation();

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
          setBackendErr('Délais expiré.');
        }
        if (
          err.response.data.error === 'invalid token' ||
          err.response.data.error === 'jwt malformed'
        ) {
          setBackendErr('Utilisateur non autorisé');
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
              errors={errors}
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
          </div>
          <div className={`forgotPwd__form__field`}>
            <FormsInputs
              type={switchHidePwd ? 'password' : 'text'}
              errors={errors}
              dirtyFields={dirtyFields.confirmpassword}
              page="forgotPwd"
              inputName="confirmpassword"
              input={password}
              register={{ ...register('confirmpassword') }}
              resBackErr={backendErr}
              resBackMessage={backendMessage}
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
          <span className="alerte">
            {(!dirtyFields.confirmpassword || !dirtyFields.password) &&
              'Tous les champs sont obligatoires'}
          </span>
        </form>
        <div className="forgotPwd__signupLink linkButton">
          <Link to="/login">Se connecter</Link>
        </div>
      </section>
    </main>
  );
};

export default ForgotPwd;
