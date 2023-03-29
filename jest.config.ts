/*
 * @description: test config file
 * @Author: Gouxinyu
 * @Date: 2022-08-13 02:23:02
 */
import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ['js', 'ts'],
  extensionsToTreatAsEsm: ['.ts']
};

export default config;