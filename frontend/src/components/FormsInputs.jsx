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
  resBackMessageMail,
}) => {
  return (
    <>
      <input
        className={`${page}__form__field__input ${
          (errors || resBackErr) && 'error'
        } ${(errors || resBackErr) && input === inputToCompare && 'error'} ${
          dirtyFields && !errors && !resBackErr && 'valid'
        } ${dirtyFields && !errors && input !== inputToCompare && 'valid'}`}
        autoComplete={inputName}
        id={inputName}
        name={inputName}
        type={type}
        placeholder={inputName}
        aria-label={inputName}
        {...register}
      />
      {inputName !== 'password' && (
        <span className="alerte">
          {errors?.message}
          {resBackErr !== '' && input === inputToCompare && resBackErr}
          {resBackMessageMail}
        </span>
      )}
      {inputName === 'password' && !input && (
        <span className="alerte">{errors?.types?.required}</span>
      )}
    </>
  );
};

export default FormsInputs;
