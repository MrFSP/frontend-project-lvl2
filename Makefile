# install

install i:
	npm ci
	npm publish --dry-run
	sudo npm link

reinstall ri: uninstall install

uninstall un:
	sudo npm uninstall -g \@hexlet/code

# start

gendiff_json gdjson:
	node bin/gendiff.js __tests__/__fixtures__/file1.json __tests__/__fixtures__/file2.json

start s:
	node bin/gendiff.js -h

lint l:
	npx eslint .