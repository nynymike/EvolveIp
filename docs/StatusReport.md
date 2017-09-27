We have successfully achieved redirection to the External IDP (ADFS) from the Gluu Server.

We now have the following pending tasks:
```
1) Login into ADFS with passport-saml 
--> We have already achieved this on a separate project, so not much risk.

2) Get the SAML response at GLUU (Insert/Update user into LDAP Server using interception script) 
--> once we get the SAML response on Gluu (passport), we need to insert/update the user details into the Gluu Server. Likewise, we have achieved this on a separate project, so not much risk here either.

3) Log the user in to GLUU / Redirect User to RP 
--> We need to redirect the User to the RP after #2 with data. We may need to create sessions in order to identify where the request was actually initiated. This we need to do a bit of digging on.
```
