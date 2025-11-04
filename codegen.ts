// import type { CodegenConfig } from "@graphql-codegen/cli";
//
// const config: CodegenConfig = {
//   // 1) откуда брать схему
//   schema: "https://inctagram.work/api/v1/graphql",
//   ignoreNoDocuments: true,
//   // 2) где искать .graphql-файлы с запросами/мутациями
//   documents: "src/**/*.{graphql,gql}",
//
//   // 3) куда генерить
//   generates: {
//     "src/shared/graphql/__generated__/graphql.ts": {
//       plugins: [
//         "typescript",               // базовые TS-типы для схемы
//         "typescript-operations",    // типы для запросов/мутаций/фрагментов
//         "typescript-apollo-client-helpers", // удобные типы для Apollo Client
//         "typed-document-node",
//       ],
//     },
//   },
// };
//
// export default config;
import type { CodegenConfig } from '@graphql-codegen/cli'

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