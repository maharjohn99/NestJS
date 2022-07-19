import { Injectable } from '@nestjs/common';
import { Args, ArgsType, Mutation } from '@nestjs/graphql';
import { LoginInput } from '../../graphql';
import { CreateUserDto } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthResolver {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}
    @Mutation()
    async signin(@Args('input') input: CreateUserDto): Promise<boolean> {
        return await this.userService.create(input);
    }

    @Mutation()
    async login(@Args('input') input: LoginInput): Promise<string> {
        const { email, password } = input;
        return await this.authService.validateAccount(email, password);
    }
}
