service InvoiceFlowService {
  function job() returns array of  WorkflowTriggerResponse;
  function capabilities() returns Map;
}

 type WorkflowTriggerResponse : {
  id: String;
  definitionId: String;
  definitionVersion: String;
  subject: String;
  status: String;
  startedAt: String; 
  startedBy: String;
  completedAt: String;
  businessKey: String ;
  parentInstanceId: String;
  rootInstanceId: String;
  applicationScope: String;
  projectId: String;
  projectVersion: String;
};