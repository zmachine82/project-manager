cp -r ./backend/. ./dist
cd ./dist
npm ci
cd ..
mkdir ./dist/public
cd frontend
npm ci
npm run build
cd ..
cp -r ./frontend/dist/frontend/. ./dist/public 