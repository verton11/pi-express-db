create table horarios(
	id_horario varchar(11) primary key,
	hora_inicio time NOT null,
	hora_fim time NOT NULL,
	dia_semana varchar(20), check ( 
		dia_semana in ('Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 
		'Quinta-Feira', 'Sexta-Feira', 'Sabado')
	)
);

CREATE TABLE tutores (
	id_tutor varchar PRIMARY KEY,
	cpf_tutor char(11) UNIQUE NOT NULL,
	nome_tutor varchar(100) NOT NULL,
	email_tutor varchar(50) NOT NULL,
	telefone_tutor bigint NOT NULL,
	cargo varchar NOT NULL,
	formacao varchar(50) not null
);

CREATE TABLE tutores_horarios (
    fk_tutor VARCHAR(10) NOT NULL,
    fk_horario VARCHAR(10) NOT NULL,
    FOREIGN KEY (fk_tutor) REFERENCES tutores(id_tutor),
    FOREIGN KEY (fk_horario) REFERENCES horarios(id_horario)
);

insert into horarios (id_horario, hora_inicio, hora_fim, dia_semana) values 
('001', '09:00:00', '12:00:00', 'Segunda-Feira'),
('002', '13:00:00', '17:00:00', 'Segunda-Feira'),
('003', '10:00:00', '14:00:00', 'Terça-Feira'),
('004', '14:00:00', '18:00:00', 'Terça-Feira'),
('005', '08:00:00', '11:00:00', 'Quarta-Feira'),
('006', '12:00:00', '15:00:00', 'Quarta-Feira'),
('007', '10:00:00', '13:00:00', 'Quinta-Feira'),
('008', '14:00:00', '17:00:00', 'Quinta-Feira'),
('009', '11:00:00', '15:00:00', 'Sexta-Feira'),
('010', '13:00:00', '18:00:00', 'Sexta-Feira'),
('011', '14:00:00', '17:00:00', 'Sabado');

INSERT INTO tutores ("id_tutor","cpf_tutor", "nome_tutor", "email_tutor", "telefone_tutor", "cargo", "formacao")
VALUES 
('01', '47101788017', 'Peter Parker', 'peter@gmail.com', '62954487512', 'Coordenado','Psicologia'),
('02', '25110458006', 'Draco Malfoy', 'draco@gmail.com', '62914587925', 'Estagiário','Pedagogia'),
('03', '05037893054', 'Tony Stark', 'tony@gmail.com', '62958741598', 'Supervisor','Gestão Escolar'),
('04', '32871266018', 'Bruce Wayne', 'bruce@gmail.com', '62985741369', 'Supervisor','Psicologia'),
('05', '73086269030', 'Harry Potter', 'harry@gmail.com', '62958795869', 'Estagiário','Gestão Escolar'),
('06', '08606643092', 'Mary Jane', 'mary@gmail.com', '62968693528', 'Coordenado','Psicologia'),
('07', '21502645017', 'Severus Snape', 'severus@gmail.com', '62936495174', 'Supervisor','Pedagogia'),
('08', '45334848088', 'Hermione Granger', 'hermione@gmail.com', '62964852136', 'Coordenado','Pedagogia'),
('09', '83276472023', 'Natasha Romanova', 'natasha@gmail.com', '62998456132', 'Estagiário','Psicologia'),
('10', '89926533019', 'Loki Laufeyson', 'loki@gmail.com', '62995476158', 'Coordenado','Gestão Escolar');

INSERT INTO Tutores_Horarios (fk_tutor, fk_horario) VALUES
('01','001'),
('02','002'),
('03','003'),
('04','004'),
('05','005'),
('06','006'),
('07','007'),
('08','008'),
('09','009'),
('10','010');


create view horarios_consulta as
select nome_tutor, hora_inicio, hora_fim
from tutores
left join Tutores_Horarios on id_tutor = fk_tutor 
left join horarios on id_horario = fk_horario


create view atendimento as
select dia_semana, nome_tutor ,count(cpf_tutor)
from horarios
left join Tutores_Horarios on id_horario = fk_horario
left join tutores on id_tutor = fk_tutor
group by nome_tutor, dia_semana
order by nome_tutor,dia_semana


create view listas_tutores as
select dia_semana, nome_tutor 
from horarios
left join Tutores_Horarios on id_horario = fk_horario
left join tutores on id_tutor = fk_tutor
group by nome_tutor, dia_semana
order by nome_tutor,dia_semana


create view horarios_atendiomento as
select nome_tutor, hora_inicio, hora_fim, dia_semana
from tutores
left join Tutores_Horarios on id_tutor = fk_tutor
left join horarios on id_tutor = fk_tutor
order by nome_tutor


select count(*) as matutino
from horarios
where hora_inicio >= '08:00:00' and hora_fim <= '12:00:00'

select count(*) as vespertino
from horarios 
where hora_inicio >= '12:00:00' and hora_fim <= '22:00:00'


select count(*) as noturno
from horarios
where hora_inicio >= '18:00:00' and hora_fim <= '22:00:00'


