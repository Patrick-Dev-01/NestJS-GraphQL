import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/input/create-user.input'
import { v4 as uuidv4 } from 'uuid'
import { User } from './models/user'
import { UpdateUserInput } from './dto/input/update-user.input'
import { GetUserArgs } from './dto/args/get-user.args'
import { GetUsersArgs } from './dto/args/get-users.args'
import { DeleteUserInput } from './dto/input/delete-user.input'

@Injectable()
export class UsersService {
    private users: User[] = []

    public createUser(createUserData: CreateUserInput): User {
        const user: User = {
            userId: uuidv4(),
            ...createUserData,
        }

        this.users.push(user)

        return user;
    }

    public updateUser(updatedUserData: UpdateUserInput): User {
        const user = this.users.find(u => u.userId === updatedUserData.userId);

        Object.assign(user, updatedUserData);

        return user;
    }

    public getUser(getUserArgs: GetUserArgs): User {
        return this.users.find(u => u.userId === getUserArgs.userId);
    }

    public getUsers(getUsersArgs: GetUsersArgs): User[] {
        // Reaproveitando a função de cima para trazer todos os usuários
        return getUsersArgs.usersIds.map(userId => this.getUser({ userId }))
    }

    public deleteUser(deleteUserData: DeleteUserInput): User {
        const userIndex = this.users.findIndex(user => user.userId === deleteUserData.userId)
        const user = this.users[userIndex]

        this.users.splice(userIndex);

        return user;
    }
}
