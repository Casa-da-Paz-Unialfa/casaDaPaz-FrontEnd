"use client";

import React from 'react';
import { Link } from 'react-scroll';
import bgImg from '../../assets/vacina.png';

const Hero: React.FC = () => {
  return (
    <div
      id="home"
      className="w-full h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${bgImg.src})` }}
    >
      {/* Overlay escuro */}
      <div className="w-full h-full bg-black/40 flex items-center justify-center">
        <div
          className="text-center text-white px-6 sm:px-8 md:px-12 max-w-3xl"
          style={{ fontFamily: "'Comic Neue', cursive" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Secretária de Saúde Umuarama
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed">
            <span className="italic"> Vacinar é um ato de amor</span>.
            <br />
            Amor por você, pela sua família e por toda a comunidade.
            Proteja quem você ama. Vacine-se!
          </p>

          {/* Botões responsivos */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="sobre"
              smooth={true}
              offset={-50}
              duration={500}
              className="py-3 px-6 text-lg rounded-lg bg-[#89b72d] text-white hover:bg-[#6f9e24] transition-colors duration-300 text-center"
            >
              Agende sua vacina!
            </Link>

            <Link
              to="support"
              smooth={true}
              offset={-50}
              duration={500}
              className="py-3 px-6 text-lg border border-white text-white bg-transparent hover:bg-white hover:text-black transition-colors rounded-lg font-bold text-center"
              aria-label="Saiba como doar"
            >
              Minhas vacinas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
