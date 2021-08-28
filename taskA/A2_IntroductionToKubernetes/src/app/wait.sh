#!/bin/sh

echo ">>> Heyya I'm going to try waiting for the db server to be up first mmkay?"

while ! nc -z db 3306 ; do
    echo "Waiting for the MySQL Server"
    sleep 3
done

node app.js
