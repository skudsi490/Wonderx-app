// hooks/useUser.ts
import { useRecoilState } from 'recoil';
import { currentUserAtom } from './atoms';
import { UserInterface } from '../types/index';

export const useUser = () => {
  const [user, setUser] = useRecoilState(currentUserAtom);

  const setActiveUser = (user: UserInterface) => {
    setUser(user);
  };

  return { user, setUser, setActiveUser };
};
