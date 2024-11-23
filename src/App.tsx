import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  const [networkType, setNetworkType] = useState<string>("Not available");

  const deviceInfo = {
    platform: navigator.platform,
    userAgent: navigator.userAgent,
  };

  const deviceMemory = (navigator as any).deviceMemory;
  const cpuCores = navigator.hardwareConcurrency;
  const connection = (navigator as any).connection;

  const isDeviceMemorySupported = "deviceMemory" in navigator;
  const isCpuCoresSupported = "hardwareConcurrency" in navigator;
  const isNetworkInfoSupported = "connection" in navigator;

  useEffect(() => {
    if (connection) {
      const updateNetworkInfo = () => {
        setNetworkType(connection.effectiveType || "Not available");
      };

      updateNetworkInfo();

      connection.addEventListener("change", updateNetworkInfo);
      return () => {
        connection.removeEventListener("change", updateNetworkInfo);
      };
    }
  }, [connection]);

  const dataSaver = connection?.saveData || false;

  return (
    <div className="w-full min-h-screen bg-gray-900 flex font-mono overflow-x-hidden">
      <div className="w-full max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="mb-4 sm:mb-8">
          <span className="text-green-500 text-lg sm:text-xl mr-2">$</span>
          <h1 className="text-xl sm:text-2xl font-bold text-green-400 cursor inline-block">
            System Resources Monitor v1.0.0
          </h1>
        </div>

        <div className="mb-6 text-gray-400 text-xs sm:text-sm">
          <p>Platform: {deviceInfo.platform}</p>
          <p className="truncate">User Agent: {deviceInfo.userAgent}</p>
        </div>

        <Card
          title="Device Memory"
          docLink="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory"
          supported={isDeviceMemorySupported}
        >
          <p>{isDeviceMemorySupported ? `${deviceMemory} GB` : "This API is not supported in your browser"}</p>
        </Card>

        <Card
          title="CPU Cores"
          docLink="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency"
          supported={isCpuCoresSupported}
        >
          <p>{isCpuCoresSupported ? `${cpuCores} cores` : "This API is not supported in your browser"}</p>
        </Card>

        <Card
          title="Network Information"
          docLink="https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation"
          supported={isNetworkInfoSupported}
        >
          <div className="space-y-2">
            {isNetworkInfoSupported ? (
              <>
                <p>Connection type: {networkType}</p>
                <p>Data saver: {dataSaver ? "Enabled" : "Disabled"}</p>
              </>
            ) : (
              <p>This API is not supported in your browser</p>
            )}
          </div>
        </Card>
      </div>
      <Analytics />
    </div>
  );
};

export default App;
