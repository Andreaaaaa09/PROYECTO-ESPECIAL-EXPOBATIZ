"use client"
import Navbar from "./components/Navbar"
import { Merriweather } from "next/font/google"
import { Montserrat } from "next/font/google"
import { useState } from "react"

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const topics = [
  {
    id: 1,
    title: "Conceptos Básicos",
    content: {
      title: "Conceptos Básicos de Electricidad",
      details: [
        // Primera sección
        <div key="1-section" className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="flex-1 text-justify">
            <span className={`font-semibold ${merriweather.className} text-xl block mb-4`}>Carga Eléctrica</span>
            <span>
              Es una propiedad física de la materia que causa fuerzas eléctricas. Existen dos tipos:
              <span className="font-semibold"> positiva y negativa</span>. Los{" "}
              <span className="font-semibold">electrones</span> tienen carga{" "}
              <span className="font-semibold">negativa</span> y los{" "}
              <span className="font-semibold">protones positiva</span>.
            </span>
          </div>
          <div className="md:w-1/3 flex-shrink-0">
            <div className="text-center">
              <img
                src="/Imagenes/cargas_e.jpg"
                alt="Representación de cargas eléctrica"
                className="w-full h-50 object-cover rounded-lg border"
              />
            </div>
          </div>
        </div>,

        // Segunda sección
        <div key="2-section" className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="flex-1 text-justify">
            <span className={`font-semibold ${merriweather.className} text-xl block mb-4`}>Corriente Eléctrica</span>
            <span>
              Es el <span className="font-semibold">flujo de carga eléctrica</span> (generalmente electrones) a través
              de un conductor, medido en <span className="font-semibold"> amperios (A)</span>. Se mueve desde el polo{" "}
              <span className="font-semibold"> negativo </span> al <span className="font-semibold"> positivo </span> en
              términos reales, aunque convencionalmente se considera del{" "}
              <span className="font-semibold"> positivo </span> al <span className="font-semibold"> negativo </span>.
            </span>
          </div>
          <div className="md:w-1/3 flex-shrink-0">
            <div className="text-center">
              <img
                src="/Imagenes/corriente_e.png"
                alt="Representación de corriente eléctrica"
                className="w-full h-50 object-cover rounded-lg border"
              />
            </div>
          </div>
        </div>,

        // Tercera sección
        <div key="3-section" className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="flex-1 text-justify">
            <span className={`font-semibold ${merriweather.className} text-xl block mb-4`}>
              Voltaje o diferencia de potencial
            </span>
            <span>
              Es la <span className="font-semibold">energía</span> necesaria para mover una carga eléctrica entre dos
              puntos. Se mide en <span className="font-semibold">voltios (V)</span>. Es la "fuerza" que impulsa la
              corriente eléctrica.
            </span>
          </div>
          <div className="md:w-1/3 flex-shrink-0">
            <div className="text-center">
              <img
                src="/Imagenes/voltaje.jpg"
                alt="Representación de voltaje"
                className="w-full h-50 object-cover rounded-lg border"
              />
            </div>
          </div>
        </div>,

        // Cuarta Sección
        <div key="4-section" className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="flex-1 text-justify">
            <span className={`font-semibold ${merriweather.className} text-xl block mb-4`}>Ley de Ohm</span>
            <span>
              Relaciona el <span className="font-semibold">voltaje (V)</span>, la{" "}
              <span className="font-semibold">corriente (I)</span> y la{" "}
              <span className="font-semibold">resistencia (R)</span> en un circuito. Permite calcular cualquiera de
              estas tres magnitudes si se conocen las otras dos.
              <br></br>
              Fórmula <span className="font-semibold text-center block text-xl"> V = IR </span>
            </span>
          </div>
          <div className="md:w-1/3 flex-shrink-0">
            <div className="text-center">
              <img
                src="/Imagenes/ley_de_ohm.jpg"
                alt="Representación de las distintas formas de la LdO"
                className="w-full h-50 object-cover rounded-lg border "
              />
            </div>
          </div>
        </div>,

        // Quinta Sección
        <div key="5-section" className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="flex-1 text-justify">
            <span className={`font-semibold ${merriweather.className} text-xl block mb-4`}>
              Conductores y aislantes
            </span>
            <span>
              Los <span className="font-semibold">conductores </span>(como el cobre o aluminio) permiten el{" "}
              <span className="font-semibold">paso de la corriente</span> con facilidad, mientras que los{" "}
              <span className="font-semibold">aislantes</span> (como el plástico o vidrio){" "}
              <span className="font-semibold">dificultan</span> su paso.
            </span>
          </div>
          <div className="md:w-1/3 flex-shrink-0">
            <div className="text-center">
              <img
                src="/Imagenes/c_a.jpg"
                alt="Representación de conductores y aislantes"
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
              />
            </div>
          </div>
        </div>,

        // Sexta Sección
        <div key="6-section" className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="flex-1 text-justify">
            <span className={`font-semibold ${merriweather.className} text-xl block mb-4`}>Materiales resistivos</span>
            <span>
              Son materiales que ofrecen <span className="font-semibold">resistencia</span> al paso de la corriente. El{" "}
              <span className="font-semibold">cobre y aluminio </span> son comunes, ya que tienen{" "}
              <span className="font-semibold">baja resistividad</span>, lo que los hace{" "}
              <span className="font-semibold">buenos conductores</span>.
            </span>
          </div>
          <div className="md:w-1/3 flex-shrink-0">
            <div className="text-center">
              <img
                src="/Imagenes/materiales_resistivos.png"
                alt="Representación de la resistividad"
                className="w-full h-50 object-cover rounded-lg border border-gray-200"
              />
            </div>
          </div>
        </div>,
      ],
    },
  },

  {
    id: 2,
    title: "Propiedades de los Materiales",
    content: {
      title: "Características eléctricas de los materiales",
      details: [
        //Primer Seccion
        <div key="7-section" className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="flex-1 text-justify">
            <span className={`font-semibold ${merriweather.className} text-xl block mb-4`}>Resistividad (ρ)</span>
            <span>
              Es una propiedad del material que indica cuánta <span className="font-semibold">resistencia</span> ofrece
              al <span className="font-semibold">paso de la corriente</span>. Se mide en{" "}
              <span className="font-semibold">ohmios·metro (Ω·m)</span>. Cuanto{" "}
              <span className="font-semibold">menor</span> sea la <span className="font-semibold">resistividad</span>,
              mejor conductor es el material.
            </span>
          </div>
          <div className="md:w-1/3 flex-shrink-0">
            <div className="text-center">
              <img
                src="/Imagenes/resistividaddd.png"
                alt="Tabla resistividad"
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
              />
              <p className={`text-sm text-center text-black mt-2 ${montserrat.className}`}>
                Tabla de resistividad
              </p>
            </div>
          </div>
        </div>,

        // Segunda Seccion
        <div key="8-section" className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="flex-1 text-justify">
            <span className={`font-semibold ${merriweather.className} text-xl block mb-4`}>
              Longitud y área de sección transversal
            </span>
            <span>
              A <span className="font-semibold">mayor longitud </span> de un conductor,{" "}
              <span className="font-semibold">mayor</span> será su <span className="font-semibold">resistencia </span>.
              A <span className="font-semibold">mayor área</span>, <span className="font-semibold">menor</span> será la{" "}
              <span className="font-semibold">resistencia</span>.<br></br>Esto se relaciona con la fórmula:
              <br></br> <span className="font-semibold text-center block text-xl"> R = ρ·L/A </span>
            </span>
          </div>
          <div className="md:w-1/3 flex-shrink-0">
            <div className="text-center">
              <img
                src="/Imagenes/resistividad_electrica.png"
                alt="Representación de la longitud y area de sección transversal"
                className="w-full h-50 object-cover rounded-lg border border-gray-200"
              />
              <p className={`text-sm text-center text-black mt-2 ${montserrat.className}`}>
               Ejemplo de área de sección transversal
              </p>
            </div>
          </div>
        </div>,

        // tercera Seccion
        <div key="9-section" className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="flex-1 text-justify">
            <span className={`font-semibold ${merriweather.className} text-xl block mb-4`}>
              Temperatura y resistencia
            </span>
            <span>
              En la mayoría de los materiales conductores, al <span className="font-semibold">aumentar</span> la{" "}
              <span className="font-semibold">temperatura</span>, también <span className="font-semibold">aumenta</span>{" "}
              la <span className="font-semibold">resistencia</span>, ya que los electrones chocan más con los átomos del
              material.
            </span>
          </div>
          <div className="md:w-1/3 flex-shrink-0">
            <div className="text-center">
              <img
                src="/Imagenes/t_r.png"
                alt="Representación de la resistividad electrica"
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
              />
              <p className={`text-sm text-center text-black mt-2 ${montserrat.className}`}>
                Relación entre temperatrua y resistencia
              </p>
            </div>
          </div>
        </div>,

        // Cuarta Seccion
        <div key="10-section" className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="flex-1 text-justify">
            <span className={`font-semibold ${merriweather.className} text-xl block mb-4`}>
              Coeficiente de temperatura de la resistividad
            </span>
            <span>
              Es un valor que indica cuánto <span className="font-semibold">cambia</span> la{" "}
              <span className="font-semibold">resistividad</span> de un material por cada{" "}
              <span className="font-semibold">grado</span> de <span className="font-semibold">temperatura</span>.
              Materiales como el <span className="font-semibold">cobre</span> tienen un coeficiente positivo.
            </span>
          </div>
        </div>,
      ],
    },
  },
  {
    id: 3,
    title: "Circuito Eléctrico",
    content: {
      title: "Análisis de circuitos eléctricos",
      details: [
        //Primer Seccion
        <div key="11-section" className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="flex-1 text-justify">
            <span className={`font-semibold ${merriweather.className} text-xl block mb-4`}>
              ¿Qué es una resistencia?
            </span>
            <p>
              Una resistencia es un componente eléctrico que limita o regula el flujo de corriente en un circuito. Su
              función principal es oponerse al paso de los electrones, transformando parte de la energía eléctrica en
              calor. Se mide en ohmios (Ω) y su valor determina cuánta corriente puede pasar:
              <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                <li className="text-black">
                  <span className="font-semibold">Mayor resistencia → menos corriente.</span>
                </li>
                <li className="text-black">
                  <span className="font-semibold">Menor resistencia → más corriente </span>
                </li>
              </ul>
              <br></br>También se puede referir al efecto físico que tiene un material al dificultar el paso de la
              corriente, dependiendo de su naturaleza, forma y temperatura.
            </p>
          </div>
          <div className="md:w-1/3 flex-shrink-0">
            <div className="text-center">
              <img
                src="/Imagenes/partes-de-una-resistencia-electronica.jpg"
                alt="Partes de una resistencia"
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
              />
              <p className={`text-sm text-center text-black mt-2 ${montserrat.className}`}>
                Partes de una resistencia 
              </p>
            </div>
          </div>
        </div>,

        //Segunda Seccion
        <span key="21" className={`font-semibold ${merriweather.className} text-xl`}>
          Resistencia en serie y paralelo
        </span>,
        <ul key="24" className="list-disc list-inside ml-4 space-y-2 mt-2">
          <li className="text-black">
            <span className="font-semibold">Resistencia en serie:</span> Las resistencias se suman directamente
            <br></br><span className="font-semibold text-center block">Rtotal = R1 + R2 + R3...</span>
          </li>
          <li className="text-black">
            <span className="font-semibold">Resistencia en paralelo:</span> El inverso de la resistencia total es igual a la suma de los inversos 
            <br></br><span className="font-semibold text-center block"> 1/R₍ₜₒₜₐₗ₎ = 1/R₁ + 1/R₂ + 1/R₃...</span> 
          </li>
        </ul>,
        <div key="23-24" className="flex flex-col md:flex-row gap-6 mt-4">

          <div className="flex-1 text-center">
            <img
              src="/Imagenes/circuito-de-resistencias-en-serie.jpg"
              alt="Circuito de resistencias en serie"
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className={`text-sm text-center text-black mt-2 ${montserrat.className}`}>
              Circuito de Resistencias en Serie
            </p>
          </div>
          <div className="flex-1 text-center">
            <img
              src="/Imagenes/circuito-de-resistencias-en-paralelo.jpg"
              alt="Circuito de resistencias en paralelo"
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className={`text-sm text-center text-black mt-2 ${montserrat.className}`}>
              Circuito de Resistencias en Paralelo
            </p>
          </div>
        </div>,


//Tercer Seccion
        <br></br>,
        <span key="21" className={`font-semibold ${merriweather.className} pt-4 text-xl`}>
        Divisores de voltaje y corriente
        </span>,
        
          <ul key="24" className="list-disc list-inside ml-4 space-y-2 mt-2">
            <li className="text-black">
              <span className="font-semibold">Divisor de voltaje</span>: Distribuye el voltaje entre resistencias en serie.
            </li>
            <li className="text-black">
              <span className="font-semibold">Divisor de corriente</span>: Distribuye la corriente entre resistencias en paralelo
            </li>
          </ul>,

     <div key="23-24" className="flex flex-col md:flex-row gap-6 mt-4">

          <div className="flex-1 text-center">
            <img
              src="/Imagenes/divisor_corriente5.png"
              alt="Divisor de corriente"
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className={`text-sm text-center text-black mt-2 ${montserrat.className}`}>
              Divisor de corriente
            </p>
          </div>
          <div className="flex-1 text-center">
            <img
              src="/Imagenes/divisor_voltaje3.png"
              alt="Divisor de  voltaje"
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className={`text-sm text-center text-black mt-2 ${montserrat.className}`}>
              Divisor de voltaje
            </p>
          </div>
        </div>, 
      <br></br>,
        //Cuarta Sección
        <div key="14-section" className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="flex-1 text-justify">
            <span className={`font-semibold ${merriweather.className} text-xl block mb-4`}>
              Potencia eléctrica disipada
            </span>
            <span className="font-semibold block mb-2">Fórmula</span>
            <ul className="list-disc list-inside ml-4 space-y-2 mt-2 mb-4">
              <li className="text-black">
                <span className="font-semibold">P = I²R</span>
                <br></br>Esta fórmula indica que la potencia (P) disipada en una resistencia se calcula multiplicando el
                cuadrado de la corriente (I²) que pasa por la resistencia, por el valor de la resistencia (R).
              </li>
              <li className="text-black">
                <span className="font-semibold">¿Cuándo debo usarla?</span>
                <br></br>Se usa cuando conoces la corriente que circula por la resistencia.
              </li>
            </ul>
            <span className="font-semibold block mb-2">Fórmula</span>
            <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
              <li className="text-black">
                <span className="font-semibold">P = V²/R</span>
                <br></br>Esta fórmula calcula la <span className="font-semibold">potencia (P)</span> usando la{" "}
                <span className="font-semibold">tensión (V)</span> aplicada a la resistencia y el valor de la{" "}
                <span className="font-semibold">resistencia (R)</span>
              </li>
              <li className="text-black">
                <span className="font-semibold">¿Cuándo debo usarla?</span>
                <br></br>Se usa cuando conoces la <span className="font-semibold">tensión</span> aplicada a la{" "}
                <span className="font-semibold">resistencia</span>.
              </li>
            </ul>
            <p className="mt-4">
              Ambas fórmulas son equivalentes y se usan según los datos que tengas ya sea,{" "}
              <span className="font-semibold">corriente</span> o <span className="font-semibold">voltaje</span>. Ambas
              te dicen cuánta <span className="font-semibold">energía</span> está siendo convertida en{" "}
              <span className="font-semibold">calor</span> por la <span className="font-semibold">resistencia</span>.
            </p>
          </div>
        </div>,

        //Quinta Sección
        <div key="15-section" className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="flex-1 text-justify">
            <span className={`font-semibold ${merriweather.className} text-xl block mb-4`}>Leyes de Kirchhoff</span>
            <ul className="list-disc list-inside ml-4 space-y-2 mt-2 mb-4">
              <li className="text-black">
                <span className="font-semibold">Ley de corrientes (1ª ley)</span>: La suma de las corrientes que entran
                a un nodo es igual a la suma de las que salen.
              </li>
              <li className="text-black">
                <span className="font-semibold">Ley de voltajes (2ª ley)</span>: La suma de las diferencias de potencial
                (voltajes) en un lazo cerrado es igual a cero.
              </li>
            </ul>
            <p className="text-justify mt-4">
              <span className={`font-semibold ${montserrat.className} text-xl block mb-2`}>
                ¿Por qué son importantes?
              </span>
              Las leyes de Kirchhoff nos permiten analizar circuitos complejos en los que la Ley de Ohm por sí sola no
              es suficiente. Mientras que la <span className="font-semibold">Ley de Ohm (V = I × R)</span> es útil para{" "}
              <span className="font-semibold">circuitos simples</span>, en los casos donde hay múltiples ramas o lazos,
              las leyes de Kirchhoff nos brindan un marco para resolver cada corriente y voltaje en el circuito.
              <br />
              <br />
              Además, estas leyes son <span className="font-semibold">universales</span>. Funcionan para{" "}
              <span className="font-semibold">circuitos en corriente continua (CC)</span> y{" "}
              <span className="font-semibold">corriente alterna (CA)</span>, lo que las hace indispensables tanto en
              electrónica básica como en telecomunicaciones avanzadas.
            </p>
          </div>
        </div>,
      ],
    },
  },
]

