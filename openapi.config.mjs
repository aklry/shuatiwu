import { generateService } from '@umijs/openapi'

generateService({
    requestLibPath: "import ryRequest from '@/services'",
    schemaPath: 'http://localhost:8101/api/v2/api-docs',
    serversPath: './src'
}).then(r => console.log(r))
