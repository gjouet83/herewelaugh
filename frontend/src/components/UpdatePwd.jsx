import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useYupValidation } from '../components/YupValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye, faLock } from '@fortawesome/free-solid-svg-icons';
import FormsInputs from '../components/FormsInputs';

const UpdatePwd = ({ currentUser, currentUserdecoded }) => {
  const [resBackErrPwd, setResBackErrPwd] = useState('');
  const [switchHidePwd, setSwitchHidePwd] = useState(true);
  const [switchHideConfPwd, setSwitchHideConfPwd] = useState(true);
  const [switchHideNewPwd, setSwitchHideNewPwd] = useState(true);
  const [pwdToCompare, setPwdToCompare] = useState('');
  const validationSchema = useYupValidation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, touchedFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: '',
      newpassword: '',
      confirmnewpassword: '',
    },
    mode: 'onChange',
    shouldFocusError: true,
    criteriaMode: 'all',
  });

  const password = watch('password');
  const newpassword = watch('newpassword');

  const updatePwd = (data) => {
    setResBackErrPwd('');
    setPwdToCompare(password);

    axios({
      method: 'put',
      url:
        `${process.env.REACT_APP_REQ_URL}/api/auth/password/` +
        currentUserdecoded.userId,
      headers: {
        Authorization: `Bearer ${currentUser}`,
      },
      data: { ...data },
    })
      .then(() => {
        window.location.assign('/login');
      })
      .catch((error) => {
        if (
          (error.response.status === 401 || error.response.status === 403) &&
          error.response.data.error
        ) {
          //setSignupPassword('wrong');
          setResBackErrPwd(error.response.data.error);
        }
        if (
          error.response.data.error === 'invalid token' ||
          error.response.data.error === 'jwt malformed'
        ) {
          setResBackErrPwd('Utilisateur non autorisé');
        }
      });
  };

  return (
    <>
      <form className="connectParams__form" onSubmit={handleSubmit(updatePwd)}>
        <fieldset className="connectParams__form__name">
          Modification du mot de passe
        </fieldset>
        <div className="connectParams__form__field">
          <div className="connectParams__form__field__ico">
            <FontAwesomeIcon
              icon={faLock}
              aria-label="Icone qui représente une enveloppe"
            ></FontAwesomeIcon>
          </div>
          <FormsInputs
            type={switchHidePwd ? 'password' : 'text'}
            errors={errors}
            dirtyFields={dirtyFields.password}
            page="connectParams"
            inputName="password"
            input={password}
            inputToCompare={pwdToCompare}
            resBackErr={resBackErrPwd}
            register={{ ...register('password') }}
          />
          <div className={`connectParams__form__field__input__switchButton`}>
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
        <div className={`connectParams__form__field`}>
          <div className={`connectParams__form__field__ico`}>
            <FontAwesomeIcon
              icon={faLock}
              aria-label="Icone qui représente un cadena"
            ></FontAwesomeIcon>
          </div>
          <FormsInputs
            type={switchHideNewPwd ? 'password' : 'text'}
            errors={errors}
            dirtyFields={dirtyFields.newpassword}
            page="connectParams"
            inputName="newpassword"
            input={newpassword}
            register={{ ...register('newpassword') }}
          />
          <div className={`connectParams__form__field__input__switchButton`}>
            {!switchHideNewPwd && (
              <FontAwesomeIcon
                icon={faEyeSlash}
                onClick={() => setSwitchHideNewPwd(!switchHideNewPwd)}
              />
            )}
            {switchHideNewPwd && (
              <FontAwesomeIcon
                icon={faEye}
                onClick={() => setSwitchHideNewPwd(!switchHideNewPwd)}
              />
            )}
          </div>
        </div>
        <div className={`connectParams__form__field`}>
          <FormsInputs
            type={switchHideConfPwd ? 'password' : 'text'}
            errors={errors}
            dirtyFields={dirtyFields.confirmnewpassword}
            page="connectParams"
            inputName="confirmnewpassword"
            register={{ ...register('confirmnewpassword') }}
          />
          <div className={`connectParams__form__field__input__switchButton`}>
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
          className={`connectParams__form__validate`}
          name="connectParams"
          type="submit"
          value="Valider"
          disabled={
            errors.newpassword ||
            errors.password ||
            !dirtyFields.password ||
            !dirtyFields.newpassword ||
            (!touchedFields.newpassword && !touchedFields.password) ||
            !dirtyFields.confirmnewpassword ||
            errors.confirmnewpassword
              ? true
              : false
          }
        />
        <span className="alerte">
          {(!dirtyFields.password ||
            !dirtyFields.confirmnewpassword ||
            !dirtyFields.newpassword) &&
            'Tous les champs sont obligatoires'}
        </span>
      </form>
      <div className="profil__returnLink linkButton">
        <Link to="/posts">Retour</Link>
      </div>
    </>
  );
};

export default UpdatePwd;
