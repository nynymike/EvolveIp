# Multiple IDP Support With Passport

## Installation: 
I have three virtual machine to have complete setup as following:
```        
      1)  Gluu Server:
           Installed Gluu server in Ubuntu 14.04
           Host Name: https://cee.gluu.info/

      2)  ADFS:
	   Installed and configured ADFS in Windows Server 2012 R2 and the 
           Host Name: https://server.snehal.com/adfs/ls/idpinitiatedsignon 

      3)  RP (Client):
	   Host Name: https://192.168.200.95/implicit-test.html
```



## Prerequisite - Configurations (Gluu Server):

- Add trust relationship for SP in Gluu Server.

- Add New Interception Script in Gluu Server as "passport_saml_proxy".

- Add new strategy for SAML-PROXY as "saml_proxy".
![](https://github.com/snehaldkshah/EvolveIp/blob/master/docs/img/Saml_Strategy.png?raw=true)

- Add JSON in OxTrust "saml_proxy" strategy as Data (Mutiple Idp’s as JSON)
1) Certificate (IDP)
2) Config Parameter (Identify the IDP)
3) Entry Endpoint    (IDPs Entrypoint)

Sample Data: https://www.evernote.com/shard/s517/sh/2ef93894-c371-4acd-a4cb-b740b6d7b2af/df0dd3b289fc2b9c95499862768b79f7



## Prerequisite - Configurations (ADFS):
- Add relying party.
![](https://github.com/snehaldkshah/EvolveIp/blob/master/docs/img/ADFS_1.png?raw=true)

- Add relying party certificate 

- Attribute mapping of relying party with ADFS.
![](https://github.com/snehaldkshah/EvolveIp/blob/master/docs/img/ADFS-2.png?raw=true)



## Prerequisite - Changes in passportjs(GLUU):

- Add  "saml-proxy" configurestrategy.js
https://github.com/snehaldkshah/EvolveIp/blob/master/passport/server/auth/configureStrategies.js#L63

- Add "Entry" endpoint for "saml-proxy"
https://github.com/snehaldkshah/EvolveIp/blob/master/passport/server/routes/index.js#L194

- Add "Callback" endpoint
https://github.com/snehaldkshah/EvolveIp/blob/master/passport/server/routes/index.js#L176

- Read Ox-Trust Json Data
https://github.com/snehaldkshah/EvolveIp/blob/master/passport/server/auth/saml_proxy.js#L8



## Testing:

Step 1: Standing on SP with acr_value=saml_proxy
![](https://github.com/snehaldkshah/EvolveIp/blob/master/docs/img/1.png?raw=true)

Step 2: Login in Gluu Server
![](https://github.com/snehaldkshah/EvolveIp/blob/master/docs/img/2.png?raw=true)

Step 3: Successfully login in gluu server and standing at passport to redirect user to ADFS IDP
![](https://github.com/snehaldkshah/EvolveIp/blob/master/docs/img/2.png?raw=true)



## Logs:

- Successfully able to get users data in interception script configured in oxTrust logs oxauth_script.log  in cee.gluu.info 

- Successfully able to see the logs of passportjs(GLUU) for "saml-proxy"
	1) Entry Endpoint Log
	 https://github.com/snehaldkshah/EvolveIp/blob/master/passport/server/logs/passport.log.2017-09-04#L3	
	2) Callback Endpoint Log
	https://github.com/snehaldkshah/EvolveIp/blob/master/passport/server/logs/passport.log.2017-09-04#L9
	3) Callback Response Log
	https://github.com/snehaldkshah/EvolveIp/blob/master/passport/server/logs/passport.log.2017-09-04#L13



## ISSUE:

We have a list of Idp’s data as Json in Gluu Server as "saml_proxy" strategy. I’m able to get this data in passportjs. 

I need data/parameter in interception script  or passport to redirect the user to correct IDP
Same thing once we stand on passport with the adfs data in json. How I would redirect user from where the request was initiated. 
