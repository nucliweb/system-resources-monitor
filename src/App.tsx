// src/App.tsx
import { useEffect, useState } from "react";

const Card = ({
  title,
  children,
  docLink,
}: {
  title: string;
  children: React.ReactNode;
  docLink: string;
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
      <h2 className="text-xl font-bold mb-3 text-green-400">[{title}]</h2>
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

  const deviceMemory = (navigator as any).deviceMemory || "Not available";
  const cpuCores = navigator.hardwareConcurrency || "Not available";
  const connection = (navigator as any).connection;

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

          <Card
            title="Device Memory"
            docLink="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory"
          >
            <p className="text-lg">
              {typeof deviceMemory === "number"
                ? `${deviceMemory} GB`
                : deviceMemory}
            </p>
          </Card>

          <Card
            title="CPU Cores"
            docLink="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency"
          >
            <p className="text-lg">
              {typeof cpuCores === "number" ? `${cpuCores} cores` : cpuCores}
            </p>
          </Card>

          <Card
            title="Network Information"
            docLink="https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation"
          >
            <div className="space-y-2">
              <p className="text-lg">Connection type: {networkType}</p>
              <p className="text-lg">
                Data saver: {dataSaver ? "Enabled" : "Disabled"}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default App;
