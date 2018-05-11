## Technote (troubleshooting)

## Problem(Abstract)
The BI Bus dump file is generated when there is a hardware exception in the BIBus. This is the core dump file on Windows, and logging of this type is switched on by default since Cognos 8 MR2. 

Note that the root cause should be investigated, before merely turning off this type of logging. When there are a lot of dump (*.dmp) files created, then clearly something else is going wrong somewhere.

## Symptom
Various error messages, but all result in a file created with the file name:

BIBusTKServerMain_seh_###_####.dmp in Windows
core in UNIX
core.processid in Linux



## Cause
Core dump files are created when there is a serious problem such as an unhandled exception or when an IBM Cognos 8 process terminates abnormally. Quite often this could be due to a defect in the product but not always. Like core files in UNIX environments, these will only occur when a low-level system error occurs, so by turning this off you may be ignoring a problem.


Core dump files are big and are usually the size of Java at the time the dump file was created. For this reason you may want to disable the creation of them until such time that you need to identify and debug an issue.


## Resolving the problem
Steps to Turn Off Core File Creation for IBM Cognos 8.1 MR1

On the server where IBM Cognos 8 is installed, open the rsvpproperties.xml file from the c8_location\configuration directory.
Change the Win32StructuredExceptionHandling property to 0 (zero) so that it reads <property>Win32StructuredExceptionHandling</property><value type="long">0</value>
Save the file.

Steps to Turn Off Core File Creation for IBM Cognos 8.1 MR2 and Later Versions 
On the server where IBM Cognos 8 is installed, open the cclWin32SEHConfig.xml file from the c8_location\configuration directory.
In the configuration element, change the value of the environment variable setting to 0 (zero) so that it reads <env_var name="CCL_HWE_ABORT" value="0"/>
Save the file