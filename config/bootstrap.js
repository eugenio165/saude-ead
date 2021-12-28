/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

 module.exports.bootstrap = async function(done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // Set up fake development data (or if we already have some, avast)
  const allUsers = await Usuario.find();
  if (allUsers.length > 0) {
    return done();
  }

  const videoEducacionalEmbedded = '<iframe width="560" height="315" src="https://www.youtube.com/embed/qelEiERtEUY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  await Tutorial.createEach([
    {
      nome: 'aluno',
      iframe: videoEducacionalEmbedded,
    },
    {
      nome: 'admin',
      iframe: videoEducacionalEmbedded,
    }
  ]);
  

  const colegios = await Colegio.createEach([
    {
      nome: 'Colégio Getúlio Vargas',
      endereco: 'rua 1, 123, 312310-232 Belavista, bauru-sp',
    },
    {
      nome: 'Colégio 2',
      endereco: 'rua 1',
    },
    {
      nome: 'Colégio 3',
      endereco: 'rua 23',
    },
    {
      nome: 'Colégio Super Admin',
      endereco: 'rua Super Admin',
    },
  ]).fetch();

  const usuarios = await Usuario.createEach([
    {
      emailAddress: 'teste@gmail.com',
      fullName: 'Teste da Silva',
      password: await sails.helpers.passwords.hashPassword('123321'),
      escola: colegios[0].id,
      ano: '5'},
    {
      emailAddress: 'guilherme@gmail.com',
      fullName: 'Guilherme da Silva',
      password: await sails.helpers.passwords.hashPassword('123321'),
      escola: colegios[0].id,
      ano: '5'},
    {
      emailAddress: 'gustavo@gmail.com',
      fullName: 'Gustavo da Silva',
      password: await sails.helpers.passwords.hashPassword('123321'),
      escola: colegios[1].id,
      ano: '5'},
    {
      emailAddress: 'roberto@gmail.com',
      fullName: 'Roberto da Silva',
      password: await sails.helpers.passwords.hashPassword('123321'),
      escola: colegios[0].id,
      ano: '5'},
    {
      emailAddress: 'silva@gmail.com',
      fullName: 'Silva da Silva',
      password: await sails.helpers.passwords.hashPassword('123321'),
      escola: colegios[2].id,
      ano: '8'},
    {
      emailAddress: 'silvana@gmail.com',
      fullName: 'Silvana da Silva',
      password: await sails.helpers.passwords.hashPassword('123321'),
      escola: colegios[0].id,
      ano: '9'},
    {
      emailAddress: 'iodites@gmail.com',
      fullName: 'Iodites da Silva',
      password: await sails.helpers.passwords.hashPassword('123321'),
      escola: colegios[0].id,
      ano: '5'},
    {
      emailAddress: 'superadmin@gmail.com',
      fullName: 'SUPER ADMIN TEST',
      password: await sails.helpers.passwords.hashPassword('123321'),
      escola: colegios[3].id,
      ano: '3',
      role: 'superadmin',
    },
    {
      emailAddress: 'professor@gmail.com',
      fullName: 'PROFESSOR TEST',
      password: await sails.helpers.passwords.hashPassword('123321'),
      escola: colegios[0].id,
      ano: '5',
      role: 'professor',
    },
    {
      emailAddress: 'diretor@gmail.com',
      fullName: 'DIRETOR TEST',
      password: await sails.helpers.passwords.hashPassword('123321'),
      escola: colegios[0].id,
      ano: '3',
      role: 'diretor',
    },
  ]).fetch();

  var q = [];
  for(let j=7; j<35; j++) { // Cria perguntas
    q.push({
      Pergunta: 'Pergunta ' + j,
      RespostaCorreta: '1',
      Alternativas: {
        0: 'res1',
        1: 'res2',
        2: 'res3',
      },
    });
  }

  const questoes = await Questoes.createEach([
    {
      Pergunta: 'Qual maior corredor de todos os tempos?',
      RespostaCorreta: '1',
      Alternativas: {
        0: 'Bolt',
        1: 'Ninguém',
      },
    },
    {
      Pergunta: 'Qual o record da maratona?',
      RespostaCorreta: '1',
      Alternativas: {
        0: '2h01',
        1: '1h40',
        2: '2h25',
      },
    },
    {
      Pergunta: 'Qual o melhor time do mundo?',
      RespostaCorreta: '1',
      Alternativas: {
        0: 'Corinthians',
        1: 'São Paulo',
        2: 'Santos',
      },
    },
    {
      Pergunta: 'Qual o esporte sem bola?',
      RespostaCorreta: '3',
      Alternativas: {
        0: 'Basquete',
        1: 'Futebol',
        2: 'Natação',
      },
    },
    {
      Pergunta: 'Qual o esporte que tem o item mais rápido das olimpiadas?',
      RespostaCorreta: '1',
      Alternativas: {
        0: 'Corrida',
        1: 'Arremesso de peso',
        2: 'Badminton',
      },
    },
    {
      Pergunta: 'Qual a maior prova das olimpiadas?',
      RespostaCorreta: '1',
      Alternativas: {
        0: 'Maratona',
        1: 'Natação',
        2: 'Futebol',
      },
    },
    ...q,
  ]).fetch();

  const conteudos = await Conteudo.createEach([
    {
      // texto: '<p><span style=\"color:#ffffff\"><span style=\"font-size:36px\">CONTE&Uacute;DO 1</span></span><br />\n<span style=\"font-size:26px\"><span style=\"color:#000099\">Hist&oacute;ria do Atletismo</span></span></p>\n\n<p><span style=\"font-size:24px\"><span style=\"color:#ecf0f1\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;H&aacute; muito tempo atr&aacute;s, o homem pr&eacute;-hist&oacute;rico fazia pinturas nas paredes das cavernas&nbsp;que demonstravam seus movimentos. Para se alimentar, o homem das cavernas precisa ca&ccedil;ar&nbsp;e assim percorria longas dist&acirc;ncias para encontrar animais ou fugir de predadores.</span></span></p>\n\n<p>&nbsp;</p>\n\n<p style=\"text-align:center\"><img alt=\"\" height=\"310\" src=\"https://image.ibb.co/jJNmwp/pintura_rupestre.jpg\" width=\"561\" /></p>\n\n<p>&nbsp;</p>\n\n<div><span style=\"font-size:24px\"><span style=\"color:#ecf0f1\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Com o tempo o homem passou a se fixar nos lugares, plantar alimentos e domesticar&nbsp;</span></span><span style=\"font-size:24px\"><span style=\"color:#ecf0f1\">animais, sendo necess&aacute;rio possuir novas habilidades f&iacute;sicas para constru&ccedil;&atilde;o de ferramentas&nbsp;</span></span><span style=\"font-size:24px\"><span style=\"color:#ecf0f1\">ou para luta pela posse das terras.<br />\n&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Os movimentos naturais do ser humano de correr, saltar e lan&ccedil;ar tamb&eacute;m eram realizados&nbsp;</span></span><span style=\"font-size:24px\"><span style=\"color:#ecf0f1\">pelos povos da antiguidade oriental, como os chineses e os eg&iacute;pcios, que praticavam v&aacute;rios&nbsp;</span></span><span style=\"font-size:24px\"><span style=\"color:#ecf0f1\">tipos de esportes, gin&aacute;stica e exerc&iacute;cios f&iacute;sicos para ca&ccedil;ar, nadar e lutar.</span></span></div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>\n<p style=\"text-align:center\"><img alt=\"\" height=\"317\" src=\"https://image.ibb.co/jiuf6p/egito.jpg\" width=\"450\" /></p>\n\n<p>&nbsp;</p>\n</div>\n\n<div><span style=\"font-size:24px\"><span style=\"color:#ecf0f1\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Mas foi na Gr&eacute;cia antiga que o atletismo veio a se tornar esporte, com a cria&ccedil;&atilde;o de competi&ccedil;&otilde;es&nbsp;</span></span><span style=\"font-size:24px\"><span style=\"color:#ecf0f1\">e dos famosos jogos ol&iacute;mpicos.Mas foi na Gr&eacute;cia antiga que o atletismo veio a se tornar esporte,&nbsp;com a cria&ccedil;&atilde;o de competi&ccedil;&otilde;es e dos famosos </span></span><span style=\"font-size:24px\"><span style=\"color:#ecf0f1\">jogos ol&iacute;mpicos.&nbsp;</span></span></div>\n\n<div>&nbsp;</div>\n\n<div><img alt=\"\" height=\"235\" src=\"https://image.ibb.co/h6q3Rp/arte_grega.jpg\" style=\"float:right\" width=\"400\" /></div>\n\n<div><span style=\"font-size:24px\"><span style=\"color:#ecf0f1\"><img alt=\"\" height=\"413\" src=\"https://image.ibb.co/mTxuXU/discobolo.jpg\" style=\"float:left\" width=\"300\" /></span></span></div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div><span style=\"font-size:24px\"><span style=\"color:#ffffff\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></span></div>\n\n<div>&nbsp;</div>\n\n<div><span style=\"font-size:24px\"><span style=\"color:#ffffff\">&nbsp; &nbsp; &nbsp; &nbsp; Durante esse grande evento, o atletismo, composto por diferentes tipos de provas, &eacute; acompanhado pelas pessoas do mundo inteiro pela TV e internet, que acompanha os atletas nas conquistas de medalhas e na quebra de recordes.&nbsp;</span></span></div>\n\n<div>&nbsp;</div>\n\n<div>&nbsp;</div>\n\n<div>\n<p style=\"text-align:center\"><img alt=\"\" height=\"419\" src=\"https://image.ibb.co/gAOFNU/foto_olimpiadas.jpg\" width=\"700\" /></p>\n\n<p><span style=\"font-size:24px\"><span style=\"color:#ffffff\">&nbsp; &nbsp; &nbsp; &nbsp; As provas de atletismo s&atilde;o agrupadas em provas de pista (corridas), de campo (saltos e lan&ccedil;amentos), de marcha atl&eacute;tica, combinadas, corridas de campo (cross country), de pedestrianismo (maratona) e corridas em montanhas.</span></span></p>\n\n<p><br />\n<span style=\"font-size:24px\"><span style=\"color:#ffffff\">&nbsp; &nbsp; &nbsp; &nbsp; Em pa&iacute;ses como o Qu&ecirc;nia e Jamaica, no continente africano, a pr&aacute;tica do atletismo &eacute; muito valorizada e motiva os alunos em idade escolar a praticarem o atletismo desde cedo. Atualmente o jamaicano Usain Bolt, &eacute; o &uacute;nico atleta na hist&oacute;ria do atletismo a tornar-se tricampe&atilde;o em duas modalidades de pista em Jogos Ol&iacute;mpicos de forma consecutiva e bicampe&atilde;o tamb&eacute;m de forma consecutiva na modalidade revezamento. &Eacute; tamb&eacute;m o &uacute;nico atleta a conquistar oito medalhas de ouro em provas de velocidade, sendo dez vezes campe&atilde;o mundial.</span></span></p>\n\n<p><br />\n<span style=\"font-size:24px\"><span style=\"color:#ffffff\">&nbsp; &nbsp; &nbsp; &nbsp; N&oacute;s brasileiros preferimos as modalidades esportivas coletivas, como o futebol por exemplo, que t&ecirc;m a bola como objeto principal. Apesar disso, o atletismo no Brasil teve diversos atletas conhecidos mundialmente como Adhemar Ferreira da Silva, o primeiro bicampe&atilde;o ol&iacute;mpico do pa&iacute;s na modalidade salto triplo e Jo&atilde;o Carlos de Oliveira, o Jo&atilde;o do Pulo, medalhista ol&iacute;mpico e recordista mundial especializado em salto triplo e salto em dist&acirc;ncia. Na modalidade corrida temos como destaque Joaquim Cruz e Robson Caetano, campe&otilde;es ol&iacute;mpicos em pistas de atletismo e Vanderlei Cordeiro de Lima na maratona.</span></span></p>\n\n<p>&nbsp;</p>\n\n<p><img alt=\"\" height=\"320\" src=\"https://image.ibb.co/ed1fp9/Adhemar_ferreira_da_silva.jpg\" style=\"float:left\" width=\"286\" /><img alt=\"\" height=\"400\" src=\"https://image.ibb.co/cCNmU9/Joaodo_Pulo.jpg\" width=\"271\" /><img alt=\"\" height=\"330\" src=\"https://image.ibb.co/ndxybp/joaquim_Cruz.jpg\" width=\"236\" /><img alt=\"\" height=\"346\" src=\"https://image.ibb.co/gjnybp/robson_caetano.jpg\" width=\"200\" /></p>\n\n<p>&nbsp;</p>\n</div>\n',
      texto: '<p><span style="color:#ffffff"><span style="font-size:36px">CONTE&Uacute;DO 1</span></span><br /><span style="font-size:26px"><span style="color:#000099">Hist&oacute;ria do Atletismo</span></span></p><p><span style="font-size:24px"><span style="color:#ecf0f1">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;H&aacute; muito tempo atr&aacute;s, o homem pr&eacute;-hist&oacute;rico fazia pinturas nas paredes das cavernas&nbsp;que demonstravam seus movimentos. Para se alimentar, o homem das cavernas precisa ca&ccedil;ar&nbsp;e assim percorria longas dist&acirc;ncias para encontrar animais ou fugir de predadores.</span></span></p><p>&nbsp;</p><p style="text-align:center"><img alt="" height="310" src="https://t5z6q4c2.rocketcdn.me/wp-content/uploads/2019/02/conheca-a-bela-arte-rupestre-e-saiba-quando-onde-e-por-quem-foi-feita.jpeg" width="561" /></p><p>&nbsp;</p><div><span style="font-size:24px"><span style="color:#ecf0f1">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Com o tempo o homem passou a se fixar nos lugares, plantar alimentos e domesticar&nbsp;</span></span><span style="font-size:24px"><span style="color:#ecf0f1">animais, sendo necess&aacute;rio possuir novas habilidades f&iacute;sicas para constru&ccedil;&atilde;o de ferramentas&nbsp;</span></span><span style="font-size:24px"><span style="color:#ecf0f1">ou para luta pela posse das terras.<br />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Os movimentos naturais do ser humano de correr, saltar e lan&ccedil;ar tamb&eacute;m eram realizados&nbsp;</span></span><span style="font-size:24px"><span style="color:#ecf0f1">pelos povos da antiguidade oriental, como os chineses e os eg&iacute;pcios, que praticavam v&aacute;rios&nbsp;</span></span><span style="font-size:24px"><span style="color:#ecf0f1">tipos de esportes, gin&aacute;stica e exerc&iacute;cios f&iacute;sicos para ca&ccedil;ar, nadar e lutar.</span></span></div><div>&nbsp;</div><div>&nbsp;</div><div><p style="text-align:center"><img alt="" height="317" src="https://www.eusemfronteiras.com.br/wp-content/uploads/2019/09/120701535_m.jpg" width="450" /></p><p>&nbsp;</p></div><div><span style="font-size:24px"><span style="color:#ecf0f1">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Mas foi na Gr&eacute;cia antiga que o atletismo veio a se tornar esporte, com a cria&ccedil;&atilde;o de competi&ccedil;&otilde;es&nbsp;</span></span><span style="font-size:24px"><span style="color:#ecf0f1">e dos famosos jogos ol&iacute;mpicos.</span></span></div><div>&nbsp;</div><div><p style="text-align:center"><img alt="" height="235" src="https://www.olimpiadatododia.com.br/wp-content/uploads/2020/05/JOGOS-OLI%CC%81MPICOS-DA-GRE%CC%81CIA-ANTIGA-1280x720.jpg" width="400" /></p></div><div><p style="text-align:center"><img alt="" height="413" src="http://3.bp.blogspot.com/-3nf3F1j0iM0/TrLvwolZMBI/AAAAAAAAAJc/6JmFq7FcERA/s1600/discobolo.jpg" width="300" /></p></div><div><span style="font-size:24px"><span style="color:#ffffff">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></span></div><div>&nbsp;</div><div><span style="font-size:24px"><span style="color:#ffffff">&nbsp; &nbsp; &nbsp; &nbsp; Durante esse grande evento, o atletismo, composto por diferentes tipos de provas, &eacute; acompanhado pelas pessoas do mundo inteiro pela TV e internet, que acompanha os atletas nas conquistas de medalhas e na quebra de recordes.&nbsp;</span></span></div><div>&nbsp;</div><div>&nbsp;</div><div><p style="text-align:center"><img alt="" height="419" src="https://static-wp-tor15-prd.torcedores.com/wp-content/uploads/2021/07/olimpiadas-jogos-olimpicos-toquio-atletismo-onde-assistir-sportv-globoplay-bandsports-link-ao-vivo-online-curiosidades-818x338.png" width="700" /></p><p><span style="font-size:24px"><span style="color:#ffffff">&nbsp; &nbsp; &nbsp; &nbsp; As provas de atletismo s&atilde;o agrupadas em provas de pista (corridas), de campo (saltos e lan&ccedil;amentos), de marcha atl&eacute;tica, combinadas, corridas de campo (cross country), de pedestrianismo (maratona) e corridas em montanhas.</span></span></p><p><br /><span style="font-size:24px"><span style="color:#ffffff">&nbsp; &nbsp; &nbsp; &nbsp; Em pa&iacute;ses como o Qu&ecirc;nia e Jamaica, no continente africano, a pr&aacute;tica do atletismo &eacute; muito valorizada e motiva os alunos em idade escolar a praticarem o atletismo desde cedo. Atualmente o jamaicano Usain Bolt, &eacute; o &uacute;nico atleta na hist&oacute;ria do atletismo a tornar-se tricampe&atilde;o em duas modalidades de pista em Jogos Ol&iacute;mpicos de forma consecutiva e bicampe&atilde;o tamb&eacute;m de forma consecutiva na modalidade revezamento. &Eacute; tamb&eacute;m o &uacute;nico atleta a conquistar oito medalhas de ouro em provas de velocidade, sendo dez vezes campe&atilde;o mundial.</span></span></p><p><br /><span style="font-size:24px"><span style="color:#ffffff">&nbsp; &nbsp; &nbsp; &nbsp; N&oacute;s brasileiros preferimos as modalidades esportivas coletivas, como o futebol por exemplo, que t&ecirc;m a bola como objeto principal. Apesar disso, o atletismo no Brasil teve diversos atletas conhecidos mundialmente como Adhemar Ferreira da Silva, o primeiro bicampe&atilde;o ol&iacute;mpico do pa&iacute;s na modalidade salto triplo e Jo&atilde;o Carlos de Oliveira, o Jo&atilde;o do Pulo, medalhista ol&iacute;mpico e recordista mundial especializado em salto triplo e salto em dist&acirc;ncia. Na modalidade corrida temos como destaque Joaquim Cruz e Robson Caetano, campe&otilde;es ol&iacute;mpicos em pistas de atletismo e Vanderlei Cordeiro de Lima na maratona.</span></span></p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p></div>',
      titulo: 'Conteudo 1 Corrida Rasa',
    },
    {
      // texto: '<p><span style=\"color:#ffffff\"><span style=\"font-size:36px\">CONTE&Uacute;DO 2</span></span><br />\n<span style=\"color:#000099\"><span style=\"font-size:26px\">Import&acirc;ncia do Atletismo</span></span></p>\n\n<p><br />\n<span style=\"font-size:24px\"><span style=\"color:#ffffff\">&nbsp; &nbsp; &nbsp; &nbsp; Voc&ecirc; sabia que podemos entender melhor sobre o funcionamento do nosso corpo a partir do esporte? E saiba que, ao perceber melhor sobre seu corpo e o funcionamento dele voc&ecirc; tamb&eacute;m compreender&aacute; a atividade de mecanismos importantes que est&atilde;o no seu corpo e assim pode cuidar melhor da sua sa&uacute;de?</span></span></p>\n\n<p><br />\n<span style=\"font-size:24px\"><span style=\"color:#ffffff\">&nbsp; &nbsp; &nbsp; &nbsp; Ent&atilde;o vamos l&aacute;! No atletismo s&atilde;o realizados e estimulados movimentos como correr, saltar e lan&ccedil;ar ou arremessar objetos a dist&acirc;ncia, considerados como modalidades esportivas, assim como no futebol, basquetebol, voleibol, handebol entre outras. &nbsp;</span></span></p>\n\n<p><span style=\"font-size:24px\"><span style=\"color:#ffffff\">&nbsp; &nbsp; &nbsp;<br />\n&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Quando praticamos uma corrida, por exemplo, n&atilde;o estamos apenas realizando uma modalidade esportiva, mas tamb&eacute;m desenvolvendo habilidades para o uso di&aacute;rio em nossa vida como deslocar-se rapidamente para atravessar uma rua ou avenida, vencer obst&aacute;culos ao andar em cal&ccedil;adas etc.</span></span></p>\n\n<p><br />\n<span style=\"font-size:24px\"><span style=\"color:#ffffff\">&nbsp; &nbsp; &nbsp; &nbsp; Assim podemos perceber que &eacute; muito importante entender como funciona nosso organismo, nosso corpo e melhorar nossa sa&uacute;de praticando esportes, especialmente a modalidade da corrida e diferentes formas de correr e saltar que podem estar presentes em nosso cotidiano.</span></span></p>\n\n<p style=\"text-align:center\"><br />\n<span style=\"color:#e74c3c\"><span style=\"font-size:24px\"><p style="text-align:center"><iframe frameborder="0" height="315" src="https://www.youtube.com/embed/yaU8yO968F4" width="560"></iframe></p></span></span></p>\n\n<p><br />\n<span style=\"font-size:24px\"><span style=\"color:#ffffff\">&nbsp; &nbsp; &nbsp; &nbsp;Aprender sobre o funcionamento do seu corpo no momento da pr&aacute;tica esportiva vai possibilitar a voc&ecirc; conhecer cada movimento que seu corpo faz neste momento e desta forma voc&ecirc; poder&aacute; participar melhor de suas aulas e executar melhor os movimentos.</span></span></p>\n\n<p>&nbsp;</p>\n\n<p><span style=\"font-size:24px\"><span style=\"color:#ffffff\">&nbsp; &nbsp; &nbsp; &nbsp;Veja algumas capacidades f&iacute;sicas que voc&ecirc; desenvolve quando pratica atletismo:</span></span></p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p><span style=\"font-size:24px\"><span style=\"color:#ffffff\"><strong>Agilidade&nbsp;</strong>- Capacidade de executar movimentos r&aacute;pidos e ligeiros com mudan&ccedil;as de dire&ccedil;&otilde;es.</span></span></p>\n\n<p>&nbsp;</p>\n\n<p style=\"text-align:center\"><span style=\"color:#e74c3c\"><span style=\"font-size:24px\">(Ilustra&ccedil;&otilde;es de her&oacute;is) Flash</span></span></p>\n\n<p><br />\n<span style=\"font-size:24px\"><span style=\"color:#ffffff\"><strong>Flexibilidade&nbsp;</strong>- Capacidade de realizar movimentos em certas articula&ccedil;&otilde;es com amplitude de movimento apropriada.</span></span></p>\n\n<p>&nbsp;</p>\n\n<p style=\"text-align:center\"><span style=\"color:#e74c3c\"><span style=\"font-size:24px\">Mulher el&aacute;stico</span></span></p>\n\n<p><br />\n<span style=\"font-size:24px\"><span style=\"color:#ffffff\"><strong>For&ccedil;a</strong>&nbsp;- Capacidade de exercer tens&atilde;o contra uma resist&ecirc;ncia que ocorre por meio de a&ccedil;&otilde;es musculares.</span></span></p>\n\n<p>&nbsp;</p>\n\n<p style=\"text-align:center\"><span style=\"color:#e74c3c\"><span style=\"font-size:24px\">Super-homem</span></span></p>\n\n<p><br />\n<span style=\"font-size:24px\"><span style=\"color:#ffffff\"><strong>Resist&ecirc;ncia</strong>&nbsp;- Capacidade de sustentar uma dada carga de atividade o mais longo tempo poss&iacute;vel sem fadiga.</span></span></p>\n\n<p>&nbsp;</p>\n\n<p style=\"text-align:center\"><span style=\"color:#e74c3c\"><span style=\"font-size:24px\">Hulk</span></span></p>\n\n<p><br />\n<span style=\"font-size:24px\"><span style=\"color:#ffffff\"><strong>Velocidade</strong>&nbsp;- Capacidade de executar movimentos c&iacute;clicos na mais alta velocidade individual poss&iacute;vel.</span></span></p>\n\n<p>&nbsp;</p>\n\n<p style=\"text-align:center\"><span style=\"color:#e74c3c\"><span style=\"font-size:24px\">Flash</span></span></p>\n\n<p style=\"text-align:center\"><br />\n<span style=\"font-size:24px\"><span style=\"color:#ffffff\">Observando as modalidades de corridas e saltos no atletismo voc&ecirc; pode identificar quais capacidades f&iacute;sicas est&atilde;o presentes:</span></span></p>\n\n<p style=\"text-align:center\">&nbsp;</p>\n\n<p style=\"text-align:center\"><img alt=\"\" height=\"428\" src=\"https://image.ibb.co/g0xObp/corrida_com_barreiras.jpg\" style=\"float:left\" width=\"300\" /><img alt=\"\" height=\"208\" src=\"https://preview.ibb.co/cutUGp/corrida_de_fundo.jpg\" style=\"float:left\" width=\"300\" /><img alt=\"\" height=\"163\" src=\"https://preview.ibb.co/gxxpGp/corrida_de_revezamento.jpg\" width=\"300\" /><img alt=\"\" height=\"442\" src=\"https://image.ibb.co/d2ZrU9/corrida_de_velocidade.jpg\" width=\"300\" /></p>\n\n<p style=\"text-align:center\"><img alt=\"\" height=\"432\" src=\"https://preview.ibb.co/b5MS2U/meia_maratona.jpg\" width=\"300\" /></p>\n',
      texto: '<p><span style="color:#ffffff"><span style="font-size:36px">CONTE&Uacute;DO 2</span></span><br /><span style="color:#000099"><span style="font-size:26px">Import&acirc;ncia do Atletismo</span></span></p><p><br /><span style="font-size:24px"><span style="color:#ffffff">&nbsp; &nbsp; &nbsp; &nbsp; Voc&ecirc; sabia que podemos entender melhor sobre o funcionamento do nosso corpo a partir do esporte? E saiba que, ao perceber melhor sobre seu corpo e o funcionamento dele voc&ecirc; tamb&eacute;m compreender&aacute; a atividade de mecanismos importantes que est&atilde;o no seu corpo e assim pode cuidar melhor da sua sa&uacute;de?</span></span></p><p><br /><span style="font-size:24px"><span style="color:#ffffff">&nbsp; &nbsp; &nbsp; &nbsp; Ent&atilde;o vamos l&aacute;! No atletismo s&atilde;o realizados e estimulados movimentos como correr, saltar e lan&ccedil;ar ou arremessar objetos a dist&acirc;ncia, considerados como modalidades esportivas, assim como no futebol, basquetebol, voleibol, handebol entre outras. &nbsp;</span></span></p><p><span style="font-size:24px"><span style="color:#ffffff">&nbsp; &nbsp; &nbsp;<br />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Quando praticamos uma corrida, por exemplo, n&atilde;o estamos apenas realizando uma modalidade esportiva, mas tamb&eacute;m desenvolvendo habilidades para o uso di&aacute;rio em nossa vida como deslocar-se rapidamente para atravessar uma rua ou avenida, vencer obst&aacute;culos ao andar em cal&ccedil;adas etc.</span></span></p><p><br /><span style="font-size:24px"><span style="color:#ffffff">&nbsp; &nbsp; &nbsp; &nbsp; Assim podemos perceber que &eacute; muito importante entender como funciona nosso organismo, nosso corpo e melhorar nossa sa&uacute;de praticando esportes, especialmente a modalidade da corrida e diferentes formas de correr e saltar que podem estar presentes em nosso cotidiano.</span></span></p><p><br /><span style="font-size:24px"><span style="color:#ffffff">&nbsp; &nbsp; &nbsp; &nbsp;Aprender sobre o funcionamento do seu corpo no momento da pr&aacute;tica esportiva vai possibilitar a voc&ecirc; conhecer cada movimento que seu corpo faz neste momento e desta forma voc&ecirc; poder&aacute; participar melhor de suas aulas e executar melhor os movimentos.</span></span></p><p>&nbsp;</p><p><span style="font-size:24px"><span style="color:#ffffff">&nbsp; &nbsp; &nbsp; &nbsp;Veja algumas capacidades f&iacute;sicas que voc&ecirc; desenvolve quando pratica atletismo:</span></span></p><p>&nbsp;</p><p>&nbsp;</p><p><span style="font-size:24px"><span style="color:#ffffff"><strong>Agilidade&nbsp;</strong>- Capacidade de executar movimentos r&aacute;pidos e ligeiros com mudan&ccedil;as de dire&ccedil;&otilde;es.</span></span></p><p>&nbsp;</p><p style="text-align:center"><img alt="" height="313" src="http://www.apocalipsters.com.br/wp-content/uploads/2021/01/theflash_marvel_01.jpg" width="500" /></p><p><br /><span style="font-size:24px"><span style="color:#ffffff"><strong>Flexibilidade&nbsp;</strong>- Capacidade de realizar movimentos em certas articula&ccedil;&otilde;es com amplitude de movimento apropriada.</span></span></p><p>&nbsp;</p><p style="text-align:center"><img alt="" height="551" src="https://comicvine1.cbsistatic.com/uploads/original/4/49448/1695377-mrfantastic.jpg" width="450" /></p><p><br /><span style="font-size:24px"><span style="color:#ffffff"><strong>For&ccedil;a</strong>&nbsp;- Capacidade de exercer tens&atilde;o contra uma resist&ecirc;ncia que ocorre por meio de a&ccedil;&otilde;es musculares.</span></span></p><p>&nbsp;</p><p style="text-align:center"><img alt="" height="400" src="https://i.cdn.newsbytesapp.com/images/l162_23491542885335.jpg" width="711" /></p><p><br /><span style="font-size:24px"><span style="color:#ffffff"><strong>Resist&ecirc;ncia</strong>&nbsp;- Capacidade de sustentar uma dada carga de atividade o mais longo tempo poss&iacute;vel sem fadiga.</span></span></p><p>&nbsp;</p><p style="text-align:center"><img alt="" height="400" src="https://img.elo7.com.br/product/original/3089F90/display-hulk-display-vingadores.jpg" width="288" /></p><p><br /><span style="font-size:24px"><span style="color:#ffffff"><strong>Velocidade</strong>&nbsp;- Capacidade de executar movimentos c&iacute;clicos na mais alta velocidade individual poss&iacute;vel.</span></span></p><p>&nbsp;</p><p style="text-align:center"><img alt="" height="400" src="https://img.elo7.com.br/product/original/1BF4461/painel-1x0-70-flash-personalizado.jpg" width="640" /></p><p style="text-align:center">&nbsp;</p><p style="text-align:center">&nbsp;</p><p style="text-align:center">&nbsp;</p>',
      titulo: 'Conteudo 2 Corrida Prolongada',
    },
    // {
    //   texto: '<p><span style="color:#ffffff"><span style="font-size:24px"><em><strong>TEXTO CONTEUDO 3</strong></em></span></span></p>',
    //   titulo: 'Conteudo 3 Corrida Velocidade',
    // },
    // {
    //   texto: '<p><span style="color:#ffffff"><span style="font-size:24px"><em><strong>TEXTO CONTEUDO 4</strong></em></span></span></p>',
    //   titulo: 'Conteudo 4 Corrida Obstaculos',
    // },
    // {
    //   texto: '<p><span style="color:#ffffff"><span style="font-size:24px"><em><strong>TEXTO CONTEUDO 5</strong></em></span></span></p>',
    //   titulo: 'CONTEUDO 5'
    // },
    // {
    //   texto: '<p><span style="color:#ffffff"><span style="font-size:24px"><em><strong>TEXTO CONTEUDO SEM PROVA 1</strong></em></span></span></p>',
    //   titulo: 'CONTEUDO SEM PROVA 2 (TESTE)'
    // },
  ]).fetch();

  const idQuestoes = questoes.map((e) => e.id);

  const quizes = await Quiz.createEach([
    {
      questoes: idQuestoes.slice(0,6),
      ordem: idQuestoes.slice(0,6).reverse(),
      conteudo: conteudos[0].id,
      titulo: 'Quiz Corrida Rasa',
    },
    {
      questoes: idQuestoes.slice(7, 11),
      ordem: idQuestoes.slice(7, 11),
      conteudo: conteudos[1].id,
      titulo: 'Quiz Corrida Prolongada',
    },
    // {
    //   questoes: idQuestoes.slice(11, 15),
    //   ordem: idQuestoes.slice(11, 15),
    //   conteudo: conteudos[2].id,
    //   titulo: 'Quiz Corrida Velocidade',
    // },
    // {
    //   questoes: idQuestoes.slice(15, 19),
    //   ordem: idQuestoes.slice(15, 19),
    //   conteudo: conteudos[3].id,
    //   titulo: 'Quiz Corrida Obstaculos',
    // },
    {
      questoes: idQuestoes.slice(19, 21),
      ordem: idQuestoes.slice(19, 21),
      titulo: 'Quiz Corrida SEM CONTEUDO E ATIVIDADE 1 (TESTE)',
    },
    {
      questoes: idQuestoes.slice(21, 23),
      ordem: idQuestoes.slice(21, 23),
      titulo: 'Quiz Corrida SEM CONTEUDO E ATIVIDADE 2 (TESTE)',
    },
    {
      questoes: idQuestoes.slice(23, 25),
      ordem: idQuestoes.slice(23, 25),
      titulo: 'Quiz Corrida SEM CONTEUDO E ATIVIDADE 3 (TESTE)',
    },
    // {
    //   questoes: idQuestoes.slice(25, 29),
    //   ordem: idQuestoes.slice(25, 29),
    //   conteudo: conteudos[4].id,
    //   titulo: 'Quiz para atividade 5',
    // },
  ]);

  const atividades = await Atividade.createEach([
    {
      titulo: 'Atividade Corrida Rasa',
    },
    {
      titulo: 'Atividade Corrida Rasa Prolongada',
    },
    {
      titulo: 'Atividade 3',
    },
    {
      titulo: 'Atividade 4',
    },
    {
      titulo: 'Atividade 5 - Sem Pontuacoes (TESTE)',
    },
  ]).fetch();


  let p = [];
  for(let i=0; i<usuarios.length; i++){
    let pontosquiz = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
    let totalpontosaluno = pontosquiz;

    p.push({ // Cria uma pontuacao de quiz para cada aluno
      pontuacao: pontosquiz,
      aluno: usuarios[i].id,
      quiz: quizes[0].id,
    });

    for(let j=0; j<atividades.length; j++){ // Cria uma pontuacao de cada atividade para cada aluno
      let pontos = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
      totalpontosaluno += pontos;
      p.push({  
        pontuacao: pontos, // Valor random 
        aluno: usuarios[i].id,
        atividade: atividades[j].id,
      });
    }

    await Usuario.updateOne({ id: usuarios[i].id }).set({ totalpontos: totalpontosaluno });
  }

  await Pontuacao.createEach(p);

  await Usuario.create({
    emailAddress: 'usuario@gmail.com',
    fullName: 'Usuário da Silva',
    password: await sails.helpers.passwords.hashPassword('123321'),
    escola: colegios[0].id,
    ano: '5'
  });

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
