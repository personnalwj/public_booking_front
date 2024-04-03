import { User } from "supertokens-web-js/types";

export type UserMetadata = {
    first_name?: string;
    last_name?: string;
};

export type UserResponse = UserMetadata & User;

export type UserAction ={
    type: 'added' | 'removed' | 'updated';
    payload: UserResponse;
}; 