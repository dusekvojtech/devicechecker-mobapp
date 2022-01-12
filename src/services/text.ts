const validatePassword = (value: string) => {
  const expression = /(?=.*[a-z])(?=.*[0-9])(?=.{8,})/;

  return expression.test(String(value).toLowerCase());
};

const validateEmail = (value: string) => {
  const expression = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
  return expression.test(String(value).toLowerCase());
};

export { validatePassword, validateEmail };
