

declare module 'form-auto-content' {
    export default function formAutoContent(
        arg: Record<string, unknown>
    ): { payload: Record<string, unknown>; headers: Record<string, string>; };
}
