class FileListPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
        compiler.hooks.compilation.tap(
            "FileListPlugin",
            (compilation, callback) => {
                compilation.hooks.optimizeChunkAssets.tap(
                    "BannerPlugin",
                    (chunks) => {
                        for (const chunk of chunks) {
                            if (chunk.name === "main") {
                                for (const file of chunk.files) {
                                    compilation.updateAsset(
                                        file
                                    );
                                    break;
                                }
                            }
                        }
                    }
                );
            }
        );
    }
}

module.exports = FileListPlugin;