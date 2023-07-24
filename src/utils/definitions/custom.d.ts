import User from "../../resources/User/user.interface";


declare global{
    namespace Express{
        export interface Request{
            user : User
        }
    }
}