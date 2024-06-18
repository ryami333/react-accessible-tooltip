/* eslint-env node */
const isProd = process.env.NODE_ENV === 'production';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
    basePath: isProd ? '/react-accessible-tooltip' : undefined,
    assetPrefix: isProd ? '/react-accessible-tooltip/' : undefined,
};

export default nextConfig;
