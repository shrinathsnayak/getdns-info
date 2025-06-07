import os from "os";
import cluster from "cluster";

export const setupCluster = (startServer: () => void) => {
  const totalCPUs = os.cpus().length;

  if (cluster.isPrimary) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    for (let i = 0; i < totalCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker) => {
      console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
      cluster.fork();
    });
  } else {
    startServer();
  }
};