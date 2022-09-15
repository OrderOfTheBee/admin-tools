#!/usr/bin/env bash

# replace original content-ce files

cp -rf "apps/contezza-admin-tools/overrides/app.routes.ts" "apps/content-ce/app/src/app/app.routes.ts" &&
cp -rf "apps/contezza-admin-tools/overrides/header.component.html" "apps/content-ce/app/src/app/components/header/header.component.html" &&
cp -rf "apps/contezza-admin-tools/overrides/sidenav.component.ts" "apps/content-ce/app/src/app/components/sidenav/sidenav.component.ts" &&
cp -rf "package.json" "apps/content-ce/package.json"
