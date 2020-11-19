// Exported as a JS file instead of a JSON file so comments do not show up as format errors on GitHub.
module.exports = {
  rules: {
    'ordered-imports': [
      true,
      {
        'grouped-imports': true,
        groups: [
          // Dependencies.
          {
            name: 'react',
            match: /^(react$)|(react-dom$)|(react-router-dom$)/,
            order: 0,
          },
          {
            name: 'firebase',
            match: /^firebase(\/\w+)?$/,
            order: 1,
          },
          {
            name: '@material-ui',
            match: /^@material-ui(\/)?/,
            order: 2,
          },
          { name: '<external>', match: '^[^.].+$', order: 10 },

          // Static resources.
          { name: 'svg', match: '.svg$', order: 7777777 },

          // Static styles.
          { name: 'style', match: '.(css)|(scss)|(sass)$', order: 88888888 },

          // Catches the FILE 'src/model/common' when imported as a local module.
          // Avoids collision with rule '../common' rule.
          {
            name: 'fileName-folderName-collision ..',
            match: '^../common$',
            order: 1000,
          },
          {
            name: 'fileName-folderName-collision .',
            match: '^./common$',
            order: 1001,
          },

          // Contains types and constants.
          { name: '../constants', match: '((^../)|(^./))constants', order: 20 },
          { name: '../model', match: '((^../)|(^./))model', order: 20 },
          // Contains functions.
          { name: '../dao', match: '((^../)|(^./))dao', order: 20 },
          { name: '../utils', match: '((^../)|(^./))utils', order: 20 },

          // Contains components.
          { name: '../common', match: '((^../)|(^./))common', order: 100 },
          { name: '../routes', match: '((^../)|(^./))routes', order: 100 },

          // Catch-all for local modules.
          { name: '..', match: '^../', order: 1000 },
          { name: '.', match: '^./', order: 1001 },
        ],
        'import-sources-order': 'lowercase-last',
        'named-imports-order': 'lowercase-first',
      },
    ],
  },
}
