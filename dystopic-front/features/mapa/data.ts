import type { District } from "@/types/mapa";

// Content transcribed from DESIGN "MAPA DESKTOP MOBILE"; keep wording as in the design.
export const DISTRICTS: District[] = [
  {
    slug: "bras",
    name: "Brás",
    lon: -46.616,
    lat: -23.543,
    color: "#c8189f",
    image: { src: "/assets/mapa/bras.webp", width: 755, height: 750 },
    sections: [
      {
        label: "ONDE PEGAR",
        paragraphs: [
          ["Caçamba da ", { text: "Rua Dr. Manuel Vitorino", tone: "orange" }, ", 250 e caçamba da ", { text: "Rua José de Alencar", tone: "green" }, ", 215."],
        ],
      },
      {
        label: "HORÁRIO COMUM",
        paragraphs: [
          ["Os pontos estão vigiados pelos garis das 6h até às 21h45, então esse é o horário em que a coleta é possível."],
          ["Na caçamba da Rua Dr. Manuel Vitorino, é interessante chegar no período da manhã, entre 7h às 8h. As lojas do entorno enchem rapidamente a caçamba com resíduos, o que torna necessário fechar as portas da caçamba cedo."],
          ["Na caçamba da Rua José de Alencar, mesmo chegando no período da tarde, muitas vezes as portas ainda estão abertas, pois o fluxo de descarte é menor."],
        ],
      },
      {
        label: "MATERIAIS ESPECÍFICOS",
        paragraphs: [
          ["Os retalhos geralmente são menores, de 10 a 30 cm, e têm formas irregulares. Retalhos retangulares e maiores são mais raros. Os materiais tem pouca variedade de cores e materiais. Possibilidade maior de encontrar aviamentos e outros materiais além de tecidos. Boa parte dos descartes são entulhos e lixo comum, misturados com os tecidos."],
        ],
      },
      {
        label: "CUIDADOS E SEGURANÇA",
        paragraphs: [
          ["Sempre peça permissão ao gari para pegar os materiais, os garis deixam as pessoas mexerem nas caçambas contanto que não faça bagunça e não atrapalhe o fluxo de descartes."],
          ["Caso você aviste um policial, não mexa nos resíduos. Eles entendem a prática como ilegal e você estará se pondo em risco."],
          ["As ruas ficam vazias mais cedo, à partir das 15h. Procure sair da região antes de escurecer e se possível, vá com alguém."],
        ],
      },
      {
        label: "OBSERVAÇÕES ESPECÍFICAS",
        paragraphs: [
          ["A coleta de materiais não é permitida quando as portas da caçamba são fechadas. A caçamba fica trancada devido ao volume interno que está alto, então abrir já não é mais possível para aquela remessa."],
        ],
      },
    ],
    contacts: {
      intro: "Contatos de vendedores de tecido e aviamentos autônomos:",
      items: ["Guilherme - TEL 11 98804-1501", "Kauan - TEL 11 99680-1556", "MC Donatelo (Alef Luiz) - INSTAGRAM @mc_aledazl"],
    },
  },
  {
    slug: "bom-retiro",
    name: "Bom Retiro",
    lon: -46.638,
    lat: -23.526,
    color: "#4a6fe0",
    image: { src: "/assets/mapa/bom-retiro.webp", width: 720, height: 564 },
    sections: [
      {
        label: "ONDE PEGAR",
        paragraphs: [
          ["A com maior concentração de descartes têxteis se encontra entre a ", { text: "R. José Paulino", tone: "green" }, ", ", { text: "R. dos Italianos", tone: "orange" }, " e ", { text: "R. Aimorés", tone: "red" }, "."],
        ],
      },
      {
        label: "HORÁRIO COMUM",
        paragraphs: [["os sacos são postos diariamente na calçada das ruas à partir das 17h30."]],
      },
      {
        label: "MATERIAIS ESPECÍFICOS",
        paragraphs: [
          ["Os retalhos geralmente são menores, de 10 a 30 cm, e têm formas irregulares. Retalhos retangulares e maiores são mais raros. Os materiais não são constantes: cada época e cada coleção vai ditar quais tipos de retalho serão descartados. Por exemplo: Primavera/verão - mais tecidos leves, finos, com cores vibrantes e quentes."],
          ["Outono/inverno - mais tecidos grossos, pesados, com cores frias e fechadas."],
        ],
      },
      {
        label: "CUIDADOS E SEGURANÇA",
        paragraphs: [
          ["Abra os sacos com cuidado sem espalhar tecidos demais e depois feche novamente. Puxar um tecido que está bem visível através de um buraco do tamanho de um dedo é um jeito prático, mas tome cuidado para não estourar o saco ou puxar coisas demais para fora. Os estabelecimentos podem ser multados se a calçada estiver com muita bagunça, por isso é importante ter cuidado."],
          ["As ruas ficam bastante vazias e escuras quando os estabelecimentos fecham, o que ocorre por volta das 18h00. Cuidado com os seus pertences e os movimentos ao seu redor!"],
        ],
      },
      {
        label: "OBSERVAÇÕES ESPECÍFICAS",
        paragraphs: [
          ["O caminhão de lixo que recolhe os descartes é azul ou verde e passa geralmente às 18h30 recolhendo os sacos de descarte (podendo passar alguns minutos antes ou depois). Ele começa pela Rua José Paulino próximo ao Parque da Luz e passa por todas as ruas."],
        ],
      },
    ],
  },
  {
    slug: "tamanduatei",
    name: "Tamanduateí",
    lon: -46.585,
    lat: -23.583,
    color: "#5b4dff",
    image: { src: "/assets/mapa/tamanduatei.webp", width: 648, height: 793 },
    sections: [
      {
        label: "ONDE PEGAR",
        paragraphs: [
          [
            "TR7 Confecções (uniformes e esportivos) - ", { text: "R. Auriverde", tone: "green" }, ", 933 - Vila Independência; Paradas Confecções (uniformes e esportivos) - ",
            { text: "Rua Brás de Pina", tone: "orange" }, ", 102 - Vila Carioca; WLA Camisetas (esportivos e camisetas padrão) - ", { text: "R. Auriverde", tone: "green" },
            ", 656 - Vila Independencia; e Styllus Confecções (moda infantil) - ", { text: "R. Pedro Fachini", tone: "red" }, ", 289 - Vila Independencia.",
          ],
        ],
      },
      {
        label: "HORÁRIO COMUM",
        paragraphs: [["Segundas, Quartas e Sextas, entre as 16h e 17h30."]],
      },
      {
        label: "MATERIAIS ESPECÍFICOS",
        paragraphs: [
          ["Os descartes variam entre dryfit, poliéster (sempre na cor branca com estampados), moletom, suedini, meia malha, bouclé (pêlo de ovelha), algodão e piquet (diversas cores) a depender da demanda das lojas."],
        ],
      },
      {
        label: "CUIDADOS E SEGURANÇA",
        paragraphs: [
          ["Para retirar os retalhos basta apertar a campainha ou bater no portão e pedir os retalhos têxteis aos responsáveis."],
          ["O bairro é um misto de zona industrial com residencial, é um lugar bem tranquilo de se circular, mesmo de noite. Porém todo cuidado é pouco, fique atento, e se possível, vá com alguém."],
        ],
      },
      {
        label: "OBSERVAÇÕES ESPECÍFICAS",
        paragraphs: [
          ["A região possui a estação Tamanduateí da linha verde do metrô e da linha turquesa da CPTM, estando próximo ao Sacomã (metrô) e ao Ipiranga (CPTM)."],
        ],
      },
    ],
  },
];
