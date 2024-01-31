install:
	npm install

start:
	npm run start

clean:
	rm -rf build

build: clean
	npm run build

lint:
	npx eslint .

fix:
	npx eslint . --fix
