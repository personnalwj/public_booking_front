export type User = {
    // sub: string;
    name: string;
    email: string;
};

export type UserAction = User & {
    type: 'added' | 'removed' | 'updated';
}; 