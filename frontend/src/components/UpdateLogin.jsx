import React, { useState } from 'react';
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

const UpdateLogin = ({ currentUser, currentUserdecoded }) => {
  const [resBackErrMail, setResBackErrMail] = useState('');
  const [resBackErrNewMail, setResBackErrNewMail] = useState('');
  const [resBackErrPwd, setResBackErrPwd] = useState('');
  const [switchHideNewLoginPwd, setSwitchHideNewLoginPwd] = useState(true);
  const [emailToCompare, setEmailToCompare] = useState('');
  const [newEmailToCompare, setNewEmailToCompare] = useState('');
  const [newloginpwdToCompare, setNewLoginPwdToCompare] = useState('');
  const validationSchema = useYupValidation();
  console.log(currentUserdecoded);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, touchedFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      newemail: '',
      newloginpassword: '',
    },
    mode: 'onChange',
    shouldFocusError: true,
    criteriaMode: 'all',
  });

  const email = watch('email');
  const newemail = watch('newemail');
  const newloginpassword = watch('newloginpassword');

  const updateLogin = (data) => {
    setResBackErrNewMail('');
    setResBackErrMail('');
    setEmailToCompare(email);
    setNewEmailToCompare(newemail);
    setNewLoginPwdToCompare(newloginpassword);

    axios({
      method: 'put',
      url:
        `${process.env.REACT_APP_REQ_URL}/api/auth/login/` +
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
          error.response.data.errorMail
        ) {
          //setSignupEmail('wrong');
          setResBackErrMail(error.response.data.errorMail);
        }
        if (
          (error.response.status === 401 || error.response.status === 403) &&
          error.response.data.errorPassword
        ) {
          //setSignupPassword('wrong');
          setResBackErrPwd(error.response.data.errorPassword);
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
      <form
        className="connectParams__form"
        onSubmit={handleSubmit(updateLogin)}
      >
        <fieldset className="connectParams__form__name">
          Modification de l'identifiant de connexion
        </fieldset>
        <div className="connectParams__form__field">
          <div className="connectParams__form__field__ico">
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
            page="connectParams"
            inputName="email"
            register={{ ...register('email') }}
            input={email}
            inputToCompare={emailToCompare}
          />
          <div className="connectParams__form__field__ico">
            <FontAwesomeIcon
              icon={faEnvelope}
              aria-label="Icone qui représente une enveloppe"
            ></FontAwesomeIcon>
          </div>
          <FormsInputs
            type="email"
            errors={errors}
            dirtyFields={dirtyFields.newemail}
            resBackErr={resBackErrNewMail}
            page="connectParams"
            inputName="newemail"
            register={{ ...register('newemail') }}
            input={newemail}
            inputToCompare={newEmailToCompare}
          />
        </div>
        <div className="connectParams__form__field">
          <div className="connectParams__form__field__ico">
            <FontAwesomeIcon
              icon={faLock}
              aria-label="Icone qui représente un cadena"
            ></FontAwesomeIcon>
          </div>
          <FormsInputs
            type={switchHideNewLoginPwd ? 'password' : 'text'}
            errors={errors}
            dirtyFields={dirtyFields.newloginpassword}
            page="connectParams"
            inputName="newloginpassword"
            input={newloginpassword}
            inputToCompare={newloginpwdToCompare}
            resBackErr={resBackErrPwd}
            register={{ ...register('newloginpassword') }}
          />
          <div className="connectParams__form__field__input__switchButton">
            {!switchHideNewLoginPwd && (
              <FontAwesomeIcon
                icon={faEyeSlash}
                onClick={() => setSwitchHideNewLoginPwd(!switchHideNewLoginPwd)}
              />
            )}
            {switchHideNewLoginPwd && (
              <FontAwesomeIcon
                icon={faEye}
                onClick={() => setSwitchHideNewLoginPwd(!switchHideNewLoginPwd)}
              />
            )}
          </div>
        </div>

        <input
          className="connectParams__form__validate"
          name="connectParams"
          type="submit"
          value="Valider"
          disabled={
            errors.newemail ||
            errors.email ||
            errors.newloginpassword ||
            !dirtyFields.newemail ||
            !dirtyFields.newloginpassword ||
            !dirtyFields.email ||
            (!touchedFields.email &&
              !touchedFields.newemail &&
              !touchedFields.newloginpassword)
              ? true
              : false
          }
        />
        <span className="alerte">
          {(!dirtyFields.email ||
            !dirtyFields.newemail ||
            !dirtyFields.newloginpassword) &&
            'Tous les champs sont obligatoires'}
        </span>
      </form>
      <div className="profil__returnLink linkButton">
        <Link to="/posts">Retour</Link>
      </div>
    </>
  );
};

export default UpdateLogin;
