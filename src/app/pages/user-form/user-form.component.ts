import { Component, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { toast } from 'ngx-sonner';

@Component({
    selector: 'app-user-form',
    imports: [ReactiveFormsModule],
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.css',
})
export class UserFormComponent {
    _id = input<string>();

    usersService = inject(UsersService);
    router = inject(Router);

    userMode = signal<'newuser' | 'updateuser'>('newuser');
    user = signal<IUser | null>(null)

    userForm: FormGroup;

    constructor() {
        this.userForm = new FormGroup({
        first_name: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20)
        ]),
        last_name: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
        ]),
        email: new FormControl('', [
            Validators.required,
            Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        ]),
        image: new FormControl('', [
            Validators.required,
            Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|online)$/i)
        ]),
        });
    }

    async ngOnInit() {

        if (this._id()) {
        this.userMode.set('updateuser');

        try {
            this.user.set(await this.usersService.getById(this._id()!));
            this.userForm.patchValue({
            first_name: this.user()?.first_name,
            last_name: this.user()?.last_name,
            email: this.user()?.email,
            image: this.user()?.image
            });

        } catch (error) {
            toast.error('Error cargando usuario');
        }

        } else {
        this.userMode.set('newuser');
        this.userForm.reset();
        }
    }

    checkControl(controlName: string, errorName: string) {
        return this.userForm.get(controlName)?.hasError(errorName)
        && this.userForm.get(controlName)?.touched;
    }

    async submitForm() {

        const formData : IUser = this.userForm.value;

        try {

        if (this.userMode() === 'newuser') {
            await this.usersService.createUser(formData);
            toast.success("Usuario creado correctamente");
            this.userForm.reset();

        } else {
            await this.usersService.updateUser(this._id()!, formData);
            toast.success("Usuario actualizado correctamente");
            this.router.navigate(['/home']);
        }

        } catch (error) {
        toast.error('Error en la operación');
        }
    }
}
