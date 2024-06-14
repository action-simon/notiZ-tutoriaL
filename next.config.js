const { paraglide } = require("@inlang/paraglide-next/plugin")
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "files.edgestore.dev",
      },
    ],
  },
};

module.exports = paraglide({
	paraglide: {
		project: "./project.inlang",
		outdir: "./paraglide"
	},
	...nextConfig
});
