
// E:\wonderx\hooks\useUser.ts
import { useRecoilState } from 'recoil';
import { userState } from '../states/userState';
import { UserInterface } from "../types/index"; // Importing UserInterface

export const useUser = () => {
  const [user, setUser] = useRecoilState(userState);

  const setActiveUser = (user: UserInterface) => {
    setUser(user);
  };

  return { user, setUser, setActiveUser };
};