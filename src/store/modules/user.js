
const state = {
    keepAliveComponents: []
}

const mutations = {
    set_keepAliveFn (state, component) {
        !state.keepAliveComponents.includes(component) && state.keepAliveComponents.push(component)
    }
}

const actions = {

}

export default {
    state,
    mutations,
    actions
}
