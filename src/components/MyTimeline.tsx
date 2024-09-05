import React from "react";
import { Timeline } from "./ui/timeline";
import Image from "next/image";
import berserk from "../../public/images/berserk.jpg";
import kaisen from "../../public/images/kaisen.jpg";
import musashi from "../../public/images/musashi.jpg";
import thorfinn from "../../public/images/thorfinn.jpg";

import jywords from "../../public/images/jywords1.png";
import jywords2 from "../../public/images/jywords2.png";
import jywords3 from "../../public/images/jywords3.png";
import code from "../../public/images/codejywords.png";

import corazon from "../../public/images/corazon.jpg";
import jesussalves from "../../public/images/jesussalves.jpg";

type Props = {};

const MyTimeline = (props: Props) => {
  const data = [
    {
      title: "Início",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-sm font-normal mb-8">
            No começo eu fiquei um pouco apreensivo, mas tudo mudou quando eu
            entendi Mateus 25:14-30. Então eu comecei a por a mão na massa,{" "}
            <span className="text-blue-700">
              para glória e louvor de Deus Pai{" "}
            </span>
            .
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-sm font-normal mb-8">
            Ensinamento muito importante: Tenha paciência. Sabe por quê? Em
            Tiago 1:4-8 diz:{" "}
            {
              "Tenha, porém, a paciência a sua obra perfeita, para que sejais perfeitos e completos, sem faltar em coisa alguma."
            }{" "}
            Logo, com{" "}
            <span className="text-red-700"> paciência em Cristo Jesus</span>{" "}
            nossas obras serão perfeitas e completas, assim, agradando o coração
            do Pai. E outra coisa, alegre-se nas tentação, pois produz a
            paciência, E a paciência a experiência, e a experiência a esperança
            - Romanos 5:3-4.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src={kaisen}
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src={berserk}
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src={musashi}
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src={thorfinn}
              alt="startup template"
              width={800}
              height={900}
              className="rounded-lg object-cover h-30 md:h-56  lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Jwords",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-sm font-normal mb-8">
            <a
              className="underline text-cyan-800"
              href="http://jywords.vercel.app/"
              target="_blank"
            >
              Jwords
            </a>
            , um site para espalhar a palavra de Deus. Site inspirado em Marcos
            15:16 que diz: Vão pelo mundo todo e preguem o evangelho a todas as
            pessoas. Neste projeto sua função de destaque pega um versiculo
            aléatorio da biblia na versão NVI ou ARC. Isso, para incentivar as
            pessoas a verem a bíblia.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-sm font-normal mb-8">
            Com um design moderno, Jwords foi feito com o{" "}
            <span className="text-red-700"> amor perfeito de Jesus</span>.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src={jywords}
              alt="jywords site"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-64 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src={jywords2}
              alt="jywords"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src={jywords3}
              alt="jywords"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src={code}
              alt="jywords"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Se Deus quiser",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-sm font-normal mb-4">
            Se Deus quiser eu vou sempre avançando no meu conheciemento para os
            apps e sites que irei fazer para espalhar o amor puro de Jesus
            Cristo.
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-base md:text-sm">
              ✅ Sites e apps feitos com amor de Jesus
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-base md:text-sm">
              ✅ Com paciência
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-base md:text-sm">
              ✅ Para a glória e louvor de Deus
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-base md:text-sm">
              ✅ Para alcançar almas perdidas e necessitadas
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-base md:text-sm">
              ✅ Jesus ama vocês
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src={kaisen}
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src={thorfinn}
              alt="feature template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src={corazon}
              alt="bento template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src={jesussalves}
              alt="cards template"
              width={800}
              height={800}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
};

export default MyTimeline;
