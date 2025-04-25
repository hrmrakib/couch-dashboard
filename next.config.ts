// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */

//   images: {
//     remotePatterns: [
//       {
//         hostname: "flagcdn.com",
//       },
//     ],
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "http://192.168.10.132:3759",
      "http://192.168.10.132:3759/api/v1",
      "192.168.10.132",
      "115.127.156.132",
    ],
  },
};

export default nextConfig;
