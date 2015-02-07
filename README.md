Meteor-startup-package
======================


Startup package for Meteor.js. 

> Note: Bourbon will fail after a reset. To fix this, just restart Meteor.

#Installed Packages
* aldeed:Collection2
* fourseven:scss
* iron:router
* zimme:iron-router-active
* mquandalle:bower
* wolves:bourbon
* wolves:neat
* wolves:bitters



#Added Orion-Cli

```bash
$ orion generate view
```
Adds view.html + view.js


```bash
$ orion generate routes
```
Adds route.js


```bash
$ orion generate model
```
Adds model.js + publication.js


```bash
$ orion generate module
```
Adds module.scss + module.html + module.js


```bash
$ orion generate scss
```
Adds stylesheet.scss


```bash
$ orion generate layout
```
Adds layout.html


```bash
$ orion generate common
```
Adds common.html


###To do:
* Google Analytics:
https://atmospherejs.com/reywood/iron-router-ga

* SEO:
https://atmospherejs.com/manuelschoebel/ms-seo

* "require.js-ish": 
https://github.com/DerMambo/wait-on-lib

## Considerations
* https://github.com/matteodem/meteor-easy-security
* https://github.com/msavin/MongoInspector
* https://tail.sh/
* https://github.com/meteor/meteor/tree/devel/packages/browser-policy
* https://github.com/meteor/meteor/tree/devel/packages/appcache
* https://atmospherejs.com/meteor/spiderable
* https://github.com/meteor-velocity/velocity
* https://github.com/gadicc/meteor-sitemaps
* https://github.com/dburles/meteor-collection-helpers
* https://github.com/raix/Meteor-handlebar-helpers
* https://github.com/zimme/meteor-collection-timestampable/

### ES6 support
Installed the following in a feature branch for future work:
* https://github.com/Benvie/harmony-collections

Other installed and failed packages is as follows:
* https://atmospherejs.com/sharlon/6to5 
* https://atmospherejs.com/matteodem/traceur

### Admins
* https://github.com/yogiben/meteor-admin
* https://github.com/gterrono/houston