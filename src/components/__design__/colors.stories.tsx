import type { StoryObj } from '@storybook/react';

import { tailwindTheme } from '@/lib/utils';

const colors = tailwindTheme.colors;

const ChangedColors = {
  red: [100, 500, 700],
  blue: [100, 300, 500, 900],
  green: [100, 300, 500, 900],
  gray: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
};

export const Colors: StoryObj = {
  name: 'App Colors',
  render: () => (
    <div className="flex flex-row justify-between font-bold ">
      <div className="flex w-full flex-col justify-between gap-2 text-sm">
        <div className="flex flex-row gap-2">
          {Object.entries(colors.red)
            .filter(([key]) => ChangedColors.red.includes(Number(key)))
            .map(([key, value]) => (
              <div
                key={key}
                className={`flex size-20 flex-col items-center justify-center `}
                style={{ backgroundColor: value }}
              >
                <span>red-{key}</span>
                <span>{value}</span>
              </div>
            ))}
        </div>
        <div className="flex flex-row gap-2">
          {Object.entries(colors.blue)
            .filter(([key]) => ChangedColors.blue.includes(Number(key)))
            .map(([key, value]) => (
              <div
                key={key}
                className={`flex size-20 flex-col items-center justify-center `}
                style={{ backgroundColor: value }}
              >
                <span>blue-{key}</span>
                <span>{value}</span>
              </div>
            ))}
        </div>
        <div className="flex flex-row gap-2">
          {Object.entries(colors.green)
            .filter(([key]) => ChangedColors.green.includes(Number(key)))
            .map(([key, value]) => (
              <div
                key={key}
                className={`flex size-20 flex-col items-center justify-center `}
                style={{ backgroundColor: value }}
              >
                <span>green-{key}</span>
                <span>{value}</span>
              </div>
            ))}
        </div>
        <div className="flex flex-row gap-2">
          {Object.entries(colors.gray)
            .filter(([key]) => ChangedColors.gray.includes(Number(key)))
            .map(([key, value]) => (
              <div
                key={key}
                className={`flex size-20 flex-col items-center justify-center `}
                style={{ backgroundColor: value }}
              >
                <span>gray-{key}</span>
                <span>{value}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  ),
};

export default { title: 'Design System' };
