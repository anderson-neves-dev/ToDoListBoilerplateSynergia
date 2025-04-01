import { PaletteOptions } from '@mui/material';

type ColorKey = 10 | 15 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 95 | 97 | 'transparent' | 'transparent2' | 'grey';

//region Common colors
const sysCommonColors: Record<string, string> = {
	black: '#0B2322',
	blackTransparente: '#333f49',
	white: '#ffffff'
} as const;
//endregion

//region Neon colors
const sysNeonColors: Partial<Record<ColorKey, string>> = {
	10: '#112414',
	20: '#224a28',
	30: '#337f3c',
	40: '#55b260',
	50: '#79E184', // Cor base
	60: '#8ee894',
	70: '#a3eea5',
	80: '#b8f4b7',
	90: '#cdfbc8',
	95: '#e1fde0',
	97: '#ecffee',
	grey: '#4d9e5d',
	transparent: '#79E184'
} as const;
//endregion

const sysLightPalette: PaletteOptions = {
	divider: sysNeonColors[80],

	common: sysCommonColors,

	primary: {
		light: sysNeonColors[70],
		main: sysNeonColors[50],
		dark: sysNeonColors[60],
		contrastText: sysCommonColors.white
	},

	secondary: {
		light: sysNeonColors[95],
		main: sysNeonColors[80]!,
		dark: sysNeonColors[60],
		contrastText: sysCommonColors.white
	},

	tertiary: {
		light: sysNeonColors[97],
		main: sysNeonColors[90]!,
		dark: sysNeonColors[60],
		contrastText: sysCommonColors.white
	},

	success: {
		light: sysNeonColors[95],
		main: sysNeonColors[60]!,
		dark: sysNeonColors[40],
		contrastText: sysCommonColors.black
	},

	warning: {
		light: sysNeonColors[90],
		main: sysNeonColors[60]!,
		dark: sysNeonColors[60],
		contrastText: sysCommonColors.black
	},

	info: {
		light: sysNeonColors[95],
		main: sysNeonColors[40]!,
		dark: sysNeonColors[60],
		contrastText: sysCommonColors.black
	},

	error: {
		light: sysNeonColors[95],
		main: sysNeonColors[60]!,
		dark: sysNeonColors[40],
		contrastText: sysCommonColors.black
	},

	text: {
		primary: sysCommonColors.white,
		secondary: sysNeonColors[90],
		disabled: sysNeonColors[70]
	},

	sysText: {
		body: sysNeonColors[90],
		title: sysCommonColors.white,
		auxiliary: sysCommonColors.white,
		disabled: sysNeonColors[70],
		base: sysCommonColors.white,
		baseContrast: sysCommonColors.white,
		primary: sysNeonColors[50],
		secondary: sysNeonColors[80],
		tertiary: sysNeonColors[90]
	},
	background: {
		paper: sysCommonColors.black,
		default: sysCommonColors.black
	},
	sysBackground: {
		paper: sysCommonColors.black,
		default: sysCommonColors.black,
		bg1: sysCommonColors.blackTransparente,
		bg2: sysNeonColors[95],
		bg3: sysNeonColors[90]
	},
	sysAction: {
		primary: sysNeonColors[50],
		primaryHover: sysNeonColors[70],
		primaryBgHover: sysCommonColors.blackTransparente,
		primaryIcon: sysNeonColors.grey,
		primaryContrastText: sysCommonColors.black,
		primaryContrastBg: sysNeonColors[80],
		disabled: sysNeonColors[70],
		bgDisabled: sysNeonColors[95],
		auxiliary: sysNeonColors[60]
	}
} as const;

export default sysLightPalette;
