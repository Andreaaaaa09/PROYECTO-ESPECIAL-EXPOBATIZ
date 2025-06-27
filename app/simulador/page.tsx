"use client"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Merriweather } from "next/font/google"
import { Montserrat } from "next/font/google"

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

// Materiales y sus resistividades en Ω⋅m a 20°C
const MATERIALS = {
  Plata: 1.59e-8,
  Cobre: 1.68e-8,
  Oro: 2.44e-8,
  Aluminio: 2.82e-8,
  Hierro: 9.71e-8,
  Plomo: 2.2e-7,
  Grafito: 3.5e-5,
}

const getMaterialColor = (material: string) => {
  const colors: { [key: string]: string } = {
    Plata: "#C0C0C0",
    Cobre: "#B87333",
    Oro: "#FFD700",
    Aluminio: "#A9A9A9",
    Hierro: "#696969",
    Plomo: "#808080",
    Grafito: "#404040",
  }
  return colors[material] || "#808080"
}

const formatNumber = (num: number, decimals = 3) => {
  return Number(num.toFixed(decimals))
}

const formatScientific = (num: number) => {
  return num.toExponential(2)
}

const formatResistance = (resistance: number) => {
  if (resistance < 1e-3) {
    return `${formatScientific(resistance)} Ω`
  } else if (resistance < 1) {
    return `${formatNumber(resistance * 1000)} mΩ`
  } else if (resistance < 1000) {
    return `${formatNumber(resistance)} Ω`
  } else {
    return `${formatNumber(resistance / 1000)} kΩ`
  }
}

