
export const required = (value) => {
  if (!value.toString().trim().length) {
    return 'require';
  }
};

export default validators