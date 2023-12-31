import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../App'

export const ThemeProvider = (value) => {
    const { themeColor, darkMode } = useContext(AppContext);
    const [ css, setCss ] = useState('');

    useEffect(() => {
        let cssString = ``;
        const getColorIndex = (i) => {
            return darkMode ? Math.abs( i - 9 )+1 : i;
        }
        const themeConfig = ThemeOptions.find((t) => (t.name === themeColor))
        if (!themeConfig) {
            return;
        }
        for (let i=1; i<10; i++) {
            cssString += `
                .bg-primary-${i}00 {
                    background-color: ${tailwindColorTheme[themeConfig.secondary][`${getColorIndex(i)}00`]};
                }
                .text-primary-${i}00 {
                    color: ${tailwindColorTheme[themeConfig.primary][`${getColorIndex(i)}00`]};
                }
                .hover\\:bg-primary-${i}00:hover {
                    background-color: ${tailwindColorTheme[themeConfig.secondary][`${getColorIndex(i)}00`]};
                }
                .hover\\:text-primary-${i}00:hover {
                    color: ${tailwindColorTheme[themeConfig.primary][`${getColorIndex(i)}00`]};
                }
                input[type="checkbox"]:checked:before{
                    background-color: ${tailwindColorTheme[themeConfig.primary]['100']};
                }
                .bg-stripped {
                    background: repeating-linear-gradient(
                        -45deg,
                        ${tailwindColorTheme[themeConfig.secondary]["900"]},
                        ${tailwindColorTheme[themeConfig.secondary]["900"]} 1px,
                        ${tailwindColorTheme[themeConfig.secondary]["50"]} 1px,
                        ${tailwindColorTheme[themeConfig.secondary]["50"]} 6px
                    );
                }
            `
        }
        if (darkMode) {
            cssString += `
                html {
                    color: ${tailwindColorTheme.Gray[`100`]}
                }
                .text-black { color: #fff !important }
                .text-white { color: #000 !important }
                .bg-stripped {
                    background: repeating-linear-gradient(
                        -45deg,
                        ${tailwindColorTheme[themeConfig.secondary]["100"]},
                        ${tailwindColorTheme[themeConfig.secondary]["100"]} 1px,
                        ${tailwindColorTheme[themeConfig.secondary]["950"]} 1px,
                        ${tailwindColorTheme[themeConfig.secondary]["950"]} 6px
                    );
                }
                .bg-primary-50 {
                    background-color: ${tailwindColorTheme[themeConfig.secondary]["950"]}
                }
                .bg-space { 
                    background-color: #222222 !important;
                }
            `
            for (let i=1; i<10; i++) {
                cssString += `
                    .bg-gray-${i}00 {
                        background-color: ${tailwindColorTheme.Zinc[`${getColorIndex(i)}00`]};
                    }
                    .text-gray-${i}00 {
                        color: ${tailwindColorTheme.Zinc[`${getColorIndex(i)}00`]};
                    }
                `
            }
        } else {
            cssString += `
                .bg-primary-50 {
                    background-color: ${tailwindColorTheme[themeConfig.secondary]["50"]}
                }
            `
        }
        setCss(cssString)
    },[themeColor, darkMode])

    return (
        <div className={"hidden"}>
            <style>{ css }</style>
        </div>
    )
}



