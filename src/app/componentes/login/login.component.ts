import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    correo: new FormControl('sa', [Validators.required, Validators.email]),
    password: new FormControl('12345', [Validators.required, Validators.minLength(2)]),
  })
  constructor(
    private router: Router,
    private _auth: AngularFireAuth,
    private _db: AngularFireDatabase,
  ) { }

  ngOnInit() {

  }
  
  loginAuth() {
    const correo: string = this.loginForm.get('correo').value;
    const password: string = this.loginForm.get('password').value;

    console.log(correo, password);
    this._auth.signInWithEmailAndPassword(correo, password)
      .then(() => {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/principale'])
      })
      .catch(error => {
        console.log(error);
        alert('Usuario o contraseña erronea');
      });
  }

  loginRealDB() {
    const correo: string = this.loginForm.get('correo').value;
    const password: string = this.loginForm.get('password').value;

    console.log(correo, password);
    const personas = this._db.list<Persona>('/Personas');
    personas.valueChanges().subscribe((persons: Persona[]) => {
      const result = persons.find(p => {
        return p.usuario === correo && p.password === password;
      })

      if (result) {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/principale']);
      } else {
        console.log('Fatalie');
        alert('Usuario o contraseña erronea');
      }
    })
    

  }
}

interface Persona {
  fecharegistro?: any;
  idpersona?: string;
  nombres?: string;
  password?: string;
  telefono?: string;
  timestap: any;
  usuario: string;
}