import { ErrorMessage } from '@hookform/error-message';

const FormsInputs = ({
  type,
  errors,
  dirtyFields,
  resBackErr,
  page,
  inputName,
  register,
  inputToCompare,
  input,
  resBackMessage,
}) => {
  let placeholder = '';
  let localErrors = errors;

  switch (inputName) {
    case 'username':
      placeholder = "Nom d'utilisateur";
      localErrors = errors.username;
      break;
    case 'email':
      placeholder = 'Adresse e-mail';
      localErrors = errors.email;
      break;
    case 'password':
      placeholder = 'Mot de passe';
      localErrors = errors.password;
      break;
    case 'confirmpassword':
      placeholder = 'Confirmation';
      localErrors = errors.confirmpassword;
      break;
    case 'confirmnewpassword':
      placeholder = 'Confirmation';
      localErrors = errors.confirmnewpassword;
      break;
    case 'newloginpassword':
      placeholder = 'Mot de passe';
      localErrors = errors.newloginpassword;
      break;
    case 'newpassword':
      placeholder = 'Nouveau mot de passe';
      localErrors = errors.newpassword;
      break;
    case 'newemail':
      placeholder = 'Nouvel e-mail';
      localErrors = errors.newemail;
      break;
    default:
      placeholder = '';
  }
  return (
    <>
      <input
        className={`${page}__form__field__input ${
          (localErrors || resBackErr) && 'error'
        } ${
          (localErrors || resBackErr) && input === inputToCompare && 'error'
        } ${dirtyFields && !localErrors && !resBackErr && 'valid'} ${
          dirtyFields && !localErrors && input !== inputToCompare && 'valid'
        }`}
        autoComplete={inputName}
        id={inputName}
        name={inputName}
        type={type}
        placeholder={placeholder}
        aria-label={inputName}
        {...register}
      />
      <div className={`${page}__form__field__errors`}>
        {resBackErr &&
          resBackErr !== '' &&
          (input === inputToCompare || page === 'forgotPwd') && (
            <span className="alerte">{resBackErr}</span>
          )}
        {resBackMessage && <span className="alerte">{resBackMessage}</span>}
        {inputName !== 'password' &&
          inputName !== 'newpassword' &&
          inputName !== 'newloginpassword' && (
            <ErrorMessage
              errors={errors}
              name={inputName}
              render={({ message }) =>
                message && <span className="alerte">{message}</span>
              }
            />
          )}
        {((inputName === 'password' &&
          (page === 'signup' || page === 'forgotPwd')) ||
          (inputName === 'newpassword' && dirtyFields)) && (
          <ul className={`${page}__form__field__errors__list alerte`}>
            <ErrorMessage
              errors={errors}
              name={inputName}
              render={({ messages }) =>
                messages &&
                Array.isArray(messages?.matches) &&
                Object.entries(messages?.matches).map(([type, message]) => (
                  <li key={type}>{message}</li>
                ))
              }
            />
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
            {!Array.isArray(errors?.newpassword?.types?.matches) &&
              errors?.newpassword?.types?.matches && (
                <li>{errors?.newpassword?.types?.matches}</li>
              )}
            {errors?.newpassword?.types?.min && (
              <li>{errors?.newpassword?.types?.min}</li>
            )}
            {errors?.newpassword?.types?.max && (
              <li>{errors?.newpassword?.types?.max}</li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default FormsInputs;