const tailwindColorTheme = {
    Slate: {
        '50': '#f8fafc',
        '100': '#f1f5f9',
        '200': '#e2e8f0',
        '300': '#cbd5e1',
        '400': '#94a3b8',
        '500': '#64748b',
        '600': '#475569',
        '700': '#334155',
        '800': '#1e293b',
        '900': '#0f172a',
        '950': '#020617',
    },
    Gray: {
        '50': '#f9fafb',
        '100': '#f3f4f6',
        '200': '#e5e7eb',
        '300': '#d1d5db',
        '400': '#9ca3af',
        '500': '#6b7280',
        '600': '#4b5563',
        '700': '#374151',
        '800': '#1f2937',
        '900': '#111827',
        '950': '#030712',
    },
    Zinc: {
        '50': '#fafafa',
        '100': '#f4f4f5',
        '200': '#e4e4e7',
        '300': '#d4d4d8',
        '400': '#a1a1aa',
        '500': '#71717a',
        '600': '#52525b',
        '700': '#3f3f46',
        '800': '#27272a',
        '900': '#18181b',
        '950': '#09090b',
    },
    Neutral: {
        '50': '#fafafa',
        '100': '#f5f5f5',
        '200': '#e5e5e5',
        '300': '#d4d4d4',
        '400': '#a3a3a3',
        '500': '#737373',
        '600': '#525252',
        '700': '#404040',
        '800': '#262626',
        '900': '#171717',
        '950': '#0a0a0a',
    },
    Stone: {
        '50': '#fafaf9',
        '100': '#f5f5f4',
        '200': '#e7e5e4',
        '300': '#d6d3d1',
        '400': '#a8a29e',
        '500': '#78716c',
        '600': '#57534e',
        '700': '#44403c',
        '800': '#292524',
        '900': '#1c1917',
        '950': '#0c0a09',
    },
    GemStone: {
        '50': '#e7e5e4',
        '100': '#d3d0d5',
        '200': '#a8a29e',
        '300': '#d6d3d1',
        '400': '#a8a29e',
        '500': '#78716c',
        '600': '#57534e',
        '700': '#44403c',
        '800': '#57534e',
        '900': '#44403c',
        '950': '#292524',
    },
    Red: {
        '50': '#fef2f2',
        '100': '#fee2e2',
        '200': '#fecaca',
        '300': '#fca5a5',
        '400': '#f87171',
        '500': '#ef4444',
        '600': '#dc2626',
        '700': '#b91c1c',
        '800': '#991b1b',
        '900': '#7f1d1d',
        '950': '#450a0a',
    },
    Orange: {
        '50': '#fff7ed',
        '100': '#ffedd5',
        '200': '#fed7aa',
        '300': '#fdba74',
        '400': '#fb923c',
        '500': '#f97316',
        '600': '#ea580c',
        '700': '#c2410c',
        '800': '#9a3412',
        '900': '#7c2d12',
        '950': '#431407',
    },
    Amber: {
        '50': '#fffbeb',
        '100': '#fef3c7',
        '200': '#fde68a',
        '300': '#fcd34d',
        '400': '#fbbf24',
        '500': '#f59e0b',
        '600': '#d97706',
        '700': '#b45309',
        '800': '#92400e',
        '900': '#78350f',
        '950': '#451a03',
    },
    Yellow: {
        '50': '#fefce8',
        '100': '#fef9c3',
        '200': '#fef08a',
        '300': '#fde047',
        '400': '#facc15',
        '500': '#eab308',
        '600': '#ca8a04',
        '700': '#a16207',
        '800': '#854d0e',
        '900': '#713f12',
        '950': '#422006',
    },
    Lime: {
        '50': '#f7fee7',
        '100': '#ecfccb',
        '200': '#d9f99d',
        '300': '#bef264',
        '400': '#a3e635',
        '500': '#84cc16',
        '600': '#65a30d',
        '700': '#4d7c0f',
        '800': '#3f6212',
        '900': '#365314',
        '950': '#1a2e05',
    },
    Green: {
        '50': '#f0fdf4',
        '100': '#dcfce7',
        '200': '#bbf7d0',
        '300': '#86efac',
        '400': '#4ade80',
        '500': '#22c55e',
        '600': '#16a34a',
        '700': '#15803d',
        '800': '#166534',
        '900': '#14532d',
        '950': '#052e16',
    },
    Emerald: {
        '50': '#ecfdf5',
        '100': '#d1fae5',
        '200': '#a7f3d0',
        '300': '#6ee7b7',
        '400': '#34d399',
        '500': '#10b981',
        '600': '#059669',
        '700': '#047857',
        '800': '#065f46',
        '900': '#064e3b',
        '950': '#022c22',
    },
    Teal: {
        '50': '#f0fdfa',
        '100': '#ccfbf1',
        '200': '#99f6e4',
        '300': '#5eead4',
        '400': '#2dd4bf',
        '500': '#14b8a6',
        '600': '#0d9488',
        '700': '#0f766e',
        '800': '#115e59',
        '900': '#134e4a',
        '950': '#042f2e',
    },
    Cyan: {
        '50': '#ecfeff',
        '100': '#cffafe',
        '200': '#a5f3fc',
        '300': '#67e8f9',
        '400': '#22d3ee',
        '500': '#06b6d4',
        '600': '#0891b2',
        '700': '#0e7490',
        '800': '#155e75',
        '900': '#164e63',
        '950': '#083344',
    },
    Sky: {
        '50': '#f0f9ff',
        '100': '#e0f2fe',
        '200': '#bae6fd',
        '300': '#7dd3fc',
        '400': '#38bdf8',
        '500': '#0ea5e9',
        '600': '#0284c7',
        '700': '#0369a1',
        '800': '#075985',
        '900': '#0c4a6e',
        '950': '#082f49',
    },
    Blue: {
        '50': '#eff6ff',
        '100': '#dbeafe',
        '200': '#bfdbfe',
        '300': '#93c5fd',
        '400': '#60a5fa',
        '500': '#3b82f6',
        '600': '#2563eb',
        '700': '#1d4ed8',
        '800': '#1e40af',
        '900': '#1e3a8a',
        '950': '#172554',
    },
    Indigo: {
        '50': '#eef2ff',
        '100': '#e0e7ff',
        '200': '#c7d2fe',
        '300': '#a5b4fc',
        '400': '#818cf8',
        '500': '#6366f1',
        '600': '#4f46e5',
        '700': '#4338ca',
        '800': '#3730a3',
        '900': '#312e81',
        '950': '#1e1b4b',
    },
    Violet: {
        '50': '#f5f3ff',
        '100': '#ede9fe',
        '200': '#ddd6fe',
        '300': '#c4b5fd',
        '400': '#a78bfa',
        '500': '#8b5cf6',
        '600': '#7c3aed',
        '700': '#6d28d9',
        '800': '#5b21b6',
        '900': '#4c1d95',
        '950': '#2e1065',
    },
    Purple: {
        '50': '#faf5ff',
        '100': '#f3e8ff',
        '200': '#e9d5ff',
        '300': '#d8b4fe',
        '400': '#c084fc',
        '500': '#a855f7',
        '600': '#9333ea',
        '700': '#7e22ce',
        '800': '#6b21a8',
        '900': '#581c87',
        '950': '#3b0764',
    },
    Fuchsia: {
        '50': '#fdf4ff',
        '100': '#fae8ff',
        '200': '#f5d0fe',
        '300': '#f0abfc',
        '400': '#e879f9',
        '500': '#d946ef',
        '600': '#c026d3',
        '700': '#a21caf',
        '800': '#86198f',
        '900': '#701a75',
        '950': '#4a044e',
    },
    Pink: {
        '50': '#fdf2f8',
        '100': '#fce7f3',
        '200': '#fbcfe8',
        '300': '#f9a8d4',
        '400': '#f472b6',
        '500': '#ec4899',
        '600': '#db2777',
        '700': '#be185d',
        '800': '#9d174d',
        '900': '#831843',
        '950': '#500724',
    },
    Rose: {
        '50': '#fff1f2',
        '100': '#ffe4e6',
        '200': '#fecdd3',
        '300': '#fda4af',
        '400': '#fb7185',
        '500': '#f43f5e',
        '600': '#e11d48',
        '700': '#be123c',
        '800': '#9f1239',
        '900': '#881337',
        '950': '#4c0519',
    }
};

