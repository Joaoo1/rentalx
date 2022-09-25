#!/bin/sh

yarn typeorm migration:run
node dist/shared/infra/http/server.js
