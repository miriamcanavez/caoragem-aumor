DROP TABLE caes;
DROP TABLE imagens_caes;
DROP TABLE utilizadores;
DROP TABLE formulario_adocao;
CREATE TABLE caes (
    id_cao INTEGER PRIMARY KEY AUTOINCREMENT,
    nome varchar,
    idade INT,
    sexo varchar,
    porte varchar,
    info_medica Text,
    info_pessoal Text,
    status Boolean
);
CREATE TABLE imagens_caes (
    id_foto INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cao INT,
    path_fotos Text,
    perfil Boolean,
    FOREIGN KEY (id_cao) REFERENCES caes(id_cao)
);
CREATE TABLE utilizadores (
    id_utilizador INTEGER PRIMARY KEY AUTOINCREMENT,
    username varchar,
    password varchar
);
CREATE TABLE formulario_adocao (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_completo VARCHAR,
    email VARCHAR,
    telefone VARCHAR,
    localizacao varchar,
    observacoes TEXT
);
INSERT INTO caes (
        nome,
        idade,
        sexo,
        porte,
        status,
        info_pessoal,
        info_medica
    )
VALUES (
        'Kiki',
        10,
        'Fêmea',
        'Médio',
        false,
        'Jovem cheia de energia e muito dócil. Adora brincar e explorar.',
        'Vacinada, esterilizada e desparasitada.'
    ),
    (
        'Bento',
        24,
        'Macho',
        'Pequeno',
        false,
        'Muito meigo, alegre, educado e ideal para família ativa.',
        'Vacinado, esterilizado e desparasitado.'
    ),
    (
        'Amora',
        12,
        'Fêmea',
        'Médio',
        false,
        'Carinhosa, companheira e excelente para famílias.',
        'Vacinada, esterilizada e desparasitada.'
    ),
    (
        'Pipa',
        60,
        'Fêmea',
        'Pequeno',
        false,
        'Tranquila, doce e adoradora de colo.',
        'Vacinada, esterilizada e desparasitada. Necessita de ter atenção em relação às otites, que faz com alguma frequência.'
    ),
    (
        'Mike',
        6,
        'Macho',
        'Médio',
        false,
        'Sociável, curioso e cheio de energia.',
        'Vacinado, esterilizado e desparasitado'
    ),
    (
        'Pingo',
        3,
        'Macho',
        'Pequeno',
        false,
        'Brincalhão, carinhoso e muito sociável.',
        'Vacinado, esterilizado e desparasitado'
    ),
    (
        'Cristal',
        12,
        'Fêmea',
        'Grande',
        false,
        'Elegante, afetuosa e cheia de vida.',
        'Vacinada, esterilizada e desparasitada'
    ),
    (
        'Luca',
        96,
        'Macho',
        'Médio',
        false,
        'Calmo, leal e companheiro. Adora passeios tranquilos.',
        'Vacinada, esterilizada e desparasitada. Tem problemas de visão e usa gotas para ajudar.'
    );
INSERT INTO imagens_caes (id_cao, path_fotos, perfil)
VALUES (1, 'Kiki/1.png', 0),
    (1, 'Kiki/2.png', 0),
    (1, 'Kiki/3.png', 0),
    (1, 'Kiki/4.png', 0),
    (1, 'Kiki/perfil.png', 1);
INSERT INTO imagens_caes (id_cao, path_fotos, perfil)
VALUES (2, 'Bento/1.png', 0),
    (2, 'Bento/2.png', 0),
    (2, 'Bento/3.png', 0),
    (2, 'Bento/4.png', 0),
    (2, 'Bento/perfil.png', 1);
INSERT INTO imagens_caes (id_cao, path_fotos, perfil)
VALUES (3, 'Amora/1.jpg', 0),
    (3, 'Amora/2.png', 0),
    (3, 'Amora/3.png', 0),
    (3, 'Amora/4.png', 0),
    (3, 'Amora/perfil.png', 1);
INSERT INTO imagens_caes (id_cao, path_fotos, perfil)
VALUES (4, 'Pipa/1.jpg', 0),
    (4, 'Pipa/2.png', 0),
    (4, 'Pipa/3.png', 0),
    (4, 'Pipa/4.png', 0),
    (4, 'Pipa/perfil.png', 1);
INSERT INTO imagens_caes (id_cao, path_fotos, perfil)
VALUES (5, 'Mike/1.jpg', 0),
    (5, 'Mike/2.png', 0),
    (5, 'Mike/3.png', 0),
    (5, 'Mike/4.png', 0),
    (5, 'Mike/perfil.png', 1);
INSERT INTO imagens_caes (id_cao, path_fotos, perfil)
VALUES (6, 'Pingo/1.png', 0),
    (6, 'Pingo/2.png', 0),
    (6, 'Pingo/3.png', 0),
    (6, 'Pingo/4.png', 0),
    (6, 'Pingo/perfil.png', 1);
INSERT INTO imagens_caes (id_cao, path_fotos, perfil)
VALUES (7, 'Cristal/1.png', 0),
    (7, 'Cristal/2.png', 0),
    (7, 'Cristal/3.png', 0),
    (7, 'Cristal/4.png', 0),
    (7, 'Cristal/perfil.png', 1);
INSERT INTO imagens_caes (id_cao, path_fotos, perfil)
VALUES (8, 'Luca/1.png', 0),
    (8, 'Luca/2.png', 0),
    (8, 'Luca/3.png', 0),
    (8, 'Luca/4.png', 0),
    (8, 'Luca/perfil.png', 1);
INSERT INTO utilizadores (username, password)
VALUES ('admin', '123');