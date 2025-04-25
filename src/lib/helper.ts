import type { FlarebaseClientOptions } from "./types";

export function applySettingDefaults(
    options: FlarebaseClientOptions,
): Required<FlarebaseClientOptions> {
    const {
        global: globalOptions,
    } = options;

    const result: Required<FlarebaseClientOptions> = {
        global: {
            ...globalOptions,
        },
        localDev: {},
    }

    return result;
}