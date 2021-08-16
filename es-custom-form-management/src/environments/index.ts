import * as libenvironment from "./environment";
import { environment as coreenvironment, Environment } from "../../../es-core/src/environments";
import { _ } from 'underscore';

interface DynamicContentDemoEnviroment extends Environment {
    dynamicContentDemoUrl: String;
}

export const environment: DynamicContentDemoEnviroment = libenvironment;
_.extend(environment, coreenvironment);