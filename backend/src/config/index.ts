const configs = {
    develop:{
        server:{
            host:"localhost",
            port:8080
        }
    },
    test:{
        server:{
            host:"localhost",
            port:8080
        }
    },
    production:{
        server:{
            host:"localhost",
            port:8080
        }
    },
}
type T = keyof typeof configs

const NODE_EVN = process.env.NODE_ENV as T || "develop";
export default configs[NODE_EVN]