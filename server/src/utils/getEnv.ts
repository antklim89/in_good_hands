

export function getEnv(envKey: string) {
    const env = process.env[envKey];
    if (!env) {
        throw new Error(`${envKey} env variable is required`);
    }
    return env;
}
