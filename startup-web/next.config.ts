import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    /* config options here */
    // @ts-ignore - setting turbopack root to fix inference issues in version 16
    turbopack: {
        root: path.resolve(__dirname),
    },
};

export default nextConfig;
