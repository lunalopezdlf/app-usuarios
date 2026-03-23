import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink, CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
    user = input<IUser>();
    usersService = inject(UsersService);
    router = inject(Router);

    confirmDelete() {
        Swal.fire({
        title: 'BORRAR USUARIO',
        text: `¿Estas seguro de borrar el usuario: ${this.user()?.username}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
        }).then(async (result) => {

        if (result.isConfirmed) {
            try {
            await this.usersService.deleteUser(this.user()?._id!);
            toast.success('Usuario borrado correctamente');
            this.router.navigate(['/home'])

            } catch (error) {
            toast.error('Error al eliminar el usuario');
            }
        }
        });
    }
}
