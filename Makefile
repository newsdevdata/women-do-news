reload:
	browser-sync start --server . --files "src/**/*" --no-notify --no-ghost-mode

server:
	light-server -q -s . -p 8888 -w 'src/main.js, src/index.html # # reload' -w 'src/main.css # # reloadcss'

build:
	rm -rf build && mkdir -p build
	cp -r src/assets/ ./build/assets/
	cp src/index.html build/
	cp src/main.* build/

ai2html:
	sed -i '' '/<!-- begin ai2html here DO NOT MODIFY THIS LINE -->/,/<!-- end ai2html here DO NOT MODIFY THIS LINE -->/{//!d;}' ./src/index.html;
	sed -i '' '/<!-- begin ai2html here DO NOT MODIFY THIS LINE -->/ r src/ai2html-output/online.html' ./src/index.html;
	cp ./src/ai2html-output/assets/*.png ./src/assets/;
