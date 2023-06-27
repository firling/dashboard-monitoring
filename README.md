# Dashboard admin monitoring

par `Julien Anquetil`

Projet réalisé dans un cadre scolaire

## Developpement

### Serveur

setup les information bdd dans le .env

```bash
cd server 
yarn install
yarn prisma migrate dev
yarn start:dev
```

### client

```bash
cd client
yarn install
yarn start
```