import { INewUser } from '@/types';
import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from '@tanstack/react-query';
import { createUserAcount, singInAccount } from '../appwrite/api';



export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAcount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string;
            password: string
        }) => singInAccount(user)
    })
}