export default function Page() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0])

  return (
    <div className={merriweather.className}>
      <Navbar />

      <div className="pt-32 min-h-screen bg-white">
        <div className="flex max-w-7xl mx-auto">
          {/* Menú lateral izquierdo */}
          <div className="sticky top-32 h-[500px] w-80 bg-[#2E3856] shadow-lg shadow-blue-500/50 rounded-lg border border-transparent overflow-y-auto">
            <div className="p-6 border-b border-transparent">
              <h2 className={`text-xl font-bold text-white text-center ${merriweather.className}`}>
                Fundamentos de Electricidad y Circuitos Eléctricos
              </h2>
              <p className={`text-sm text-gray-300 mt-1 text-center block ${montserrat.className}`}>Selecciona un tema para aprender</p>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                {topics.map((topic) => (
                  <li key={topic.id}>
                    <button
                      onClick={() => setSelectedTopic(topic)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                        selectedTopic.id === topic.id
                          ? "bg-[#c4d3e5] border-l-4 border-[#c4d3e5] text-black"
                          : "hover:bg-[#c4d3e5] text-white"
                      } ${montserrat.className}`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-3 ${
                            selectedTopic.id === topic.id ? "bg-[#2E3856]" : "bg-[#c4d3e5]"
                          }`}
                        />
                        <span className="font-medium">{topic.title}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contenido principal derecho */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl">
              <h1 className={`text-4xl font-bold text-black mb-6 ${merriweather.className}`}>
                {selectedTopic.content.title}
              </h1>

              <div className="bg-white rounded-lg shadow-sm border border-white p-8">
                <ul className="space-y-3">
                  {selectedTopic.content.details.map((detail, index) => (
                    <li key={index} className={`${montserrat.className}`}>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
