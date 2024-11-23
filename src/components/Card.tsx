interface CardProps {
  title: string;
  children: React.ReactNode;
  docLink: string;
  supported: boolean;
}

export const Card = ({ title, children, docLink, supported }: CardProps) => (
  <div className="mb-6 font-mono">
    <div className="bg-gray-900 rounded border border-green-500 p-3 sm:p-4 overflow-hidden">
      <div className="border-b border-green-500 pb-2 mb-3">
        <div className="flex items-center text-sm sm:text-base truncate">
          <span className="text-green-500 shrink-0">root@system</span>
          <span className="text-gray-400 shrink-0">:</span>
          <span className="text-blue-400 shrink-0">~</span>
          <span className="text-gray-400 shrink-0">$ cat </span>
          <span className="text-green-400 truncate">{title.toLowerCase().replace(/ /g, "-")}.txt</span>
        </div>
      </div>
      <h2 className="text-lg sm:text-xl font-bold mb-3 text-green-400 flex items-center justify-between">
        <span>[{title}]</span>
        <span className={`text-xs sm:text-sm ${supported ? "text-green-400" : "text-red-400"}`}>
          {supported ? "● Supported" : "● Not Supported"}
        </span>
      </h2>
      <div className="text-green-300 text-sm sm:text-base break-words">{children}</div>
    </div>
    <div className="mt-2 text-xs sm:text-sm text-gray-500 flex items-center">
      <span className="text-gray-400 mr-2">→ man</span>
      <a
        href={docLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 hover:underline truncate"
      >
        {title.toLowerCase().replace(/ /g, "-")}
      </a>
    </div>
  </div>
);
