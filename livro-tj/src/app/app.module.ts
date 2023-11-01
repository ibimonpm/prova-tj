import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./components/template/header/header.component";

import { MatToolbarModule } from "@angular/material/toolbar";
import { FooterComponent } from "./components/template/footer/footer.component";
import { NavComponent } from "./components/template/nav/nav.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { HomeComponent } from "./components/views/home/home.component";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AssuntoReadComponent } from "./components/views/assunto/assunto-read/assunto-read.component";
import { AssuntoCreateComponent } from "./components/views/assunto/assunto-create/assunto-create.component";
import { AssuntoDeleteComponent } from './components/views/assunto/assunto-delete/assunto-delete.component';
import { AssuntoUpdateComponent } from './components/views/assunto/assunto-update/assunto-update.component';
import { LivroReadAllComponent } from './components/views/livros/livro-read-all/livro-read-all.component';
import { LivroCreateComponent } from './components/views/livros/livro-create/livro-create.component';
import { LivroUpdateComponent } from './components/views/livros/livro-update/livro-update.component';
import { LivroDeleteComponent } from './components/views/livros/livro-delete/livro-delete.component';
import { LivroReadComponent } from './components/views/livros/livro-read/livro-read.component';
import { AutorCreateComponent } from './components/views/autor/autor-create/autor-create.component';
import { AutorDeleteComponent } from './components/views/autor/autor-delete/autor-delete.component';
import { AutorReadComponent } from './components/views/autor/autor-read/autor-read.component';
import { AutorReadAllComponent } from './components/views/autor/autor-read-all/autor-read-all.component';
import { AutorUpdateComponent } from './components/views/autor/autor-update/autor-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
   AssuntoReadComponent,
   AssuntoCreateComponent,
   AssuntoDeleteComponent,
   AssuntoUpdateComponent,
    LivroReadAllComponent,
    LivroCreateComponent,
    LivroUpdateComponent,
    LivroDeleteComponent,
    LivroReadComponent,
    AutorCreateComponent,
    AutorDeleteComponent,
    AutorReadComponent,
    AutorReadAllComponent,
    AutorUpdateComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
