// hooks/atoms.ts
import { atom } from 'recoil';
import { UserInterface } from '../types/index';

export const currentUserAtom = atom<UserInterface | null>({
  key: 'currentUser',
  default: null,
});

export const userProfilesAtom = atom<UserInterface[]>({
  key: 'userProfiles',
  default: [],
});
