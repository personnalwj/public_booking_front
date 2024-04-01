import { User } from "supertokens-web-js/types";

export type UserMetadata = {
    email: string;
    first_name?: string;
    last_name?: string;
    id: string
};

export type UserResponse = UserMetadata & User;

export type UserAction ={
    type: 'added' | 'removed' | 'updated';
    payload: UserMetadata;
}; 