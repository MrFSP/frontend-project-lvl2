# install
install i:
	npm ci
	npm publish --dry-run
	sudo npm link

reinstall ri: uninstall install

uninstall un:
	sudo npm uninstall -g \@hexlet/code

# start
gendiff_json:
	node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json

gendiff_json_plain:
	node bin/gendiff.js --format plain __fixtures__/file1.json __fixtures__/file2.json

start s:
	node bin/gendiff.js -h

# test
test t:
	npm test

test-coverage tc:
	npm test -- --coverage

tcw:
	npm test -- --coverage --watch

lint l:
	npx eslint .