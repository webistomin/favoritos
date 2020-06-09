declare const wp: any;
declare const webpackOptions: {
    resolve: {
        extensions: string[];
    };
    module: {
        rules: {
            test: RegExp;
            exclude: RegExp[];
            use: {
                loader: string;
            }[];
        }[];
    };
};
declare const options: {
    webpackOptions: {
        resolve: {
            extensions: string[];
        };
        module: {
            rules: {
                test: RegExp;
                exclude: RegExp[];
                use: {
                    loader: string;
                }[];
            }[];
        };
    };
};
