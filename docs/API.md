2.0.0 API Reference (v1)
===
Auto-generated Api documentation.
Base path: https://workflow.signavio.com/api/v1
**Table of contents:**
- [File](#file)
  - [`getUserInstance`](#file-getuserinstance)
  - [`proxy`](#file-proxy)
  - [`createFiles`](#file-createfiles)
  - [`deleteFile`](#file-deletefile)
  - [`getFile`](#file-getfile)
  - [`getFileStream`](#file-getfilestream)
  - [`createFilesiframe`](#file-createfilesiframe)
- [Mail](#mail)
  - [`getUserInstance`](#mail-getuserinstance)
  - [`proxy`](#mail-proxy)
  - [`createMailIncoming`](#mail-createmailincoming)
- [Case](#case)
  - [`getUserInstance`](#case-getuserinstance)
  - [`proxy`](#case-proxy)
  - [`getCases`](#case-getcases)
  - [`createCases`](#case-createcases)
  - [`getCasesExportCsv`](#case-getcasesexportcsv)
  - [`deleteCase`](#case-deletecase)
  - [`getCase`](#case-getcase)
  - [`updateCase`](#case-updatecase)
  - [`cancel`](#case-cancel)
  - [`getCaseEvents`](#case-getcaseevents)
  - [`createCaseEvents`](#case-createcaseevents)
  - [`getCaseEvent`](#case-getcaseevent)
  - [`createCaseEvent`](#case-createcaseevent)
  - [`createCaseFiles`](#case-createcasefiles)
  - [`createCaseFile`](#case-createcasefile)
  - [`createCaseIframeFiles`](#case-createcaseiframefiles)
  - [`getCaseTasks`](#case-getcasetasks)
  - [`getInfoCases`](#case-getinfocases)
- [Task](#task)
  - [`getUserInstance`](#task-getuserinstance)
  - [`proxy`](#task-proxy)
  - [`getTasks`](#task-gettasks)
  - [`createTasks`](#task-createtasks)
  - [`deleteTask`](#task-deletetask)
  - [`getTask`](#task-gettask)
  - [`updateTask`](#task-updatetask)
  - [`completeTask`](#task-completetask)
  - [`updateTaskFormField`](#task-updatetaskformfield)
  - [`reopenTask`](#task-reopentask)
- [Workflow](#workflow)
  - [`getUserInstance`](#workflow-getuserinstance)
  - [`proxy`](#workflow-proxy)
  - [`getTemplates`](#workflow-gettemplates)
  - [`getWorkflows`](#workflow-getworkflows)
  - [`createWorkflows`](#workflow-createworkflows)
  - [`createWorkflowsImportBpmn`](#workflow-createworkflowsimportbpmn)
  - [`createWorkflowsImportBpmndmn`](#workflow-createworkflowsimportbpmndmn)
  - [`createWorkflowsImportJson`](#workflow-createworkflowsimportjson)
  - [`getWorkflowsScopeReports`](#workflow-getworkflowsscopereports)
  - [`deleteWorkflow`](#workflow-deleteworkflow)
  - [`getWorkflow`](#workflow-getworkflow)
  - [`updateWorkflow`](#workflow-updateworkflow)
  - [`getWorkflowActionsInputs`](#workflow-getworkflowactionsinputs)
  - [`getWorkflowActionsOutputs`](#workflow-getworkflowactionsoutputs)
  - [`createWorkflowActivityTest`](#workflow-createworkflowactivitytest)
  - [`createWorkflowCopy`](#workflow-createworkflowcopy)
  - [`getWorkflowExportBpmn`](#workflow-getworkflowexportbpmn)
  - [`getWorkflowExportBpmndmn`](#workflow-getworkflowexportbpmndmn)
  - [`getWorkflowExportJson`](#workflow-getworkflowexportjson)
  - [`createWorkflowLock`](#workflow-createworkflowlock)
  - [`getWorkflowStartForm`](#workflow-getworkflowstartform)
  - [`getWorkflowStartInfo`](#workflow-getworkflowstartinfo)
  - [`createWorkflowUnlock`](#workflow-createworkflowunlock)
  - [`updateWorkflowUpdateBpmn`](#workflow-updateworkflowupdatebpmn)
  - [`updateWorkflowUpdateBpmndmn`](#workflow-updateworkflowupdatebpmndmn)
  - [`getWorkflowVersions`](#workflow-getworkflowversions)
  - [`createWorkflowVersions`](#workflow-createworkflowversions)
  - [`createWorkflowVersionRestore`](#workflow-createworkflowversionrestore)
  - [`createWorkflowVersionPublish`](#workflow-createworkflowversionpublish)
- [Organization](#organization)
  - [`getUserInstance`](#organization-getuserinstance)
  - [`proxy`](#organization-proxy)
  - [`create`](#organization-create)
  - [`getSystemconfiguration`](#organization-getsystemconfiguration)
  - [`delete`](#organization-delete)
  - [`get`](#organization-get)
  - [`update`](#organization-update)
  - [`getFeatures`](#organization-getfeatures)
  - [`getGroups`](#organization-getgroups)
  - [`createGroups`](#organization-creategroups)
  - [`deleteGroups`](#organization-deletegroups)
  - [`updateGroups`](#organization-updategroups)
  - [`getGroupsMembers`](#organization-getgroupsmembers)
  - [`createGroupsMembers`](#organization-creategroupsmembers)
  - [`deleteGroupsMembers`](#organization-deletegroupsmembers)
  - [`getInfoLicenses`](#organization-getinfolicenses)
  - [`deleteInvitations`](#organization-deleteinvitations)
  - [`createInvitationsResend`](#organization-createinvitationsresend)
  - [`deleteLdap`](#organization-deleteldap)
  - [`getLdap`](#organization-getldap)
  - [`createLdap`](#organization-createldap)
  - [`updateLdap`](#organization-updateldap)
  - [`createLdapSynchronise`](#organization-createldapsynchronise)
  - [`createLdapValidate`](#organization-createldapvalidate)
  - [`createLicenseProfiles`](#organization-createlicenseprofiles)
  - [`getLicenses`](#organization-getlicenses)
  - [`createLicenses`](#organization-createlicenses)
  - [`getLicense`](#organization-getlicense)
  - [`updateLicense`](#organization-updatelicense)
  - [`getOrganizations`](#organization-getorganizations)
  - [`createPurchase`](#organization-createpurchase)
  - [`createUsers`](#organization-createusers)
  - [`deleteUser`](#organization-deleteuser)
- [Service](#service)
  - [`getUserInstance`](#service-getuserinstance)
  - [`proxy`](#service-proxy)
  - [`getOauth_callback`](#service-getoauth_callback)
  - [`getServiceAccounts`](#service-getserviceaccounts)
  - [`createServiceAccounts`](#service-createserviceaccounts)
  - [`getServiceAccount`](#service-getserviceaccount)
  - [`updateServiceAccount`](#service-updateserviceaccount)
  - [`getServiceAccountOption`](#service-getserviceaccountoption)
  - [`getServiceAccountReferences`](#service-getserviceaccountreferences)
  - [`getServiceOption`](#service-getserviceoption)
  - [`getServices`](#service-getservices)
  - [`createServicesOauthStart`](#service-createservicesoauthstart)
  - [`deleteServiceAccount`](#service-deleteserviceaccount)
  - [`getServiceAccountInputsResource`](#service-getserviceaccountinputsresource)
  - [`createServiceActionInstancesLock`](#service-createserviceactioninstanceslock)
  - [`createServiceActionInstancesEnd`](#service-createserviceactioninstancesend)
  - [`getServiceIcon`](#service-getserviceicon)
- [User](#user)
  - [`getUserInstance`](#user-getuserinstance)
  - [`proxy`](#user-proxy)
  - [`getAbout`](#user-getabout)
  - [`createLogin`](#user-createlogin)
  - [`updateLogin`](#user-updatelogin)
  - [`createRegistrations`](#user-createregistrations)
  - [`getRegistration`](#user-getregistration)
  - [`activateRegistration`](#user-activateregistration)
  - [`getRegistrationPicture`](#user-getregistrationpicture)
  - [`createRegistrationPicture`](#user-createregistrationpicture)
  - [`createRegistrationPictureiframe`](#user-createregistrationpictureiframe)
  - [`createUsersConfirm`](#user-createusersconfirm)
  - [`createUsersLogin`](#user-createuserslogin)
  - [`createUsersLoginHandover`](#user-createusersloginhandover)
  - [`createUsersReset`](#user-createusersreset)
  - [`getUser`](#user-getuser)
  - [`updateUser`](#user-updateuser)
  - [`createUserPicture`](#user-createuserpicture)
  - [`createUserPictureiframe`](#user-createuserpictureiframe)
  - [`getUsers`](#user-getusers)
  - [`createUserHandover`](#user-createuserhandover)
  - [`createUserLeave`](#user-createuserleave)
  - [`getUserPicture`](#user-getuserpicture)
  - [`updateUserPreferences`](#user-updateuserpreferences)

# File
**Constructor:**
- `options`
  - `authorization`: string - Authorization token, will be set as Authorization http header
  - `credentials`: object - Default credentials
    - `username`: string - Username
    - `password`: string - Password
  - `basePath`: string - Effektif-api base url, defaults to api endpoint documentation basePath
  - `onUnauthorized`: function - Excecuted when an unauthorized call was made or authorization token is missing. Receives operation arguments and callback
  - `users`: object - Users instance
    - `login`: **required** function - Login function
  - `log`: function - Logging function, defaults to console.log
  - `baseRequest`: function - Default request

## File getUserInstance

## File proxy

## File createFiles
Represents call to:
`POST /{organizationKey}/files`

**Arguments:**
- `organizationKey`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [File](#model-file)
- `resp`: Http response

## File deleteFile
Represents call to:
`DELETE /{organizationKey}/files/{fileId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `fileId`: **required** string
- `callback`: **required** function - function(err, body, resp)


## File getFile
Represents call to:
`GET /{organizationKey}/files/{fileId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `fileId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [File](#model-file)
- `resp`: Http response

## File getFileStream
Represents call to:
`GET /{organizationKey}/files/{fileId}/stream`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `fileId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [FileStream](#model-filestream)
- `resp`: Http response

## File createFilesiframe
Represents call to:
`POST /{organizationKey}/filesiframe`

**Arguments:**
- `organizationKey`: **required** string
- `callback`: **required** function - function(err, body, resp)


# Mail
**Constructor:**
- `options`
  - `authorization`: string - Authorization token, will be set as Authorization http header
  - `credentials`: object - Default credentials
    - `username`: string - Username
    - `password`: string - Password
  - `basePath`: string - Effektif-api base url, defaults to api endpoint documentation basePath
  - `onUnauthorized`: function - Excecuted when an unauthorized call was made or authorization token is missing. Receives operation arguments and callback
  - `users`: object - Users instance
    - `login`: **required** function - Login function
  - `log`: function - Logging function, defaults to console.log
  - `baseRequest`: function - Default request

## Mail getUserInstance

## Mail proxy

## Mail createMailIncoming
Represents call to:
`POST /mail/incoming`

**Arguments:**
- `callback`: **required** function - function(err, body, resp)


# Case
**Constructor:**
- `options`
  - `authorization`: string - Authorization token, will be set as Authorization http header
  - `credentials`: object - Default credentials
    - `username`: string - Username
    - `password`: string - Password
  - `basePath`: string - Effektif-api base url, defaults to api endpoint documentation basePath
  - `onUnauthorized`: function - Excecuted when an unauthorized call was made or authorization token is missing. Receives operation arguments and callback
  - `users`: object - Users instance
    - `login`: **required** function - Login function
  - `log`: function - Logging function, defaults to console.log
  - `baseRequest`: function - Default request

## Case getUserInstance

## Case proxy

## Case getCases
Represents call to:
`GET /{organizationKey}/cases`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: string
- `closed`: boolean
- `canceled`: boolean
- `sorting`: string
- `workflowDeleted`: boolean
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [CaseSummaries](#model-casesummaries)
- `resp`: Http response

## Case createCases
Represents call to:
`POST /{organizationKey}/cases`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `newCase`: **required** object [NewCase](#model-newcase)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [CaseDetail](#model-casedetail)
- `resp`: Http response

## Case getCasesExportCsv
Represents call to:
`GET /{organizationKey}/cases/export/csv`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: string
- `closed`: boolean
- `canceled`: boolean
- `sorting`: string
- `workflowDeleted`: boolean
- `format`: string
- `offset`: number
- `pagesize`: number
- `callback`: **required** function - function(err, body, resp)


## Case deleteCase
Represents call to:
`DELETE /{organizationKey}/cases/{caseId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `caseId`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Case getCase
Represents call to:
`GET /{organizationKey}/cases/{caseId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `caseId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [CaseDetail](#model-casedetail)
- `resp`: Http response

## Case updateCase
Represents call to:
`PUT /{organizationKey}/cases/{caseId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `caseId`: **required** string
- `patchUpdate`: **required** object [PatchUpdate](#model-patchupdate)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [CaseDetail](#model-casedetail)
- `resp`: Http response

## Case cancel
Represents call to:
`POST /{organizationKey}/cases/{caseId}/cancel`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `caseId`: **required** string
- `caseCancellation`: **required** object [CaseCancellation](#model-casecancellation)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [CaseDetail](#model-casedetail)
- `resp`: Http response

## Case getCaseEvents
Represents call to:
`GET /{organizationKey}/cases/{caseId}/events`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `caseId`: **required** string
- `taskId`: string
- `type`: string
- `offset`: number
- `pagesize`: number
- `callback`: **required** function - function(err, body, resp)


## Case createCaseEvents
Represents call to:
`POST /{organizationKey}/cases/{caseId}/events`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `caseId`: **required** string
- `event`: **required** object [Event](#model-event)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [Event](#model-event)
- `resp`: Http response

## Case getCaseEvent
Represents call to:
`GET /{organizationKey}/cases/{caseId}/events/{eventId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `caseId`: **required** string
- `eventId`: **required** string
- `taskId`: string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [Event](#model-event)
- `resp`: Http response

## Case createCaseEvent
Represents call to:
`POST /{organizationKey}/cases/{caseId}/events/{parentId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `caseId`: **required** string
- `parentId`: **required** string
- `event`: **required** object [Event](#model-event)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [Event](#model-event)
- `resp`: Http response

## Case createCaseFiles
Represents call to:
`POST /{organizationKey}/cases/{caseId}/files`

**Arguments:**
- `organizationKey`: **required** string
- `caseId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [File](#model-file)
- `resp`: Http response

## Case createCaseFile
Represents call to:
`POST /{organizationKey}/cases/{caseId}/files/{fileId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `caseId`: **required** string
- `fileId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [File](#model-file)
- `resp`: Http response

## Case createCaseIframeFiles
Represents call to:
`POST /{organizationKey}/cases/{caseId}/iframe/files`

**Arguments:**
- `organizationKey`: **required** string
- `caseId`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Case getCaseTasks
Represents call to:
`GET /{organizationKey}/cases/{caseId}/tasks`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `caseId`: **required** string
- `completed`: boolean
- `callback`: **required** function - function(err, body, resp)


## Case getInfoCases
Represents call to:
`GET /{organizationKey}/info/cases`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `callback`: **required** function - function(err, body, resp)


# Task
**Constructor:**
- `options`
  - `authorization`: string - Authorization token, will be set as Authorization http header
  - `credentials`: object - Default credentials
    - `username`: string - Username
    - `password`: string - Password
  - `basePath`: string - Effektif-api base url, defaults to api endpoint documentation basePath
  - `onUnauthorized`: function - Excecuted when an unauthorized call was made or authorization token is missing. Receives operation arguments and callback
  - `users`: object - Users instance
    - `login`: **required** function - Login function
  - `log`: function - Logging function, defaults to console.log
  - `baseRequest`: function - Default request

## Task getUserInstance

## Task proxy

## Task getTasks
Represents call to:
`GET /{organizationKey}/tasks`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `involvement`: array _api type array_
- `dueDate`: array _api type array_
- `process`: string
- `completed`: boolean
- `assigneeId`: string
- `callback`: **required** function - function(err, body, resp)


## Task createTasks
Represents call to:
`POST /{organizationKey}/tasks`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `newTask`: **required** object [NewTask](#model-newtask)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [TaskDetail](#model-taskdetail)
- `resp`: Http response

## Task deleteTask
Represents call to:
`DELETE /{organizationKey}/tasks/{taskId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `taskId`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Task getTask
Represents call to:
`GET /{organizationKey}/tasks/{taskId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `taskId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [TaskDetail](#model-taskdetail)
- `resp`: Http response

## Task updateTask
Represents call to:
`PUT /{organizationKey}/tasks/{taskId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `taskId`: **required** string
- `patchUpdate`: **required** object [PatchUpdate](#model-patchupdate)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [TaskDetail](#model-taskdetail)
- `resp`: Http response

## Task completeTask
Represents call to:
`POST /{organizationKey}/tasks/{taskId}/complete`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `taskId`: **required** string
- `array of FormInstanceFields`: array _api type array_
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [TaskDetail](#model-taskdetail)
- `resp`: Http response

## Task updateTaskFormField
Represents call to:
`PUT /{organizationKey}/tasks/{taskId}/form/fields/{fieldId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `taskId`: **required** string
- `fieldId`: **required** string
- `formInstanceField`: **required** object [FormInstanceField](#model-forminstancefield)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [FormInstanceField](#model-forminstancefield)
- `resp`: Http response

## Task reopenTask
Represents call to:
`POST /{organizationKey}/tasks/{taskId}/reopen`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `taskId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [TaskDetail](#model-taskdetail)
- `resp`: Http response

# Workflow
**Constructor:**
- `options`
  - `authorization`: string - Authorization token, will be set as Authorization http header
  - `credentials`: object - Default credentials
    - `username`: string - Username
    - `password`: string - Password
  - `basePath`: string - Effektif-api base url, defaults to api endpoint documentation basePath
  - `onUnauthorized`: function - Excecuted when an unauthorized call was made or authorization token is missing. Receives operation arguments and callback
  - `users`: object - Users instance
    - `login`: **required** function - Login function
  - `log`: function - Logging function, defaults to console.log
  - `baseRequest`: function - Default request

## Workflow getUserInstance

## Workflow proxy

## Workflow getTemplates
Represents call to:
`GET /{organizationKey}/templates`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `category`: string
- `callback`: **required** function - function(err, body, resp)


## Workflow getWorkflows
Represents call to:
`GET /{organizationKey}/workflows`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `offset`: number
- `pagesize`: number
- `trigger`: string
- `name`: string
- `callback`: **required** function - function(err, body, resp)


## Workflow createWorkflows
Represents call to:
`POST /{organizationKey}/workflows`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `newWorkflow`: **required** object [NewWorkflow](#model-newworkflow)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [EditorWorkflowDetail](#model-editorworkflowdetail)
- `resp`: Http response

## Workflow createWorkflowsImportBpmn
Represents call to:
`POST /{organizationKey}/workflows/import/bpmn/{fileId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `fileId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [ImportResponse](#model-importresponse)
- `resp`: Http response

## Workflow createWorkflowsImportBpmndmn
Represents call to:
`POST /{organizationKey}/workflows/import/bpmndmn`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `dmnBpmnImportWrapper`: **required** object [DmnBpmnImportWrapper](#model-dmnbpmnimportwrapper)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [AbstractWorkflow](#model-abstractworkflow)
- `resp`: Http response

## Workflow createWorkflowsImportJson
Represents call to:
`POST /{organizationKey}/workflows/import/json`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflow`: **required** object [EditorWorkflow](#model-editorworkflow)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [EditorWorkflow](#model-editorworkflow)
- `resp`: Http response

## Workflow getWorkflowsScopeReports
Represents call to:
`GET /{organizationKey}/workflows/scope/reports`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `offset`: number
- `pagesize`: number
- `trigger`: string
- `name`: string
- `callback`: **required** function - function(err, body, resp)


## Workflow deleteWorkflow
Represents call to:
`DELETE /{organizationKey}/workflows/{editorWorkflowId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `cascade`: boolean
- `callback`: **required** function - function(err, body, resp)


## Workflow getWorkflow
Represents call to:
`GET /{organizationKey}/workflows/{editorWorkflowId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [EditorWorkflowDetail](#model-editorworkflowdetail)
- `resp`: Http response

## Workflow updateWorkflow
Represents call to:
`PUT /{organizationKey}/workflows/{editorWorkflowId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `editorWorkflow`: **required** object [EditorWorkflow](#model-editorworkflow)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [EditorWorkflowDetail](#model-editorworkflowdetail)
- `resp`: Http response

## Workflow getWorkflowActionsInputs
Represents call to:
`GET /{organizationKey}/workflows/{editorWorkflowId}/actions/{activityId}/inputs`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `activityId`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Workflow getWorkflowActionsOutputs
Represents call to:
`GET /{organizationKey}/workflows/{editorWorkflowId}/actions/{activityId}/outputs`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `activityId`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Workflow createWorkflowActivityTest
Represents call to:
`POST /{organizationKey}/workflows/{editorWorkflowId}/activities/{activityId}/test`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `activityId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [ScriptResult](#model-scriptresult)
- `resp`: Http response

## Workflow createWorkflowCopy
Represents call to:
`POST /{organizationKey}/workflows/{editorWorkflowId}/copy`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [EditorWorkflowDetail](#model-editorworkflowdetail)
- `resp`: Http response

## Workflow getWorkflowExportBpmn
Represents call to:
`GET /{organizationKey}/workflows/{editorWorkflowId}/export/bpmn/`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Workflow getWorkflowExportBpmndmn
Represents call to:
`GET /{organizationKey}/workflows/{editorWorkflowId}/export/bpmndmn/`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [DmnBpmnExportWrapper](#model-dmnbpmnexportwrapper)
- `resp`: Http response

## Workflow getWorkflowExportJson
Represents call to:
`GET /{organizationKey}/workflows/{editorWorkflowId}/export/json`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [EditorWorkflow](#model-editorworkflow)
- `resp`: Http response

## Workflow createWorkflowLock
Represents call to:
`POST /{organizationKey}/workflows/{editorWorkflowId}/lock`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [EditorWorkflow](#model-editorworkflow)
- `resp`: Http response

## Workflow getWorkflowStartForm
Represents call to:
`GET /{organizationKey}/workflows/{editorWorkflowId}/startForm`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [FormInstance](#model-forminstance)
- `resp`: Http response

## Workflow getWorkflowStartInfo
Represents call to:
`GET /{organizationKey}/workflows/{editorWorkflowId}/startInfo`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [StartInfo](#model-startinfo)
- `resp`: Http response

## Workflow createWorkflowUnlock
Represents call to:
`POST /{organizationKey}/workflows/{editorWorkflowId}/unlock`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Workflow updateWorkflowUpdateBpmn
Represents call to:
`PUT /{organizationKey}/workflows/{editorWorkflowId}/update/bpmn`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `body`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [ImportResponse](#model-importresponse)
- `resp`: Http response

## Workflow updateWorkflowUpdateBpmndmn
Represents call to:
`PUT /{organizationKey}/workflows/{editorWorkflowId}/update/bpmndmn`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `dmnBpmnImportWrapper`: **required** object [DmnBpmnImportWrapper](#model-dmnbpmnimportwrapper)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [EditorWorkflow](#model-editorworkflow)
- `resp`: Http response

## Workflow getWorkflowVersions
Represents call to:
`GET /{organizationKey}/workflows/{editorWorkflowId}/versions`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `offset`: number
- `pagesize`: number
- `callback`: **required** function - function(err, body, resp)


## Workflow createWorkflowVersions
Represents call to:
`POST /{organizationKey}/workflows/{editorWorkflowId}/versions`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `versionRequest`: **required** object [VersionRequest](#model-versionrequest)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [ExecutableWorkflow](#model-executableworkflow)
- `resp`: Http response

## Workflow createWorkflowVersionRestore
Represents call to:
`POST /{organizationKey}/workflows/{editorWorkflowId}/versions/{versionId}/restore`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `editorWorkflowId`: **required** string
- `versionId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [EditorWorkflowDetail](#model-editorworkflowdetail)
- `resp`: Http response

## Workflow createWorkflowVersionPublish
Represents call to:
`POST /{organizationKey}/workflows/{workflowId}/versions/{versionId}/publish`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `workflowId`: **required** string
- `versionId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [ExecutableWorkflow](#model-executableworkflow)
- `resp`: Http response

# Organization
**Constructor:**
- `options`
  - `authorization`: string - Authorization token, will be set as Authorization http header
  - `credentials`: object - Default credentials
    - `username`: string - Username
    - `password`: string - Password
  - `basePath`: string - Effektif-api base url, defaults to api endpoint documentation basePath
  - `onUnauthorized`: function - Excecuted when an unauthorized call was made or authorization token is missing. Receives operation arguments and callback
  - `users`: object - Users instance
    - `login`: **required** function - Login function
  - `log`: function - Logging function, defaults to console.log
  - `baseRequest`: function - Default request

## Organization getUserInstance

## Organization proxy

## Organization create
Represents call to:
`POST /`

**Arguments:**
- `organization`: **required** object [Organization](#model-organization)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [Organization](#model-organization)
- `resp`: Http response

## Organization getSystemconfiguration
Represents call to:
`GET /systemconfiguration`

**Arguments:**
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [SystemConfiguration](#model-systemconfiguration)
- `resp`: Http response

## Organization delete
Represents call to:
`DELETE /{organizationKey}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Organization get
Represents call to:
`GET /{organizationKey}`

**Arguments:**
- `organizationKey`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [Organization](#model-organization)
- `resp`: Http response

## Organization update
Represents call to:
`PUT /{organizationKey}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `patchUpdate`: **required** object [PatchUpdate](#model-patchupdate)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [Organization](#model-organization)
- `resp`: Http response

## Organization getFeatures
Represents call to:
`GET /{organizationKey}/features`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Organization getGroups
Represents call to:
`GET /{organizationKey}/groups/{groupId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `groupId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [Group](#model-group)
- `resp`: Http response

## Organization createGroups
Represents call to:
`POST /{organizationKey}/groups`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `group`: **required** object [Group](#model-group)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [Group](#model-group)
- `resp`: Http response

## Organization deleteGroups
Represents call to:
`DELETE /{organizationKey}/groups/{groupId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `groupId`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Organization updateGroups
Represents call to:
`PUT /{organizationKey}/groups/{groupId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `groupId`: **required** string
- `patchUpdate`: **required** object [PatchUpdate](#model-patchupdate)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [Group](#model-group)
- `resp`: Http response

## Organization getGroupsMembers
Represents call to:
`GET /{organizationKey}/groups/{groupId}/members`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `groupId`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Organization createGroupsMembers
Represents call to:
`POST /{organizationKey}/groups/{groupId}/members`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `groupId`: **required** string
- `user`: **required** object [User](#model-user)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [User](#model-user)
- `resp`: Http response

## Organization deleteGroupsMembers
Represents call to:
`DELETE /{organizationKey}/groups/{groupId}/members/{memberId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `groupId`: **required** string
- `memberId`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Organization getInfoLicenses
Represents call to:
`GET /{organizationKey}/info/licenses`

**Arguments:**
- `organizationKey`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Organization deleteInvitations
Represents call to:
`DELETE /{organizationKey}/invitations/{inviteeMailAddress}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `inviteeMailAddress`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Organization createInvitationsResend
Represents call to:
`POST /{organizationKey}/invitations/{inviteeMailAddress}/resend`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `inviteeMailAddress`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Organization deleteLdap
Represents call to:
`DELETE /{organizationKey}/ldap`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Organization getLdap
Represents call to:
`GET /{organizationKey}/ldap`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [LdapConfiguration](#model-ldapconfiguration)
- `resp`: Http response

## Organization createLdap
Represents call to:
`POST /{organizationKey}/ldap`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `ldapConfiguration`: **required** object [LdapConfiguration](#model-ldapconfiguration)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [LdapConfiguration](#model-ldapconfiguration)
- `resp`: Http response

## Organization updateLdap
Represents call to:
`PUT /{organizationKey}/ldap`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `patchUpdate`: **required** object [PatchUpdate](#model-patchupdate)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [LdapConfiguration](#model-ldapconfiguration)
- `resp`: Http response

## Organization createLdapSynchronise
Represents call to:
`POST /{organizationKey}/ldap/synchronise`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [LdapSynchronisationResult](#model-ldapsynchronisationresult)
- `resp`: Http response

## Organization createLdapValidate
Represents call to:
`POST /{organizationKey}/ldap/validate`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [LdapValidationResult](#model-ldapvalidationresult)
- `resp`: Http response

## Organization createLicenseProfiles
Represents call to:
`POST /{organizationKey}/licenseProfiles/{profile}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `profile`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [Organization](#model-organization)
- `resp`: Http response

## Organization getLicenses
Represents call to:
`GET /{organizationKey}/licenses`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Organization createLicenses
Represents call to:
`POST /{organizationKey}/licenses`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `newAssignmentRequest`: **required** object [NewAssignmentRequest](#model-newassignmentrequest)
- `callback`: **required** function - function(err, body, resp)


## Organization getLicense
Represents call to:
`GET /{organizationKey}/licenses/{licenseId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `licenseId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [License](#model-license)
- `resp`: Http response

## Organization updateLicense
Represents call to:
`PUT /{organizationKey}/licenses/{licenseId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `licenseId`: **required** string
- `patchUpdate`: **required** object [PatchUpdate](#model-patchupdate)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [License](#model-license)
- `resp`: Http response

## Organization getOrganizations
Represents call to:
`GET /{organizationKey}/organizations`

**Arguments:**
- `name`: string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [Organization](#model-organization)
- `resp`: Http response

## Organization createPurchase
Represents call to:
`POST /{organizationKey}/purchase`

**Arguments:**
- `organizationKey`: **required** string
- `purchaseOrder`: **required** object [PurchaseOrder](#model-purchaseorder)
- `callback`: **required** function - function(err, body, resp)


## Organization createUsers
Represents call to:
`POST /{organizationKey}/users`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `newUser`: **required** object [NewUser](#model-newuser)
- `callback`: **required** function - function(err, body, resp)


## Organization deleteUser
Represents call to:
`DELETE /{organizationKey}/users/{userId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `userId`: **required** string
- `callback`: **required** function - function(err, body, resp)


# Service
**Constructor:**
- `options`
  - `authorization`: string - Authorization token, will be set as Authorization http header
  - `credentials`: object - Default credentials
    - `username`: string - Username
    - `password`: string - Password
  - `basePath`: string - Effektif-api base url, defaults to api endpoint documentation basePath
  - `onUnauthorized`: function - Excecuted when an unauthorized call was made or authorization token is missing. Receives operation arguments and callback
  - `users`: object - Users instance
    - `login`: **required** function - Login function
  - `log`: function - Logging function, defaults to console.log
  - `baseRequest`: function - Default request

## Service getUserInstance

## Service proxy

## Service getOauth_callback
Represents call to:
`GET /oauth_callback`

**Arguments:**
- `state`: string
- `code`: string
- `error`: string
- `callback`: **required** function - function(err, body, resp)


## Service getServiceAccounts
Represents call to:
`GET /{organizationKey}/services/{serviceKey}/accounts`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `serviceKey`: **required** string
- `excludeOwner`: string
- `callback`: **required** function - function(err, body, resp)


## Service createServiceAccounts
Represents call to:
`POST /{organizationKey}/services/{serviceKey}/accounts`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `serviceKey`: **required** string
- `account`: **required** object [Account](#model-account)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [Account](#model-account)
- `resp`: Http response

## Service getServiceAccount
Represents call to:
`GET /{organizationKey}/services/{serviceKey}/accounts/{accountId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `serviceKey`: **required** string
- `accountId`: **required** string
- `excludeOwner`: string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [Account](#model-account)
- `resp`: Http response

## Service updateServiceAccount
Represents call to:
`PUT /{organizationKey}/services/{serviceKey}/accounts/{accountId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `serviceKey`: **required** string
- `accountId`: **required** string
- `patchUpdate`: **required** object [PatchUpdate](#model-patchupdate)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [Account](#model-account)
- `resp`: Http response

## Service getServiceAccountOption
Represents call to:
`GET /{organizationKey}/services/{serviceKey}/accounts/{accountId}/options/{optionsKey}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `serviceKey`: **required** string
- `accountId`: **required** string
- `optionsKey`: **required** string
- `excludeOwner`: string
- `callback`: **required** function - function(err, body, resp)


## Service getServiceAccountReferences
Represents call to:
`GET /{organizationKey}/services/{serviceKey}/accounts/{accountId}/references`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `serviceKey`: **required** string
- `accountId`: **required** string
- `q`: string
- `parent`: string
- `pathTo`: string
- `excludeOwner`: string
- `callback`: **required** function - function(err, body, resp)


## Service getServiceOption
Represents call to:
`GET /{organizationKey}/services/{serviceKey}/options/{optionsKey}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `serviceKey`: **required** string
- `accountId`: **required** string
- `optionsKey`: **required** string
- `excludeOwner`: string
- `callback`: **required** function - function(err, body, resp)


## Service getServices
Represents call to:
`GET /{organizationKey}/services`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Service createServicesOauthStart
Represents call to:
`POST /{organizationKey}/services/oauth/start`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `oauthStartRequest`: **required** object [OauthStartRequest](#model-oauthstartrequest)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [OauthStartResponse](#model-oauthstartresponse)
- `resp`: Http response

## Service deleteServiceAccount
Represents call to:
`DELETE /{organizationKey}/services/{serviceKey}/accounts/{accountId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `serviceKey`: **required** string
- `accountId`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Service getServiceAccountInputsResource
Represents call to:
`GET /{organizationKey}/services/{serviceKey}/accounts/{accountId}/inputs/resource/{resourceId}/{optionalId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `serviceKey`: **required** string
- `accountId`: **required** string
- `resourceId`: **required** string
- `optionalId`: **required** string
- `callback`: **required** function - function(err, body, resp)


## Service createServiceActionInstancesLock
Represents call to:
`POST /{organizationKey}/services/{serviceKey}/actionInstances/lock`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `serviceKey`: **required** string
- `actionInstance`: **required** object [ActionInstance](#model-actioninstance)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [ActionInstance](#model-actioninstance)
- `resp`: Http response

## Service createServiceActionInstancesEnd
Represents call to:
`POST /{organizationKey}/services/{serviceKey}/actionInstances/{actionInstanceId}/end`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `serviceKey`: **required** string
- `actionInstanceId`: **required** string
- `actionInstanceEnd`: **required** object [ActionInstanceEnd](#model-actioninstanceend)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [EmptyObject](#model-emptyobject)
- `resp`: Http response

## Service getServiceIcon
Represents call to:
`GET /{organizationKey}/services/{serviceKey}/icon`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `serviceKey`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [FileStream](#model-filestream)
- `resp`: Http response

# User
**Constructor:**
- `options`
  - `authorization`: string - Authorization token, will be set as Authorization http header
  - `credentials`: object - Default credentials
    - `username`: string - Username
    - `password`: string - Password
  - `basePath`: string - Effektif-api base url, defaults to api endpoint documentation basePath
  - `onUnauthorized`: function - Excecuted when an unauthorized call was made or authorization token is missing. Receives operation arguments and callback
  - `users`: object - Users instance
    - `login`: **required** function - Login function
  - `log`: function - Logging function, defaults to console.log
  - `baseRequest`: function - Default request

## User getUserInstance

## User proxy

## User getAbout
Represents call to:
`GET /about`

> Requires authorization

**Arguments:**
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [About](#model-about)
- `resp`: Http response

## User createLogin
Represents call to:
`POST /login/{providerKey}`

**Arguments:**
- `providerKey`: **required** string
- `serviceLogin`: **required** object [ServiceLogin](#model-servicelogin)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [ServiceLogin](#model-servicelogin)
- `resp`: Http response

## User updateLogin
Represents call to:
`PUT /login/{providerKey}`

**Arguments:**
- `providerKey`: **required** string
- `code`: string
- `state`: string
- `error`: string
- `error_description`: string
- `serviceLogin`: **required** object [ServiceLogin](#model-servicelogin)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [ServiceLogin](#model-servicelogin)
- `resp`: Http response

## User createRegistrations
Represents call to:
`POST /registrations`

**Arguments:**
- `registrationRequest`: **required** object [RegistrationRequest](#model-registrationrequest)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [EmptyObject](#model-emptyobject)
- `resp`: Http response

## User getRegistration
Represents call to:
`GET /registrations/{code}`

**Arguments:**
- `code`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [Registration](#model-registration)
- `resp`: Http response

## User activateRegistration
Represents call to:
`POST /registrations/{code}/activate`

**Arguments:**
- `code`: **required** string
- `registrationRequest`: **required** object [RegistrationRequest](#model-registrationrequest)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [LoginResponse](#model-loginresponse)
- `resp`: Http response

## User getRegistrationPicture
Represents call to:
`GET /registrations/{code}/picture`

**Arguments:**
- `code`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [FileStream](#model-filestream)
- `resp`: Http response

## User createRegistrationPicture
Represents call to:
`POST /registrations/{code}/picture`

**Arguments:**
- `code`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [EmptyObject](#model-emptyobject)
- `resp`: Http response

## User createRegistrationPictureiframe
Represents call to:
`POST /registrations/{code}/pictureiframe`

**Arguments:**
- `code`: **required** string
- `callback`: **required** function - function(err, body, resp)


## User createUsersConfirm
Represents call to:
`POST /users/confirm`

**Arguments:**
- `passwordResetConfirmation`: **required** object [PasswordResetConfirmation](#model-passwordresetconfirmation)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [LoginResponse](#model-loginresponse)
- `resp`: Http response

## User createUsersLogin
Represents call to:
`POST /users/login`

**Arguments:**
- `loginRequest`: **required** object [LoginRequest](#model-loginrequest)
- `callback`: **required** function - function(err, body, resp)


## User createUsersLoginHandover
Represents call to:
`POST /users/login/handover`

**Arguments:**
- `handoverLogin`: **required** object [HandoverLogin](#model-handoverlogin)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [HandoverLogin](#model-handoverlogin)
- `resp`: Http response

## User createUsersReset
Represents call to:
`POST /users/reset`

**Arguments:**
- `userMailAddress`: **required** object [UserMailAddress](#model-usermailaddress)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [EmptyObject](#model-emptyobject)
- `resp`: Http response

## User getUser
Represents call to:
`GET /{organizationKey}/users/{userId}`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `userId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [User](#model-user)
- `resp`: Http response

## User updateUser
Represents call to:
`PUT /{organizationKey}/users/{userId}`

**Arguments:**
- `userId`: **required** string
- `patchUpdate`: **required** object [PatchUpdate](#model-patchupdate)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [User](#model-user)
- `resp`: Http response

## User createUserPicture
Represents call to:
`POST /{organizationKey}/users/{userId}/picture`

**Arguments:**
- `userId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [EmptyObject](#model-emptyobject)
- `resp`: Http response

## User createUserPictureiframe
Represents call to:
`POST /{organizationKey}/users/{userId}/pictureiframe`

**Arguments:**
- `userId`: **required** string
- `callback`: **required** function - function(err, body, resp)


## User getUsers
Represents call to:
`GET /{organizationKey}/users`

**Arguments:**
- `organizationKey`: **required** string
- `emailAddress`: string
- `name`: string
- `groupId`: string
- `offset`: number
- `pagesize`: number
- `callback`: **required** function - function(err, body, resp)


## User createUserHandover
Represents call to:
`POST /{organizationKey}/users/{userId}/handover`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `userId`: **required** string
- `handoverLogin`: **required** object [HandoverLogin](#model-handoverlogin)
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [HandoverLogin](#model-handoverlogin)
- `resp`: Http response

## User createUserLeave
Represents call to:
`POST /{organizationKey}/users/{userId}/leave`

> Requires authorization

**Arguments:**
- `organizationKey`: **required** string
- `userId`: **required** string
- `leaveRequest`: **required** object [LeaveRequest](#model-leaverequest)
- `callback`: **required** function - function(err, body, resp)


## User getUserPicture
Represents call to:
`GET /{organizationKey}/users/{userId}/picture`

**Arguments:**
- `organizationKey`: **required** string
- `userId`: **required** string
- `callback`: **required** function - function(err, body, resp)


**Callback:**
- `error`: Error or null
- `body`: [FileStream](#model-filestream)
- `resp`: Http response

## User updateUserPreferences
Represents call to:
`PUT /{workspaceKey}/users/{userId}/preferences`

> Requires authorization

**Arguments:**
- `put any json in here`: string
- `callback`: **required** function - function(err, body, resp)


# Models

## Model File


**Used by:**
[`File.createFiles`](#file-createfiles)
[`File.getFile`](#file-getfile)
[`Case.createCaseFiles`](#case-createcasefiles)
[`Case.createCaseFile`](#case-createcasefile)

## Model FileStream


**Used by:**
[`File.getFileStream`](#file-getfilestream)
[`Service.getServiceIcon`](#service-getserviceicon)
[`User.getRegistrationPicture`](#user-getregistrationpicture)
[`User.getUserPicture`](#user-getuserpicture)

## Model CaseSummaries


**Used by:**
[`Case.getCases`](#case-getcases)

## Model NewCase
- `nameLower`: string
- `access`: any _api type AccessControlList_
- `hasDueDate`: boolean
- `hasPriority`: boolean


**Used by:**
[`Case.createCases`](#case-createcases)

## Model CaseDetail


**Used by:**
[`Case.createCases`](#case-createcases)
[`Case.getCase`](#case-getcase)
[`Case.updateCase`](#case-updatecase)
[`Case.cancel`](#case-cancel)

## Model PatchUpdate


**Used by:**
[`Case.updateCase`](#case-updatecase)
[`Task.updateTask`](#task-updatetask)
[`Organization.update`](#organization-update)
[`Organization.updateGroups`](#organization-updategroups)
[`Organization.updateLdap`](#organization-updateldap)
[`Organization.updateLicense`](#organization-updatelicense)
[`Service.updateServiceAccount`](#service-updateserviceaccount)
[`User.updateUser`](#user-updateuser)

## Model CaseCancellation


**Used by:**
[`Case.cancel`](#case-cancel)

## Model Event


**Used by:**
[`Case.createCaseEvents`](#case-createcaseevents)
[`Case.getCaseEvent`](#case-getcaseevent)
[`Case.createCaseEvent`](#case-createcaseevent)

## Model NewTask
- `nameLower`: string
- `access`: any _api type AccessControlList_


**Used by:**
[`Task.createTasks`](#task-createtasks)

## Model TaskDetail


**Used by:**
[`Task.createTasks`](#task-createtasks)
[`Task.getTask`](#task-gettask)
[`Task.updateTask`](#task-updatetask)
[`Task.completeTask`](#task-completetask)
[`Task.reopenTask`](#task-reopentask)

## Model FormInstanceField


**Used by:**
[`Task.updateTaskFormField`](#task-updatetaskformfield)

## Model NewWorkflow
- `nameLower`: string


**Used by:**
[`Workflow.createWorkflows`](#workflow-createworkflows)

## Model EditorWorkflowDetail
- `nameLower`: string


**Used by:**
[`Workflow.createWorkflows`](#workflow-createworkflows)
[`Workflow.getWorkflow`](#workflow-getworkflow)
[`Workflow.updateWorkflow`](#workflow-updateworkflow)
[`Workflow.createWorkflowCopy`](#workflow-createworkflowcopy)
[`Workflow.createWorkflowVersionRestore`](#workflow-createworkflowversionrestore)

## Model ImportResponse


**Used by:**
[`Workflow.createWorkflowsImportBpmn`](#workflow-createworkflowsimportbpmn)
[`Workflow.updateWorkflowUpdateBpmn`](#workflow-updateworkflowupdatebpmn)

## Model DmnBpmnImportWrapper


**Used by:**
[`Workflow.createWorkflowsImportBpmndmn`](#workflow-createworkflowsimportbpmndmn)
[`Workflow.updateWorkflowUpdateBpmndmn`](#workflow-updateworkflowupdatebpmndmn)

## Model AbstractWorkflow


**Used by:**
[`Workflow.createWorkflowsImportBpmndmn`](#workflow-createworkflowsimportbpmndmn)

## Model EditorWorkflow
- `nameLower`: string


**Used by:**
[`Workflow.createWorkflowsImportJson`](#workflow-createworkflowsimportjson)
[`Workflow.updateWorkflow`](#workflow-updateworkflow)
[`Workflow.getWorkflowExportJson`](#workflow-getworkflowexportjson)
[`Workflow.createWorkflowLock`](#workflow-createworkflowlock)
[`Workflow.updateWorkflowUpdateBpmndmn`](#workflow-updateworkflowupdatebpmndmn)

## Model ScriptResult


**Used by:**
[`Workflow.createWorkflowActivityTest`](#workflow-createworkflowactivitytest)

## Model DmnBpmnExportWrapper


**Used by:**
[`Workflow.getWorkflowExportBpmndmn`](#workflow-getworkflowexportbpmndmn)

## Model FormInstance


**Used by:**
[`Workflow.getWorkflowStartForm`](#workflow-getworkflowstartform)

## Model StartInfo


**Used by:**
[`Workflow.getWorkflowStartInfo`](#workflow-getworkflowstartinfo)

## Model VersionRequest


**Used by:**
[`Workflow.createWorkflowVersions`](#workflow-createworkflowversions)

## Model ExecutableWorkflow


**Used by:**
[`Workflow.createWorkflowVersions`](#workflow-createworkflowversions)
[`Workflow.createWorkflowVersionPublish`](#workflow-createworkflowversionpublish)

## Model Organization
- `created`: date


**Used by:**
[`Organization.create`](#organization-create)
[`Organization.get`](#organization-get)
[`Organization.update`](#organization-update)
[`Organization.createLicenseProfiles`](#organization-createlicenseprofiles)
[`Organization.getOrganizations`](#organization-getorganizations)

## Model SystemConfiguration


**Used by:**
[`Organization.getSystemconfiguration`](#organization-getsystemconfiguration)

## Model Group


**Used by:**
[`Organization.getGroups`](#organization-getgroups)
[`Organization.createGroups`](#organization-creategroups)
[`Organization.updateGroups`](#organization-updategroups)

## Model User
- `features`: any _api type FeatureCache_
- `emailAddressLower`: string
- `passwordHash`: string
- `passwordReset`: any _api type PasswordReset_
- `permissions`: array any _api type Permission_
- `token`: string


**Used by:**
[`Organization.createGroupsMembers`](#organization-creategroupsmembers)
[`User.getUser`](#user-getuser)
[`User.updateUser`](#user-updateuser)

## Model LdapConfiguration


**Used by:**
[`Organization.getLdap`](#organization-getldap)
[`Organization.createLdap`](#organization-createldap)
[`Organization.updateLdap`](#organization-updateldap)

## Model LdapSynchronisationResult


**Used by:**
[`Organization.createLdapSynchronise`](#organization-createldapsynchronise)

## Model LdapValidationResult


**Used by:**
[`Organization.createLdapValidate`](#organization-createldapvalidate)

## Model NewAssignmentRequest


**Used by:**
[`Organization.createLicenses`](#organization-createlicenses)

## Model License


**Used by:**
[`Organization.getLicense`](#organization-getlicense)
[`Organization.updateLicense`](#organization-updatelicense)

## Model PurchaseOrder


**Used by:**
[`Organization.createPurchase`](#organization-createpurchase)

## Model NewUser


**Used by:**
[`Organization.createUsers`](#organization-createusers)

## Model Account


**Used by:**
[`Service.createServiceAccounts`](#service-createserviceaccounts)
[`Service.getServiceAccount`](#service-getserviceaccount)
[`Service.updateServiceAccount`](#service-updateserviceaccount)

## Model OauthStartRequest


**Used by:**
[`Service.createServicesOauthStart`](#service-createservicesoauthstart)

## Model OauthStartResponse


**Used by:**
[`Service.createServicesOauthStart`](#service-createservicesoauthstart)

## Model ActionInstance


**Used by:**
[`Service.createServiceActionInstancesLock`](#service-createserviceactioninstanceslock)

## Model ActionInstanceEnd


**Used by:**
[`Service.createServiceActionInstancesEnd`](#service-createserviceactioninstancesend)

## Model EmptyObject


**Used by:**
[`Service.createServiceActionInstancesEnd`](#service-createserviceactioninstancesend)
[`User.createRegistrations`](#user-createregistrations)
[`User.createRegistrationPicture`](#user-createregistrationpicture)
[`User.createUsersReset`](#user-createusersreset)
[`User.createUserPicture`](#user-createuserpicture)

## Model About


**Used by:**
[`User.getAbout`](#user-getabout)

## Model ServiceLogin


**Used by:**
[`User.createLogin`](#user-createlogin)
[`User.updateLogin`](#user-updatelogin)

## Model RegistrationRequest


**Used by:**
[`User.createRegistrations`](#user-createregistrations)
[`User.activateRegistration`](#user-activateregistration)

## Model Registration
- `pictureId`: string


**Used by:**
[`User.getRegistration`](#user-getregistration)

## Model LoginResponse


**Used by:**
[`User.activateRegistration`](#user-activateregistration)
[`User.createUsersConfirm`](#user-createusersconfirm)

## Model PasswordResetConfirmation


**Used by:**
[`User.createUsersConfirm`](#user-createusersconfirm)

## Model LoginRequest


**Used by:**
[`User.createUsersLogin`](#user-createuserslogin)

## Model HandoverLogin


**Used by:**
[`User.createUsersLoginHandover`](#user-createusersloginhandover)
[`User.createUserHandover`](#user-createuserhandover)

## Model UserMailAddress


**Used by:**
[`User.createUsersReset`](#user-createusersreset)

## Model LeaveRequest


**Used by:**
[`User.createUserLeave`](#user-createuserleave)
