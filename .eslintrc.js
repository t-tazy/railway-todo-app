module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb",
        "airbnb/hooks",
        "plugin:import/errors",
        "plugin:import/warnings",
        "prettier",
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "import",
        "jsx-a11y",
        "react",
        "react-hooks",
    ],
    root: true, // 親の設定ファイルを読み込まない
    "rules": {
      // importの際の拡張子の有無について
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      // reactモジュールをReactとしてimportすることを強制しない
      'react/react-in-jsx-scope': 'off',
      // exportにおいてdefault exportがあるかどうか確認しない
      'import/prefer-default-export': 'off',
      // 関数コンポーネントの定義方法について, アロー関数を用いる
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
    }
}
