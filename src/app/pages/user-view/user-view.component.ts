import { Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { toast } from 'ngx-sonner';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-user-view',
    imports: [RouterLink],
    templateUrl: './user-view.component.html',
    styleUrl: './user-view.component.css',
})
export class UserViewComponent {
    _id = input<string>();

    usersService = inject(UsersService);
    router = inject(Router);

    user = signal<IUser | null>(null);

    async ngOnInit() {
        if (!this._id()) return;

        try {
        const userData = await this.usersService.getById(this._id()!);
        this.user.set(userData);
        } catch (error) {
        toast.error("Error cargando usuario");
        }
    }

    confirmDelete() {
        Swal.fire({
        title: 'BORRAR USUARIO',
        text: `¿Estas seguro de borrar el usuario: ${this.user()?.username}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
        }).then((result) => {
        if (result.isConfirmed) {
            this.deleteUser();
        }
        });
    }

    private async deleteUser() {
        try {
        await this.usersService.deleteUser(this.user()?._id!);
        toast.success('Usuario borrado correctamente');
        this.router.navigate(['/home']);
        } catch (error) {
        toast.error('Error al eliminar el usuario');
        }
    }
}
