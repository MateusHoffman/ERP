import { env } from './env';

export const swaggerConfig = {
  openapi: {
    openapi: '3.0.0' as const,
    info: {
      title: 'ERP Supermarket API',
      description: 'API para gerenciamento de supermercados',
      version: '1.0.0',
      contact: {
        name: 'ERP Supermarket',
        email: 'contato@erpsupermarket.com',
      },
    },
    servers: [
      {
        url: `http://${env.HOST}:${env.PORT}`,
        description: 'Development server',
      },
    ],
    tags: [
      { name: 'Health', description: 'Endpoints de verificação de saúde' },
      { name: 'Auth', description: 'Endpoints de autenticação' },
      { name: 'Users', description: 'Gerenciamento de usuários' },
      {
        name: 'Categories',
        description: 'Gerenciamento de categorias de produtos',
      },
      { name: 'Products', description: 'Gerenciamento de produtos' },
      { name: 'Stock', description: 'Controle de estoque' },
      { name: 'Sales', description: 'Gerenciamento de vendas' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http' as const,
          scheme: 'bearer' as const,
          bearerFormat: 'JWT',
        },
      },
    },
  },
};

export const swaggerUiConfig = {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list' as const,
    deepLinking: true,
    tryItOutEnabled: true,
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
  },
  staticCSP: false,
  transformStaticCSP: (header: string) => header,
};
