# NGN Development Bridge

The bridge is a system service/daemon that makes the NGN developer tools available to iOS and Android devices on the local network.

This application is designed specifically for the individual developer. In other words, if you are running an NGN environment on your laptop or desktop,
this utility will enable you view the logs from your local environment on a mobile device. This utility is not designed for production use, since there
is an alternative application specifically designed for production use.

The bridge is installed as a native background process on the developer workstation, utilizing [daemon-manager](http://github.com/coreybutler/daemon-manager) and
the corresponding platform controller ([node-windows](http://github.com/coreybutler/node-windows), [node-mac](http://github.com/coreybutler/node-mac), or [node-linux](http://github.com/coreybutler/node-linux)).

To install the bridge, execute:

`npm install ngn-bridge`
