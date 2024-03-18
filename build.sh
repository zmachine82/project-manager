cp -r ./backend/. ./dist
mkdir ./dist/public
cd frontend
npm run build
cd ..
cp -r ./frontend/dist/frontend/. ./dist/public 