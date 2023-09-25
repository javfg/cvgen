#!/bin/bash

SERVE_PID=$(cat /proc/sys/kernel/pid_max)

on_error(){
  echo "print failed"
  kill -9 $SERVE_PID
}

trap 'on_error' ERR

gatsby build
gatsby serve &
SERVE_PID=$!

virtualenv venv
# shellcheck source=/dev/null
source ./venv/bin/activate

pip install -r requirements.txt

python print.py

deactivate

kill $SERVE_PID
