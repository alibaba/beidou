MAKEFLAGS = -j1

export NODE_ENV = test

.PHONY: lint install clean test-clean clean-all test-only test-all test cov ci changelog

lint:
	lint-staged ./packages

lint-all:
	eslint --ext .js --ext .jsx --fix ./packages

install:
	yarn install
	lerna bootstrap

reinstall:
	make clean-all
	rm -rf *.lock
	rm -rf packages/*/*.lock
	rm -rf examples/*/*.lock
	yarn install
	lerna bootstrap	

clean:
	make test-clean
	rm -rf coverage
	rm -rf .run
	rm -rf run
	rm -rf packages/*/npm-debug*
	rm -rf packages/*/test/fixtures/*/run
	rm -rf packages/*/test/fixtures/*/logs
	rm -rf packages/*/test/fixtures/*/debug
	rm -rf packages/*.log
	rm -rf examples/*/logs
	rm -rf examples/*/run
	rm -rf examples/*/debug


test-clean:
	rm -rf packages/*/test/**/run
	rm -rf packages/*/test/**/debug
	rm -rf packages/*/test/**/logs

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
	./scripts/test-all.sh
	make test-clean

test:
	make lint
	make test-all

cov:
	egg-bin cov

ci:
	./scripts/ci.sh

changelog:
	lerna-changelog


