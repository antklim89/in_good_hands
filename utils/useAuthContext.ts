import { useContext } from 'react';

import { AuthContext } from '~/components/AuthProvider/AuthProvider';


export const useAuthContext = () => {

    return useContext(AuthContext);
};
