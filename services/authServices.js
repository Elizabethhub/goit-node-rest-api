import User from "../models/User.js";

export const findUser = (filter) => User.findOne(filter);

export const signup = async (data) => {
  const { password } = data;
  // const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, 10);
  return User.create({ ...data, password: hashPassword });
};
// const hashPassword = async (password) => {
//   const result = await bcrypt.hash(password, 10);
//   const comparedResult = await bcrypt.compare(password, result);
//   console.log("compareResult", compareResult);
// };