export default function ResistanceSimulator() {
  const [length, setLength] = useState(1.0) // metros
  const [area, setArea] = useState(1.0) // mm²
  const [selectedMaterial, setSelectedMaterial] = useState("Cobre")
  const [resistance, setResistance] = useState(0)

  useEffect(() => {
    const resistivity = MATERIALS[selectedMaterial as keyof typeof MATERIALS]
    const areaInM2 = area * 1e-6 // Convertir mm² a m²
    const calculatedResistance = (resistivity * length) / areaInM2
    setResistance(calculatedResistance)
  }, [length, area, selectedMaterial])

  const ConductorVisualization = () => {
    const maxWidth = 300
    const maxHeight = 80
    const conductorLength = Math.min(length * 30 + 50, maxWidth)
    const conductorHeight = Math.min(area * 8 + 15, maxHeight)
    const materialColor = getMaterialColor(selectedMaterial)

    return (
      <div className="flex justify-center items-center h-40 bg-gray-50 rounded-lg border-2 border-dashed border-[#2E3856]">
        <div className="relative">
          {/* Conductor */}
          <div
            className="border-2 border-black flex items-center justify-center text-xs font-bold text-white shadow-lg"
            style={{
              width: `${conductorLength}px`,
              height: `${conductorHeight}px`,
              backgroundColor: materialColor,
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
            }}
          >
            {selectedMaterial}
          </div>

          {/* Etiquetas de dimensiones */}
          <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-black font-semibold text-sm whitespace-nowrap ${montserrat.className}`}>
            L = {formatNumber(length)} m
          </div>
          <div className={`absolute -left-16 top-1/2 transform -translate-y-1/2 rotate-90 text-black font-semibold text-sm ${montserrat.className}`}>
            A = {formatNumber(area)} mm²
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Navbar fijo */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <Navbar />
      </div>

      {/* Contenido principal con padding-top ajustado para el navbar fijo */}
      <div className="pt-24 p-4" style={{ backgroundColor: "#617E9B" }}>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Título */}
          
            <CardHeader className="text-center">
              <h1 className={`text-5xl font-bold text-white ${merriweather.className}`}>Simulador de Resistencia Eléctrica</h1>
              <p className="text-2xl text-gray-600 mt-2">
              </p>
            </CardHeader>
          

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Panel de controles */}
            <Card className={`${montserrat.className}`}>
              <CardHeader>
                <CardTitle className={`text-2xl text-center font-bold ${merriweather.className}`}>Parámetros del conductor </CardTitle>
                <CardDescription className="text-center">Selecciona el tipo de material, longitud y área y descubre su resistencia</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">

                {/* Selector de material */}
                <div>
                  <label className="block text-sm font-medium mb-2">Material</label>
                  
                  <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                    <SelectTrigger className={`${montserrat.className}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={`${montserrat.className}`}>
                      {Object.keys(MATERIALS).map((material) => (
                        <SelectItem key={material} value={material}>
                          {material}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <h3 className="mt-1 pt-2"> Fórmula </h3>
                  <p className="mt-1 pt-2 font-bold">R = ρ × L / A </p>
                  <p className="text-sm text-black mt-1 pt-4">
                    ρ = {formatScientific(MATERIALS[selectedMaterial as keyof typeof MATERIALS])} mΩ
                  </p>
                </div>

                {/* Slider de longitud */}
                <div>
                  <label className="block text-sm mb-2 font-bold">Longitud: {formatNumber(length)} m</label>
                  <Slider
                    value={[length * 10]}
                    onValueChange={(value) => setLength(value[0] / 10)}
                    min={1}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0.1 m</span>
                    <span>10 m</span>
                  </div>
                </div>

                {/* Slider de área */}
                <div>
                  <label className="block text-sm font-bold mb-2">Área: {formatNumber(area)} mm²</label>
                  <Slider
                    value={[area * 10]}
                    onValueChange={(value) => setArea(value[0] / 10)}
                    min={1}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0.1 mm²</span>
                    <span>10 mm²</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Panel de resultados */}
            <Card className={`${montserrat.className}`}>
              <CardHeader>
                <CardTitle className={`text-2xl text-center font-bold ${merriweather.className}`}>Resultado </CardTitle>
                <CardDescription className="text-center">Visualiza el resultado de tu cálculo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-4 pt-20" style={{ color: '#2E3856' }}>{formatResistance(resistance)}</div>
                  <p className="text-gray-600">Resistencia del conductor</p>
                  
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Visualización */}
          <Card className={`${montserrat.className}`}>
            <CardHeader>
              <CardTitle className={`text-2xl  font-bold ${merriweather.className}`}>Parámetros del conductor </CardTitle>
                <CardDescription>Representación gráfica del conductor</CardDescription>
            </CardHeader>
            <CardContent>
              <ConductorVisualization />
            </CardContent>
          </Card>

          {/* Información educativa */}
         <Card className={`${montserrat.className}`}>
            <CardHeader>
              <CardTitle className={`text-2xl text-center ${merriweather.className}`}>Información</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(90, 124, 168, 0.5)' }}>
                  <h4 className="font-semibold mb-2 text-center text-xl">Parámetros</h4>
                  <ul className="space-y-1 text-black">
                    <li>
                      <strong>ρ (Resistividad)</strong> 
                      <br></br>Propiedad intrínseca del material
                    </li>
                    <li>
                      <strong>L (Longitud)</strong>
                      <br></br> Longitud del conductor en metros
                    </li>
                    <li>
                      <strong>A (Área)</strong> 
                      <br></br>Área de la sección transversal
                    </li>
                    <li>
                      <strong>R (Resistencia)</strong> 
                      <br></br>Oposición al flujo de corriente
                    </li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(90, 124, 168, 0.5)' }}>
                  <h4 className="font-semibold mb-2 text-xl text-center">Relaciones</h4>
                  <ul className="space-y-1 text-black text-center">
                    <li> <strong>Mayor</strong> longitud → <strong>Mayor</strong> resistencia</li>
                    <br></br>
                    <li><strong>Mayor</strong> área → <strong>Menor</strong> resistencia</li>
                    <br></br>
                    <li> Materiales con <strong>menor ρ </strong> → Mejor conductores</li>
                    <br></br>
                    <li className="text-center font-bold">¡La plata es el mejor conductor!</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
