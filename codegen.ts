import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://inctagram.work/api/v1/graphql',
  documents: 'src/**/!(*.generated).{ts,tsx,graphql}',
  generates: {
    // Первый output: базовые типы схемы
    "src/shared/graphql/__generated__/graphql.ts": {
      plugins: ['typescript']
    },
    // Второй output: типы операций рядом с файлами
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'shared/graphql/__generated__/graphql.ts'
      },
      plugins: [
        'typescript-operations',
        'typescript-react-apollo'
      ],
      config: {
        withHooks: true,
        skipTypename: false
      }
    }
  }
}

export default config