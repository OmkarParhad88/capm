import cds from "@sap/cds";
import cov2ap from "@cap-js-community/odata-v2-adapter";
cds.on("bootstrap", (app:any) => app.use(cov2ap()));
export = cds.server;