    // hooks/atoms.ts
    import { atom } from 'recoil';

    export const currentUserAtom = atom({
    key: 'currentUser', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
    });

    export const userProfilesAtom = atom({
    key: 'userProfiles',
    default: [],
    });
