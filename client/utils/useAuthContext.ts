import { useContext } from 'react';

import { AuthContext } from '~/components/providers/AuthProvider/AuthProvider';


export const useAuthContext = () => {

    return useContext(AuthContext);
};
