import { useMutation, MutationResult } from '@apollo/client/react';
import { FetchResult } from '@apollo/client';
import { CREATE_USER } from '../../graphql/mutations';
import { CreateUserInput, CreateUserResponse } from '../../types/User';

type CreateUserReturn = [
    (_credentials: CreateUserInput) => Promise<FetchResult<CreateUserResponse>>,
    MutationResult<CreateUserResponse>
];

export const useCreateUser = (): CreateUserReturn => {

    const [mutate, result] = useMutation<CreateUserResponse>(CREATE_USER, {
        onError: (error) => {
            globalThis.console.error("create user failed: ", error.message);
        }
    });

    const createUser = async (input: CreateUserInput) => {
        globalThis.console.log("Creating user with input: ", input);
        return mutate(
            {
                variables: {
                    user:
                    {
                        username: input.username,
                        password: input.password
                    }
                }
            }
        );
    };

    return [createUser, result];
};