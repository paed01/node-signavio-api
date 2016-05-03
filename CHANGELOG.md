3.0.3 / 2016-02-21
==================

  * Renamed function `Case.caseCreateCancel` to `Case.cancel`
  * Renamed function `Case.caseCreateClose` to `Case.close`

3.0.0 / 2016-02-21
==================

  * Node v4
  * Allow unknown model properties

2.0.0 / 2015-12-18
==================

  * Support for New Effektif API (3.0), though API verson hasn´t changed.

1.2.0 / 2015-11-18
==================

  * Option `basePath` is now shared with user instance
  * Operation query arguments considered optional

1.1.0 / 2015-10-01
==================

  * Expose function `#getUserInstance` to retrieve the attached user instance

1.0.0 / 2015-10-01
==================

  * generator:
    - operation callback signature changed from `function(err, resp, body)` to `function(err, body, resp)`
    - HTTP-status codes above 399 will return an error in callback with `body.message` if exists
    - ctor signature now takes `options`
    - Unauthenticated calls will be re-issued with new authorization token if `options.credentials` is specified in ctor
  * User:
    - Added utility function `login`
    - Renamed `createRegistrationActivate` to `activateRegistration`
  * Process:
    - Renamed `createProcesses` to `createProcess`
  * API.md: Added auto-generated API documentation
