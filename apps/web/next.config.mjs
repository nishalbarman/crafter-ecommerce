/** @type {import('next').NextConfig} */
import withNextJsObfuscator from "nextjs-obfuscator";
const obfuscator = withNextJsObfuscator({
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: false,
  deadCodeInjectionThreshold: 0.4,
  debugProtection: true,
  debugProtectionInterval: 0,
  disableConsoleOutput: false,
  domainLock: [],
  domainLockRedirectUrl: "about:blank",
  forceTransformStrings: [],
  identifierNamesCache: null,
  identifierNamesGenerator: "hexadecimal",
  identifiersDictionary: [],
  identifiersPrefix: "",
  ignoreImports: false,
  inputFileName: "",
  log: false,
  numbersToExpressions: false,
  optionsPreset: "default",
  renameGlobals: true,
  renameProperties: false,
  renamePropertiesMode: "safe",
  reservedNames: [],
  reservedStrings: [],
  seed: 0,
  selfDefending: false,
  simplify: false,
  sourceMap: false,
  sourceMapBaseUrl: "",
  sourceMapFileName: "",
  sourceMapMode: "separate",
  sourceMapSourcesMode: "sources-content",
  splitStrings: true,
  splitStringsChunkLength: 10,
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayCallsTransformThreshold: 0.5,
  stringArrayEncoding: [],
  stringArrayIndexesType: ["hexadecimal-number"],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 2,
  stringArrayWrappersType: "variable",
  stringArrayThreshold: 0.75,
  target: "browser",
  transformObjectKeys: false,
  unicodeEscapeSequence: true,
});

const nextConfig = obfuscator({
  transpilePackages: [
    "@store/redux",
    "@custom-hooks/custom-clicks",
    "validator",
    "firebase-utils",
  ],
  images: {
    domains: ["n3.sdlcdn.com", "storage.googleapis.com"],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  //   productionBrowserSourceMaps: false,
});

export default nextConfig;
