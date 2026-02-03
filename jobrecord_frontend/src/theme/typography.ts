import { fonts } from './fonts';

export const typography = {
    headingLarge: {
        fontFamily: fonts.bold,
        fontSize: 22,
        lineHeight: 30,
        letterSpacing: -0.22,
    },

    headingMedium: {
        fontFamily: fonts.bold,
        fontSize: 14,
        lineHeight: 24,
        letterSpacing: -0.08,
    },

    headingRegular: {
        fontFamily: fonts.medium,
        fontSize: 12,
        lineHeight: 24,
        letterSpacing: -0.08,
    },

    bodyRegular: {
        fontFamily: fonts.regular,
        fontSize: 10,
        lineHeight: 22,
        letterSpacing: 0,
    },

    headingEmphasis: {
        fontFamily: fonts.medium,
        fontSize: 15,
        lineHeight: 22,
        letterSpacing: 0,
    },

    caption: {
        fontFamily: fonts.semibold,
        fontSize: 14,
        lineHeight: 18,
        letterSpacing: 0,
    },

    tag: {
        fontFamily: fonts.medium,
        fontSize: 13,
        lineHeight: 16,
        letterSpacing: 0,
    },

    number: {
        fontFamily: fonts.bold,
        fontSize: 28,
        lineHeight: 34,
        letterSpacing: -0.22,
    },
}