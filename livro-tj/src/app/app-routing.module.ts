import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AssuntoCreateComponent } from "./components/views/assunto/assunto-create/assunto-create.component";
import { AssuntoDeleteComponent } from "./components/views/assunto/assunto-delete/assunto-delete.component";
import { AssuntoReadComponent } from "./components/views/assunto/assunto-read/assunto-read.component";
import { AssuntoUpdateComponent } from "./components/views/assunto/assunto-update/assunto-update.component";
import { HomeComponent } from "./components/views/home/home.component";
import { LivroReadAllComponent } from "./components/views/livros/livro-read-all/livro-read-all.component";
import { LivroCreateComponent } from "./components/views/livros/livro-create/livro-create.component";
import { LivroUpdateComponent } from "./components/views/livros/livro-update/livro-update.component";
import { LivroDeleteComponent } from "./components/views/livros/livro-delete/livro-delete.component";
import { LivroReadComponent } from "./components/views/livros/livro-read/livro-read.component";
import { AutorReadAllComponent } from "./components/views/autor/autor-read-all/autor-read-all.component";
import { AutorUpdateComponent } from "./components/views/autor/autor-update/autor-update.component";
import { AutorDeleteComponent } from "./components/views/autor/autor-delete/autor-delete.component";
import { AutorCreateComponent } from "./components/views/autor/autor-create/autor-create.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "assuntos",
    component: AssuntoReadComponent,
  },

  {
    path: "assuntos/create",
    component: AssuntoCreateComponent,
  },
  {
    path: "assuntos/delete/:id",
    component: AssuntoDeleteComponent,
  },
  {
    path: "assuntos/update/:id",
    component: AssuntoUpdateComponent,
  },
  {
    path: "assuntos/:id_ass/livros",
    component: LivroReadAllComponent,
  },
  {
    path: "livros",
    component: LivroReadAllComponent,
  },
  {
    path: "autores",
    component: AutorReadAllComponent,
  },
  {
    path: "assuntos/:id_ass/livros/create",
    component: LivroCreateComponent,
  },
  {
    path: "livros/create",
    component: LivroCreateComponent,
  },
  {
    path: "livros/:id/update",
    component: LivroUpdateComponent,
  },
  {
    path: "autores/create",
    component: AutorCreateComponent,
  },
  {
    path: "autores/:id/update",
    component: AutorUpdateComponent,
  },
  {
    path: "autores/:id/delete",
    component: AutorDeleteComponent,
  },
  {
    path: "assuntos/:id_ass/livros/:id/delete",
    component: LivroDeleteComponent,
  },
  {
    path: "assuntos/:id_ass/livros/:id/read",
    component: LivroReadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
