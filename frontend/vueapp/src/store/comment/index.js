import * as api from "@/api";
export default {
    namespaced:true,
    state:{

    },
    getters:{

    },
    mutations:{

    },
    actions:{
        getComments: async ({},params) => {
            return api.getComments(params)
        },
        PostComments: async ({},data) => {
            return api.PostComments(data)
        }
    }
}