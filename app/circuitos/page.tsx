"use client"
import { useState } from "react"
import Navbar from "../components/Navbar"
import { Merriweather } from "next/font/google"
import { Montserrat } from "next/font/google"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, Zap } from "lucide-react"

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

// Código de colores para resistencias
const colorCodes = {
  negro: { value: 0, multiplier: 1, tolerance: null, color: "#000000" },
  marrón: { value: 1, multiplier: 10, tolerance: 1, color: "#8B4513" },
  rojo: { value: 2, multiplier: 100, tolerance: 2, color: "#FF0000" },
  naranja: { value: 3, multiplier: 1000, tolerance: null, color: "#FFA500" },
  amarillo: { value: 4, multiplier: 10000, tolerance: null, color: "#FFFF00" },
  verde: { value: 5, multiplier: 100000, tolerance: 0.5, color: "#008000" },
  azul: { value: 6, multiplier: 1000000, tolerance: 0.25, color: "#0000FF" },
  violeta: { value: 7, multiplier: 10000000, tolerance: 0.1, color: "#8A2BE2" },
  gris: { value: 8, multiplier: 100000000, tolerance: 0.05, color: "#808080" },
  blanco: { value: 9, multiplier: 1000000000, tolerance: null, color: "#FFFFFF" },
  dorado: { value: null, multiplier: 0.1, tolerance: 5, color: "#FFD700" },
  plateado: { value: null, multiplier: 0.01, tolerance: 10, color: "#C0C0C0" },
}

interface Resistor {
  id: number
  value: number
}

