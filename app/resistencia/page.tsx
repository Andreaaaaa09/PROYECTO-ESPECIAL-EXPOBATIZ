"use client"
import { useState } from "react"
import Navbar from "../components/Navbar"
import { Merriweather } from "next/font/google"
import { Montserrat } from "next/font/google"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, RotateCcw, Edit, Save, X } from "lucide-react"

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const initialFlashcards = [
  {
    id: 1,
    front: "Carga Eléctrica",
    back: "Es la propiedad que causa fuerzas eléctricas. Hay cargas positivas (protones) y negativas (electrones). Las cargas iguales se repelen; las opuestas se atraen.",
  },
  {
    id: 2,
    front: "Corriente Eléctrica",
    back: "Es el flujo de carga eléctrica. Se mide en amperios (A).\nFórmula: I = Q / t\nDonde: I = corriente (A), Q = carga (Coulombs), t = tiempo (s)",
  },
  {
    id: 3,
    front: "Voltaje (Diferencia de Potencial)",
    back: "Energía necesaria para mover una carga entre dos puntos.\nFórmula: V = W / Q\nDonde: V = voltaje (V), W = trabajo (Joules), Q = carga (C)",
  },
  {
    id: 4,
    front: "Ley de Ohm",
    back: "Relaciona voltaje, corriente y resistencia: V = I × R\nSi conoces dos valores, puedes calcular el tercero.",
  },
  {
    id: 5,
    front: "Conductores vs Aislantes",
    back: "Conductores (cobre, aluminio) dejan pasar la corriente fácilmente. Aislantes (plástico, vidrio) impiden el paso de corriente.",
  },
  {
    id: 6,
    front: "Resistividad (ρ)",
    back: "Es una propiedad del material. Cuanto menor es ρ, mejor conductor es el material. Se mide en ohm·metro (Ω·m).",
  },
  {
    id: 7,
    front: "Resistencia (R)",
    back: "Depende de resistividad (ρ), longitud (L) y área (A):\nR = ρ × (L / A)\nL = longitud (m), A = área (m²)",
  },
  {
    id: 8,
    front: "Temperatura y Resistencia",
    back: "Al subir la temperatura, la resistencia aumenta en metales.\nFórmula: R = R₀ [1 + α (T - T₀)]\nR₀: resistencia inicial, α: coeficiente de temperatura, T: temperatura actual",
  },
  {
    id: 9,
    front: "Resistencia en Serie",
    back: "Las resistencias se suman:\nR_total = R₁ + R₂ + ...",
  },
  {
    id: 10,
    front: "Resistencia en Paralelo",
    back: "Se calcula:\n1 / R_total = 1 / R₁ + 1 / R₂ + ...\nLa resistencia total es menor que la menor resistencia individual.",
  },
  {
    id: 11,
    front: "Divisor de Voltaje",
    back: "Reparte el voltaje en serie:\nVx = (Rx / R_total) × V_total",
  },
  {
    id: 12,
    front: "Divisor de Corriente",
    back: "Reparte la corriente en paralelo:\nIx = (R_total / Rx) × I_total",
  },
  {
    id: 13,
    front: "Potencia Eléctrica",
    back: "Energía disipada:\nP = V × I, P = I² × R, P = V² / R",
  },
  {
    id: 14,
    front: "Ley de Corrientes (Kirchhoff 1)",
    back: "La suma de las corrientes que entran a un nodo es igual a la suma de las que salen.",
  },
  {
    id: 15,
    front: "Ley de Voltajes (Kirchhoff 2)",
    back: "En un lazo cerrado, la suma de subidas y bajadas de voltaje es igual a cero.",
  },
]

