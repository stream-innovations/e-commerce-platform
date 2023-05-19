type BuildArgs = {
    deployment?: boolean;
    outDir?: string;
    backend?: string;
    include?: string[];
    includeDist?: string;
};
export default function build(args: BuildArgs): Promise<void>;
export {};
//# sourceMappingURL=build.d.ts.map