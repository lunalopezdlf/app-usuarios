import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { UserCardComponent } from "../../components/user-card/user-card.component";
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-home',
  imports: [CommonModule, UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
    usersList = signal<IUser[]>([]);
    usersService = inject(UsersService);

    currentPage = 1;
    totalPages = 1;

    ngOnInit() {
        this.loadUsers();
    }

    async loadUsers(page: number = 1 ) {
        const response = await this.usersService.getAllUsers(page);

        this.currentPage = response.page;
        this.totalPages = response.total_pages;

        this.usersList.set(response.results);
    }

    goToNext() {
        if (this.currentPage < this.totalPages) {
            this.loadUsers(this.currentPage + 1);
        }
    }

    goToPrev() {
        if (this.currentPage > 1) {
            this.loadUsers(this.currentPage - 1);
        }
    }
}
