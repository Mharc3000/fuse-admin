export interface User
{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
}


export interface UserInfo {
    id:          number;
    fname:       string;
    mname:       string;
    lname:       string;
    position:    string;
    userImgPath: string;
    useraccount: Useraccount;
    isActive:    boolean;
}

export interface Useraccount {
    id:         number;
    username:   string;
    email:      string;
    password:   string;
    agreeTerms: null;
    userInfoID: number;
}