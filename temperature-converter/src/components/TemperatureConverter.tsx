import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Unit = "celsius" | "fahrenheit" | "kelvin"

const unitLabels: Record<Unit, string> = {
  celsius: "Celsius",
  fahrenheit: "Fahrenheit",
  kelvin: "Kelvin",
}

function convertTemperature(value: number, from: Unit, to: Unit): number {
  if (from === to) return value

  // Convert to Celsius first
  let celsius: number
  switch (from) {
    case "celsius":
      celsius = value
      break
    case "fahrenheit":
      celsius = (value - 32) * (5 / 9)
      break
    case "kelvin":
      celsius = value - 273.15
      break
  }

  // Convert from Celsius to target
  switch (to) {
    case "celsius":
      return celsius
    case "fahrenheit":
      return celsius * (9 / 5) + 32
    case "kelvin":
      return celsius + 273.15
  }
}

export function TemperatureConverter() {
  const [temperature, setTemperature] = useState("")
  const [fromUnit, setFromUnit] = useState<Unit | "">("")
  const [toUnit, setToUnit] = useState<Unit | "">("")
  const [result, setResult] = useState<string | null>(null)

  const isConvertEnabled = temperature !== "" && fromUnit !== "" && toUnit !== ""

  const handleConvert = () => {
    if (!isConvertEnabled) return

    const tempValue = parseFloat(temperature)
    if (isNaN(tempValue)) return

    const converted = convertTemperature(tempValue, fromUnit as Unit, toUnit as Unit)
    const formatted = Number.isInteger(converted) ? converted.toString() : converted.toFixed(1)

    setResult(`${temperature} ${unitLabels[fromUnit as Unit]} is ${formatted} ${unitLabels[toUnit as Unit]}`)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-normal">Temperature Converter</CardTitle>
        <CardDescription className="text-lg">
          Enter the temperature, select units and submit
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <Input
            type="number"
            placeholder="0.00"
            value={temperature}
            onChange={(e) => {
              setTemperature(e.target.value)
              setResult(null)
            }}
            className="w-32 text-center text-lg h-14"
          />

          <Select
            value={fromUnit}
            onValueChange={(value) => {
              setFromUnit(value as Unit)
              setResult(null)
            }}
          >
            <SelectTrigger className="w-48 h-14 text-lg">
              <SelectValue placeholder="From Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fahrenheit">Fahrenheit</SelectItem>
              <SelectItem value="celsius">Celsius</SelectItem>
              <SelectItem value="kelvin">Kelvin</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={toUnit}
            onValueChange={(value) => {
              setToUnit(value as Unit)
              setResult(null)
            }}
          >
            <SelectTrigger className="w-48 h-14 text-lg">
              <SelectValue placeholder="To Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fahrenheit">Fahrenheit</SelectItem>
              <SelectItem value="celsius">Celsius</SelectItem>
              <SelectItem value="kelvin">Kelvin</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleConvert}
            disabled={!isConvertEnabled}
            className="h-14 px-8 text-lg font-normal"
          >
            Convert
          </Button>
        </div>

        {result && (
          <p className="text-green-600 text-xl font-medium pt-4">
            {result}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
