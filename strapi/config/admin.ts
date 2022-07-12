
const admin = ({ env }: { env: (a: string, b: string) => string}) => ({ auth: { secret: env('ADMIN_JWT_SECRET', '700bcf6ca7f67b35f4813f3ffa483f87') } });

export default admin;
