#!/bin/sh

echo '==============================================='
echo 'Testing node and yarn versions'
echo '==============================================='
echo ''

node -v
yarn -v

echo ''
echo '==============================================='
echo 'Installing project dependencies'
echo '==============================================='
echo ''

yarn install --network-concurrency 4

if [ $? -eq 0 ]; then
  GREEN='\033[0;32m'
  printf "\n\n${GREEN}DEPENDÊNCIAS INSTALADAS CORRETAMENTE"
else
  RED='\033[0;31m'
  printf "\n\n${RED}A INSTALAÇÃO DAS DEPENDÊNCIAS FALHOU!\n\n"
  exit
fi

echo ''
echo '==============================================='
echo "Executing node in ${NODE_ENV}"
echo '==============================================='
echo ''

yarn sails lift
