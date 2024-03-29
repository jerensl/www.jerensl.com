import { merge } from 'lodash'
import {
    alpha,
    darken,
    emphasize,
    getContrastRatio,
    lighten,
} from './colorManipulator'
import { baseColors, darkColors, lightColors } from '../../constant/palette'

/** @alpha */
export interface ThemeRichColor {
    /** color intent (primary, secondary, info, error, etc) */
    name: string
    /** Main color */
    main: string
    /** Used for hover */
    shade: string
    /** Used for text */
    text: string
    /** Used for borders */
    border: string
    /** Used subtly colored backgrounds */
    transparent: string
    /** Used for weak colored borders like larger alert/banner boxes and smaller badges and tags */
    borderTransparent: string
    /** Text color for text ontop of main */
    contrastText: string
}

/** @internal */
export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
}

/** @internal */
export type ThemeColorsMode = 'light' | 'dark'

/** @internal */
export interface ThemeColorsBase<TColor> {
    mode: ThemeColorsMode

    primary: TColor
    secondary: TColor
    info: TColor
    error: TColor
    success: TColor
    warning: TColor

    text: {
        primary: string
        secondary: string
        disabled: string
        link: string
        /** Used for auto white or dark text on colored backgrounds */
        maxContrast: string
    }

    background: {
        /** Dashboard and body background */
        canvas: string
        /** Primary content pane background (panels etc) */
        primary: string
        /** Cards and elements that need to stand out on the primary background */
        secondary: string
    }

    border: {
        weak: string
        medium: string
        strong: string
    }

    gradients: {
        brandVertical: string
        brandHorizontal: string
    }

    action: {
        /** Used for selected menu item / select option */
        selected: string
        /**
         * @alpha (Do not use from plugins)
         * Used for selected items when background only change is not enough (Currently only used for FilterPill)
         **/
        selectedBorder: string
        /** Used for hovered menu item / select option */
        hover: string
        /** Used for button/colored background hover opacity */
        hoverOpacity: number
        /** Used focused menu item / select option */
        focus: string
        /** Used for disabled buttons and inputs */
        disabledBackground: string
        /** Disabled text */
        disabledText: string
        /** Disablerd opacity */
        disabledOpacity: number
    }

    hoverFactor: number
    contrastThreshold: number
    tonalOffset: number
}

export interface ThemeHoverStrengh {}

/** @beta */
export interface ThemeColors extends ThemeColorsBase<ThemeRichColor> {
    /** Returns a text color for the background */
    getContrastText(background: string, threshold?: number): string
    /* Brighten or darken a color by specified factor (0-1) */
    emphasize(color: string, amount?: number): string
}

/** @internal */
export type ThemeColorsInput = DeepPartial<ThemeColorsBase<ThemeRichColor>>

