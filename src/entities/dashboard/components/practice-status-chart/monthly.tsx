'use client'

import { cn } from '@/lib/utils'

import { Chart, ChartData, ChartOptions, Plugin } from 'chart.js'
import { HTMLAttributes, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'

interface MonthlyChartProps extends HTMLAttributes<HTMLDivElement> {
  options: ChartOptions<'bar'>
  data: ChartData<'bar'>
}
const month = new Date().getMonth()

const monthlyPlugin: Plugin = {
  id: 'customMonthlyTooltip',
  afterTooltipDraw: (chart) => {
    const tooltip = chart.tooltip
    const activeElements = tooltip!.getActiveElements()
    if (!activeElements.length) {
      chart.tooltip!.setActiveElements(
        [
          {
            datasetIndex: 0,
            index: month,
          },
        ],
        chart.tooltip!.options.callbacks!.label as any,
      )
      chart.update()
    }
  },
  afterDraw: (chart) => {
    const tooltip = chart.tooltip
    const activeElements = tooltip!.getActiveElements()
    if (!activeElements.length) {
      chart.tooltip!.setActiveElements(
        [
          {
            datasetIndex: 0,
            index: month,
          },
        ],
        chart.tooltip!.options.callbacks!.label as any,
      )
      chart.update()
    }
  },
}

export const MonthlyChart = ({
  className,
  data,
  options,
  ...props
}: MonthlyChartProps) => {
  data.labels = Array.from({ length: 12 }).map((_, i) => `${i + 1}월`)
  options.plugins!.tooltip!.callbacks = {
    ...options.plugins!.tooltip!.callbacks,
    label: (context) => {
      const currentIndex = context.dataIndex
      const title = currentIndex === month ? '이번달' : `${context.label}`
      return `${title}: ${context.raw}`
    },
  }

  useEffect(() => {
    Chart.register(monthlyPlugin)
    return () => {
      Chart.unregister(monthlyPlugin)
    }
  }, [])

  return (
    <div
      className={cn(
        'relative p-5 h-full w-full flex items-center justify-center overflow-scroll',
        className,
      )}
      {...props}
    >
      <Bar options={options} data={data} />
    </div>
  )
}
