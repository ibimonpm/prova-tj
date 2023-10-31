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
    path: "assuntos/:id_cat/livros",
    component: LivroReadAllComponent,
  },
  {
    path: "assuntos/:id_cat/livros/create",
    component: LivroCreateComponent,
  },
  {
    path: "assuntos/:id_cat/livros/:id/update",
    component: LivroUpdateComponent,
  },
  {
    path: "assuntos/:id_cat/livros/:id/delete",
    component: LivroDeleteComponent,
  },
  {
    path: "assuntos/:id_cat/livros/:id/read",
    component: LivroReadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
