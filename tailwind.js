module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {

    borderColor: theme => ({
          ...theme('colors'),
              default: theme('colors.gray.300', 'currentColor'),
             'prodac': '#EF892E',
            }),
    textColor:{
      'white':'#FFF',
      'prodac':'#EF892E'
    },
    extend: {
      prodac:'#EF892E'
    },
  },
  variants: {},
  plugins: [],
}
