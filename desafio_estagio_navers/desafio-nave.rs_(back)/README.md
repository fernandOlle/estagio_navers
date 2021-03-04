### Roteiro do README :
Seção 1 : Resumo das tecnlogias utilizadas
Seção 2 : Setting Up
	Seção 2.1: Clonando e instalando dependencias 
	Seção 2.2: Configurando o banco 
	Seção 2.3: Iniciando o back
	Seção 2.4: Usando Insomnia
	Seção 2.5: Sumario das questão bonus
Seção 3: Consideração finas 

### ` Seção 1 - Resumo das tecnlogias utilizadas: ` 
Tenha instalado em sua maquina:
	postgresql 
	insomnia
	visual studio code 
	node.js 
	git 

### ` Seção 2.1 - Clonando e instalando dependencias: `
Navegue até a pasta onde deseja salvar o projeto.
Rode o comando  ` git clone <link do projeto> ` 
Ainda no terminal navegue até apasta do projeto e rode o comando  ` code .`
dentro do projeto no vs code, abra um terminal e roda o comando  ` npm install `
para instalar as dependencias do projeto ( nodemon, pg, knex, express )
(
opcionalmente, recomendado :
Abra um terminal dentro do vs code e clique no icone mais no menu
do terminal duas vezes:
	Se você fez estes passos vc tem tres terminais dentro 
	do proprio vs code.
	Também recomendado clicar no icone que divide a tela para 
	que seja apresentado dois terminais lado a lado 
Caso contrario vc precisara abrir terminais externos para acompanhar 
o desenrolar da aplicação
	)

### ` Seçao 2.2 - Configurando o banco : `
Agora com tres terminais livres em um deles rode o comando  ` service postgresql ` 
para começarmos a configurar o banco.
No mesmo rode  ` sudo su postgres ` 
E então  ` psql ` 
Com isto temos o servidor postgres aberto e rodando em nossa maquina.
Agora precisaremos ou configurar uma senha para o usurio padrão 
"postgres" ( CASO 1 ),
ou então se você já tem uma senha configurada para este usuario ( CASO 2 )
	( usuario este que esta logados no servidor ) 
CASO 1' EM QUE VOCÊ AINDA NÃO TEM UMA SENHA PARA O USUARIO postgres (
	Dentro do psql ( command line aplication )
	rode o comando  ` ALTE USER postgres WITH PASSWORD 'admin'; ` 
)
CASO 2' EM QUE VOCÊ JÁ TEM UMA SENHA PARA USUARIO postgres (
		navegue no vs code 
	pelos arquivos do projeto até  ` ./knexfile ` e neste arquivo no campo 
	 ` connection: password: <sua senha aqui> ` no campo indicado
	bote sua senha
)
Agora falta pouco a se fazer dentro de psql, basta criarmos a database
 chamada knex_navers.
Faremos isso rodando o comando  ` CREATE DATABASE knex_navers; ` e pronto. 

Agora mantenha o psql aberto. Você pode acompanhar os dados dentro da database
porém para fins praticos só precisaremos realmente das aplicações 
insomnia e vs code daqui
em diante.

Se lembra dos outros teminais que abrimos anteriormente
 ( de preferencia dentro do vs code ),
então agora chegou a hora de usalos.

### ` Seção 2.3 - Iniciando e usando insomnia: `
Em um deles roda o comando  ` npm start ` 
Se tudo aconteceu de forma correta você devera ver a mensagem  ` Server is running `
Pronto, agora só manter este terminal aberto.

Agora no terceiro terminal rode os comandos
 ` npx knex migrate:latest ` e ` npx knex seed:run `
Neste ponto você deter ter :
	o servidor postgres rodando com a database knex_navers 
	com as seguintes tabelas :
	navers ( contem as informações da staff ),
	projects ( contem as informações do projetos ),
	projects_navers ( contem a relação de navers a seus projects )

### ` Seção 2.4: Usando Insomnia `
Então dentro da aplicação insomnia vamos criar as request
A seguinte organização é recomendada :
-	Crie uma pasta Navers com :
-
request do tipo GET chamda "Get Navers" para a url : ' http://localhost:3333/navers '
que por sua vez retornara a lista de todos os navers 

