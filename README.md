## Criar um novo projeto
npx create-expo-app --template

## Executar o Projeto
expo start

## Executar o Projeto
npx expo start



## Gerar APK
npm install -g eas-cli
eas build:configure
eas build --platform android --profile preview



Opção 3: Usar um APK de debug
Se for apenas para teste, você pode usar um APK de debug, sem a necessidade de um Keystore:
No diretório do projeto, execute:
expo build:android