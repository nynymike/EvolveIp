var passport = require('passport');
var SamlStrategy = require('passport-saml').Strategy;
const fs = require('fs');
var logger = require("../utils/logger");
var _ = require('lodash');
var saml_proxy_config = require('./saml_proxy_config');

var setCredentials = function(credentials) {

    var data = JSON.parse(credentials.data);

    logger.log('info', '----GET JSON DATA CONFIGURED IN OXTRUST FOR SAML-PROXY----------');
    logger.log('info', 'OXTRUST JSON DATA ==>'+  JSON.stringify(credentials.data));
    logger.log('info', '-----------------------------------------------------------');

    _.each(data.idps,function(idp){

        idp.cert = convertCertificate(idp.cert);

        logger.log('info', '-----------------------------------------------------------');
        logger.log('info', 'CERTIFICATE==>'+  idp.cert);
        logger.log('info', '-----------------------------------------------------------');

        logger.log('info', '-----------------------------------------------------------');
        logger.log('info', 'CONFIG PARAMATER==>'+  idp.config);
        logger.log('info', '-----------------------------------------------------------');


        var callbackURL = global.applicationHost.concat('/passport/auth/saml_proxy/callback/'+idp.config);

        passport.use(idp.config,new SamlStrategy(
            {
                callbackUrl: callbackURL,
                entryPoint: idp.entryPoint,
                issuer: saml_proxy_config.issuer,
                //cert: fs.readFileSync('/opt/gluu/node/passport/server/auth/cee-idp.crt', 'utf8'),
                cert: idp.cert,
                identifierFormat: null,
                decryptionPvk:saml_proxy_config.decryptionPvk,
                privateCert:saml_proxy_config.privateCert,
                validateInResponseTo: false,
                disableRequestedAuthnContext: true
            },
            function (profile, done) {
                return done(null,
                    {
                        id: profile['urn:oid:0.9.2342.19200300.100.1.1'],
                        name: profile['urn:oid:2.16.840.1.113730.3.1.241'],
                        username: profile['urn:oid:0.9.2342.19200300.100.1.1'],
                        email: profile.email,
                        givenName: profile['urn:oid:2.5.4.42'],
                        familyName: profile['urn:oid:2.5.4.4'],
                        provider: profile.provider || "saml-proxy",
                        accessToken: ""
                    });
            })
        );
    });
};

module.exports = {
    passport: passport,
    setCredentials: setCredentials
};

function convertCertificate (cert) {
    //Certificate must be in this specific format or else the function won't accept it
    var beginCert = "-----BEGIN CERTIFICATE-----";
    var endCert = "-----END CERTIFICATE-----";

    cert = cert.replace("\n", "");
    cert = cert.replace(beginCert, "");
    cert = cert.replace(endCert, "");

    var result = beginCert;
    while (cert.length > 0) {

        if (cert.length > 64) {
            result += "\n" + cert.substring(0, 64);
            cert = cert.substring(64, cert.length);
        }
        else {
            result += "\n" + cert;
            cert = "";
        }
    }

    if (result[result.length ] != "\n")
        result += "\n";
    result += endCert + "\n";
    return result;
}