export default function ResistenciaPage() {
  const [flashcards, setFlashcards] = useState(initialFlashcards)
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ front: "", back: "" })

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length)
    setIsFlipped(false)
    setIsEditing(false)
  }

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length)
    setIsFlipped(false)
    setIsEditing(false)
  }

  const flipCard = () => {
    if (!isEditing) {
      setIsFlipped(!isFlipped)
    }
  }

  const resetCard = () => {
    setIsFlipped(false)
  }

  const startEditing = () => {
    setEditForm({
      front: flashcards[currentCard].front,
      back: flashcards[currentCard].back,
    })
    setIsEditing(true)
    setIsFlipped(false)
  }

  const saveEdit = () => {
    const updatedFlashcards = [...flashcards]
    updatedFlashcards[currentCard] = {
      ...updatedFlashcards[currentCard],
      front: editForm.front,
      back: editForm.back,
    }
    setFlashcards(updatedFlashcards)
    setIsEditing(false)
  }

  const cancelEdit = () => {
    setIsEditing(false)
    setEditForm({ front: "", back: "" })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar fijo */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <Navbar />
      </div>

      {/* Flashcard Application */}
      <div className="min-h-screen text-white pt-20" style={{ background: "#07142F" }}>
        {/* Header */}
        <div className={`text-center mb-8 pt-20 ${merriweather.className}`}>
          <h1 className="text-4xl md:text-4xl font-bold mb-2">Explora los Conceptos Fundamentales de Electricidad </h1>
          <p className={`text-white font-semibold text-lg ${montserrat.className}`}>
            Cards Interactivas
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center px-4">
          {/* Card Counter */}
          <div className="mb-6">
            <span className={`text-white font-semibold text-sm ${montserrat.className}`}>
              Carta {currentCard + 1} de {flashcards.length}
            </span>
          </div>

          {/* Flashcard */}
          <div className="relative w-full max-w-md h-80 mb-8">
            {isEditing ? (
              /* Edit Mode */
              <Card
                className={`absolute inset-0 w-full h-full bg-[#2E3856] border-[#2E3856] border-4 ${montserrat.className}`}
              >
                <CardContent className="flex flex-col h-full p-4 gap-4">
                  <div className="flex-1">
                    <label className="block text-white text-sm font-medium mb-2">Título (Frente):</label>
                    <input
                      type="text"
                      value={editForm.front}
                      onChange={(e) => setEditForm({ ...editForm, front: e.target.value })}
                      className="w-full p-2 rounded bg-[#1a2332] text-white border border-[#2E3856] focus:border-blue-400 focus:outline-none"
                      placeholder="Título de la carta"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-white text-sm font-medium mb-2">Descripción (Reverso):</label>
                    <textarea
                      value={editForm.back}
                      onChange={(e) => setEditForm({ ...editForm, back: e.target.value })}
                      className="w-full h-24 p-2 rounded bg-[#1a2332] text-white border border-[#2E3856] focus:border-blue-400 focus:outline-none resize-none"
                      placeholder="Descripción o definición"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveEdit} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                      <Save className="h-4 w-4 mr-2" />
                      Guardar
                    </Button>
                    <Button
                      onClick={cancelEdit}
                      variant="outline"
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white border-red-500"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Normal Mode */
              <div
                className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
                onClick={flipCard}
              >
                {/* Front of card */}
                <Card
                  className={`absolute inset-0 w-full h-full backface-hidden bg-[#2E3856] to-slate-900 border-[#2E3856] border-4 hover:shadow-xl transition-shadow ${montserrat.className}`}
                >
                  <CardContent className="flex items-center justify-center h-full p-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-white mb-4">{flashcards[currentCard].front}</h2>
                      <p className="text-white/90 text-sm">Toca para ver la respuesta</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Back of card */}
                <Card
                  className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#2E3856] to-blue-900 border-[#2E3856] border-4 hover:shadow-xl transition-shadow ${montserrat.className}`}
                >
                  <CardContent className="flex items-center justify-center h-full p-6">
                    <div className="text-center">
                      <p className="text-white text-xl text-sm leading-relaxed whitespace-pre-line">
                        {flashcards[currentCard].back}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className={`flex items-center gap-4 mb-8  ${montserrat.className}`}>
            <Button
              onClick={prevCard}
              variant="outline"
              size="icon"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              disabled={isEditing}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              onClick={resetCard}
              variant="outline"
              size="icon"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              disabled={isEditing}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>

            <Button
              onClick={startEditing}
              variant="outline"
              size="icon"
              className="bg-yellow-600/20 border-yellow-500/30 text-yellow-300 hover:bg-yellow-600/30"
              disabled={isEditing}
            >
              <Edit className="h-4 w-4" />
            </Button>

            <Button
              onClick={flipCard}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-6"
              disabled={isEditing}
            >
              {isFlipped ? "Ver Pregunta" : "Ver Respuesta"}
            </Button>

            <Button
              onClick={nextCard}
              variant="outline"
              size="icon"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              disabled={isEditing}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md">
            <div className="bg-white/20 rounded-full h-2 mb-2">
              <div
                className="bg-[#D9D9D9] h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentCard + 1) / flashcards.length) * 100}%` }}
              />
            </div>
            <p className={`text-center text-white text-lg  ${montserrat.className}`}>
              Progreso: {Math.round(((currentCard + 1) / flashcards.length) * 100)}%
            </p>
          </div>

          {/* Card Grid Preview */}
          <div className={`mt-12 w-full max-w-6xl px-4  ${montserrat.className}`}>
            <h3 className="text-xl font-semibold mb-6 text-center">CONCEPTOS GENERALES</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {flashcards.map((card, index) => (
                <button
                  key={card.id}
                  onClick={() => {
                    if (!isEditing) {
                      setCurrentCard(index)
                      setIsFlipped(false)
                    }
                  }}
                  disabled={isEditing}
                  className={`p-3 rounded-lg text-xs font-semibold transition-all min-h-[60px] flex items-center justify-center text-center leading-tight ${
                    index === currentCard ? "bg-[#D9D9D9] text-black" : "bg-white/10 text-white hover:bg-white/20"
                  } ${isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <span className="break-words">
                    {card.id}. {card.front}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <br></br>
        </div>
      </div>
    </div>
  )
}
