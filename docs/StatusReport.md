Basic Flow:  
Openid-implicit-client --> Gluu Server --> ADFS

Steps:
1) Redirect user to external IDP from GLUU. 
    a) We should have stored all IDP details already in GLUU & UNIQ KEY associated with the all IDP       
    b) Get that UNIQ KEY in passport / interception script (GLUU)
    
 #1.a: We have stored all IDP details with UNIQ KEY in gluu as new strategy in passport. You can have a look here 
 https://github.com/snehaldkshah/EvolveIp/blob/master/docs/designdocument.md#prerequisite---configurations-gluu-server

 #1.b:







