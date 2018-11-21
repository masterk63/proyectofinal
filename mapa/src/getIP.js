const os = require('os')
export default obtenerIp = () => {
   const interfaces = os.networkInterfaces()
   let address;
   for (let prop in interfaces) {
      interfaces[prop].map(a => a.address.startsWith("192.168") && (address = a.address))
   }
}



