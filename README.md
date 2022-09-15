# Admin Tools ADF App

This App is used at our customers and this will become full Open Source.
This App works with Community & Enterprise Alfresco

We had an app to manager users & groups within sites (for quite some time) and then we started to add stuff, like:

- Documentation download
- Angular/ADF Extension information
- License information
- Platform modules
- Manage sites
-- Create Sites
 -- View Users & Groups
-- Add Users & Groups
- Manage Users & Groups
-- View Users & Groups
-- Add Users & Groups within Groups
-- Create Users or Groups ==> is still in Development
- Manage Space Templates
- Javascript Console ==> needs platform with the js-console amp/lib installed
- Node Browser

## How can you start it?
As base you could use the compose file from Alfresco github https://github.com/Alfresco/acs-deployment/blob/master/docker-compose/docker-compose.yml

I'm not 100% sure how this works with de NGINX proxy which Alfresco uses, but the app below can be reached with url
http://localhost:4006/

```
admin-tools:
  image: harbor.contezza.nl/public/admin-tools:1.0.0
  environment:
   ACS_PROXY_URL: http://${acs.host}:8080/alfresco/
  ports:
   - 4006:8080
  networks:
   dev_network:
    aliases:
     - admin-tools
```
Screenshots are in the blogs post at Alfresco.
https://hub.alfresco.com/t5/alfresco-content-services-blog/alfresco-community-admin-tools/ba-p/313742

---
if you need to use the Javascript Console features, then you'll need to have a platform with an Alfresco 6.2.x or highter with a Javascript-console version 0.7 or higher (built by the code) https://github.com/share-extras/js-console

TODO

    Go to github with our code ==> probably OOTB or Share-Extras
        We have a mono-repository now, so will need to split the code
    We use a lot of internal libraries which aren't available in our Nexus or NPMJS
        These need to be built seperately and published
    We'll need to publish the module also as a war/jar so one can include it in tomcat so no Docker image is needed or when someone just want's to include this module directly in the backend platform

A great shout out to our Developers at Contezza, Wasyl, Rick, Tjerk, Diego, Nume who are too shy to create a blog ==> hence I'm doing it :P.