const ThemeColors = Object.keys(tailwindColorTheme);
export const ThemeOptions = [
    { 
        name: 'Slate',
        primary: 'Slate',
        secondary: 'Slate',
        cost: 150
    },{ 
        name: 'Gray',
        primary: 'Gray',
        secondary: 'Gray',
        cost: 0
    },{ 
        name: 'Zinc',
        primary: 'Zinc',
        secondary: 'Zinc',
        cost: 150
    },{ 
        name: 'Neutral',
        primary: 'Neutral',
        secondary: 'Neutral',
        cost: 50
    },{ 
        name: 'Stone',
        primary: 'Stone',
        secondary: 'Stone',
        cost: 150
    },{ 
        name: 'Red',
        primary: 'Red',
        secondary:'Red',
        cost: 250
    },{ 
        name: 'Orange',
        primary: 'Orange',
        secondary: 'Orange',
        cost: 500
    },{ 
        name: 'Amber',
        primary: 'Amber',
        secondary: 'Amber',
        cost: 500
    },{ 
        name: 'Yellow',
        primary: 'Yellow',
        secondary: 'Yellow',
        cost: 250
    },{ 
        name: 'Lime',
        primary: 'Lime',
        secondary: 'Lime',
        cost: 500
    },{ 
        name: 'Green',
        primary: 'Green',
        secondary: 'Green',
        cost: 500
    },{ 
        name: 'Emerald',
        primary: 'Emerald',
        secondary: 'Emerald',
        cost: 500
    },{ 
        name: 'Teal',
        primary: 'Teal',
        secondary: 'Teal',
        cost: 500
    },{ 
        name: 'Cyan',
        primary: 'Cyan',
        secondary: 'Cyan',
        cost: 500
    },{ 
        name: 'Sky',
        primary: 'Sky',
        secondary:'Sky',
        cost: 500
    },{ 
        name: 'Blue',
        primary: 'Blue',
        secondary: 'Blue',
        cost: 250
    },{ 
        name: 'Indigo',
        primary: 'Indigo',
        secondary: 'Indigo',
        cost: 500
    },{ 
        name: 'Violet',
        primary: 'Violet',
        secondary: 'Violet',
        cost: 500
    },{ 
        name: 'Purple',
        primary: 'Purple',
        secondary: 'Purple',
        cost: 500
    },{ 
        name: 'Fuchsia',
        primary: 'Fuchsia',
        secondary: 'Fuchsia',
        cost: 500
    },{ 
        name: 'Pink',
        primary: 'Pink',
        secondary: 'Pink',
        cost: 500
    },{ 
        name: 'Rose',
        primary: 'Rose',
        secondary: 'Rose',
        cost: 500
    },{ 
        name: 'Gemstone Amethyst',
        primary: 'Purple',
        secondary: 'GemStone',
        cost: 1000
    },{ 
        name: 'Gemstone Sapphire',
        primary: 'Blue',
        secondary: 'GemStone',
        cost: 1000
    },{ 
        name: 'Gemstone Diamond',
        primary: 'Sky',
        secondary: 'GemStone',
        cost: 1000
    },{ 
        name: 'Gemstone Emerald',
        primary: 'Emerald',
        secondary: 'GemStone',
        cost: 1000
    },{ 
        name: 'Gemstone Topaz',
        primary: 'Yellow',
        secondary: 'GemStone',
        cost: 1000
    },{ 
        name: 'Gemstone Ruby',
        primary: 'Red',
        secondary: 'GemStone',
        cost: 1000
    },{ 
        name: 'Gemstone Rose Quartz',
        primary: 'Pink',
        secondary: 'GemStone',
        cost: 1000
    },
    // { 
    //     name: 'Rainbow Road',
    //     primary: 'stone',
    //     secondary: null,
    //     disabled: true,
    //     cost: 4000
    // }
].sort((a, b) => (a.cost - b.cost));