request do tipo POST chamda "Post Naver" para a url :  
' http://localhost:3333/navers/store '
que por sua vez retornara um navers para o Banco :
esta chamda devera ter um campo no menu Body com o seguinte formato, por exemplo :
{
	"name": "Fulan@",
	"birthdate": "2000-02-02",
	"admission_date": "2020-02-02",
	"job_role": "dev-ops",
	"projects": [1]
}	
--	Atenção para este post, o projeto de indice 1, preferencialmente deve existir!

request do tipo GET chamda "Get Naver" para a url : '
 http://localhost:3333/navers/show/"ID" ' 
(onde "ID" deve ser substituido pelo id do naver que vc quer buscar,
lembrando que os id's são incrementais e unicos)
que por sua vez retornara o naver e os projetos em que ele se involveu 

request do tipo GET chamda "Get Navers E.B.3" para a url : 
' http://localhost:3333/navers/eb3 '
que por sua vez retornara a lista de todos os navers ordenados pelo sua data de 
admissão 


-	Crie uma pasta Projects 
	-	
	request do tipo GET chamda "Get Project" para a url : 
	' http://localhost:3333/projects/ '
	que por sua vez retornara a lista de todos os projects 

	request do tipo POST chamda "Post Projects" para a url : 
	' http://localhost:3333/projects/store '
	que por sua vez retornara um navers para o Banco :
	esta chamda devera ter um campo no menu Body com o seguinte formato, por exemplo :
	{
		"name": "projeto-back-end",
		"navers": [1]
	}
	--	Atenção para este post, o navers de indice 1, preferencialmente deve existir!

	request do tipo GET chamda "Get Project" para a url : 
	' http://localhost:3333/projects/show/"ID" ' 
	(onde "ID" deve ser substituido pelo id do naver que vc quer buscar,
	 lembrando que os id's são incrementais e unicos)
	que por sua vez retornara o project e os navers que se involveram

	request do tipo GET chamda "Get Project" para a url : 
	' http://localhost:3333/projects/eb4 '
	que por sua vez retornara a lista de todos os projects e todos seus navers

	request do tipo GET chamda "Get Project" para a url : 
	' http://localhost:3333/projects/eb5 '
	que por sua vez retornara a lista de todos os projetos e sua quantidade de navers

### ` Seção 2.5 - Sumario das questão bonus `
	E.B.1 Crie um script que delete e crie todas as tabelas :
		Um script .sh esta disponivel na raiz do projeto. Em seu terminal 
		rode o comando  ` chmod +x eb1.sh ` para tornar o arquivo
		executavel. Para utilizado roda o comando  ` ./eb1.sh `

	E.B.2 Faça um script que limpe e crie dados nas tabelas :
		Um script .sh esta disponivel na raiz do projeto. Em seu terminal 
		rode o comando ` chmod +x eb2.sh ` para tornar o arquivo
		executavel. Para utilizado roda o comando ### ` ./eb2.sh `

	E.B.3 Faça uma querie que traga todos os navers ordenados pelo seu tempo de 
	empresa admission_date:
		Esta questão tem sua solução na rota : http://localhost:3333/navers/eb3

	E.B.4 Faça uma querie que traga todos os projetos com seus respectivos navers:
		Esta questão tem sua solução na rota : http://localhost:3333/navers/eb4

	E.B.5 Faça uma querie que traga todos os projetos com sua quantidade de navers:
		Esta questão tem sua solução na rota : http://localhost:3333/navers/eb5



### ` Seção 3: Consideração finas `
	Devido a documentação simplista implementar a função join foi do knex foi 
	deveras complicado
	escolhi criar minha implementação desda função, a qual acredito não ter 
	ficado o mais optimizada
	possivel.

	Fora isto, aprender a usar o knex também não foi muito trivial devido a grande 
	quantidade de funcionalidades,
	para melhor adereçar este problema a documentação ( http://knexjs.org/ ) padrão
	da foi amplamente consultada.

	Foi uma experecia muito valida, aprendi bastante com o desenvolvimento do desafio.

	Por fim, espero que gostem do projeto, e que possamos trabalhar juntos em um 
	futuro proximo, obrigado pela 
	oportunidade.

	Att.
	Fernando Ollé

	Github: owzi 
	:-D