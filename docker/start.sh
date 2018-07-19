#!/bin/bash
forever -m 10 start /expressjs/src/server.js 
nginx -g 'daemon off;'

