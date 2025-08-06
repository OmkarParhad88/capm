import cds from "@sap/cds";
import cov2ap from "@cap-js-community/odata-v2-adapter";
import type { Application } from "express";
cds.on("bootstrap", (app: Application) => app.use(cov2ap()));
export = cds.server;