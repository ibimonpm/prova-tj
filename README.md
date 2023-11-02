# livro-tj-back
Back End Tj Livro

# Opção de Trabalho BackEnd

* Optei por trabalhar com SpringBoot na sua vesão 3.1.2, por ela já esta consolidada e menos conflituosa.
* Para controle de Dependências usei o Maven “apache-maven-3.9.4”, por esta familiarizado com o mesmo e ser uma das opções da IDE utilizada.
*A IDE utilizada foi o
	* _Spring Tool Suite 4 
	* _Version: 4.20.0.RELEASE
	* _Build Id: 202309081654
	* _Revision: 53f375c563505640d3065501ac290f0e3663359c

* Utilizei essa IDE por ser totalmente integrada com o ecossistema do Spring é fácil o manejo das dependências e integração com o Java.

* Utilizei a versão 17(compilação) por à mesma já está integrada à IDE e foi sugerida pela mesma..
* Por praticidade e boa integração com o Spring usei o Horm JPA com o Jakarta (spring-boot-starter-data-jpa), à integração da persistência se torna mais fácil e produtiva.


# Banco de Dados

* O banco de dados utilizado foi o PostGreSQL

APP_COPYRIGHT = "Copyright (C) 2013 - 2021, The pgAdmin Development Team"
APP_ICON = "pg-icon"
APP_NAME = "pgAdmin 4"

-----------------------------

Version
6.1
Application Mode
Desktop
Current User
pgadmin4@pgadmin.org
NW.js Version
0.55.0

# Criação do Banco de Dados
-- Database: tjdb

-- DROP DATABASE IF EXISTS tjdb;

CREATE DATABASE tjdb
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

# SQL criação da view


CREATE OR REPLACE VIEW livro_autor_assunto_view AS
SELECT
    l.codi AS livro_id,
    l.titulo AS titulo_livro,
    a.cod_au  AS autor_id,
    a.nome AS nome_autor,
	ls.cod_as AS assunto_id,
    ls.descricao AS descricao_assunto
FROM
    livro AS l
LEFT JOIN
    livro_autor AS la ON l.codi = la.livro_codi
LEFT JOIN
    livro_assunto AS lass ON l.codi = lass.livro_codi
LEFT JOIN
    autor AS a ON la.autor_codau = a.cod_au
LEFT JOIN
   assunto AS ls ON lass.assunto_codas = ls.cod_as

GROUP BY
	a.cod_au,
	a.nome,
	l.codi,
    l.titulo,
	ls.cod_as,
    ls.descricao;
	

# SQL criação das tabelas

	############
	
-- Table: public.assunto

-- DROP TABLE IF EXISTS public.assunto;

CREATE TABLE IF NOT EXISTS public.assunto
(
    cod_as bigint NOT NULL,
    descricao character varying(40) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT assunto_pkey PRIMARY KEY (cod_as)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.assunto
    OWNER to postgres;
	
	############
	
-- Table: public.autor

-- DROP TABLE IF EXISTS public.autor;

CREATE TABLE IF NOT EXISTS public.autor
(
    cod_au bigint NOT NULL,
    nome character varying(40) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT autor_pkey PRIMARY KEY (cod_au)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.autor
    OWNER to postgres;
	
	############

-- Table: public.livro

-- DROP TABLE IF EXISTS public.livro;

CREATE TABLE IF NOT EXISTS public.livro
(
    codi bigint NOT NULL,
    ano_publicacao character varying(4) COLLATE pg_catalog."default",
    edicao integer,
    editora character varying(40) COLLATE pg_catalog."default" NOT NULL,
    media_preco double precision,
    titulo character varying(40) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT livro_pkey PRIMARY KEY (codi)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.livro
    OWNER to postgres;
	
		############
	
-- Table: public.livro_assunto

-- DROP TABLE IF EXISTS public.livro_assunto;

CREATE TABLE IF NOT EXISTS public.livro_assunto
(
    assunto_codas bigint,
    livro_codi bigint NOT NULL,
    CONSTRAINT livro_assunto_pkey PRIMARY KEY (livro_codi),
    CONSTRAINT fk2qjhtnpxnx9vxuri5a10ldbkp FOREIGN KEY (livro_codi)
        REFERENCES public.livro (codi) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk479yo1o2h4bts07hnfb06wb0 FOREIGN KEY (assunto_codas)
        REFERENCES public.assunto (cod_as) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.livro_assunto
    OWNER to postgres;
	
		############	
	
	
-- Table: public.livro_autor

-- DROP TABLE IF EXISTS public.livro_autor;

CREATE TABLE IF NOT EXISTS public.livro_autor
(
    livro_codi bigint NOT NULL,
    autor_codau bigint NOT NULL,
    CONSTRAINT livro_autor_pkey PRIMARY KEY (livro_codi, autor_codau),
    CONSTRAINT fkb9k7v9wnnpbhp08x7152d3ddt FOREIGN KEY (livro_codi)
        REFERENCES public.livro (codi) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fkm20y83716io0lwoombcxwq34i FOREIGN KEY (autor_codau)
        REFERENCES public.autor (cod_au) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.livro_autor
    OWNER to postgres;