@ECHO OFF

:fuckingLabel

..\..\bun\bun.exe build index.ts ^
--target=browser ^
--format=esm ^
--outfile=http\script.js

PAUSE

GOTO fuckingLabel

EXIT
