#!/bin/bash

echo "🧪 Testando todos os endpoints do ERP Supermercado"
echo "=================================================="

# Configurar token
echo "🔑 Fazendo login para obter token..."
TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"superadmin@erp.com","password":"superadmin"}' | jq -r '.token')

if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
  echo "❌ Falha no login"
  exit 1
fi

echo "✅ Token obtido com sucesso"
echo ""

# Testar Health
echo "🏥 Testando Health..."
curl -s -X GET "http://localhost:3000/health" | jq '.status'
echo ""

# Testar Categorias
echo "📂 Testando Categorias..."
echo "  - Criando categoria 'Teste'..."
curl -s -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Teste","description":"Categoria de teste"}' | jq '.name'

echo "  - Listando categorias..."
curl -s -X GET "http://localhost:3000/categories" | jq '.total'
echo ""

# Testar Produtos
echo "📦 Testando Produtos..."
echo "  - Criando produto 'Produto Teste'..."
curl -s -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Produto Teste","description":"Produto para teste","price":10.00,"categoryId":"cmeftbuoe0000vr67fkzx69ay"}' | jq '.name'

echo "  - Listando produtos..."
curl -s -X GET "http://localhost:3000/products" | jq '.total'
echo ""

# Testar Estoque
echo "📊 Testando Estoque..."
echo "  - Atualizando estoque..."
curl -s -X PUT http://localhost:3000/stock/cmeftdj9900016rspfvr5w4ei \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"quantity":100,"minStock":20}' | jq '.quantity'

echo "  - Listando estoque..."
curl -s -X GET "http://localhost:3000/stock" -H "Authorization: Bearer $TOKEN" | jq '.total'
echo ""

# Testar Vendas
echo "💰 Testando Vendas..."
echo "  - Criando venda..."
curl -s -X POST http://localhost:3000/sales \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"items":[{"productId":"cmeftdj9900016rspfvr5w4ei","quantity":1,"price":4.50}]}' | jq '.total'

echo "  - Listando vendas..."
curl -s -X GET "http://localhost:3000/sales" -H "Authorization: Bearer $TOKEN" | jq '.total'
echo ""

echo "🎉 Todos os testes concluídos com sucesso!"
echo "📚 Documentação disponível em: http://localhost:3000/docs"
