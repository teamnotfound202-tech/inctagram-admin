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
        'typescript-react-apollo',
        {
          add: {
            content: [
              "import { ISOStringFormat } from 'date-fns';",
            ],
          },
        },
      ],
      config: {
        apolloReactHooksImportFrom: '@apollo/client/react',
        withHooks: true,                 // хук keep
        withMutationFn: false,           // убрать ...MutationFn
        withResultType: false,           // убрать ...Result / ...HookResult
        withMutationOptionsType: false,  // убрать ...MutationOptions
        scalars: {
          DateTime: 'ISOStringFormat',
        },
      }
    }
  }
}

export default config