export default function CircuitosPage() {
  // Estados para calculadora de resistencias
  const [resistors, setResistors] = useState<Resistor[]>([{ id: 1, value: 100 }])
  const [connectionType, setConnectionType] = useState<"serie" | "paralelo">("serie")

  // Estados para lector de bandas de colores
  const [band1, setBand1] = useState("marrón")
  const [band2, setBand2] = useState("negro")
  const [band3, setBand3] = useState("rojo")
  const [band4, setBand4] = useState("dorado")

  // Funciones para calculadora
  const addResistor = () => {
    const newId = Math.max(...resistors.map((r) => r.id)) + 1
    setResistors([...resistors, { id: newId, value: 100 }])
  }

  const removeResistor = (id: number) => {
    if (resistors.length > 1) {
      setResistors(resistors.filter((r) => r.id !== id))
    }
  }

  const updateResistor = (id: number, value: number) => {
    setResistors(resistors.map((r) => (r.id === id ? { ...r, value } : r)))
  }

  const calculateTotal = () => {
    if (connectionType === "serie") {
      return resistors.reduce((sum, r) => sum + r.value, 0)
    } else {
      const reciprocalSum = resistors.reduce((sum, r) => sum + 1 / r.value, 0)
      return 1 / reciprocalSum
    }
  }

  // Función para calcular resistencia por bandas de colores
  const calculateResistanceFromBands = () => {
    const firstDigit = colorCodes[band1 as keyof typeof colorCodes]?.value || 0
    const secondDigit = colorCodes[band2 as keyof typeof colorCodes]?.value || 0
    const multiplier = colorCodes[band3 as keyof typeof colorCodes]?.multiplier || 1
    const tolerance = colorCodes[band4 as keyof typeof colorCodes]?.tolerance || 5

    const resistance = (firstDigit * 10 + secondDigit) * multiplier
    return { resistance, tolerance }
  }

  const formatResistance = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)} MΩ`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} kΩ`
    } else {
      return `${value.toFixed(2)} Ω`
    }
  }

  const colorOptions = Object.keys(colorCodes)
  const toleranceColors = Object.keys(colorCodes).filter(
    (color) => colorCodes[color as keyof typeof colorCodes].tolerance !== null,
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#617E9B" }}>
      {/* Navbar con posición fija */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <Navbar />
      </div>

      {/* Contenido principal */}
      <main className="p-6 max-w-6xl mx-auto space-y-8 pt-32">
        <div className="text-center mb-8">
          <h1 className={`text-5xl font-bold text-white Sleading-tight mb-4 ${merriweather.className}`}>
            Resistencias y Códigos de Colores
          </h1>
          <p className={`text-xl text-white max-w-3xl mx-auto leading-relaxed ${montserrat.className}`}>
            Herramientas interactivas para calcular resistencias en serie y paralelo, además de un lector de código de
            colores para resistencias.
          </p>
        </div>


        <Tabs defaultValue="calculadora" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/90 backdrop-blur-sm shadow-lg border border-white/20 h-16 ">
            <TabsTrigger
              value="calculadora"
              className={`text-lg font-semibold py-4 h-full data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-md text-gray-700 hover:text-black transition-all duration-200 ${montserrat.className}`}
            >
              Calculadora de Circuitos
            </TabsTrigger>
            <TabsTrigger
              value="colores"
              className={`text-lg font-semibold py-4 h-full data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-md text-gray-700  hover:text-black transition-all duration-200 ${montserrat.className}`}
            >
              Lector de Bandas de Colores
            </TabsTrigger>
          </TabsList>

          {/* Calculadora de Resistencias */}
          <TabsContent value="calculadora">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${montserrat.className}`}>
              {/* Panel de Control */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className={`text-2xl text-center ${merriweather.className}`}>Configuración del Circuito</CardTitle>
                  <CardDescription className="text-center">Agrega resistencias y selecciona el tipo de conexión</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Tipo de conexión */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Tipo de Conexión</Label>
                    <div className="flex gap-4">
                      <Button
                        variant={connectionType === "serie" ? "default" : "outline"}
                        onClick={() => setConnectionType("serie")}
                        className={`flex-1 ${connectionType === "serie"
                            ? "bg-[#617E9B] hover:bg-[#516B85] text-white "
                            : "text-black hover:bg-[#617E9B] hover:text-white"
                          }`}
                      >
                        Serie
                      </Button>
                      <Button
                        variant={connectionType === "paralelo" ? "default" : "outline"}
                        onClick={() => setConnectionType("paralelo")}
                        className={`flex-1 ${connectionType === "paralelo"
                            ? "bg-[#617E9B] hover:bg-[#516B85] text-white "
                            : "text-black hover:bg-[#617E9B] hover:text-white"
                          }`}
                      >
                        Paralelo
                      </Button>
                    </div>
                  </div>

                  {/* Lista de resistencias */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Resistencias (Ω)</Label>
                    <div className="space-y-3">
                      {resistors.map((resistor, index) => (
                        <div key={resistor.id} className="flex items-center gap-3">
                          <Label className="w-8">R{index + 1}:</Label>
                          <Input
                            type="number"
                            value={resistor.value}
                            onChange={(e) => updateResistor(resistor.id, Number(e.target.value))}
                            className="flex-1"
                            min="0.1"
                            step="0.1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeResistor(resistor.id)}
                            disabled={resistors.length === 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      onClick={addResistor}
                      className="w-full mt-3"
                      disabled={
                        (connectionType === "paralelo" && resistors.length >= 3) ||
                        (connectionType === "serie" && resistors.length >= 6)
                      }
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Resistencia
                      {connectionType === "paralelo" && resistors.length >= 3 && (
                        <span className="ml-2 text-xs text-gray-500">(Máx. 3 en paralelo)</span>
                      )}
                      {connectionType === "serie" && resistors.length >= 6 && (
                        <span className="ml-2 text-xs text-gray-500">(Máx. 6 en serie)</span>
                      )}
                    </Button>
                  </div>

                  {/* Resultado */}
                  <div className="bg-gradient-to-r from-[#617E9B80] to-[#617E9B80] p-4 rounded-lg border">
                    <Label className="text-base font-bold block mb-2"> RESISTENCIA TOTAL </Label>
                    <div className="text-3xl font-bold text-blackx">{formatResistance(calculateTotal())}</div>
                    <div className="text-sm font-semibold text-black mt-2 pt-2">
                      {connectionType === "serie"
                        ? "R_total = R₁ + R₂ + R₃ + ..."
                        : "1/R_total = 1/R₁ + 1/R₂ + 1/R₃ + ..."}
                    </div>
                  </div>
                </CardContent>
              </Card>


              {/* Visualización del Circuito */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className={`text-2xl ${merriweather.className}`}>Visualización del Circuito</CardTitle>
                  <CardDescription>Representación gráfica de tu circuito</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white rounded-lg border-2 border-gray-200 min-h-[300px]">
                    <div className="p-6 overflow-x-auto flex items-center justify-center">
                      <svg
                        width={Math.max(400, 60 + resistors.length * 80 + 60)}
                        height="250"
                        viewBox={`0 0 ${Math.max(400, 60 + resistors.length * 80 + 60)} 250`}
                        className="min-w-full h-auto"
                      >
                        {connectionType === "serie" ? (
                          // Circuito en Serie
                          <g>
                            {/* Líneas de conexión */}
                            <line x1="20" y1="125" x2="60" y2="125" stroke="#333" strokeWidth="2" />
                            {resistors.map((resistor, index) => {
                              const x = 60 + index * 80
                              return (
                                <g key={resistor.id}>
                                  {/* Resistencia */}
                                  <rect
                                    x={x}
                                    y="110"
                                    width="60"
                                    height="30"
                                    fill="none"
                                    stroke="#333"
                                    strokeWidth="2"
                                    rx="5"
                                  />
                                  <text x={x + 30} y="130" textAnchor="middle" fontSize="10" fill="#333">
                                    {formatResistance(resistor.value)}
                                  </text>
                                  <text x={x + 30} y="155" textAnchor="middle" fontSize="8" fill="#666">
                                    R{index + 1}
                                  </text>
                                  {/* Línea de conexión siguiente */}
                                  {index < resistors.length - 1 && (
                                    <line x1={x + 60} y1="125" x2={x + 80} y2="125" stroke="#333" strokeWidth="2" />
                                  )}
                                </g>
                              )
                            })}
                            <line
                              x1={60 + (resistors.length - 1) * 80 + 60}
                              y1="125"
                              x2={Math.max(380, 60 + (resistors.length - 1) * 80 + 60 + 60)}
                              y2="125"
                              stroke="#000"
                              strokeWidth="2"
                            />

                            {/* Batería/FEM con símbolo estándar */}
                            <g>
                              {/* Líneas de conexión */}
                              <line x1="20" y1="125" x2="20" y2="80" stroke="#333" strokeWidth="2" />
                              <line
                                x1="20"
                                y1="80"
                                x2={Math.max(380, 60 + (resistors.length - 1) * 80 + 60 + 60)}
                                y2="80"
                                stroke="#000"
                                strokeWidth="2"
                              />
                              <line
                                x1={Math.max(380, 60 + (resistors.length - 1) * 80 + 60 + 60)}
                                y1="80"
                                x2={Math.max(380, 60 + (resistors.length - 1) * 80 + 60 + 60)}
                                y2="125"
                                stroke="#000"
                                strokeWidth="2"
                              />

                              {/* Símbolo de batería estándar */}
                              <rect
                                x="15"
                                y="70"
                                width="30"
                                height="20"
                                fill="white"
                                stroke="#333"
                                strokeWidth="2"
                                rx="3"
                              />

                              {/* Terminal positivo */}
                              <line x1="12" y1="75" x2="18" y2="75" stroke="#333" strokeWidth="2" />
                              <line x1="15" y1="72" x2="15" y2="78" stroke="#333" strokeWidth="2" />

                              {/* Terminal negativo */}
                              <line x1="42" y1="75" x2="48" y2="75" stroke="#333" strokeWidth="2" />

                              {/* Etiquetas */}
                              <text x="30" y="65" fontSize="10" fill="#333" textAnchor="middle">
                                FEM
                              </text>
                              <text x="30" y="105" fontSize="8" fill="#666" textAnchor="middle">
                                V
                              </text>
                            </g>
                          </g>
                        ) : (
                          // Circuito en Paralelo
                          <g>
                            {/* Línea principal izquierda */}
                            <line x1="20" y1="125" x2="80" y2="125" stroke="#333" strokeWidth="2" />

                            {/* Línea principal derecha */}
                            <line x1="320" y1="125" x2="380" y2="125" stroke="#333" strokeWidth="2" />

                            {/* Nodos de conexión principales */}
                            <circle cx="80" cy="125" r="3" fill="#333" />
                            <circle cx="320" cy="125" r="3" fill="#333" />

                            {/* Líneas verticales de distribución */}
                            <line x1="80" y1="60" x2="80" y2="190" stroke="#333" strokeWidth="2" />
                            <line x1="320" y1="60" x2="320" y2="190" stroke="#333" strokeWidth="2" />

                            {/* Resistencias en paralelo con mejor espaciado */}
                            {resistors.map((resistor, index) => {
                              const y = 80 + index * 50 // Mejor espaciado entre resistencias
                              const isEven = resistors.length % 2 === 0
                              const centerOffset = isEven ? (resistors.length - 1) * 25 : resistors.length * 25
                              const adjustedY = y + (125 - centerOffset) // Centrar verticalmente

                              return (
                                <g key={resistor.id}>
                                  {/* Línea de conexión izquierda */}
                                  <line x1="80" y1={adjustedY} x2="120" y2={adjustedY} stroke="#333" strokeWidth="2" />

                                  {/* Resistencia con mejor diseño */}
                                  <rect
                                    x="120"
                                    y={adjustedY - 15}
                                    width="120"
                                    height="30"
                                    fill="white"
                                    stroke="#333"
                                    strokeWidth="2"
                                    rx="8"
                                  />

                                  {/* Valor de la resistencia */}
                                  <text
                                    x="180"
                                    y={adjustedY + 2}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fill="#333"
                                    fontWeight="bold"
                                  >
                                    {formatResistance(resistor.value)}
                                  </text>

                                  {/* Etiqueta de la resistencia */}
                                  <text x="180" y={adjustedY + 35} textAnchor="middle" fontSize="9" fill="#666">
                                    R{index + 1}
                                  </text>

                                  {/* Línea de conexión derecha */}
                                  <line x1="240" y1={adjustedY} x2="320" y2={adjustedY} stroke="#333" strokeWidth="2" />

                                  {/* Nodos de conexión en las ramas */}
                                  <circle cx="80" cy={adjustedY} r="2" fill="#333" />
                                  <circle cx="320" cy={adjustedY} r="2" fill="#333" />
                                </g>
                              )
                            })}

                            {/* Batería/FEM mejorada */}
                            <g>
                              {/* Líneas de conexión de la batería */}
                              <line x1="20" y1="125" x2="20" y2="40" stroke="#333" strokeWidth="2" />
                              <line x1="20" y1="40" x2="380" y2="40" stroke="#333" strokeWidth="2" />
                              <line x1="380" y1="40" x2="380" y2="125" stroke="#333" strokeWidth="2" />

                              {/* Símbolo de batería mejorado */}
                              <rect
                                x="10"
                                y="30"
                                width="40"
                                height="20"
                                fill="white"
                                stroke="#333"
                                strokeWidth="2"
                                rx="4"
                              />

                              {/* Terminal positivo más visible */}
                              <line x1="6" y1="35" x2="14" y2="35" stroke="#333" strokeWidth="2" />
                              <line x1="10" y1="31" x2="10" y2="39" stroke="#333" strokeWidth="2" />

                              {/* Terminal negativo */}
                              <line x1="46" y1="35" x2="54" y2="35" stroke="#333" strokeWidth="2" />

                              {/* Etiquetas mejoradas */}
                              <text x="30" y="25" fontSize="11" fill="#333" textAnchor="middle" fontWeight="bold">
                                FEM
                              </text>
                              <text x="30" y="65" fontSize="9" fill="#666" textAnchor="middle">
                                Fuente de Voltaje
                              </text>
                            </g>

                            {/* Flechas indicando flujo de corriente */}
                            <g>
                              {/* Flecha en línea principal */}
                              <polygon points="60,120 60,130 70,125" fill="#e74c3c" stroke="#e74c3c" strokeWidth="1" />
                              <text x="65" y="115" fontSize="8" fill="#e74c3c" textAnchor="middle">
                                I
                              </text>

                              {/* Flechas en cada rama */}
                              {resistors.map((resistor, index) => {
                                const y = 80 + index * 50
                                const isEven = resistors.length % 2 === 0
                                const centerOffset = isEven ? (resistors.length - 1) * 25 : resistors.length * 25
                                const adjustedY = y + (125 - centerOffset)

                                return (
                                  <g key={`arrow-${resistor.id}`}>
                                    <polygon
                                      points={`100,${adjustedY - 5} 100,${adjustedY + 5} 110,${adjustedY}`}
                                      fill="#3498db"
                                      stroke="#3498db"
                                      strokeWidth="1"
                                    />
                                    <text x="105" y={adjustedY - 8} fontSize="7" fill="#3498db" textAnchor="middle">
                                      I{index + 1}
                                    </text>
                                  </g>
                                )
                              })}
                            </g>

                            {/* Etiquetas de nodos */}
                            <text x="80" y="55" fontSize="9" fill="#333" textAnchor="middle" fontWeight="bold">
                              A
                            </text>
                            <text x="320" y="55" fontSize="9" fill="#333" textAnchor="middle" fontWeight="bold">
                              B
                            </text>
                          </g>
                        )}
                      </svg>
                    </div>
                  </div>

                  {/* Explicación */}
                  <div className="mt-4 p-4 bg-white rounded-lg">
                    <h4 className="font-semibold mb-2 text-center">
                      {connectionType === "serie" ? "CONEXIÓN EN SERIE" : "CONEXIÓN EN PARALELO"}
                    </h4>
                    <p className="text-sm text-black text-justify">
                      {connectionType === "serie"
                        ? "En serie, las resistencias se conectan una tras otra. La corriente es la misma en todas, pero el voltaje se divide. La resistencia total es la suma de todas las resistencias."
                        : "En paralelo, las resistencias se conectan en ramas separadas. El voltaje es el mismo en todas, pero la corriente se divide. La resistencia total es menor que la resistencia más pequeña."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Lector de Bandas de Colores */}
          <TabsContent value="colores">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${montserrat.className}`}>
              {/* Selector de Colores */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className={`text-2xl text-center ${merriweather.className}`}>Código de Colores</CardTitle>
                  <CardDescription className="text-center">Selecciona los colores de las bandas de la resistencia</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">1ª Banda (1er dígito)</Label>
                      <Select value={band1} onValueChange={setBand1}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className={montserrat.className}>
                          {colorOptions
                            .filter((color) => colorCodes[color as keyof typeof colorCodes].value !== null)
                            .map((color) => (
                              <SelectItem key={color} value={color} className={montserrat.className}>
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-4 h-4 rounded border"
                                    style={{ backgroundColor: colorCodes[color as keyof typeof colorCodes].color }}
                                  />
                                  {color.charAt(0).toUpperCase() + color.slice(1)}
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-2 block">2ª Banda (2do dígito)</Label>
                      <Select value={band2} onValueChange={setBand2}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className={montserrat.className}>
                          {colorOptions
                            .filter((color) => colorCodes[color as keyof typeof colorCodes].value !== null)
                            .map((color) => (
                              <SelectItem key={color} value={color} className={montserrat.className}>
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-4 h-4 rounded border"
                                    style={{ backgroundColor: colorCodes[color as keyof typeof colorCodes].color }}
                                  />
                                  {color.charAt(0).toUpperCase() + color.slice(1)}
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-2 block">3ª Banda (Multiplicador)</Label>
                      <Select value={band3} onValueChange={setBand3}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className={montserrat.className}>
                          {colorOptions.map((color) => (
                            <SelectItem key={color} value={color} className={montserrat.className}>
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-4 h-4 rounded border"
                                  style={{ backgroundColor: colorCodes[color as keyof typeof colorCodes].color }}
                                />
                                {color.charAt(0).toUpperCase() + color.slice(1)}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-2 block">4ª Banda (Tolerancia)</Label>
                      <Select value={band4} onValueChange={setBand4}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className={montserrat.className}>
                          {toleranceColors.map((color) => (
                            <SelectItem key={color} value={color} className={montserrat.className}>
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-4 h-4 rounded border"
                                  style={{ backgroundColor: colorCodes[color as keyof typeof colorCodes].color }}
                                />
                                {color.charAt(0).toUpperCase() + color.slice(1)} (
                                {colorCodes[color as keyof typeof colorCodes].tolerance}%)
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Resultado */}
                  <div className="bg-gradient-to-r from-[#617E9B80] to-[#617E9B80] p-4 rounded-lg border">
                    <Label className="text-base font-bold block mb-2">VALOR DE LA RESISTENCIA</Label>
                    <div className="text-3xl font-bold text-black">
                      {formatResistance(calculateResistanceFromBands().resistance)}
                    </div>
                    <div className="text-sm text-black font-bold mt-1 pt-4">
                      Tolerancia: ±{calculateResistanceFromBands().tolerance}%
                    </div>
                  </div>

                  {/* Tabla de referencia */}
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold mb-3">TABLA DE REFERENCIA</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(colorCodes).map(([color, data]) => (
                        <div key={color} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded border" style={{ backgroundColor: data.color }} />
                          <span className="capitalize">
                            {color}: {data.value !== null ? data.value : "N/A"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visualización de la Resistencia */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className={`text-2xl text-center ${merriweather.className}`}>Resistencia Visual</CardTitle>
                  <CardDescription className="text-center">Representación visual de la resistencia con sus bandas de colores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-8 rounded-lg border-2 border-gray-300 flex items-center justify-center">
                    <svg width="300" height="120" viewBox="0 0 300 120" className="max-w-full h-auto">
                      {/* Cuerpo de la resistencia */}
                      <rect
                        x="50"
                        y="40"
                        width="200"
                        height="40"
                        fill="#D2B48C"
                        stroke="#8B4513"
                        strokeWidth="2"
                        rx="20"
                      />

                      {/* Terminales */}
                      <line x1="10" y1="60" x2="50" y2="60" stroke="#C0C0C0" strokeWidth="4" />
                      <line x1="250" y1="60" x2="290" y2="60" stroke="#C0C0C0" strokeWidth="4" />

                      {/* Bandas de colores */}
                      <rect
                        x="80"
                        y="35"
                        width="8"
                        height="50"
                        fill={colorCodes[band1 as keyof typeof colorCodes].color}
                        stroke="#000"
                        strokeWidth="0.5"
                      />
                      <rect
                        x="110"
                        y="35"
                        width="8"
                        height="50"
                        fill={colorCodes[band2 as keyof typeof colorCodes].color}
                        stroke="#000"
                        strokeWidth="0.5"
                      />
                      <rect
                        x="140"
                        y="35"
                        width="8"
                        height="50"
                        fill={colorCodes[band3 as keyof typeof colorCodes].color}
                        stroke="#000"
                        strokeWidth="0.5"
                      />
                      <rect
                        x="200"
                        y="35"
                        width="8"
                        height="50"
                        fill={colorCodes[band4 as keyof typeof colorCodes].color}
                        stroke="#000"
                        strokeWidth="0.5"
                      />

                      {/* Etiquetas */}
                      <text x="84" y="100" textAnchor="middle" fontSize="10" fill="#333">
                        1ª
                      </text>
                      <text x="114" y="100" textAnchor="middle" fontSize="10" fill="#333">
                        2ª
                      </text>
                      <text x="144" y="100" textAnchor="middle" fontSize="10" fill="#333">
                        3ª
                      </text>
                      <text x="204" y="100" textAnchor="middle" fontSize="10" fill="#333">
                        4ª
                      </text>
                    </svg>
                  </div>

                  {/* Explicación del cálculo */}
                  <div className="mt-6 space-y-4">
                     <div className="bg-white p-4 rounded-lg ">
                      <h4 className="font-bold mb-2">¿Cómo se calcula?</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <Badge variant="outline" className="mr-2">
                            1ª Banda
                          </Badge>
                          Primer dígito: {colorCodes[band1 as keyof typeof colorCodes].value}
                        </div>
                        <div>
                          <Badge variant="outline" className="mr-2">
                            2ª Banda
                          </Badge>
                          Segundo dígito: {colorCodes[band2 as keyof typeof colorCodes].value}
                        </div>
                        <div>
                          <Badge variant="outline" className="mr-2">
                            3ª Banda
                          </Badge>
                          Multiplicador: ×{colorCodes[band3 as keyof typeof colorCodes].multiplier}
                        </div>
                        <div>
                          <Badge variant="outline" className="mr-2">
                            4ª Banda
                          </Badge>
                          Tolerancia: ±{colorCodes[band4 as keyof typeof colorCodes].tolerance}%
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-white rounded  text-center">
                        <strong>Cálculo:</strong> ({colorCodes[band1 as keyof typeof colorCodes].value} × 10 +{" "}
                        {colorCodes[band2 as keyof typeof colorCodes].value}) ×{" "}
                        {colorCodes[band3 as keyof typeof colorCodes].multiplier} ={" "}
                        {formatResistance(calculateResistanceFromBands().resistance)}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-[#617E9B80] to-[#617E9B80] p-4 rounded-lg">
                      <h4 className="font-bold mb-2"> ¿Cómo funciona?</h4>
                      <p className="text-sm text-black text-justify">
                        Las resistencias usan un código de colores estándar para indicar su valor. Las primeras dos
                        bandas representan los dígitos significativos, la tercera es el multiplicador (número de ceros),
                        y la cuarta indica la tolerancia (precisión del valor).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Sección educativa */}
        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className={`text-4xl text-center ${merriweather.className}`}>Conceptos Fundamentales</CardTitle>
          </CardHeader>
          <CardContent className={`space-y-6 ${montserrat.className}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(90, 124, 168, 0.5)' }}>
                <h3 className="font-bold text-lg mb-2 text-center">Resistencias en Serie</h3>
                <p className="text-sm text-black mb-2 text-justify">
                  Cuando las resistencias se conectan en serie, la corriente que fluye a través de cada una es la misma,
                  pero el voltaje se divide entre ellas.
                </p>
                <div className={`bg-white p-2 rounded text-center text-sm font-semibold ${montserrat.className}`}>
                  R<sub>total</sub> = R₁ + R₂ + R₃ + ...
                </div>
              </div>

              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(90, 124, 168, 0.5)' }}>
                <h3 className="font-bold text-center text-lg mb-2">Resistencias en Paralelo</h3>
                <p className="text-sm text-black mb-2 text-justify">
                  En paralelo, el voltaje es el mismo en todas las resistencias, pero la corriente se divide entre las
                  diferentes ramas.
                </p>
                <div className={`bg-white p-2 rounded text-center text-sm font-semibold ${montserrat.className}`}>
                  1/R<sub>total</sub> = 1/R₁ + 1/R₂ + 1/R₃ + ...
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(90, 124, 168, 0.5)' }}>
              <h3 className="font-bold text-lg  text-center mb-2">Código de Colores de Resistencias</h3>
              <p className="text-sm text-black text-justify">
                El código de colores es un sistema estándar internacional para identificar el valor de las resistencias.
                Fue desarrollado en la década de 1920 y sigue siendo el método más común para marcar resistencias de
                orificio pasante. Este sistema permite identificar rápidamente el valor y la tolerancia sin necesidad de
                instrumentos de medición.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

