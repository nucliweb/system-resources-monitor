// src/App.tsx
import { useEffect, useState } from "react";

const Card = ({
  title,
  children,
  docLink,
  supported,
}: {
  title: string;
  children: React.ReactNode;
  docLink: string;
  supported: boolean;
}) => (
  <div className="mb-6 font-mono">
    <div className="bg-gray-900 rounded border border-green-500 p-4">
      <div className="border-b border-green-500 pb-2 mb-3">
        <span className="text-green-500">root@system</span>
        <span className="text-gray-400">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-gray-400">$ cat </span>
        <span className="text-green-400">
          {title.toLowerCase().replace(/ /g, "-")}.txt
        </span>
      </div>
      <h2 className="text-xl font-bold mb-3 text-green-400 flex items-center justify-between">
        <span>[{title}]</span>
        <span
          className={`text-sm ${supported ? "text-green-400" : "text-red-400"}`}
        >
          {supported ? "● Supported" : "● Not Supported"}
        </span>
      </h2>
      <div className="text-green-300">{children}</div>
    </div>
    <div className="mt-2 text-sm text-gray-500">
      <span className="text-gray-400">→ man </span>
      <a
        href={docLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 hover:underline"
      >
        {title.toLowerCase().replace(/ /g, "-")}
      </a>
    </div>
  </div>
);

const App = () => {
  const [networkType, setNetworkType] = useState<string>("Not available");

  const deviceInfo = {
    platform: navigator.platform,
    userAgent: navigator.userAgent,
  };

  const deviceMemory = (navigator as any).deviceMemory;
  const cpuCores = navigator.hardwareConcurrency;
  const connection = (navigator as any).connection;

  // Comprobación de soporte de APIs
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
  }, []);

  const dataSaver = connection?.saveData || false;

  return (
    <>
      <style>{`
        #root {
          width: 100vw;
          min-height: 100vh;
          background: #0a0a0a;
        }
        
        @keyframes cursor-blink {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        .cursor::after {
          content: '_';
          animation: cursor-blink 1s infinite;
        }
      `}</style>
      <div className="w-full min-h-screen bg-gray-900 flex font-mono">
        <div className="max-w-3xl mx-auto px-4 py-8 flex-1">
          <div className="mb-8 flex items-center">
            <span className="text-green-500 text-xl mr-2">$</span>
            <h1 className="text-2xl font-bold text-green-400 cursor">
              System Resources Monitor v1.0.0
            </h1>
          </div>

          <div className="mb-6 text-gray-400 text-sm">
            <p>Platform: {deviceInfo.platform}</p>
            <p className="truncate">User Agent: {deviceInfo.userAgent}</p>
          </div>

          <Card
            title="Device Memory"
            docLink="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory"
            supported={isDeviceMemorySupported}
          >
            <p className="text-lg">
              {isDeviceMemorySupported
                ? `${deviceMemory} GB`
                : "This API is not supported in your browser"}
            </p>
          </Card>

          <Card
            title="CPU Cores"
            docLink="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency"
            supported={isCpuCoresSupported}
          >
            <p className="text-lg">
              {isCpuCoresSupported
                ? `${cpuCores} cores`
                : "This API is not supported in your browser"}
            </p>
          </Card>

          <Card
            title="Network Information"
            docLink="https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation"
            supported={isNetworkInfoSupported}
          >
            <div className="space-y-2">
              {isNetworkInfoSupported ? (
                <>
                  <p className="text-lg">Connection type: {networkType}</p>
                  <p className="text-lg">
                    Data saver: {dataSaver ? "Enabled" : "Disabled"}
                  </p>
                </>
              ) : (
                <p className="text-lg">
                  This API is not supported in your browser
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default App;
