MAKEFLAGS = -j1

export NODE_ENV = test

.PHONY: lint install clean test-clean clean-all test-only test-all test cov ci changelog

lint:
	./node_modules/.bin/lint-staged ./packages

lint-all:
	./node_modules/.bin/eslint --ext .js --ext .jsx --fix ./packages

install:
	yarn install
	./node_modules/.bin/lerna bootstrap
	# ./scripts/install-examples.sh  [deprecated]

clean:
	make test-clean
	rm -rf coverage
	rm -rf .run
	rm -rf run
	rm -rf packages/*/npm-debug*
	rm -rf packages/*/test/fixtures/*/.babel.json
	rm -rf packages/*/test/fixtures/*/*/*_config.json
	rm -rf packages/*/test/fixtures/*/*/*.log
	rm -rf packages/*/test/fixtures/*/*/*/*.log
	rm -rf examples/*/logs/
	rm -rf examples/*/run/
	rm -rf examples/*/*.log


test-clean:
	rm -rf packages/*/test/run
	rm -rf packages/*/test/debug

clean-all:
	./node_modules/.bin/lerna clean
	rm -rf node_modules
	rm -rf packages/*/node_modules
	rm -rf examples/*/node_modules
	make clean

test-only:
	./scripts/test.sh
	make test-clean

test-all:
	make lint-all
	./scripts/test-all.sh
	make test-clean

test:
	make lint
	make test-all

cov:
	./node_modules/.bin/egg-bin cov

ci:
	./node_modules/.bin/eslint lib config
	./scripts/ci.sh

changelog:
	./node_modules/.bin/lerna-changelog


