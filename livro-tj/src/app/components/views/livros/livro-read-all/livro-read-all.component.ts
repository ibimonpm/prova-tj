import { Component, ElementRef, ViewChild } from '@angular/core';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Autor } from '../../autor/autor.model';
import { AutorService } from '../../autor/autor.service';
import { Vla } from '../../vincular-livro-autor/vla.model';
import { LivrosAutoresAssuntosView } from '../relatorio-view.model';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css'],
})
export class LivroReadAllComponent {
  displayedColumns: string[] = [
    'codI',
    'titulo',
    'media',
    'editora',
    'edicao',
    'assunto',
    'autores',
    'acoes',
  ];
  id_assun: String = '';
  livros: Livro[] = [];
  vla: Vla[] = [];
  autores: Autor[] = [];
  view: LivrosAutoresAssuntosView[] = [];

  constructor(
    private service: LivroService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  downloadTest(): void {
    this.generatePdf()
      .then(() => {
        console.log('PDF gerado e baixado com sucesso.');
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao gerar o PDF:', error);
      });
  }

  generatePdf(): Promise<Blob> {
    this.service.findAllDadosView().subscribe((resposta) => {
      console.log(resposta);
      this.view = resposta;
    });

    const contents: any[] = [];
    const dados: LivrosAutoresAssuntosView[] = [];

    return new Promise((resolve, reject) => {
    setTimeout(() => {
        for (let i = 0; i < this.view.length; i++) {
          dados.push(this.view[i]);
        }

        const table = {
          table: {
            headerRows: 1,
            widths: [20, 'auto', 20, 'auto', 20, 'auto'],
            body: [
              [
                'Id Assunto',
                'Assunto',
                'Id Livro',
                'Título',
                'Id. Autor',
                'Autor',
              ],
              ...dados.map((item) => [
                item.assuntoId === undefined ? '' : item.assuntoId,
                item.descricaoAssunto  === undefined ? '' : item.descricaoAssunto ,
                item.livroId === undefined ? '' : item.livroId ,
                item.tituloLivro  === undefined ? '' : item.tituloLivro ,
                item.autorId === undefined ? '' : item.autorId,
                item.nomeAutor  === undefined ? '' : item.nomeAutor
              ]),
            ],
          },
        };
        contents.push(table);
        const docDefinition = {
          content: contents,
        };
        const pdf = pdfMake.createPdf(docDefinition);
        pdf.getBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'pdfmake_table.pdf';
          a.click();
        });
      }, 1000);
    });
  }

  ngOnInit(): void {
    this.id_assun = this.route.snapshot.paramMap.get('id_assunto')!;
    this.findAll();
  }

  findAll(): void {
    this.service.findAllByAssunto(this.id_assun).subscribe((resposta) => {
      this.livros = resposta;
      console.log(this.livros);
    });
  }

  findAllForVew(): void {
    this.service.findAllDadosView().subscribe((resposta) => {
      this.view = resposta;
      console.log(this.view);
    });
  }

  navegarParaCriarLivro(): void {
    this.router.navigate([`assuntos/${this.id_assun}/livros/create`]);
  }
}
