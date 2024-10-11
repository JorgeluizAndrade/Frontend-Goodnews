"use client";

import Image from "next/image";
import gif from "../../public/images/News (1).gif";

import { motion } from "framer-motion";

import React from "react";
import Link from "next/link";

export const Hero = () => {
  return (
    <div>
      <section id="hero" className="text-gray-800 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 "
            >
              <span className="underline decoration-4 decoration-indigo-500">
              Bem-vindos
              <br className="hidden lg:inline-block" /> à Goodnews! </span>
              <br className="hidden lg:inline-block" />{" "}
              <span className="text-black/90">
                A bíblia é mais atualizada que o jornal do amanhão 📖.{" "}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 leading-relaxed"
            >
              Blog meu feito para espalhar o evangelho, o puro amor de Jesus.
              Que hoje temos o privilégio de conhecer e ouvir aquilo que os reis
              e profetas desejaram. Pois está escrito em Lucas 10:23-24
              <br className="hidden lg:inline-block" />
              E, voltando-se para os discípulos, disse-lhes em particular:
              Bem-aventurados os olhos que vêem o que vós vedes. Pois vos digo
              que muitos profetas e reis desejaram ver o que vós vedes, e não o
              viram; e ouvir o que ouvis, e não o ouviram.
              <br className="hidden lg:inline-block" />
              <span className="text-blue-800">
                {" "}
                Bendito seja o nome do Senhor! Amém.
              </span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-center"
            >
              <Link
                href="#posts"
                className="group bg-black px-7 py-3 flex items-center text-white gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
              >
                Ver postagens
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              duration: 0.9,
            }}
            className="lg:max-w-lg 
          shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]
          lg:w-full md:w-1/2 w-5/6"
          >
            <Image
              className="object-cover object-center rounded-xl"
              alt="hero"
              src={gif}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};