function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
              result[3],
              16
          )}`
        : null
}

class DarkColors implements ThemeColorsBase<Partial<ThemeRichColor>> {
    mode: ThemeColorsMode = 'dark'

    // Used to get more white opacity colors
    whiteBase = hexToRgb(baseColors.primary98)

    border = {
        weak: `rgba(${this.whiteBase}, 0.12)`,
        medium: `rgba(${this.whiteBase}, 0.20)`,
        strong: `rgba(${this.whiteBase}, 0.30)`,
    }

    text = {
        primary: `rgb(${this.whiteBase})`,
        secondary: `rgba(${this.whiteBase}, 0.65)`,
        disabled: `rgba(${this.whiteBase}, 0.6)`,
        link: darkColors.primary,
        maxContrast: baseColors.white,
    }

    primary = {
        main: darkColors.onPrimary,
        text: darkColors.primary,
        border: darkColors.primaryContainer,
    }

    secondary = {
        main: `rgba(${this.whiteBase}, 0.10)`,
        shade: `rgba(${this.whiteBase}, 0.14)`,
        transparent: `rgba(${this.whiteBase}, 0.08)`,
        text: this.text.primary,
        contrastText: `rgb(${this.whiteBase})`,
        border: `rgba(${this.whiteBase}, 0.08)`,
    }

    info = this.primary

    error = {
        main: darkColors.error,
        text: darkColors.onError,
    }

    success = {
        main: darkColors.success,
        text: darkColors.onSuccess,
    }

    warning = {
        main: darkColors.tertiary,
        text: darkColors.onTertiary,
    }

    background = {
        canvas: darkColors.background,
        primary: darkColors.background,
        secondary: darkColors.background,
    }

    action = {
        hover: `rgba(${this.whiteBase}, 0.16)`,
        selected: `rgba(${this.whiteBase}, 0.12)`,
        selectedBorder: darkColors.error,
        focus: `rgba(${this.whiteBase}, 0.16)`,
        hoverOpacity: 0.08,
        disabledText: this.text.disabled,
        disabledBackground: `rgba(${this.whiteBase}, 0.04)`,
        disabledOpacity: 0.38,
    }

    gradients = {
        brandHorizontal: 'linear-gradient(270deg, #F55F3E 0%, #FF8833 100%)',
        brandVertical:
            'linear-gradient(0.01deg, #F55F3E 0.01%, #FF8833 99.99%)',
    }

    contrastThreshold = 3
    hoverFactor = 0.03
    tonalOffset = 0.15
}

class LightColors implements ThemeColorsBase<Partial<ThemeRichColor>> {
    mode: ThemeColorsMode = 'light'

    blackBase = '36, 41, 46'

    primary = {
        main: lightColors.onPrimary,
        text: lightColors.primary,
        border: lightColors.primaryContainer,
    }

    text = {
        primary: `rgba(${this.blackBase}, 1)`,
        secondary: `rgba(${this.blackBase}, 0.75)`,
        disabled: `rgba(${this.blackBase}, 0.50)`,
        link: this.primary.text,
        maxContrast: baseColors.black,
    }

    border = {
        weak: `rgba(${this.blackBase}, 0.12)`,
        medium: `rgba(${this.blackBase}, 0.30)`,
        strong: `rgba(${this.blackBase}, 0.40)`,
    }

    secondary = {
        main: `rgba(${this.blackBase}, 0.08)`,
        shade: `rgba(${this.blackBase}, 0.15)`,
        transparent: `rgba(${this.blackBase}, 0.08)`,
        contrastText: `rgba(${this.blackBase},  1)`,
        text: this.text.primary,
        border: this.border.weak,
    }

    info = {
        main: lightColors.secondary,
        text: lightColors.onSecondary,
    }

    error = {
        main: lightColors.error,
        text: lightColors.onError,
    }

    success = {
        main: lightColors.success,
        text: lightColors.onSuccess,
    }

    warning = {
        main: lightColors.tertiary,
        text: lightColors.onTertiary,
    }

    background = {
        canvas: lightColors.background,
        primary: lightColors.background,
        secondary: lightColors.onBackground,
    }

    action = {
        hover: `rgba(${this.blackBase}, 0.12)`,
        selected: `rgba(${this.blackBase}, 0.08)`,
        selectedBorder: baseColors.tertiary40,
        hoverOpacity: 0.08,
        focus: `rgba(${this.blackBase}, 0.12)`,
        disabledBackground: `rgba(${this.blackBase}, 0.04)`,
        disabledText: this.text.disabled,
        disabledOpacity: 0.38,
    }

    gradients = {
        brandHorizontal: 'linear-gradient(90deg, #FF8833 0%, #F53E4C 100%)',
        brandVertical:
            'linear-gradient(0.01deg, #F53E4C -31.2%, #FF8833 113.07%)',
    }

    contrastThreshold = 3
    hoverFactor = 0.03
    tonalOffset = 0.2
}

export function createColors(colors: ThemeColorsInput): ThemeColors {
    const dark = new DarkColors()
    const light = new LightColors()
    const base = (colors.mode ?? 'dark') === 'dark' ? dark : light
    const {
        primary = base.primary,
        secondary = base.secondary,
        info = base.info,
        warning = base.warning,
        success = base.success,
        error = base.error,
        tonalOffset = base.tonalOffset,
        hoverFactor = base.hoverFactor,
        contrastThreshold = base.contrastThreshold,
        ...other
    } = colors

    function getContrastText(
        background: string,
        threshold: number = contrastThreshold
    ) {
        const contrastText =
            getContrastRatio(
                dark.text.maxContrast,
                background,
                base.background.primary
            ) >= threshold
                ? dark.text.maxContrast
                : light.text.maxContrast
        // todo, need color framework
        return contrastText
    }

    const getRichColor = ({
        color,
        name,
    }: GetRichColorProps): ThemeRichColor => {
        color = { ...color, name }
        if (!color.main) {
            throw new Error(`Missing main color for ${name}`)
        }
        if (!color.text) {
            color.text = color.main
        }
        if (!color.border) {
            color.border = color.text
        }
        if (!color.shade) {
            color.shade =
                base.mode === 'light'
                    ? darken(color.main, tonalOffset)
                    : lighten(color.main, tonalOffset)
        }
        if (!color.transparent) {
            color.transparent = alpha(color.main, 0.15)
        }
        if (!color.contrastText) {
            color.contrastText = getContrastText(color.main)
        }
        if (!color.borderTransparent) {
            color.borderTransparent = alpha(color.border, 0.25)
        }
        return color as ThemeRichColor
    }

    return merge(
        {
            ...base,
            primary: getRichColor({ color: primary, name: 'primary' }),
            secondary: getRichColor({ color: secondary, name: 'secondary' }),
            info: getRichColor({ color: info, name: 'info' }),
            error: getRichColor({ color: error, name: 'error' }),
            success: getRichColor({ color: success, name: 'success' }),
            warning: getRichColor({ color: warning, name: 'warning' }),
            getContrastText,
            emphasize: (color: string, factor?: number) => {
                return emphasize(color, factor ?? hoverFactor)
            },
        },
        other
    )
}

interface GetRichColorProps {
    color: Partial<ThemeRichColor>
    name: string
}
