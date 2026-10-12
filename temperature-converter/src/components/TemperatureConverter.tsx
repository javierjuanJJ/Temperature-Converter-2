import { useState } from "react"
import { Thermometer, ThermometerSnowflake, ThermometerSun } from "lucide-react"
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
type TempTone = "cold" | "mild" | "hot"

const unitLabels: Record<Unit, string> = {
  celsius: "Celsius",
  fahrenheit: "Fahrenheit",
  kelvin: "Kelvin",
}

const toneStyles: Record<TempTone, { container: string; Icon: typeof Thermometer }> = {
  cold: {
    container:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300",
    Icon: ThermometerSnowflake,
  },
  mild: {
    container:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300",
    Icon: Thermometer,
  },
  hot: {
    container:
      "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950/60 dark:text-orange-300",
    Icon: ThermometerSun,
  },
}

function toCelsius(value: number, from: Unit): number {
  switch (from) {
    case "celsius":
      return value
    case "fahrenheit":
      return (value - 32) * (5 / 9)
    case "kelvin":
      return value - 273.15
  }
}

function convertTemperature(value: number, from: Unit, to: Unit): number {
  if (from === to) return value

  const celsius = toCelsius(value, from)

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
  const [tone, setTone] = useState<TempTone | null>(null)

  const isConvertEnabled = temperature !== "" && fromUnit !== "" && toUnit !== ""

  const handleConvert = () => {
    if (!isConvertEnabled) return

    const tempValue = parseFloat(temperature)
    if (isNaN(tempValue)) return

    const celsius = toCelsius(tempValue, fromUnit as Unit)
    const converted = convertTemperature(tempValue, fromUnit as Unit, toUnit as Unit)
    const formatted = Number.isInteger(converted) ? converted.toString() : converted.toFixed(1)

    const nextTone: TempTone = celsius < 10 ? "cold" : celsius <= 25 ? "mild" : "hot"

    setTone(nextTone)
    setResult(
      `${temperature} ${unitLabels[fromUnit as Unit]} = ${formatted} ${unitLabels[toUnit as Unit]}`
    )
  }

  const activeTone = result ? tone : null
  const ActiveIcon = activeTone ? toneStyles[activeTone].Icon : null

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle
          role="heading"
          aria-level={1}
          className="text-3xl font-normal text-primary"
        >
          Temperature Converter
        </CardTitle>
        <CardDescription className="text-lg">
          Enter the temperature, select units and submit
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label htmlFor="temperature-value" className="sr-only">
              Temperature value
            </label>
            <Input
              id="temperature-value"
              type="number"
              placeholder="0.00"
              value={temperature}
              onChange={(e) => {
                setTemperature(e.target.value)
                setResult(null)
              }}
              className="w-32 text-center text-lg h-14"
            />
          </div>

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
            className="h-14 px-8 text-lg font-normal shadow-sm transition-colors"
          >
            Convert
          </Button>
        </div>

        <div aria-live="polite" role="status" className="pt-4">
          {result && activeTone && ActiveIcon && (
            <div
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${toneStyles[activeTone].container}`}
            >
              <ActiveIcon className="size-6 shrink-0" aria-hidden="true" />
              <p className="text-lg font-medium">{result}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
