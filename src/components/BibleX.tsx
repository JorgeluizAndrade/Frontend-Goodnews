import React from "react";
import { CardStack } from "./ui/card-stack";
import { cn } from "@/lib/utils";

type Props = {};

const BibleX = (props: Props) => {
  return (
    <section id="biblex" className="h-44">
      <div>
        <h1 className="text-3xl underline text-center decoration-indigo-500 font-bold">
          Bible X
        </h1>

        <p className="pt-3 text-center text-base text-stone-950">
          Vai lê a Bíblia 🙄
        </p>

        <div className="h-[40rem] flex items-center pr-20 justify-center w-full">
          <CardStack items={CARDS} />
        </div>
      </div>
    </section>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-sky-200 text-sky-700 dark:bg-sky-700/[0.2] dark:text-sky-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Apóstolo João",
    designation: "João 1:1-3",
    content: (
      <p>
        No princípio era o Verbo, e o Verbo estava com Deus,{" "}
        <Highlight> e o Verbo era Deus.</Highlight>
        Ele estava no princípio com Deus.{" "}
        <Highlight>
          Todas as coisas foram feitas por ele, e sem ele nada do que foi feito
          se fez.
        </Highlight>
      </p>
    ),
  },
  {
    id: 1,
    name: "Jesus, The Lord and Savior",
    designation: "João 12: 25-26",
    content: (
      <p>
        Aquele que ama a sua vida, a perderá;{" "}
        <Highlight>
          {" "}
          ao passo que aquele que odeia a sua vida neste mundo, a conservará
          para a vida eterna.{" "}
        </Highlight>
        Quem me serve precisa seguir-me; e, onde estou, o meu servo também
        estará. Aquele que me serve, meu Pai o honrará.
      </p>
    ),
  },
  {
    id: 2,
    name: "Apóstolo Paulo",
    designation: "Romanos 11:33-36",
    content: (
      <p>
        Ó profundidade das riquezas, tanto da sabedoria, como da ciência de
        Deus!
        <Highlight>
          {" "}
          Quão insondáveis são os seus juízos, e quão inescrutáveis os seus
          caminhos!{" "}
        </Highlight>
        Por que quem compreendeu a mente do Senhor? ou quem foi seu conselheiro?
        Ou quem lhe deu primeiro a ele, para que lhe seja recompensado?
        <Highlight>
          {" "}
          Porque dele e por ele, e para ele, são todas as coisas; glória, pois,
          a ele eternamente. Amém.
        </Highlight>
      </p>
    ),
  },
  {
    id: 3,
    name: "Jesus, The Lord and Savior",
    designation: "João 14:6-7",
    content: (
      <p>
        <Highlight>
          {" "}
          Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai, a não ser
          por mim.{" "}
        </Highlight>
        Se vocês realmente me conhecessem, conheceriam também o meu Pai. Já
        agora vocês o conhecem e o têm visto
      </p>
    ),
  },
  {
    id: 4,
    name: "Jesus, The Lord and Savior",
    designation: "Marcos 14:61-62",
    content: (
      <p>
        Mas ele calou-se, e nada respondeu. O sumo sacerdote lhe tornou a
        perguntar, e disse-lhe: És tu o Cristo, Filho do Deus Bendito? E Jesus
        disse-lhe:{" "}
        <Highlight>
          {" "}
          Eu o Sou, e vereis o Filho do homem assentado à direita do poder de
          Deus, e vindo sobre as nuvens do céu.
        </Highlight>
      </p>
    ),
  },
  {
    id: 5,
    name: "Apóstolo Pedro",
    designation: "1 Pedro 5:7",
    content: (
      <p>
        <Highlight>
          Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de
          vós.
        </Highlight>
      </p>
    ),
  },
  {
    id: 6,
    name: "Jesus, The Lord and Savior",
    designation: "Mateus 11:28-29",
    content: (
      <p>
        Venham a mim, todos os que estão cansados e sobrecarregados, e{" "}
        <Highlight> Eu darei descanso a vocês. </Highlight>
        Tomem sobre vocês o meu jugo e aprendam de mim, pois sou manso e humilde
        de coração,{" "}
        <Highlight>
          {" "}
          e vocês encontrarão descanso para as suas almas. Pois o meu jugo é
          suave e o meu fardo é leve.
        </Highlight>
      </p>
    ),
  },
  {
    id: 7,
    name: "Jesus, The Lord and Savior",
    designation: "Apocalipse 22:13-14",
    content: (
      <p>
        <Highlight>
          Eu sou o Alfa e o Ômega, o princípio e o fim, o primeiro e o último.  
           </Highlight>
          <span className="underline decoration-red-500">
          Bem-aventurados aqueles que guardam os seus mandamentos, para que
          tenham direito à árvore da vida, e possam entrar na cidade pelas
          portas.
          </span>

        <Highlight>
        Porém estarão de fora os cães, e 
        os feiticeiros, e os fornicadores, e os homicidas, e os idólatras, e 
        qualquer que ama e comete a mentira.
        </Highlight>

      </p>
    ),
  },
];

export default BibleX;
