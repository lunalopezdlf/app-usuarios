import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser, IUserResponse } from '../interfaces/iuser.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
    private httpClient = inject(HttpClient)

    private baseUrl: string = "https://peticiones.online/api/users"

    getAllUsers(page: number = 1): Promise<IUserResponse> {
        const url = `${this.baseUrl}?page=${page}`;
        return lastValueFrom(this.httpClient.get<IUserResponse>(url))
    }

    getById(id: string): Promise<IUser> {
        return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`))
    }

    createUser(user: IUser) : Promise<any> {
    return lastValueFrom(this.httpClient.post(this.baseUrl, user));
    }

    updateUser(id: string, user: IUser): Promise<any> {
        return lastValueFrom(this.httpClient.put(`${this.baseUrl}/${id}`, user));
    }

    deleteUser(id: string) : Promise<any> {
        return lastValueFrom(this.httpClient.delete(`${this.baseUrl}/${id}`));
    }
}
