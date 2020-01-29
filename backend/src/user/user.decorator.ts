import {createParamDecorator} from "@nestjs/common";
import {UserEntity} from "./user.entity";

export const UserRequest = createParamDecorator((data, req) => req.user as UserEntity);
