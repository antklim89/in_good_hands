import bcryptjs from 'bcryptjs';


export async function hashPassword(password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        bcryptjs.hash(password, 8, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}
