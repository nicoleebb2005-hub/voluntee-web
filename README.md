# 🎯 Voluntee - Site Institucional

> Conectando pessoas dispostas a ajudar com organizações sociais em São Mateus, Zona Leste de São Paulo.

## 🚀 Iniciar Rapidamente

### Modo Desenvolvimento (Com Hot Reload) - RECOMENDADO

```bash
.\start-dev-background.bat
```

Abra: **http://localhost:8080**

As mudanças nos arquivos em `public/` serão refletidas automaticamente! 🔥

### Parar o Container

```bash
.\stop-all.bat
```

## ⚠️ IMPORTANTE

**Edite apenas os arquivos dentro da pasta `public/`**

```
✅ CORRETO:
   public/index.html
   public/assets/css/styles.css
   public/assets/js/script.js

❌ ERRADO:
   index.html (na raiz)
   css/styles.css (na raiz)
```

## 📚 Documentação Completa

- **[LEIA-ME-PRIMEIRO.md](./LEIA-ME-PRIMEIRO.md)** - Guia rápido e solução de problemas
- **[docs/README.md](./docs/README.md)** - Documentação técnica completa
- **[docs/ESTRUTURA.md](./docs/ESTRUTURA.md)** - Estrutura do projeto

## 🛠️ Scripts Disponíveis

| Script | O que faz |
|--------|-----------|
| `start-dev-background.bat` | Inicia desenvolvimento com hot reload em background |
| `start-dev.bat` | Inicia desenvolvimento com logs visíveis |
| `start-prod.bat` | Inicia em modo produção (Nginx) |
| `stop-all.bat` | Para todos os containers |

## 🎨 Tecnologias

- HTML5, CSS3, JavaScript
- Docker & Docker Compose
- Nginx (produção)
- Live Server (desenvolvimento)

## 📦 Estrutura

```
Voluntee/
├── public/              ← Edite aqui!
│   ├── index.html
│   ├── sobre.html
│   ├── ongs.html
│   ├── historia.html
│   └── assets/
│       ├── css/
│       ├── js/
│       └── images/
├── config/
├── docs/
└── [scripts .bat]
```

## 🔧 Requisitos

- Docker Desktop instalado e rodando
- Windows PowerShell ou CMD

## 💡 Workflow Recomendado

1. **Inicie**: `.\start-dev-background.bat`
2. **Desenvolva**: Edite arquivos em `public/`
3. **Veja**: Mudanças aparecem automaticamente no navegador
4. **Finalize**: `.\stop-all.bat`

---

**Dúvidas?** Veja [LEIA-ME-PRIMEIRO.md](./LEIA-ME-PRIMEIRO.md)

