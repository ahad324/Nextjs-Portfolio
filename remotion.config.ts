import { Config } from "@remotion/cli/config";
import { webpackOverride } from "./video/webpack-override";

Config.setVideoImageFormat("jpeg");
Config.overrideWebpackConfig(webpackOverride);
